const STORAGE_KEY = "discordTranslatorSettings";
const MESSAGE_SELECTOR = 'li[id^="chat-messages-"], [id^="chat-messages-"]';
const CONTENT_SELECTOR = '[id^="message-content-"]';

let settings = null;
let observer = null;
let currentUserNames = new Set();
let scanTimer = 0;
let userNameTimer = 0;

init();

async function init() {
  if (!isDiscordChannelPage()) {
    return;
  }

  settings = await requestSettings();
  refreshCurrentUserNames();
  startObserver();
  scanVisibleMessages(true);

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "local" || !changes[STORAGE_KEY]?.newValue) {
      return;
    }
    settings = changes[STORAGE_KEY].newValue;
    resetTranslationsForDisplayMode();
    refreshCurrentUserNames();
    scanVisibleMessages(true);
  });
}

function isDiscordChannelPage() {
  return location.hostname.endsWith("discord.com") && location.pathname.startsWith("/channels/");
}

async function requestSettings() {
  const response = await sendMessage({ type: "GET_SETTINGS" });
  return response.settings;
}

function startObserver() {
  if (observer) {
    observer.disconnect();
  }

  observer = new MutationObserver((mutations) => {
    const messageNodes = new Set();
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        collectMessageNodes(node, messageNodes);
      }
    }

    if (messageNodes.size > 0) {
      messageNodes.forEach((node) => processMessageNode(node));
      return;
    }

    scheduleScan();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

function collectMessageNodes(node, output) {
  if (!(node instanceof Element)) {
    return;
  }

  if (node.matches(MESSAGE_SELECTOR)) {
    output.add(node);
  }

  node.querySelectorAll?.(MESSAGE_SELECTOR).forEach((messageNode) => output.add(messageNode));
}

function scheduleScan() {
  if (scanTimer) {
    return;
  }

  scanTimer = window.setTimeout(() => {
    scanTimer = 0;
    scanVisibleMessages(false);
  }, 800);
}

function scanVisibleMessages(initial) {
  if (!settings?.enabled) {
    return;
  }

  const messages = Array.from(document.querySelectorAll(MESSAGE_SELECTOR));
  const limit = initial ? Number(settings.startupLimit || 30) : messages.length;
  messages.slice(-limit).forEach((messageNode) => processMessageNode(messageNode));
}

function processMessageNode(messageNode) {
  if (!settings?.enabled || !(messageNode instanceof Element)) {
    return;
  }

  const contentNodes = getContentNodes(messageNode);
  contentNodes.forEach((contentNode) => processContentNode(contentNode, messageNode));
}

function getContentNodes(messageNode) {
  const nodes = [];
  if (messageNode.matches?.(CONTENT_SELECTOR)) {
    nodes.push(messageNode);
  }
  messageNode.querySelectorAll?.(CONTENT_SELECTOR).forEach((node) => nodes.push(node));
  return nodes.filter((node) => isUsableContentNode(node));
}

function isUsableContentNode(node) {
  if (!(node instanceof HTMLElement)) {
    return false;
  }
  if (node.closest(".dtx-translation")) {
    return false;
  }
  const text = extractMessageText(node);
  if (!text || text.length > 3000) {
    return false;
  }
  if (/^https?:\/\/\S+$/i.test(text)) {
    return false;
  }
  return true;
}

async function processContentNode(contentNode, messageNode) {
  const text = extractMessageText(contentNode);
  const signature = buildSignature(settings, text);

  if (contentNode.dataset.dtxSignature === signature) {
    return;
  }
  if (!settings.translateOwn && isOwnMessage(messageNode)) {
    return;
  }

  contentNode.dataset.dtxSignature = signature;
  renderTranslation(contentNode, {
    state: "loading",
    text: translateUi("translating")
  });

  try {
    const response = await sendMessage({
      type: "TRANSLATE_TEXT",
      text
    });
    if (!response.translation) {
      removeTranslation(contentNode);
      return;
    }
    renderTranslation(contentNode, {
      state: "ready",
      text: response.translation,
      provider: settings.provider
    });
  } catch (error) {
    contentNode.dataset.dtxSignature = "";
    renderTranslation(contentNode, {
      state: "error",
      text: getErrorMessage(error)
    });
  }
}

function extractMessageText(node) {
  return String(node.innerText || node.textContent || "")
    .replace(/\u200B/g, "")
    .replace(/\s+\n/g, "\n")
    .trim();
}

function isOwnMessage(messageNode) {
  const manualName = normalizeName(settings.selfName);
  const authorName = normalizeName(extractAuthorName(messageNode));
  if (!authorName) {
    return false;
  }

  if (manualName) {
    return authorName === manualName;
  }

  if (Date.now() - userNameTimer > 5000) {
    refreshCurrentUserNames();
  }

  return currentUserNames.has(authorName);
}

function extractAuthorName(messageNode) {
  const directName = extractAuthorFromNode(messageNode);
  if (directName) {
    return directName;
  }

  let previous = messageNode.previousElementSibling;
  let remaining = 8;
  while (previous && remaining > 0) {
    if (previous.matches?.(MESSAGE_SELECTOR)) {
      const previousName = extractAuthorFromNode(previous);
      if (previousName) {
        return previousName;
      }
      remaining -= 1;
    }
    previous = previous.previousElementSibling;
  }

  return "";
}

function extractAuthorFromNode(messageNode) {
  const explicitAuthor =
    messageNode.querySelector('h3 [class*="username"], h3 [id^="message-username-"], h3 span') ||
    messageNode.querySelector('[class*="username"]');

  if (explicitAuthor?.textContent?.trim()) {
    return explicitAuthor.textContent.trim();
  }

  const ariaLabel = messageNode.getAttribute("aria-label") || "";
  const colonIndex = ariaLabel.indexOf(":");
  if (colonIndex > 0) {
    return ariaLabel.slice(0, colonIndex).trim();
  }

  return "";
}

function refreshCurrentUserNames() {
  userNameTimer = Date.now();
  const names = new Set();
  const selectors = [
    '[class*="panels"] [class*="username"]',
    '[class*="nameTag"] [class*="username"]',
    '[class*="avatarWrapper"] [class*="name"]',
    '[aria-label*="User Settings"] [class*="username"]',
    '[aria-label*="用户设置"] [class*="username"]'
  ];

  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((node) => {
      const name = normalizeName(node.textContent);
      if (name && name.length <= 40) {
        names.add(name);
      }
    });
  });

  currentUserNames = names;
}

