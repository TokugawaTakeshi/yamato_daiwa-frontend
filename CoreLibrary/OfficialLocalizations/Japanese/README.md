# `@yamato-daiwa/frontend`の日本語化

## StaticPreviewAnywherePage（静的プレビューの「どこでも」ページ）

バッジの本文の日本にするには、「`StaticPreviewAnywherePageLocalization.pug`」をインポートし、
`StaticPreviewAnywherePageLocalization__Japanese`変数を`StaticPreviewAnywherePage.setLocalization()`
の引数として渡して下さい。

```pug
extends node_modules/@yamato-daiwa/frontend/PagesTemplates/StaticPreviewAnywherePage.pug


block append Metadata
  
  include node_modules/@yamato-daiwa/frontend-localization-japanese/StaticPreviewAnywherePageLocalization.pug

    
  -
    
    HTML_PAGE_LANGUAGE = "ja";
    HTML_PAGE_TITLE = "@yamato-daiwa/frontend testing";
    StaticPreviewAnywherePage.setLocalization(StaticPreviewAnywherePageLocalization__Japanese)  
```


## コンポネント

具体的なコンポネントのPugマークアップを日本語化させるには、当コンポネントのクラスの`localization`フィールドに**日本語化オブジェクト**を割り当てなければいけない、
但しコンポネントの[Pug混入](https://pugjs.org/language/mixins.html)を利用する前に済ませなければいけない。
名コンフリクトの可能性を減らすには、コンポネントのクラス名は「__YDF」という**ベンダー語尾**があり、**日本語化オブジェクト**は下記の原型に従っている。

```
[コンポネント名（小文字から、ベンダー語尾無し）]YDF_ComponentLocalization__japanese
```

例えば、`AttentionBox`コンポネントの場合、

```pug
- AttentionBox__YDF.localization = attentionBoxYDF_ComponentLocalization__japanese;
```

となり、ここでハイフンは[Pug内のJavaScriptコード](https://pugjs.org/language/code.html)を意味する。


| コンポネントのPug混入の名前           | クラス名                        | 日本語化オブジェクト名                                               |
|---------------------------|-----------------------------|-----------------------------------------------------------|
| AttentionBox--YDF         | `AttentionBox__YDF`         | `attentionBoxYDF_ComponentLocalization__japanese`         |
| CodeViewer                | `CodeViewer__YDF`           | `codeViewerYDF_ComponentLocalization__japanese`           |
| CompoundControlShell--YDF | `CompoundControlShell__YDF` | `compoundControlShellYDF_ComponentLocalization__japanese` |
| FilesUploader--YDF        | `FilesUploader__YDF`        | `filesUploaderYDF_ComponentLocalization__japanese`        |
| HamburgerMenuButton--YDF  | `HamburgerMenuButton__YDF`  | `hamburgerMenuButtonLocalization__japanese`               |
| SingleImageViewer--YDF    | `SingleImageViewer__YDF`    | `singleImageViewerYDF_ComponentLocalization__japanese`    |
| QuestionAndAnswerBox--YDF | `QuestionAndAnswerBox__YDF` | `questionAndAnswerBoxYDF_ComponentLocalization__japanese` |
