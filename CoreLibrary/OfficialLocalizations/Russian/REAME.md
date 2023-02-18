# Русификация `@yamato-daiwa/frontend`

## StaticPreviewAnywherePage（Индексная страница этапа вёрстки）

Для того, чтобы изменить текст значков перед называнием страницы, в файле, являющиеся индексной страницей этапа вёрстки,

1. Импортируйте файл `StaticPreviewAnywherePageLocalization.pug` командой `include`
2. В JavaScript-блоке вызовите `StaticPreviewAnywherePage.setLocalization()` с параметром  
   `StaticPreviewAnywherePageLocalization__Russian` 

```jade
extends node_modules/@yamato-daiwa/frontend/PagesTemplates/StaticPreviewAnywherePage.pug


block append Metadata
  
  include node_modules/@yamato-daiwa/frontend-localization-russian/StaticPreviewAnywherePageLocalization.pug

    
  -
    
    HTML_PAGE_LANGUAGE = "ru";
    HTML_PAGE_TITLE = "@yamato-daiwa/frontend testing";
    StaticPreviewAnywherePage.setLocalization(StaticPreviewAnywherePageLocalization__Russian)  
```
