# Русификация `@yamato-daiwa/frontend`

## StaticPreviewAnywherePage（Индексная страница этапа вёрстки）

Для того, чтобы изменить текст значков перед называнием страницы, в файле, являющиеся индексной страницей этапа вёрстки,

1. Импортируйте файл `StaticPreviewAnywherePageLocalization.pug` командой `include`
2. В JavaScript-блоке вызовите `StaticPreviewAnywherePage.setLocalization()` с параметром  
   `StaticPreviewAnywherePageLocalization__Russian` 

```pug
extends node_modules/@yamato-daiwa/frontend/PagesTemplates/StaticPreviewAnywherePage.pug


block append Metadata
  
  include node_modules/@yamato-daiwa/frontend-localization-russian/StaticPreviewAnywherePageLocalization.pug

    
  -
    
    HTML_PAGE_LANGUAGE = "ru";
    HTML_PAGE_TITLE = "@yamato-daiwa/frontend testing";
    StaticPreviewAnywherePage.setLocalization(StaticPreviewAnywherePageLocalization__Russian)  
```


## Компоненты

Для того, чтобы локализовать Pug-разметку конкретного компонента, необходимо установить **объект локализации**
полю `localization` у класса этого компонента до того, как [Pug-примесь](https://pugjs.org/language/mixins.html) компонента
будет вызвана.
Для снижения вероятности конфликта имён, класс компонента имеет **вендорный постфикс** "__YDF", а имя
**объекта русской локализации** подчиняется шаблону

```
[Имя компонента с маленькой буквы без вендорного постфикса]YDF_ComponentLocalization__russian
```

Например, в случае компонента `AttentionBox` это будет:

```pug
- AttentionBox__YDF.localization = attentionBoxYDF_ComponentLocalization__russian;
```

Здесь дефис означает [начало внутреннего по отношению к Pug JavaScript-кода](https://pugjs.org/language/code.html).


| Pug-примесь компонента    | Имя класса                  | Имя объекта русской локализации                          |
|---------------------------|-----------------------------|----------------------------------------------------------|
| AttentionBox--YDF         | `AttentionBox__YDF`         | `attentionBoxYDF_ComponentLocalization__russian`         |
| CodeViewer--YDF           | `CodeViewer__YDF`           | `codeViewerYDF_ComponentLocalization__russian`           |
| CompoundControlShell--YDF | `CompoundControlShell__YDF` | `compoundControlShellYDF_ComponentLocalization__russian` |
| FilesUploader--YDF        | `FilesUploader__YDF`        | `filesUploaderYDF_ComponentLocalization__russian`        |
| HamburgerMenuButton--YDF  | `HamburgerMenuButton__YDF`  | `hamburgerMenuButtonLocalization__russian`               |
| SingleImageViewer--YDF    | `SingleImageViewer__YDF`    | `singleImageViewerYDF_ComponentLocalization__russian`    |
| QuestionAndAnswerBox--YDF | `QuestionAndAnswerBox__YDF` | `questionAndAnswerBoxYDF_ComponentLocalization__russian` |
