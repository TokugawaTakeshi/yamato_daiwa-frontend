# Yamato-Daiwa Frontend

![Build](https://github.com/TokugawaTakeshi/temp/workflows/Build/badge.svg)
[![Version](https://img.shields.io/jetbrains/plugin/v/17677.svg)](https://plugins.jetbrains.com/plugin/17677)
[![Downloads](https://img.shields.io/jetbrains/plugin/d/17677.svg)](https://plugins.jetbrains.com/plugin/17677)


<!-- Plugin description -->
Adds [Live Templates](https://www.jetbrains.com/help/idea/using-live-templates.html) for
[@yamato-daiwa/frontend](https://www.npmjs.com/package/@yamato-daiwa/frontend) library.

Currently, below live templates are available:

* Styles
  * Constants
    * `nswu` - [`NARROWEST_SCREEN_WIDTH_UNIT`]() (320px)
  * Mixins
    * `cbsr` - [`CrossBrowserStylesReset`]()
    * `igcr` - [`InitialGlobalCSS_Rules`]()
    * Positional relationship
      * `prs` - [`PositionalRelationship`]() mixin
      * `rf` - [`retireFrom`]() mixin
      * `ptfs` - [`pushTargetFromSelf`]() mixin
      * `rfewss` - [`retireFromElementWithSameSelector`]() mixin
    
* Components
  * `ossll` - [`OverflowSafeSingleLineLabel`]() mixin/component (Available for Pug and Stylus contexts)

<!-- Plugin description end -->

## Installation

- Using IDE built-in plugin system:
  
  <kbd>Settings/Preferences</kbd> > <kbd>Plugins</kbd> > <kbd>Marketplace</kbd> > <kbd>Search for "temp"</kbd> >
  <kbd>Install Plugin</kbd>
  
- Manually:

  Download the [latest release](https://github.com/TokugawaTakeshi/temp/releases/latest) and install it manually using
  <kbd>Settings/Preferences</kbd> > <kbd>Plugins</kbd> > <kbd>⚙️</kbd> > <kbd>Install plugin from disk...</kbd>


---
Plugin based on the [IntelliJ Platform Plugin Template][template].

[template]: https://github.com/JetBrains/intellij-platform-plugin-template
