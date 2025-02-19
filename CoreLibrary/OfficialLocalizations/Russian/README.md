# Русификация `@yamato-daiwa/frontend`

## StaticPreviewAnywherePageTemplate — Шаблон страницы оглавления для этапа вёрстки

1. Импортируйте файл `StaticPreviewAnywherePageLocalization.russian.pug` директивой `include`.
   Это рекомендуется сделать в Pug-блоке `Requirements`.
2. В [JavaScript-блоке](https://pugjs.org/language/code.html) при вызове `StaticPreviewAnywherePage__YDF.configure({})` 
   укажите через свойству `localization` единственного параметра типа "объект" переменную 
  `staticPreviewAnywherePageLocalization__russian`:  

```pug
//- В Вашем случае, относительный путь к "node_modules" может отличаться 
extends ../../node_modules/@yamato-daiwa/frontend/PagesTemplates/StaticPreviewAnywherePageTemplate.pug


block append Requirements

   //- В Вашем случае, относительный путь к "node_modules" может отличаться
  include ../../node_modules/@yamato-daiwa/frontend-localization-russian/StaticPreviewAnywherePageLocalization.russian.pug
    

block append Metadata

  -

    StaticPreviewAnywherePage__YDF.configure({

      metadata: {
        locale: "ru",
        title: "Заголовок страницы"
      },

      localization: staticPreviewAnywherePageLocalization__russian,

    });
```


## Компоненты графического пользовательского интерфейса

Для того чтобы локализовать Pug-разметку конкретного компонента, необходимо в
   [JavaScript-блоке](https://pugjs.org/language/code.html) установить **объект локализации** полю `localization` у 
   класса этого компонента до того, как [Pug-примесь](https://pugjs.org/language/mixins.html) компонента будет 
   вызвана.
Имя **объекта русской локализации** подчиняется шаблону

```
[Имя компонента с маленькой буквы без вендорного постфикса]YDF_ComponentLocalization__russian
```

Например, в случае компонента `AttentionBox` это будет `attentionBoxYDF_ComponentLocalization__russian`, и таким образом,
  для русификации этого компонента потребуется нижеследующая строка кода.

```pug
- AttentionBox__YDF.localization = attentionBoxYDF_ComponentLocalization__russian;
```

| Pug-примесь компонента    | Имя JavaScript-класса | Имя объекта русской локализации                          |
|---------------------------|-----------------------|----------------------------------------------------------|
| AttentionBox--YDF         | `AttentionBox__YDF`   | `attentionBoxYDF_ComponentLocalization__russian`         |
