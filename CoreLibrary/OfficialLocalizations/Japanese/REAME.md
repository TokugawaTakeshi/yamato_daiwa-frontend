# `@yamato-daiwa/frontend`の日本語化

## StaticPreviewAnywherePage（静的プレビューの「どこでも」ページ）

バッジの本文の日本にするには、「`StaticPreviewAnywherePageLocalization.pug`」をインポートし、
`StaticPreviewAnywherePageLocalization__Japanese`変数を`StaticPreviewAnywherePage.setLocalization()`
の引数として渡して下さい。

```jade
extends node_modules/@yamato-daiwa/frontend/PagesTemplates/StaticPreviewAnywherePage.pug


block append Metadata
  
  include node_modules/@yamato-daiwa/frontend-localization-japanese/StaticPreviewAnywherePageLocalization.pug

    
  -
    
    HTML_PAGE_LANGUAGE = "ja";
    HTML_PAGE_TITLE = "@yamato-daiwa/frontend testing";
    StaticPreviewAnywherePage.setLocalization(StaticPreviewAnywherePageLocalization__Japanese)  
```
