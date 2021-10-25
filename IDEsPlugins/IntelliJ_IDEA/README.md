# Yamato-Daiwa Frontend

[![Version](https://img.shields.io/jetbrains/plugin/v/17677.svg)](https://plugins.jetbrains.com/plugin/17677)
[![Downloads](https://img.shields.io/jetbrains/plugin/d/17677.svg)](https://plugins.jetbrains.com/plugin/17677)


<!-- Plugin description -->
Adds the [live templates](https://www.jetbrains.com/help/idea/using-live-templates.html) for
[@yamato-daiwa/frontend](https://www.npmjs.com/package/@yamato-daiwa/frontend) library.

Currently, below live templates are available:

* Styles
  * Constants
    * `nswu` - [`NARROWEST_SCREEN_WIDTH_UNIT`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/01-Assets/01-BasicConstants/BasicConstants.md#narrowest-screen-width-unit) (320px)
  * Mixins
    * `cbsr` - `CrossBrowserStylesReset`
    * `igcr` - `InitialGlobalCSS_Rules`
    * `pd` - [`Paddings`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/03-Paddings.md)
    * Positional relationship
      * `prs` - [`PositionalRelationship`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/05-PositionalRelationship/PositionalRelationship.md#positionalrelationship-mixin) mixin
      * `rf` - [`retireFrom`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/05-PositionalRelationship/PositionalRelationship.md#retirefrom-mixin) mixin
      * `ptfs` - [`pushTargetFromSelf`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/05-PositionalRelationship/PositionalRelationship.md#pushtargetfromself-mixin) mixin
      * `rfewss` - [`retireFromElementWithSameSelector`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/05-PositionalRelationship/PositionalRelationship.md#retirefromelementwithsameselector-mixin) mixin
      * `wigf` - [`whenItGoingFirst`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/05-PositionalRelationship/PositionalRelationship.md#whenitgoingfirst-mixin) mixin
      * `wigl` - [`whenItGoingLast`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/05-PositionalRelationship/PositionalRelationship.md#whenitgoinglast-mixin) mixin
      * `wija` - [`whenItJustAfter`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/05-PositionalRelationship/PositionalRelationship.md#whenitjustafter) mixin
      * `wtgjai` - [`whenTargetGoingJustAfterIt`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/05-PositionalRelationship/PositionalRelationship.md#whentargetgoingjustafterit) mixin
      * `wtwssgjat` - [`whenTargetWithSameSelectorGoingJustAfterIt`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/05-PositionalRelationship/PositionalRelationship.md#whentargetwithsameselectorgoingjustafterit) mixin
    
* Components
  * `ossll` - [`OverflowSafeSingleLineLabel`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Components/OverflowSafeSingleLineLabel/OverflowSafeSingleLineLabel.md) mixin/component (Available for Pug and Stylus contexts)

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
