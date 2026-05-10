# Discord Auto Translator

Chrome Manifest V3 extension for Discord Web. It translates visible Discord messages with OpenAI, DeepL, Google Cloud Translation, or Baidu Translate.

## Features

- Discord Web only: `discord.com/channels/*`, Canary, and PTB.
- Translation providers: OpenAI, DeepL, Google Cloud Translation, Baidu Translate.
- Common target/source languages: Chinese, English, Japanese, Korean, French, German, Spanish, Portuguese, Russian, Italian, Dutch, Arabic, Vietnamese, Thai, Indonesian, Hindi, Polish, Turkish, Ukrainian, Greek, Swedish, Danish, Finnish, Czech, Romanian, Hungarian, Malay, Hebrew, Norwegian, Bulgarian, Slovak, Slovenian, Lithuanian, Latvian, Estonian, Persian, Urdu, Bengali, Filipino.
- Interface languages: Auto, English, Simplified Chinese, Traditional Chinese, Japanese, French, German, Spanish, Korean.
- Display modes: under original, collapsible translation, replace original.
- Temporary in-memory cache and request concurrency control.
- No bundled API keys and no Discord private API calls.

## Install Locally

1. Open `chrome://extensions/`.
2. Enable Developer mode.
3. Click Load unpacked.
4. Select this folder: `c:\Users\DELL\Desktop\discord`.
5. Open extension options and configure at least one translation provider.
6. Open a Discord channel and start receiving translated messages.

## API Setup

- OpenAI: enter an API key. The default endpoint is `https://api.openai.com/v1/responses`.
- DeepL: enter an Auth Key and choose Free or Pro.
- Google: enter a Cloud Translation Basic API key and enable the Cloud Translation API in your Google Cloud project.
- Baidu: enter the Baidu Translate APP ID and Secret Key.

## Publish Build

Use the generated release ZIP in `dist/` when available, or zip the extension root contents yourself. The ZIP root must contain `manifest.json` directly, not a parent folder.

Do not include personal API keys in the package. Users configure their own keys from the options page.

Chrome Web Store listing starter images are in `store-assets/`. They are uploaded separately and are not needed inside the extension ZIP.

## Privacy

The extension reads only visible Discord Web message text on pages where it is installed. Message text is sent to the translation provider selected by the user. API credentials are stored in `chrome.storage.local` on the user's machine.
