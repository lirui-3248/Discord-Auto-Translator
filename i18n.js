(function attachI18n(global) {
  const dictionaries = {
    en: {
      extName: "Discord Translator",
      settingsSubtitle: "API and language settings",
      popupChecking: "Checking current page",
      popupDiscordReady: "Discord channel is ready",
      popupOpenDiscord: "Open a Discord channel to use",
      on: "ON",
      off: "OFF",
      autoTranslate: "Auto translate",
      provider: "Translation service",
      targetLang: "Target language",
      sourceLang: "Source language",
      displayMode: "Display mode",
      uiLanguage: "Interface language",
      openOptions: "API settings",
      clearCache: "Clear temporary cache",
      cacheCleared: "Cache cleared",
      general: "General",
      api: "API",
      test: "Test",
      startupLimit: "Messages to process on channel open",
      concurrency: "Concurrent requests",
      selfName: "My Discord name",
      selfNamePlaceholder: "Optional",
      translateOwn: "Translate my own messages",
      cacheEnabled: "Cache identical text temporarily",
      openaiApiKey: "OpenAI API Key",
      model: "Model",
      endpoint: "Endpoint",
      openaiPrompt: "Extra translation instructions",
      openaiPromptPlaceholder: "Example: keep game terms and do not translate code",
      deeplAuthKey: "DeepL Auth Key",
      accountType: "Account type",
      googleApiKey: "Google Cloud Translation API Key",
      baiduAppId: "Baidu APP ID",
      baiduSecretKey: "Baidu Secret Key",
      save: "Save",
      reset: "Reset defaults",
      testText: "Test text",
      testTranslate: "Test translation",
      unsaved: "Unsaved",
      loaded: "Loaded",
      saving: "Saving",
      saved: "Saved",
      resetting: "Resetting",
      resetDone: "Reset",
      resetConfirm: "Reset defaults? API keys will also be cleared.",
      translating: "Translating...",
      noTranslation: "No translation returned.",
      inline: "Under original",
      compact: "Collapsible",
      replace: "Replace original",
      autoDetect: "Auto detect",
      translatedBy: "Translated",
      failed: "Failed",
      compactSummary: "Translation",
      providerOpenai: "OpenAI",
      providerDeepl: "DeepL",
      providerGoogle: "Google Translate",
      providerBaidu: "Baidu Translate"
    },
    "zh-CN": {
      settingsSubtitle: "API 与语言设置",
      popupChecking: "检测当前页面",
      popupDiscordReady: "Discord 频道已就绪",
      popupOpenDiscord: "打开 Discord 频道后生效",
      on: "开启",
      off: "关闭",
      autoTranslate: "自动翻译",
      provider: "翻译服务",
      targetLang: "目标语言",
      sourceLang: "原文语言",
      displayMode: "显示方式",
      uiLanguage: "界面语言",
      openOptions: "设置 API",
      clearCache: "清空临时缓存",
      cacheCleared: "已清空",
      general: "常规",
      api: "API",
      test: "测试",
      startupLimit: "进入频道时处理条数",
      concurrency: "并发请求",
      selfName: "我的 Discord 名称",
      selfNamePlaceholder: "可留空",
      translateOwn: "翻译自己发送的消息",
      cacheEnabled: "临时缓存相同文本",
      openaiPrompt: "额外翻译要求",
      openaiPromptPlaceholder: "例如：保留游戏术语，不翻译代码",
      accountType: "账号类型",
      baiduAppId: "百度 APP ID",
      baiduSecretKey: "百度密钥",
      save: "保存",
      reset: "恢复默认",
      testText: "测试文本",
      testTranslate: "测试翻译",
      unsaved: "未保存",
      loaded: "已加载",
      saving: "保存中",
      saved: "已保存",
      resetting: "重置中",
      resetDone: "已重置",
      resetConfirm: "恢复默认设置？API Key 也会清空。",
      translating: "翻译中...",
      noTranslation: "没有返回译文。",
      inline: "原文下方",
      compact: "折叠译文",
      replace: "替换原文",
      autoDetect: "自动检测",
      translatedBy: "译文",
      failed: "失败",
      compactSummary: "译文",
      providerBaidu: "百度翻译"
    },
    "zh-TW": {
      settingsSubtitle: "API 與語言設定",
      popupChecking: "正在檢查目前頁面",
      popupDiscordReady: "Discord 頻道已就緒",
      popupOpenDiscord: "開啟 Discord 頻道後生效",
      on: "開啟",
      off: "關閉",
      autoTranslate: "自動翻譯",
      provider: "翻譯服務",
      targetLang: "目標語言",
      sourceLang: "原文語言",
      displayMode: "顯示方式",
      uiLanguage: "介面語言",
      openOptions: "設定 API",
      clearCache: "清除暫存",
      cacheCleared: "已清除",
      general: "一般",
      test: "測試",
      startupLimit: "進入頻道時處理則數",
      concurrency: "並行請求",
      selfName: "我的 Discord 名稱",
      selfNamePlaceholder: "可留空",
      translateOwn: "翻譯自己傳送的訊息",
      cacheEnabled: "暫存相同文字",
      openaiPrompt: "額外翻譯要求",
      openaiPromptPlaceholder: "例如：保留遊戲術語，不翻譯程式碼",
      accountType: "帳號類型",
      baiduAppId: "百度 APP ID",
      baiduSecretKey: "百度密鑰",
      save: "儲存",
      reset: "恢復預設",
      testText: "測試文字",
      testTranslate: "測試翻譯",
      unsaved: "未儲存",
      loaded: "已載入",
      saving: "儲存中",
      saved: "已儲存",
      resetting: "重設中",
      resetDone: "已重設",
      resetConfirm: "恢復預設設定？API Key 也會清除。",
      translating: "翻譯中...",
      noTranslation: "沒有返回譯文。",
      inline: "原文下方",
      compact: "摺疊譯文",
      replace: "取代原文",
      autoDetect: "自動偵測",
      translatedBy: "譯文",
      failed: "失敗",
      compactSummary: "譯文",
      providerBaidu: "百度翻譯"
    },
    ja: {
      settingsSubtitle: "API と言語設定",
      popupChecking: "現在のページを確認中",
      popupDiscordReady: "Discord チャンネルで有効",
      popupOpenDiscord: "Discord チャンネルで使用できます",
      on: "ON",
      off: "OFF",
      autoTranslate: "自動翻訳",
      provider: "翻訳サービス",
      targetLang: "翻訳先言語",
      sourceLang: "原文の言語",
      displayMode: "表示方法",
      uiLanguage: "表示言語",
      openOptions: "API 設定",
      clearCache: "一時キャッシュを削除",
      cacheCleared: "削除しました",
      general: "一般",
      test: "テスト",
      startupLimit: "チャンネル表示時に処理する件数",
      concurrency: "同時リクエスト",
      selfName: "自分の Discord 名",
      selfNamePlaceholder: "任意",
      translateOwn: "自分のメッセージも翻訳",
      cacheEnabled: "同じ文を一時キャッシュ",
      openaiPrompt: "追加の翻訳指示",
      openaiPromptPlaceholder: "例：ゲーム用語を保持し、コードは翻訳しない",
      accountType: "アカウント種別",
      baiduAppId: "Baidu APP ID",
      baiduSecretKey: "Baidu Secret Key",
      save: "保存",
      reset: "初期設定に戻す",
      testText: "テスト文",
      testTranslate: "翻訳をテスト",
      unsaved: "未保存",
      loaded: "読み込み済み",
      saving: "保存中",
      saved: "保存済み",
      resetting: "リセット中",
      resetDone: "リセット済み",
      resetConfirm: "初期設定に戻しますか？API Key も削除されます。",
      translating: "翻訳中...",
      noTranslation: "翻訳結果がありません。",
      inline: "原文の下",
      compact: "折りたたみ",
      replace: "原文を置換",
      autoDetect: "自動検出",
      translatedBy: "翻訳",
      failed: "失敗",
      compactSummary: "翻訳",
      providerBaidu: "Baidu 翻訳"
    },
    fr: {
      settingsSubtitle: "API et langues",
      popupChecking: "Verification de la page",
      popupDiscordReady: "Salon Discord pret",
      popupOpenDiscord: "Ouvrez un salon Discord",
      on: "ON",
      off: "OFF",
      autoTranslate: "Traduction auto",
      provider: "Service de traduction",
      targetLang: "Langue cible",
      sourceLang: "Langue source",
      displayMode: "Affichage",
      uiLanguage: "Langue de l'interface",
      openOptions: "Parametres API",
      clearCache: "Vider le cache temporaire",
      cacheCleared: "Cache vide",
      general: "General",
      test: "Test",
      startupLimit: "Messages traites a l'ouverture",
      concurrency: "Requetes simultanees",
      selfName: "Mon nom Discord",
      selfNamePlaceholder: "Optionnel",
      translateOwn: "Traduire mes messages",
      cacheEnabled: "Mettre en cache les textes identiques",
      openaiPrompt: "Instructions supplementaires",
      openaiPromptPlaceholder: "Exemple : conserver les termes de jeu et le code",
      accountType: "Type de compte",
      save: "Enregistrer",
      reset: "Valeurs par defaut",
      testText: "Texte de test",
      testTranslate: "Tester la traduction",
      unsaved: "Non enregistre",
      loaded: "Charge",
      saving: "Enregistrement",
      saved: "Enregistre",
      resetting: "Reinitialisation",
      resetDone: "Reinitialise",
      resetConfirm: "Restaurer les valeurs par defaut ? Les cles API seront effacees.",
      translating: "Traduction...",
      noTranslation: "Aucune traduction recue.",
      inline: "Sous l'original",
      compact: "Repliable",
      replace: "Remplacer l'original",
      autoDetect: "Detection auto",
      translatedBy: "Traduction",
      failed: "Echec",
      compactSummary: "Traduction"
    },
    de: {
      settingsSubtitle: "API- und Spracheinstellungen",
      popupChecking: "Aktuelle Seite wird geprueft",
      popupDiscordReady: "Discord-Kanal ist bereit",
      popupOpenDiscord: "Oeffne einen Discord-Kanal",
      autoTranslate: "Automatisch uebersetzen",
      provider: "Uebersetzungsdienst",
      targetLang: "Zielsprache",
      sourceLang: "Ausgangssprache",
      displayMode: "Anzeige",
      uiLanguage: "Oberflaechensprache",
      openOptions: "API-Einstellungen",
      clearCache: "Zwischencache leeren",
      cacheCleared: "Cache geleert",
      general: "Allgemein",
      test: "Test",
      startupLimit: "Nachrichten beim Oeffnen",
      concurrency: "Parallele Anfragen",
      selfName: "Mein Discord-Name",
      selfNamePlaceholder: "Optional",
      translateOwn: "Eigene Nachrichten uebersetzen",
      cacheEnabled: "Gleiche Texte zwischenspeichern",
      openaiPrompt: "Zusaetzliche Anweisungen",
      accountType: "Kontotyp",
      save: "Speichern",
      reset: "Zuruecksetzen",
      testText: "Testtext",
      testTranslate: "Uebersetzung testen",
      unsaved: "Ungespeichert",
      loaded: "Geladen",
      saving: "Speichern",
      saved: "Gespeichert",
      resetConfirm: "Standards wiederherstellen? API Keys werden geloescht.",
      translating: "Uebersetzen...",
      noTranslation: "Keine Uebersetzung erhalten.",
      inline: "Unter Original",
      compact: "Einklappbar",
      replace: "Original ersetzen",
      autoDetect: "Automatisch erkennen",
      translatedBy: "Uebersetzt",
      failed: "Fehlgeschlagen",
      compactSummary: "Uebersetzung"
    },
    es: {
      settingsSubtitle: "API e idiomas",
      popupChecking: "Comprobando la pagina",
      popupDiscordReady: "Canal de Discord listo",
      popupOpenDiscord: "Abre un canal de Discord",
      autoTranslate: "Traducir automaticamente",
      provider: "Servicio de traduccion",
      targetLang: "Idioma destino",
      sourceLang: "Idioma original",
      displayMode: "Modo de visualizacion",
      uiLanguage: "Idioma de la interfaz",
      openOptions: "Ajustes de API",
      clearCache: "Borrar cache temporal",
      cacheCleared: "Cache borrada",
      general: "General",
      test: "Prueba",
      startupLimit: "Mensajes al abrir canal",
      concurrency: "Solicitudes simultaneas",
      selfName: "Mi nombre de Discord",
      selfNamePlaceholder: "Opcional",
      translateOwn: "Traducir mis mensajes",
      cacheEnabled: "Guardar textos iguales en cache",
      openaiPrompt: "Instrucciones adicionales",
      accountType: "Tipo de cuenta",
      save: "Guardar",
      reset: "Restablecer",
      testText: "Texto de prueba",
      testTranslate: "Probar traduccion",
      unsaved: "Sin guardar",
      loaded: "Cargado",
      saving: "Guardando",
      saved: "Guardado",
      resetConfirm: "Restablecer valores? Tambien se borraran las API Keys.",
      translating: "Traduciendo...",
      noTranslation: "No se recibio traduccion.",
      inline: "Debajo del original",
      compact: "Plegable",
      replace: "Reemplazar original",
      autoDetect: "Detectar automaticamente",
      translatedBy: "Traduccion",
      failed: "Error",
      compactSummary: "Traduccion"
    },
    ko: {
      settingsSubtitle: "API 및 언어 설정",
      popupChecking: "현재 페이지 확인 중",
      popupDiscordReady: "Discord 채널 준비됨",
      popupOpenDiscord: "Discord 채널에서 사용",
      autoTranslate: "자동 번역",
      provider: "번역 서비스",
      targetLang: "대상 언어",
      sourceLang: "원문 언어",
      displayMode: "표시 방식",
      uiLanguage: "인터페이스 언어",
      openOptions: "API 설정",
      clearCache: "임시 캐시 지우기",
      cacheCleared: "캐시 지움",
      general: "일반",
      test: "테스트",
      startupLimit: "채널 열 때 처리할 메시지 수",
      concurrency: "동시 요청",
      selfName: "내 Discord 이름",
      selfNamePlaceholder: "선택 사항",
      translateOwn: "내 메시지 번역",
      cacheEnabled: "같은 텍스트 임시 캐시",
      openaiPrompt: "추가 번역 지시",
      accountType: "계정 유형",
      save: "저장",
      reset: "기본값 복원",
      testText: "테스트 텍스트",
      testTranslate: "번역 테스트",
      unsaved: "저장 안 됨",
      loaded: "로드됨",
      saving: "저장 중",
      saved: "저장됨",
      resetConfirm: "기본값으로 복원할까요? API Key도 삭제됩니다.",
      translating: "번역 중...",
      noTranslation: "번역 결과가 없습니다.",
      inline: "원문 아래",
      compact: "접기",
      replace: "원문 교체",
      autoDetect: "자동 감지",
      translatedBy: "번역",
      failed: "실패",
      compactSummary: "번역"
    }
  };

  const fallback = dictionaries.en;

  function resolveLanguage(value) {
    const raw = value && value !== "auto" ? value : getBrowserLanguage();
    if (/^zh-(tw|hk|mo|hant)/i.test(raw)) {
      return "zh-TW";
    }
    if (/^zh/i.test(raw)) {
      return "zh-CN";
    }
    const short = String(raw || "en").slice(0, 2).toLowerCase();
    if (dictionaries[raw]) {
      return raw;
    }
    return dictionaries[short] ? short : "en";
  }

  function getBrowserLanguage() {
    try {
      return chrome?.i18n?.getUILanguage?.() || navigator.language || "en";
    } catch {
      return navigator.language || "en";
    }
  }

  function t(language, key) {
    const resolved = resolveLanguage(language);
    return dictionaries[resolved]?.[key] || fallback[key] || key;
  }

  function apply(root, language) {
    root.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(language, node.dataset.i18n);
    });
    root.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
      node.setAttribute("placeholder", t(language, node.dataset.i18nPlaceholder));
    });
    root.querySelectorAll("[data-i18n-aria]").forEach((node) => {
      node.setAttribute("aria-label", t(language, node.dataset.i18nAria));
    });
    root.documentElement?.setAttribute("lang", resolveLanguage(language));
  }

  function fillUiLanguages(select, language, selectedValue) {
    select.replaceChildren(
      ...global.DtxLanguages.uiLanguages.map(({ value, label }) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value === "auto" ? `${t(language, "autoDetect")} (${label})` : label;
        option.selected = selectedValue === value;
        return option;
      })
    );
  }

  function fillTranslationLanguages(select, language, selectedValue, includeAuto) {
    const entries = global.DtxLanguages.languageOrder.map((code) => [code, getLanguageLabel(code, language)]);
    const options = includeAuto ? [["auto", t(language, "autoDetect")], ...entries] : entries;
    select.replaceChildren(
      ...options.map(([value, label]) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = label;
        option.selected = selectedValue === value;
        return option;
      })
    );
  }

  function getLanguageLabel(code, language) {
    const info = global.DtxLanguages.getLanguage(code);
    const locale = resolveLanguage(language);
    const displayCode = info.displayCode || code;
    let localized = info.label;
    try {
      localized = new Intl.DisplayNames([locale], { type: "language" }).of(displayCode) || localized;
    } catch {
      localized = info.label;
    }
    return `${localized} · ${info.nativeName || info.label}`;
  }

  global.DtxI18n = {
    apply,
    fillTranslationLanguages,
    fillUiLanguages,
    resolveLanguage,
    t
  };
})(globalThis);
