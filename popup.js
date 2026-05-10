const elements = {
  enabled: document.querySelector("#enabled"),
  enabledStatus: document.querySelector("#enabledStatus"),
  uiLanguage: document.querySelector("#uiLanguage"),
  provider: document.querySelector("#provider"),
  targetLang: document.querySelector("#targetLang"),
  displayMode: document.querySelector("#displayMode"),
  pageStatus: document.querySelector("#pageStatus"),
  openOptions: document.querySelector("#openOptions"),
  clearCache: document.querySelector("#clearCache")
};

let settings = null;

init();

async function init() {
  await loadSettings();
  bindEvents();
  await renderPageStatus();
}

async function loadSettings() {
  const response = await sendMessage({ type: "GET_SETTINGS" });
  settings = response.settings;
  renderSettings();
}

function bindEvents() {
  elements.enabled.addEventListener("change", () => savePatch({ enabled: elements.enabled.checked }));
  elements.uiLanguage.addEventListener("change", () => savePatch({ uiLanguage: elements.uiLanguage.value }));
  elements.provider.addEventListener("change", () => savePatch({ provider: elements.provider.value }));
  elements.targetLang.addEventListener("change", () => savePatch({ targetLang: elements.targetLang.value }));
  elements.displayMode.addEventListener("change", () => savePatch({ displayMode: elements.displayMode.value }));
  elements.openOptions.addEventListener("click", () => chrome.runtime.openOptionsPage());
  elements.clearCache.addEventListener("click", clearCache);
}

function renderSettings() {
  const uiLanguage = settings.uiLanguage || "auto";
  DtxI18n.apply(document, uiLanguage);
  DtxI18n.fillUiLanguages(elements.uiLanguage, uiLanguage, uiLanguage);
  DtxI18n.fillTranslationLanguages(elements.targetLang, uiLanguage, settings.targetLang, false);

  elements.enabled.checked = Boolean(settings.enabled);
  elements.provider.value = settings.provider;
  elements.targetLang.value = settings.targetLang;
  elements.uiLanguage.value = uiLanguage;
  elements.displayMode.value = settings.displayMode;
  renderEnabledStatus();
}

async function savePatch(patch) {
  const response = await sendMessage({
    type: "SAVE_SETTINGS",
    patch
  });
  settings = response.settings;
  renderSettings();
  await renderPageStatus();
}

function renderEnabledStatus() {
  elements.enabledStatus.textContent = settings.enabled
    ? DtxI18n.t(settings.uiLanguage, "on")
    : DtxI18n.t(settings.uiLanguage, "off");
  elements.enabledStatus.classList.toggle("off", !settings.enabled);
}

async function renderPageStatus() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const isDiscord = /^https:\/\/(canary\.|ptb\.)?discord\.com\/channels\//.test(tab?.url || "");
  elements.pageStatus.textContent = DtxI18n.t(
    settings?.uiLanguage,
    isDiscord ? "popupDiscordReady" : "popupOpenDiscord"
  );
}

async function clearCache() {
  elements.clearCache.disabled = true;
  try {
    await sendMessage({ type: "CLEAR_CACHE" });
    elements.clearCache.textContent = DtxI18n.t(settings.uiLanguage, "cacheCleared");
    window.setTimeout(() => {
      elements.clearCache.textContent = DtxI18n.t(settings.uiLanguage, "clearCache");
    }, 1200);
  } finally {
    elements.clearCache.disabled = false;
  }
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
