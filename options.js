const elements = {
  saveStatus: document.querySelector("#saveStatus"),
  enabled: document.querySelector("#enabled"),
  uiLanguage: document.querySelector("#uiLanguage"),
  provider: document.querySelector("#provider"),
  targetLang: document.querySelector("#targetLang"),
  sourceLang: document.querySelector("#sourceLang"),
  displayMode: document.querySelector("#displayMode"),
  startupLimit: document.querySelector("#startupLimit"),
  concurrency: document.querySelector("#concurrency"),
  selfName: document.querySelector("#selfName"),
  translateOwn: document.querySelector("#translateOwn"),
  cacheEnabled: document.querySelector("#cacheEnabled"),
  openaiApiKey: document.querySelector("#openaiApiKey"),
  openaiModel: document.querySelector("#openaiModel"),
  openaiEndpoint: document.querySelector("#openaiEndpoint"),
  openaiPrompt: document.querySelector("#openaiPrompt"),
  deeplApiKey: document.querySelector("#deeplApiKey"),
  deeplPlan: document.querySelector("#deeplPlan"),
  googleApiKey: document.querySelector("#googleApiKey"),
  baiduAppId: document.querySelector("#baiduAppId"),
  baiduSecretKey: document.querySelector("#baiduSecretKey"),
  save: document.querySelector("#save"),
  reset: document.querySelector("#reset"),
  testText: document.querySelector("#testText"),
  testTranslate: document.querySelector("#testTranslate"),
  testResult: document.querySelector("#testResult")
};

let settings = null;

init();

async function init() {
  bindEvents();
  await loadSettings();
}

function bindEvents() {
  elements.uiLanguage.addEventListener("change", () => {
    applyUiLanguage(elements.uiLanguage.value);
    setStatus("unsaved", "off");
  });
  elements.provider.addEventListener("change", () => showProviderPanel(elements.provider.value));
  elements.save.addEventListener("click", saveSettings);
  elements.reset.addEventListener("click", resetSettings);
  elements.testTranslate.addEventListener("click", testTranslate);

  document.addEventListener("input", (event) => {
    if (event.target.matches("input, select, textarea")) {
      setStatus("unsaved", "off");
    }
  });
}

async function loadSettings() {
  const response = await sendMessage({ type: "GET_SETTINGS" });
  settings = response.settings;
  renderSettings();
  setStatus("loaded", "");
}

function renderSettings() {
  const uiLanguage = settings.uiLanguage || "auto";
  applyUiLanguage(uiLanguage);

  elements.enabled.checked = Boolean(settings.enabled);
  elements.provider.value = settings.provider;
  elements.targetLang.value = settings.targetLang;
  elements.sourceLang.value = settings.sourceLang;
  elements.displayMode.value = settings.displayMode;
  elements.startupLimit.value = settings.startupLimit;
  elements.concurrency.value = settings.concurrency;
  elements.selfName.value = settings.selfName || "";
  elements.translateOwn.checked = Boolean(settings.translateOwn);
  elements.cacheEnabled.checked = Boolean(settings.cacheEnabled);

  elements.openaiApiKey.value = settings.providers.openai.apiKey || "";
  elements.openaiModel.value = settings.providers.openai.model || "";
  elements.openaiEndpoint.value = settings.providers.openai.endpoint || "";
  elements.openaiPrompt.value = settings.providers.openai.prompt || "";
  elements.deeplApiKey.value = settings.providers.deepl.apiKey || "";
  elements.deeplPlan.value = settings.providers.deepl.plan || "free";
  elements.googleApiKey.value = settings.providers.google.apiKey || "";
  elements.baiduAppId.value = settings.providers.baidu.appId || "";
  elements.baiduSecretKey.value = settings.providers.baidu.secretKey || "";

  showProviderPanel(settings.provider);
}

function applyUiLanguage(uiLanguage) {
  DtxI18n.apply(document, uiLanguage);
  DtxI18n.fillUiLanguages(elements.uiLanguage, uiLanguage, uiLanguage);
  DtxI18n.fillTranslationLanguages(elements.targetLang, uiLanguage, elements.targetLang.value || settings?.targetLang, false);
  DtxI18n.fillTranslationLanguages(elements.sourceLang, uiLanguage, elements.sourceLang.value || settings?.sourceLang, true);
}

function collectSettings() {
  return {
    enabled: elements.enabled.checked,
    uiLanguage: elements.uiLanguage.value,
    provider: elements.provider.value,
    targetLang: elements.targetLang.value,
    sourceLang: elements.sourceLang.value,
    displayMode: elements.displayMode.value,
    startupLimit: Number(elements.startupLimit.value),
    concurrency: Number(elements.concurrency.value),
    selfName: elements.selfName.value.trim(),
    translateOwn: elements.translateOwn.checked,
    cacheEnabled: elements.cacheEnabled.checked,
    providers: {
      openai: {
        apiKey: elements.openaiApiKey.value.trim(),
        model: elements.openaiModel.value.trim(),
        endpoint: elements.openaiEndpoint.value.trim(),
        prompt: elements.openaiPrompt.value.trim()
      },
      deepl: {
        apiKey: elements.deeplApiKey.value.trim(),
        plan: elements.deeplPlan.value
      },
      google: {
        apiKey: elements.googleApiKey.value.trim()
      },
      baidu: {
        appId: elements.baiduAppId.value.trim(),
        secretKey: elements.baiduSecretKey.value.trim()
      }
    }
  };
}

async function saveSettings() {
  setBusy(elements.save, true);
  setStatus("saving", "");
  try {
    const response = await sendMessage({
      type: "SAVE_SETTINGS",
      patch: collectSettings()
    });
    settings = response.settings;
    renderSettings();
    setStatus("saved", "");
  } catch (error) {
    setStatus(error.message, "error", true);
    throw error;
  } finally {
    setBusy(elements.save, false);
  }
}

async function resetSettings() {
  if (!window.confirm(DtxI18n.t(elements.uiLanguage.value, "resetConfirm"))) {
    return;
  }

  setStatus("resetting", "");
  const response = await sendMessage({ type: "RESET_SETTINGS" });
  settings = response.settings;
  renderSettings();
  setStatus("resetDone", "");
}

async function testTranslate() {
  setBusy(elements.testTranslate, true);
  elements.testResult.textContent = DtxI18n.t(elements.uiLanguage.value, "translating");
  try {
    await saveSettings();
    const response = await sendMessage({
      type: "TRANSLATE_TEXT",
      text: elements.testText.value,
      force: true
    });
    elements.testResult.textContent =
      response.translation || DtxI18n.t(elements.uiLanguage.value, "noTranslation");
  } catch (error) {
    elements.testResult.textContent = error.message;
  } finally {
    setBusy(elements.testTranslate, false);
  }
}

function showProviderPanel(provider) {
  document.querySelectorAll("[data-provider-panel]").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.providerPanel === provider);
  });
}

function setStatus(textOrKey, state, literal = false) {
  elements.saveStatus.textContent = literal ? textOrKey : DtxI18n.t(elements.uiLanguage.value, textOrKey);
  elements.saveStatus.classList.toggle("off", state === "off");
  elements.saveStatus.classList.toggle("error", state === "error");
}

function setBusy(button, busy) {
  button.disabled = busy;
  button.style.opacity = busy ? "0.72" : "";
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
