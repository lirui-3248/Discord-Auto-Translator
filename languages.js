(function attachLanguageCatalog(global) {
  const languageOrder = [
    "zh-CN",
    "zh-TW",
    "en",
    "en-GB",
    "ja",
    "ko",
    "fr",
    "de",
    "es",
    "pt",
    "pt-BR",
    "ru",
    "it",
    "nl",
    "ar",
    "vi",
    "th",
    "id",
    "hi",
    "pl",
    "tr",
    "uk",
    "el",
    "sv",
    "da",
    "fi",
    "cs",
    "ro",
    "hu",
    "ms",
    "he",
    "nb",
    "bg",
    "sk",
    "sl",
    "lt",
    "lv",
    "et",
    "fa",
    "ur",
    "bn",
    "fil"
  ];

  const languages = {
    "zh-CN": {
      label: "Simplified Chinese",
      nativeName: "简体中文",
      displayCode: "zh-Hans",
      deeplTarget: "ZH-HANS",
      deeplSource: "ZH",
      google: "zh-CN",
      baidu: "zh"
    },
    "zh-TW": {
      label: "Traditional Chinese",
      nativeName: "繁體中文",
      displayCode: "zh-Hant",
      deeplTarget: "ZH-HANT",
      deeplSource: "ZH",
      google: "zh-TW",
      baidu: "cht"
    },
    en: {
      label: "English",
      nativeName: "English",
      displayCode: "en",
      deeplTarget: "EN-US",
      deeplSource: "EN",
      google: "en",
      baidu: "en"
    },
    "en-GB": {
      label: "English (UK)",
      nativeName: "English (UK)",
      displayCode: "en-GB",
      deeplTarget: "EN-GB",
      deeplSource: "EN",
      google: "en-GB",
      baidu: "en"
    },
    ja: {
      label: "Japanese",
      nativeName: "日本語",
      displayCode: "ja",
      deeplTarget: "JA",
      deeplSource: "JA",
      google: "ja",
      baidu: "jp"
    },
    ko: {
      label: "Korean",
      nativeName: "한국어",
      displayCode: "ko",
      deeplTarget: "KO",
      deeplSource: "KO",
      google: "ko",
      baidu: "kor"
    },
    fr: {
      label: "French",
      nativeName: "Français",
      displayCode: "fr",
      deeplTarget: "FR",
      deeplSource: "FR",
      google: "fr",
      baidu: "fra"
    },
    de: {
      label: "German",
      nativeName: "Deutsch",
      displayCode: "de",
      deeplTarget: "DE",
      deeplSource: "DE",
      google: "de",
      baidu: "de"
    },
    es: {
      label: "Spanish",
      nativeName: "Español",
      displayCode: "es",
      deeplTarget: "ES",
      deeplSource: "ES",
      google: "es",
      baidu: "spa"
    },
    pt: {
      label: "Portuguese",
      nativeName: "Português",
      displayCode: "pt",
      deeplTarget: "PT-PT",
      deeplSource: "PT",
      google: "pt",
      baidu: "pt"
    },
    "pt-BR": {
      label: "Portuguese (Brazil)",
      nativeName: "Português (Brasil)",
      displayCode: "pt-BR",
      deeplTarget: "PT-BR",
      deeplSource: "PT",
      google: "pt-BR",
      baidu: "pt"
    },
    ru: {
      label: "Russian",
      nativeName: "Русский",
      displayCode: "ru",
      deeplTarget: "RU",
      deeplSource: "RU",
      google: "ru",
      baidu: "ru"
    },
    it: {
      label: "Italian",
      nativeName: "Italiano",
      displayCode: "it",
      deeplTarget: "IT",
      deeplSource: "IT",
      google: "it",
      baidu: "it"
    },
    nl: {
      label: "Dutch",
      nativeName: "Nederlands",
      displayCode: "nl",
      deeplTarget: "NL",
      deeplSource: "NL",
      google: "nl",
      baidu: "nl"
    },
    ar: {
      label: "Arabic",
      nativeName: "العربية",
      displayCode: "ar",
      deeplTarget: "AR",
      deeplSource: "AR",
      google: "ar",
      baidu: "ara"
    },
    vi: {
      label: "Vietnamese",
      nativeName: "Tiếng Việt",
      displayCode: "vi",
      deeplTarget: "VI",
      deeplSource: "VI",
      google: "vi",
      baidu: "vie"
    },
    th: {
      label: "Thai",
      nativeName: "ไทย",
      displayCode: "th",
      deeplTarget: "TH",
      deeplSource: "TH",
      google: "th",
      baidu: "th"
    },
    id: {
      label: "Indonesian",
      nativeName: "Bahasa Indonesia",
      displayCode: "id",
      deeplTarget: "ID",
      deeplSource: "ID",
      google: "id",
      baidu: "id"
    },
    hi: {
      label: "Hindi",
      nativeName: "हिन्दी",
      displayCode: "hi",
      deeplTarget: "HI",
      deeplSource: "HI",
      google: "hi",
      baidu: "hi"
    },
    pl: {
      label: "Polish",
      nativeName: "Polski",
      displayCode: "pl",
      deeplTarget: "PL",
      deeplSource: "PL",
      google: "pl",
      baidu: "pl"
    },
    tr: {
      label: "Turkish",
      nativeName: "Türkçe",
      displayCode: "tr",
      deeplTarget: "TR",
      deeplSource: "TR",
      google: "tr",
      baidu: "tr"
    },
    uk: {
      label: "Ukrainian",
      nativeName: "Українська",
      displayCode: "uk",
      deeplTarget: "UK",
      deeplSource: "UK",
      google: "uk",
      baidu: "ukr"
    },
    el: {
      label: "Greek",
      nativeName: "Ελληνικά",
      displayCode: "el",
      deeplTarget: "EL",
      deeplSource: "EL",
      google: "el",
      baidu: "el"
    },
    sv: {
      label: "Swedish",
      nativeName: "Svenska",
      displayCode: "sv",
      deeplTarget: "SV",
      deeplSource: "SV",
      google: "sv",
      baidu: "swe"
    },
    da: {
      label: "Danish",
      nativeName: "Dansk",
      displayCode: "da",
      deeplTarget: "DA",
      deeplSource: "DA",
      google: "da",
      baidu: "dan"
    },
    fi: {
      label: "Finnish",
      nativeName: "Suomi",
      displayCode: "fi",
      deeplTarget: "FI",
      deeplSource: "FI",
      google: "fi",
      baidu: "fin"
    },
    cs: {
      label: "Czech",
      nativeName: "Čeština",
      displayCode: "cs",
      deeplTarget: "CS",
      deeplSource: "CS",
      google: "cs",
      baidu: "cs"
    },
    ro: {
      label: "Romanian",
      nativeName: "Română",
      displayCode: "ro",
      deeplTarget: "RO",
      deeplSource: "RO",
      google: "ro",
      baidu: "rom"
    },
    hu: {
      label: "Hungarian",
      nativeName: "Magyar",
      displayCode: "hu",
      deeplTarget: "HU",
      deeplSource: "HU",
      google: "hu",
      baidu: "hu"
    },
    ms: {
      label: "Malay",
      nativeName: "Bahasa Melayu",
      displayCode: "ms",
      google: "ms",
      baidu: "may"
    },
    he: {
      label: "Hebrew",
      nativeName: "עברית",
      displayCode: "he",
      google: "he",
      baidu: "heb"
    },
    nb: {
      label: "Norwegian Bokmal",
      nativeName: "Norsk bokmål",
      displayCode: "nb",
      deeplTarget: "NB",
      deeplSource: "NB",
      google: "no",
      baidu: "nor"
    },
    bg: {
      label: "Bulgarian",
      nativeName: "Български",
      displayCode: "bg",
      deeplTarget: "BG",
      deeplSource: "BG",
      google: "bg",
      baidu: "bul"
    },
    sk: {
      label: "Slovak",
      nativeName: "Slovenčina",
      displayCode: "sk",
      deeplTarget: "SK",
      deeplSource: "SK",
      google: "sk",
      baidu: "sk"
    },
    sl: {
      label: "Slovenian",
      nativeName: "Slovenščina",
      displayCode: "sl",
      deeplTarget: "SL",
      deeplSource: "SL",
      google: "sl",
      baidu: "slo"
    },
    lt: {
      label: "Lithuanian",
      nativeName: "Lietuvių",
      displayCode: "lt",
      deeplTarget: "LT",
      deeplSource: "LT",
      google: "lt",
      baidu: "lit"
    },
    lv: {
      label: "Latvian",
      nativeName: "Latviešu",
      displayCode: "lv",
      deeplTarget: "LV",
      deeplSource: "LV",
      google: "lv",
      baidu: "lav"
    },
    et: {
      label: "Estonian",
      nativeName: "Eesti",
      displayCode: "et",
      deeplTarget: "ET",
      deeplSource: "ET",
      google: "et",
      baidu: "est"
    },
    fa: {
      label: "Persian",
      nativeName: "فارسی",
      displayCode: "fa",
      google: "fa",
      baidu: "per"
    },
    ur: {
      label: "Urdu",
      nativeName: "اردو",
      displayCode: "ur",
      google: "ur",
      baidu: "urd"
    },
    bn: {
      label: "Bengali",
      nativeName: "বাংলা",
      displayCode: "bn",
      google: "bn",
      baidu: "ben"
    },
    fil: {
      label: "Filipino",
      nativeName: "Filipino",
      displayCode: "fil",
      google: "fil",
      baidu: "fil"
    }
  };

  const uiLanguages = [
    { value: "auto", label: "Auto" },
    { value: "en", label: "English" },
    { value: "zh-CN", label: "简体中文" },
    { value: "zh-TW", label: "繁體中文" },
    { value: "ja", label: "日本語" },
    { value: "fr", label: "Français" },
    { value: "de", label: "Deutsch" },
    { value: "es", label: "Español" },
    { value: "ko", label: "한국어" }
  ];

  function getLanguage(code) {
    return languages[code] || {
      label: code,
      nativeName: code,
      displayCode: code,
      deeplTarget: code.toUpperCase(),
      deeplSource: code.toUpperCase(),
      google: code,
      baidu: code
    };
  }

  function getProviderLang(code, field) {
    const language = getLanguage(code);
    if (language[field]) {
      return language[field];
    }
    if (field === "google" || field === "baidu") {
      return code;
    }
    return code.toUpperCase();
  }

  global.DtxLanguages = {
    languages,
    languageOrder,
    uiLanguages,
    getLanguage,
    getProviderLang
  };
})(globalThis);