function normalizeName(value) {
  return String(value || "")
    .replace(/^@/, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function renderTranslation(contentNode, payload) {
  const translationNode = ensureTranslationNode(contentNode);
  translationNode.className = `dtx-translation dtx-${payload.state}`;
  translationNode.dataset.provider = payload.provider || settings.provider || "";
  translationNode.replaceChildren();

  restoreOriginalDisplay(contentNode);
  if (settings.displayMode === "replace" && payload.state === "ready") {
    hideOriginal(contentNode);
    translationNode.classList.add("dtx-replace");
  }

  if (payload.state === "ready" && settings.displayMode === "compact") {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    const body = document.createElement("div");
    summary.textContent = `${translateUi("compactSummary")} · ${providerLabel(payload.provider)}`;
    body.textContent = payload.text;
    details.append(summary, body);
    translationNode.append(details);
    return;
  }

  const meta = document.createElement("span");
  meta.className = "dtx-meta";
  meta.textContent =
    payload.state === "loading"
      ? translateUi("translating")
      : payload.state === "error"
        ? translateUi("failed")
        : providerLabel(payload.provider);

  const text = document.createElement("span");
  text.className = "dtx-text";
  text.textContent = payload.text;

  translationNode.append(meta, text);
}

function ensureTranslationNode(contentNode) {
  const next = contentNode.nextElementSibling;
  if (next?.classList?.contains("dtx-translation")) {
    return next;
  }

  const translationNode = document.createElement("div");
  contentNode.insertAdjacentElement("afterend", translationNode);
  return translationNode;
}

function removeTranslation(contentNode) {
  const next = contentNode.nextElementSibling;
  if (next?.classList?.contains("dtx-translation")) {
    next.remove();
  }
  restoreOriginalDisplay(contentNode);
}

function resetTranslationsForDisplayMode() {
  document.querySelectorAll(".dtx-translation").forEach((node) => node.remove());
  document.querySelectorAll("[data-dtx-signature]").forEach((node) => {
    node.dataset.dtxSignature = "";
  });
  document.querySelectorAll("[data-dtx-original-display]").forEach((node) => {
    restoreOriginalDisplay(node);
  });
}

function hideOriginal(contentNode) {
  if (!contentNode.dataset.dtxOriginalDisplay) {
    contentNode.dataset.dtxOriginalDisplay = contentNode.style.display || " ";
  }
  contentNode.style.display = "none";
}

function restoreOriginalDisplay(contentNode) {
  if (!contentNode.dataset.dtxOriginalDisplay) {
    return;
  }

  const value = contentNode.dataset.dtxOriginalDisplay;
  contentNode.style.display = value === " " ? "" : value;
  delete contentNode.dataset.dtxOriginalDisplay;
}

function buildSignature(activeSettings, text) {
  return [
    activeSettings.provider,
    activeSettings.targetLang,
    activeSettings.sourceLang,
    activeSettings.displayMode,
    hashString(text)
  ].join(":");
}

function providerLabel(provider) {
  const labels = {
    openai: translateUi("providerOpenai"),
    deepl: translateUi("providerDeepl"),
    google: translateUi("providerGoogle"),
    baidu: translateUi("providerBaidu")
  };
  return labels[provider] || "Translator";
}

function translateUi(key) {
  if (globalThis.DtxI18n) {
    return DtxI18n.t(settings?.uiLanguage, key);
  }
  return key;
}

function sendMessage(payload) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(payload, (response) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      if (!response?.ok) {
        reject(new Error(response?.error || "Extension request failed."));
        return;
      }
      resolve(response);
    });
  });
}

function getErrorMessage(error) {
  return error?.message || String(error || "Unknown error");
}

function hashString(input) {
  let hash = 2166136261;
  const text = String(input);
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}
