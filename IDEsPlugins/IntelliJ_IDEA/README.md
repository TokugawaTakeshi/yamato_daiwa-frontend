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
  * Assets
    * Fundamental constants and enumerations
      * <kbd>dt</kbd> - [**DataTypes**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/01-Assets/01-FundamentalConstantsAndEnums/FundamentalConstantsAndEnums.md#datatypes---stylus-data-types) enumeration
      * <kbd>nswu</kbd> - [**NARROWEST_SCREEN_WIDTH_UNIT**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/01-Assets/01-FundamentalConstantsAndEnums/FundamentalConstantsAndEnums.md#narrowest_screen_width_unit---the-narrowest-screen-width-unit) constant
    * Colors
      * <kbd>fuic</kbd> - [**FlatUI_Colors**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/03-BuildInPlugins/ColorPalettes/FlatUI/FlatUI_ColorsPalette.md) enumeration
      * <kbd>mdc</kbd> - [**MaterialDesignColors**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/03-BuildInPlugins/ColorPalettes/MaterialDesign/MaterialDesignColorsPalette.md) object
      * <kbd>pccs</kbd> - [**PracticalColorCoordinateSystem**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/01-Assets/02-Colors/PracticalColorCoordinateSystem/PracticalColorCoordinateSystem.md) object
      * <kbd>sogw3c</kbd> - [**ShadesOfGray__W3C_Palette**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/01-Assets/02-Colors/ShadesOfGray__39ColorsW3C_Palette/ShadesOfGray__39ColorsW3C_Palette.md) array
      * <kbd>th</kbd> - [**TemporaryHighlighting**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/01-Assets/02-Colors/TemporaryHighlighting/TemporaryHighlighting.md) object
  * Variables
    * <kbd>zi</kbd> - mutable object [ZIndexes](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/01-BasicVariables/01-BasicVariables.md#zindexes)
    * Autocomplete emulators (no abbreviations)
      * <kbd>MAIN_SANS_SERIF_FONT_STACK</kbd> ([check documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/01-BasicVariables/01-BasicVariables.md#font-stacks))
      * <kbd>MAIN_SERIF_FONT_STACK</kbd> ([check documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/01-BasicVariables/01-BasicVariables.md#font-stacks))
      * <kbd>MAIN_MONOSPACED_FONT_STACK</kbd> ([check documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/01-BasicVariables/01-BasicVariables.md#font-stacks))
      * <kbd>MAIN_FONT_STACK</kbd> ([check documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/01-BasicVariables/01-BasicVariables.md#font-stacks))
      * <kbd>BASIC_FONT_SIZE</kbd> ([check documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/01-BasicVariables/01-BasicVariables.md#dimensions))
      * <kbd>BASIC_LINE_HEIGHT</kbd> ([check documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/01-BasicVariables/01-BasicVariables.md#dimensions))
      * <kbd>BASIC_FONT_SIZE_IN_MULTILINE_TEXT_BLOCKS</kbd> ([check documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/01-BasicVariables/01-BasicVariables.md#dimensions))
      * <kbd>BASIC_LINE_HEIGHT_IN_MULTILINE_TEXT_BLOCKS</kbd> ([check documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/01-BasicVariables/01-BasicVariables.md#dimensions))
      * <kbd>BEM_ELEMENT_SEPARATOR</kbd> ([check documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/01-BasicVariables/01-BasicVariables.md#bem-related))
      * <kbd>BEM_MODIFIER_SEPARATOR</kbd> ([check documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/01-BasicVariables/01-BasicVariables.md#bem-related))
  * Functions
    * <kbd>bce</kbd> - [`buildCalcExpression`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/07-OtherFunctions/buildCalcExpression.md) function
    * Autocomplete emulators (no abbreviations) of value checkers 
      * <kbd>isNull</kbd> - [`isNull`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#isnull--isnotnull) 
      * <kbd>isNotNull</kbd> - [`isNotNull`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#isnull--isnotnull) 
      * <kbd>isTrue</kbd> - [`isTrue`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#istrue--isfalse) 
      * <kbd>isFalse</kbd> - [`isFalse`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#istrue--isfalse) 
      * <kbd>isString</kbd> - [`isString`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md) 
      * <kbd>isEmptyString</kbd> - [`isEmptyString`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md) 
      * <kbd>isNonEmptyString</kbd> - [`isNonEmptyString`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md) 
      * <kbd>isDimensionalOrDimensionlessAmount</kbd> - [`isDimensionalOrDimensionlessAmount`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#isdimensionalamount--isdimensionlessamount--isdimensionalordimensionlessamount) 
      * <kbd>isDimensionalAmount</kbd> - [`isDimensionalAmount`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#isdimensionalamount--isdimensionlessamount--isdimensionalordimensionlessamount) 
      * <kbd>isDimensionlessAmount</kbd> - [`isDimensionlessAmount`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#isdimensionalamount--isdimensionlessamount--isdimensionalordimensionlessamount)
      * <kbd>isNaturalNumber</kbd> - [`isNaturalNumber`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#isnaturalnumber)
      * <kbd>isBoolean</kbd> - [`isBoolean`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#isdimensionalamount--isdimensionlessamount--isdimensionalordimensionlessamount)
      * <kbd>isObject</kbd> - [`isObject`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#isdimensionalamount--isdimensionlessamount--isdimensionalordimensionlessamount)
      * <kbd>isIdentifier</kbd> - [`isIdentifier`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#isdimensionalamount--isdimensionlessamount--isdimensionalordimensionlessamount)
    * Autocomplete emulators (no abbreviations) of value converters
      * <kbd>emptyStringToNull</kbd>
      * <kbd>nullToZero</kbd>
      * <kbd>nullToEmptyString</kbd>
    * Strings
      * <kbd>bs</kbd> - [buildString](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/03-Strings/buildString.md) function
      * <kbd>cflc</kbd> - [capitalizeFirstLatinCharacter](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/03-Strings/capitalizeFirstLatinCharacter.md) function
    * Objects
      * <kbd>dcaoo</kbd> - [deeplyCloneAndOverrideObject](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/04-Objects/deeplyCloneAndOverrideObject.md) function
      * <kbd>dco</kbd> - [deeplyCloneObject](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/04-Objects/deeplyCloneObject.md) function
      * <kbd>fo</kbd> - [formatObject](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/04-Objects/formatObject.md) function
      * <kbd>gnnovc</kbd> - [getObjectNonNullValuesCount](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/04-Objects/getObjectNonNullValuesCount.md) function
      * <kbd>govbdsps</kbd> - [getObjectValueByDotSeparatedPathSafely](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/04-Objects/getObjectValueByDotSeparatedPathSafely.md) function
      * <kbd>iosnv</kbd> - [iterateObjectSkippingNullValues](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/04-Objects/iterateObjectSkippingNullValues.md) function
    * Autocomplete emulators (no abbreviations) of value converters array functions
      * <kbd>arrayConstructor__POLYFILL</kbd> - [arrayConstructor__POLYFILL](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/05-Arrays/arrayConstructor__POLYFILL.md)
      * <kbd>getFirstNonNullArrayElement</kbd> - [getFirstNonNullArrayElement](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/05-Arrays/getFirstNonNullArrayElement.md)
      * <kbd>iterate2DimensionalArray</kbd> - [iterate2DimensionalArray](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/05-Arrays/iterate2DimensionalArray.md)
      * <kbd>iterateAssociativeArray</kbd> - [iterateAssociativeArray](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/05-Arrays/iterateAssociativeArray.md)
      * <kbd>getLengthOfPrimitivesArray</kbd> - [getLengthOfPrimitivesArray](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/05-Arrays/getLengthOfPrimitivesArray.md)
      * <kbd>hasPrimitivesArraySpecifiedElement</kbd> - [hasPrimitivesArraySpecifiedElement](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/05-Arrays/hasPrimitivesArraySpecifiedElement.md)
    * Other functions
      * <kbd>bbcn</kbd> - live template for [buildBEM_ClassName](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/07-OtherFunctions/buildBEM_ClassName.md) function
      * <kbd>sn</kbd> - live template for [substituteNull](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/07-OtherFunctions/substituteNull.md) function
      * <kbd>log</kbd> - autocomplete for [log](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/07-OtherFunctions/log.md) function
      * <kbd>votp</kbd> - live template for [validateObjectTypeParameter](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/06-ParametersValidation/validateObjectTypeParameter.md) function
      * <kbd>votp-a</kbd> - live template for amount property specification for [validateObjectTypeParameter](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/06-ParametersValidation/validateObjectTypeParameter.md) function
      * <kbd>votp-s</kbd> - live template for string property specification for [validateObjectTypeParameter](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/06-ParametersValidation/validateObjectTypeParameter.md) function
      * <kbd>votp-p</kbd> - live template for any other property specification for [validateObjectTypeParameter](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/06-ParametersValidation/validateObjectTypeParameter.md) function
  * Mixins
    * <kbd>ainn</kbd> - [`applyIfNotNull`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/00-GeneralUtils/applyIfNotNull.md) mixin 
    * <kbd>ainz</kbd> - [`applyIfNotZero`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/00-GeneralUtils/applyIfNotZero.md) mixin 
    * <kbd>cbsr</kbd> - [`CrossBrowserStylesReset`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/04-StylesInitialization/CrossBrowserStylesReset.md) mixin
    * <kbd>ccwchp</kbd> - [`CenteredContentWithComputedHorizontalPaddings`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/05-Layout/CenteredContentWithComputedHorizontalPaddings.md) mixin
    * <kbd>chww</kbd> - [`centerHorizontallyWithoutWrapper`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/05-Layout/centerHorizontallyWithoutWrapper.md) mixin
    * <kbd>igcr</kbd> - [`InitialGlobalCSS_Rules`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/04-StylesInitialization/InitialGlobalCSS_Rules.md) mixin
    * <kbd>pd</kbd> - [`Paddings`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/01-Sizing/04-Paddings/Paddings.md) mixin
    * <kbd>ptr</kbd> - [`placeToRight`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/04-Positioning/placeToRight.md) mixin
    * <kbd>blep</kbd> - [`ButtonLikeElementsPrimer`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/04-StylesInitialization/ButtonLikeElementsPrimer.md) mixin
    * Sizing
      * Width
        * <kbd>ws</kbd> - [`WidthSizing`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/01-Sizing/01-Width/WidthSizing.md) mixin
        * <kbd>fillViewportWidthIgnoringParentPaddings</kbd> - autocomplete imitator for eponymous function
        * <kbd>tcws</kbd> - [`TableCellWidthSizing`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/01-Sizing/01-Width/TableCellWidthSizing.md) mixin
      * Border
        * <kbd>bds</kbd> - [**BordersSizing**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/01-Sizing/03-Borders/BordersSizing.md)
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
    * Typography
      * <kbd>slteos</kdb> - [`SingleLineTextElementOverflowSafety`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/05-TypographyUtils/SingleLineTextElementOverflowSafety.md)
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
