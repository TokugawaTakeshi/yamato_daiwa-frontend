# `RegularWebPage`

The Pug file including pre-filled required HTML tags thus will be compiled to valid HTML5 document. 

* Intended to be extended (`extend` keyword) by page files and layout files.
* Including all Pug functionality of `@yamato-daiwa/frontend`.


## Minimalistic example

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
If your language is not English, redefine the `HTML_PAGE_LANGUAGE` variable in `Metadata` block:

```pug
block append Metadata

- HTML_PAGE_LANGUAGE = "ja"
```

#### Title

The HTML validation requires `title` attribute be specified, so it has been pre-filled with `Untitled`.
To change it, re-define `HTML_PAGE_TITLE` variable in `Metadata` block:

```pug
block append Metadata

  - HTML_PAGE_TITLE = "Top page"
```

#### Description, keywords, author

Because these tags are not required, they will not be outputted until you will not specify the properties
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
  
  HTML_PAGE_TITLE = "Top page"
  FAVICON_URI = "favicon.ico"
```

#### Link to AMP version

If your page has AMP version, define `PAGE_AMP_VERSION_URI` variable to be added of dedicated `link` tag.


### Adding of external styles and scripts

* Define the `styleSheetsURIs` variable with array of URIs of stylesheets to be added of dedicated `link` tags.
* Define the `scriptsURIs.endOfHead` variable with array of URIs to be added of dedicated `script` tags to the end of
  the head, and `scriptsURIs.endOfBody` - to be added of dedicated `script` tags in the end of the body 
  (if you don't know which is better - google it first because it is the must-know of the frontend development).
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

###


## Extending of the layouts

Usually the pages of web site/application has the common part like header, navigation, footer, etc.
The HTML pre-processors including Pug allowing to extract this common part to separate file, but it does not mean that
extracted content could not be changed.

The multiple reusable layouts is a common scenario, so it's recommended to prepare the directory with layouts and
add files for each layout like below one:


```pug
// TODO Correct the valid relative path node_modules 
extends RELATIVE/PATH/TO/node_modules/@yamato-daiwa/frontend/PagesTemplates/RegularWebPage.pug

block append Requirements
  
  //- 
    You can include some files with mixins here, but including them in the page file extended from this one 
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

        
    .MainLayout-DynamicContent

      block DynamicContent
        
        
    +Footer
```


## Related IntelliJ IDEA files templates (official plugin)
### Web page (Yamato Daiwa Frontend)

Creates the pug and same-name Stylus file. It's recommended to put the to same directory because the separate directories
for markup, styles and scripts is very inconvenient structure, especially for large projects.

The contents of the Pug file 

```jade
// TODO Correct the relative path to "node_modules" and remove this comment
extends RELATIVE/PATH/TO/00-Components/SharedSingletons/Layouts/Main/MainLayout.pug


block append Metadata

  -

    HTML_PAGE_LANGUAGE = "en";  // TODO Specify the code of your language (see https://www.w3schools.com/tags/ref_language_codes.asp) and remove this comment 
    HTML_PAGE_TITLE = "Top page - You great web site/application";　　// TODO Edit the title of your page and remove this comment

    // TODO Edit the meta of your page or remove it you don't need the search engine optimization now.
    HTML_PageMetaData = {
      description: "The introduction of sedans of NNN company",
      keywords: "NNN, sedan",
      author: "NNN company"
    };

    // TODO Edit the path to your stylesheet and remove this comment
    styleSheetsURIs = [ "./TopPage.css" ];


block append Requirements

  //- TODO Include files with mixins here and remove this comment
  include RELATIVE/PATH/TO/00-Components/Components.pug

  include _Partials/Partial1/Partial1.pug
  include _Partials/Partial2/Partial2.pug


block append DynamicContent

  +Partial1.TopPage-Partial1
  +Partial2.TopPage-Partial2
```
