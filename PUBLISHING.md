# Chrome Web Store Publishing Checklist

## Package

- `manifest.json` is at the ZIP root.
- `default_locale` is set because `_locales/` is included.
- 16, 32, 48, and 128 px icons are included in `icons/`.
- Permissions are limited to `storage`, `activeTab`, Discord Web, and translation API hosts.
- No API keys or private credentials are bundled.

## Store Listing

- Starter store assets are in `store-assets/`:
  - `promo-440x280.png`
  - `screenshot-options-1280x800.png`
- Use the privacy policy text in `PRIVACY.md` as a starting point.
- Explain that users must bring their own translation provider API key.
- Disclose that visible message text is sent to the selected translation provider.

## Local Test Before Upload

1. Load the folder from `chrome://extensions/`.
2. Open the options page.
3. Switch interface language.
4. Configure a provider and run Test translation.
5. Open a Discord channel and verify new messages are translated.
6. Check that turning Auto translate off stops new translations.
