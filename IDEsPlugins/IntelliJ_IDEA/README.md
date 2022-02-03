# Yamato-Daiwa Frontend

[![Version](https://img.shields.io/jetbrains/plugin/v/17677.svg)](https://plugins.jetbrains.com/plugin/17677)
[![Downloads](https://img.shields.io/jetbrains/plugin/d/17677.svg)](https://plugins.jetbrains.com/plugin/17677)


<!-- Plugin description -->
Adds the [live templates](https://www.jetbrains.com/help/idea/using-live-templates.html) for
[@yamato-daiwa/frontend](https://www.npmjs.com/package/@yamato-daiwa/frontend) library.

Currently, below live templates are available:

* Markup
  * Pages templates
    * <kbd>pl</kbd> - inerts example of [`PageLink`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/PagesTemplates/StaticPreviewAnywherePage#pagelink) mixin usage
    * <kbd>plg</kbd> - inerts example of [`PagesLinksGroup`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/PagesTemplates/StaticPreviewAnywherePage#pagelinksgroup) mixin usage

* Styles
  * Constants
    * <kbd>nswu</kbd> - [`NARROWEST_SCREEN_WIDTH_UNIT`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/01-Assets/01-BasicConstants/BasicConstants.md#narrowest-screen-width-unit) (320px)
  * Functions
    * <kbd>bce</kbd> - [`buildCalcExpression`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/07-OtherFunctions/buildCalcExpression.md) function
  * Mixins
    * <kbd>ainn</kbd> - [`applyIfNotNull`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/applyIfNotNull.md) mixin 
    * <kbd>cbsr</kbd> - [`CrossBrowserStylesReset`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/04-StylesInitialization/CrossBrowserStylesReset.md) mixin
    * <kbd>ccwchp</kbd> - [`CenteredContentWithComputedHorizontalPaddings`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/05-Layout/CenteredContentWithComputedHorizontalPaddings.md) mixin
    * <kbd>chww</kbd> - [`centerHorizontallyWithoutWrapper`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/05-Layout/centerHorizontallyWithoutWrapper.md) mixin
    * <kbd>igcr</kbd> - [`InitialGlobalCSS_Rules`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/04-StylesInitialization/InitialGlobalCSS_Rules.md) mixin
    * <kbd>pd</kbd> - [`Paddings`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/03-Paddings.md) mixin
    * <kbd>ptr</kbd> - [`placeToRight`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/04-Positioning/placeToRight.md) mixin
    * <kbd>blep</kbd> - [`ButtonLikeElementsPrimer`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/04-StylesInitialization/ButtonLikeElementsPrimer.md) mixin 
    * Positional relationship
      * <kbd>prs</kbd> - [`PositionalRelationship`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/05-PositionalRelationship/PositionalRelationship.md#positionalrelationship-mixin) mixin
      * <kbd>rf</kbd> - [`retireFrom`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/05-PositionalRelationship/PositionalRelationship.md#retirefrom-mixin) mixin
      * <kbd>ptfs</kbd> - [`pushTargetFromSelf`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/05-PositionalRelationship/PositionalRelationship.md#pushtargetfromself-mixin) mixin
      * <kbd>rfewss</kbd> - [`retireFromElementWithSameSelector`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/05-PositionalRelationship/PositionalRelationship.md#retirefromelementwithsameselector-mixin) mixin
      * <kbd>wigf</kbd> - [`whenItGoingFirst`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/05-PositionalRelationship/PositionalRelationship.md#whenitgoingfirst-mixin) mixin
      * <kbd>wigl</kbd> - [`whenItGoingLast`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/05-PositionalRelationship/PositionalRelationship.md#whenitgoinglast-mixin) mixin
      * <kbd>wija</kbd> - [`whenItJustAfter`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/05-PositionalRelationship/PositionalRelationship.md#whenitjustafter) mixin
      * <kbd>wtgjai</kbd> - [`whenTargetGoingJustAfterIt`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/05-PositionalRelationship/PositionalRelationship.md#whentargetgoingjustafterit) mixin
      * <kbd>wtwssgjat</kbd> - [`whenTargetWithSameSelectorGoingJustAfterIt`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/05-PositionalRelationship/PositionalRelationship.md#whentargetwithsameselectorgoingjustafterit) mixin
    * Layout
      * <kbd>fbv</kbd> - [`fillBodyVertically`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/05-Layout/fillBodyVertically.md) mixin
      * <kbd>ftdl</kbd> - [`FixedTranslucentDimLayer`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/05-Layout/FixedTranslucentDimLayer.md) mixin
      * <kbd>cnt</kbd> - [`Centerer`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/05-Layout/Centerer.md) mixin
      * <kbd>pcsaov</kbd> - [`provideClippedShadowsAndOutlinesVisibility`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/05-Layout/provideClippedShadowsAndOutlinesVisibility.md) mixin
  * Code templates 
    * <kbd>med3c</kbd> - The media queries definitions for 3-pattern layout
  * Media queries
    * <kbd>wsc</kbd> - Inserts `+WideScreensConfiguration()` (must be preliminarily defined).
    * <kbd>msc</kbd> - Inserts `+MediumScreensConfiguration()` (must be preliminarily defined).
    * <kbd>nsc</kbd> - Inserts `+NarrowScreensConfiguration()` (must be preliminarily defined).
    * <kbd>wmsc</kbd> - Inserts `+WideAndMediumScreensConfiguration()` (must be preliminarily defined).
    * <kbd>mnsc</kbd> - Inserts `+MediumAndNarrowScreensConfiguration()` (must be preliminarily defined).
    

* Components
  * <kbd>ossll</kbd> - [`OverflowSafeSingleLineLabel`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Components/OverflowSafeSingleLineLabel/OverflowSafeSingleLineLabel.md) mixin/component (Available for Pug and Stylus contexts)

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
