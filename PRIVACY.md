# Privacy Policy Draft

Discord Auto Translator reads visible message text from Discord Web pages so it can translate those messages for the user.

## Data Processed

- Visible Discord message text.
- User-selected target/source language settings.
- User-provided translation provider credentials.

## Data Sharing

Message text is sent only to the translation provider selected by the user: OpenAI, DeepL, Google Cloud Translation, or Baidu Translate. The extension does not sell data and does not send data to any developer-owned server.

## Storage

Settings and API credentials are stored locally with `chrome.storage.local`. The extension uses an in-memory temporary translation cache to reduce repeated requests. The cache is cleared when the extension service worker is restarted or when the user clears it from the popup.

## Discord Access

The extension reads text that is already visible in the Discord Web page. It does not access Discord tokens, does not call Discord private APIs, and does not automate a Discord account.

Review this draft before publishing and adapt it to your store listing, company identity, and legal requirements.
