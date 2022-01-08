# `RegularWebPage`

The Pug file including pre-filled required HTML tags thus will be compiled to valid HTML5 document even if just to inherit it.

* Intended to be extended (`extend` keyword) by page files and layout files.
* Including a part (currently) of Pug functionality of `@yamato-daiwa/es-extensions` 
  (see [Available `@yamato-daiwa/es-extensions` functionality](#available-yamato-daiwaes-extensions-functionality)).

Just

```pug
// In your project, relative path to "node_modules" could be different 
extends node_modules/@yamato-daiwa/frontend/PagesTemplates/RegularWebPage.pug
```

will be compiled to

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <title>Untitled</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
</head>

<body></body>

</html>
```

which is the valid HTML5 document.


## Quick start

* If you want to start to fill your HTML page with visible content, write the markup in `PageContent` block.
* If you need to link some styles and scripts, specify the paths as array elements of `styleSheetsURIs` and `scriptsURIs.endOfBody`.


```pug
// TODO Correct the relative path to "node_modules" 
extends RELATIVE/PATH/TO/node_modules/hikari-frontend/PagesTemplates/RegularWebPage.pug


block append Metadata

  -
    styleSheetsURIs = [ "./Styles.css" ]
    scriptsURIs.endOfBody = [ "./Main.js" ]


block append PageContent

  h1 Heading
  
  p Paragraph
```


## Customization
### HTML head

Below part is pre-defined and could not be customized.

```pug
meta(charset="utf-8")
meta(name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no")
```

All other contents of `head` tag could be customized.


#### Language

The HTML validation requires `lang` attribute of `html` tag be specified, so the `en` value is pre-defined.
If your page's language is not English, redefine the `HTML_PAGE_LANGUAGE` variable in `Metadata` block:

```pug
block append Metadata

- HTML_PAGE_LANGUAGE = "ja"
```

#### Title

The HTML validation requires `title` attribute be specified, so it has been pre-filled with `Untitled`.
To change it, redefine `HTML_PAGE_TITLE` variable in `Metadata` block:

```pug
block append Metadata

  - HTML_PAGE_TITLE = "Top page"
```

#### Description, keywords, author

Because these tags are not required, they will not be outputted to HTML file until you will not specify the properties
of `HTML_PageMetaData`.

```typescript
type HTML_PageMetaData = {
  description?: string;
  keywords?: string;
  author?: string;
}
```

```pug
block append Metadata

  - 
    HTML_PAGE_TITLE = "Top page"
    HTML_PageMetaData = {
      description: "This is an example of a meta description. This will often show up in search results.",
      keywords: "example, sample",
      author: "Takeshi Tokugawa"
    }
```

#### Favicon

Define `FAVICON_URI` variable to be filled of dedicated `link` tags.

```
block append Metadata

  -
  
    HTML_PAGE_TITLE = "Top page"
    FAVICON_URI = "favicon.ico"
```

#### Link to AMP version

If your page has AMP version, define `PAGE_AMP_VERSION_URI` variable to be added of dedicated `link` tag.


### Adding of external styles and scripts

* Define the `styleSheetsURIs` variable with array of URIs of stylesheets to be added of dedicated `link` tags.
* Define the `scriptsURIs.endOfHead` variable with array of URIs to be added of dedicated `script` tags to the end of
  the head, and `scriptsURIs.endOfBody` - to be added of dedicated `script` tags in the end of the body.
  (If you don't know which is better - google it first because it is the must-knows of the frontend development).
* If you want to add the stylesheet(s) manually to the end of the body, append them (by `block append`) to block `StylesLinks`.
* If you want to add the script(s) manually to the end of the head or body, append them to blocks `HeadScriptsLinks`
  or `EndBodyScriptsLinks` respectively.

  
### Filling the page by target content

If you are ready to fill the page by target markup, append it to `PageContent` block:

```pug
block append PageContent

  h1 Target content
```

There is `EndBodyContent` block also been prepared - it going after `PageContent` but before `EndBodyScriptsLinks`.


## Pre-defined blocks
### `Metadata`

* Intended to be filled with redefining of variables responsible for `head` part of the HTML page like `HTML_PAGE_LANGUAGE`
or `HTML_PAGE_TITLE`.
* Do not intended to be appended any markup because it will be rendered outside of `html` tag.

### `Data`

* Intended to be included some JavaScript with data (actual or mock).
* Do not intended to be appended any markup because it will be rendered outside of `html` tag.


### `Requirements`

* Intended to be included of other Pug files **containing only mixins and/or JavaScript code**.
* Do not intended to be appended any markup because it will be rendered outside of `html` tag.


### `StatesSimulations`

* Intended to be included some of JavaScript with variables responsible for conditional rendering like loading, errors, 
empty data etc.
* Do not intended to be appended of any markup because it will be rendered outside of both `head` and `body` tags.


### `HeadBegin`

If you are not enough of `head` customization functionality, you can append to `head` anything what you want
(while it is a valid HTML5).


### `StylesLinks` 

Intended to be included some `link` tags with styles when `styleSheetsURIs` variable doesn't fit for some reason.


### `HeadScriptsLinks`

Intended to be added some script tags when `scriptsURIs.endOfHead` variable doesn't fit for some reason.
Appropriate for third-party inline scripts like Google Analytics™ or Hotjar™.


### `PageContent`

Intended to be filled with target markup of the visible part of HTML page.


### `EndBodyContent`

Intended to be filled with content always going after `PageContent`.


### `EndBodyScriptsLinks`

Intended to be filled with `script` tags `scriptsURIs.endOfBody` variable doesn't fit for some reason.


## Extending of the layouts

Usually the pages of web site/application has the common part like header, navigation, footer, etc.
The HTML pre-processors including Pug allowing to extract this common part to separate file, but it does not mean that
extracted content could not be affected from extended files.

The multiple reusable layouts is a common scenario (for example one basis layout, the layout for authentication and
the layout for admin panel), so it's recommended to prepare the directory with layouts and add files for each layout 
like below one:


```pug
// TODO Correct the relative path to "node_modules" 
extends RELATIVE/PATH/TO/node_modules/hikari-frontend/PagesTemplates/RegularWebPage.pug

block append Requirements
  
  //- 
    You can include some files with mixins here, but including them in the page file extended from this layout file
    is another option.
  include PATH/TO/Components/SharedSingletons/Header/Header.pug
  include PATH/TO/Components/SharedSingletons/Header/NavigationBar.pug
  include PATH/TO/Components/SharedSingletons/Header/Footer.pug
  

block append PageContent

  .MainLayout

    .MainLayout-UpperFixedContentSlot

      +Header
      +NavigationBar
      
      block UpperFixedContentSlot

        
    .MainLayout-SpecificContent

      block SpecificContent
        
        
    +Footer
```


## Related IntelliJ IDEA files templates (official plugin)

With [official IntelliJ IDEA plugin](https://plugins.jetbrains.com/plugin/17677-yamato-daiwa-frontend), you can quickly
create files extended from `RegularWebPage` with some initial content and `TODO` hints.

When creating the new file by context menu in "Project" panel, select one of below templates in the list.


### Web page (Yamato Daiwa Frontend)

Creates the Pug file and same-name Stylus file where you can define some styles for your layout.

The initial content of the Pug file has been fully described above.


### Layout (Yamato Daiwa Frontend)

Create the layout file extended to be extended by page file.
You can use any blocks of `RegularWebPage`, but do you need to fill the template only by HTML of the visible part,
or fill also metadata, etc. - methodology dependent.


## Available `@yamato-daiwa/es-extensions` functionality
