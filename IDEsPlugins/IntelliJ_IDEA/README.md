# Yamato-Daiwa Frontend

[![Version](https://img.shields.io/jetbrains/plugin/v/17677.svg)](https://plugins.jetbrains.com/plugin/17677)
[![Downloads](https://img.shields.io/jetbrains/plugin/d/17677.svg)](https://plugins.jetbrains.com/plugin/17677)


<!-- Plugin description -->
Adds the [live templates](https://www.jetbrains.com/help/idea/using-live-templates.html) for
[@yamato-daiwa/frontend](https://www.npmjs.com/package/@yamato-daiwa/frontend) library.

Currently, below live templates are available:

* Markup
  * Constants assets
    * <kbd>tost</kbd> - live template for [**textOverflowSafetyTest** constant](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Markup/ConstantsAssets/textOverflowSafetyTest/textOverflowSafetyTest.md)
  * Pages templates
    * <kbd>pl</kbd> - live template for [**PageLink**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/PagesTemplates/StaticPreviewAnywherePage/StaticPreviewAnywherePage.md#pagelink) mixin usage
    * <kbd>plg</kbd> - live template for [**PagesLinksGroup**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/PagesTemplates/StaticPreviewAnywherePage/StaticPreviewAnywherePage.md#pagelinksgroup) mixin usage

* Styles

  * Assets
    * [Fundamental constants and enumerations](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/01-Assets/01-FundamentalConstantsAndEnums/FundamentalConstantsAndEnums.md)
      * <kbd>dt</kbd> - live template for [**DataTypes**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/01-Assets/01-FundamentalConstantsAndEnums/FundamentalConstantsAndEnums.md#datatypes---stylus-data-types) enumeration
      * <kbd>nswu</kbd> - live template for [**NARROWEST_SCREEN_WIDTH_UNIT**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/01-Assets/01-FundamentalConstantsAndEnums/FundamentalConstantsAndEnums.md#narrowest_screen_width_unit---the-narrowest-screen-width-unit) constant
    * Colors
      * <kbd>sogw3c</kbd> - live template for [**ShadesOfGray__W3C_Palette**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/01-Assets/02-Colors/ShadesOfGray__39ColorsW3C_Palette/ShadesOfGray__39ColorsW3C_Palette.md) array
      * <kbd>th</kbd> - live template for [**TemporaryHighlighting**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/01-Assets/02-Colors/TemporaryHighlighting/TemporaryHighlighting.md) object
      * <kbd>pccs</kbd> - live template for [**PracticalColorCoordinateSystem**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/01-Assets/02-Colors/PracticalColorCoordinateSystem/PracticalColorCoordinateSystem.md) object
      * <kbd>fuic</kbd> - live template for [**FlatUI_Colors**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/03-BuildInPlugins/ColorPalettes/FlatUI/FlatUI_ColorsPalette.md) enumeration
      * <kbd>mdc</kbd> - live template for [**MaterialDesignColors**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/03-BuildInPlugins/ColorPalettes/MaterialDesign/MaterialDesignColorsPalette.md) object
      
  * Basic variables
    * <kbd>zi</kbd> - live template for [**ZIndexes**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/01-BasicVariables/01-BasicVariables.md#zindexes) mutable object
    * Autocomplete imitators (no abbreviations)
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
    * Autocomplete imitators (no abbreviations) for [value checkers](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md) 
      * <kbd>isNull</kbd> ([check documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#isnull--isnotnull)) 
      * <kbd>isNotNull</kbd> ([check documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#isnull--isnotnull)) 
      * <kbd>isString</kbd> ([check documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md))
      * <kbd>isEmptyString</kbd> ([check documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md))      
      * <kbd>isNonEmptyString</kbd> ([check documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md))
      * <kbd>isDimensionalOrDimensionlessAmount</kbd> ([check documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#isdimensionalamount--isdimensionlessamount--isdimensionalordimensionlessamount))
      * <kbd>isDimensionalAmount</kbd> ([check documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#isdimensionalamount--isdimensionlessamount--isdimensionalordimensionlessamount))
      * <kbd>isDimensionlessAmount</kbd> ([check documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#isdimensionalamount--isdimensionlessamount--isdimensionalordimensionlessamount))
      * <kbd>isNaturalNumber</kbd> ([check documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#isnaturalnumber))
      * <kbd>isTrue</kbd> ([check documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#istrue--isfalse)) 
      * <kbd>isFalse</kbd> ([check documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#istrue--isfalse)) 
      * <kbd>isBoolean</kbd> ([check documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md))
      * <kbd>isObject</kbd> ([check documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md))
      * <kbd>isIdentifier</kbd> ([check documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md))
      
    * Autocomplete imitators (no abbreviations) for value converters
      * <kbd>emptyStringToNull</kbd>
      * <kbd>nullToZero</kbd>
      * <kbd>nullToEmptyString</kbd>
      * <kbd>nullToEmptyObject</kbd>
      
    * Strings
      * <kbd>bs</kbd> - live template for [buildString](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/03-Strings/buildString.md) function
      * <kbd>cflc</kbd> - live template for [capitalizeFirstLatinCharacter](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/03-Strings/capitalizeFirstLatinCharacter.md) function
      
    * Objects
      * <kbd>dcaoo</kbd> - live template for [deeplyCloneAndOverrideObject](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/04-Objects/deeplyCloneAndOverrideObject.md) function
      * <kbd>dco</kbd> - live template for [deeplyCloneObject](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/04-Objects/deeplyCloneObject.md) function
      * <kbd>fo</kbd> - live template for [formatObject](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/04-Objects/formatObject.md) function
      * <kbd>gnnovc</kbd> - live template for [getObjectNonNullValuesCount](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/04-Objects/getObjectNonNullValuesCount.md) function
      * <kbd>govbdsps</kbd> - live template for [getObjectValueByDotSeparatedPathSafely](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/04-Objects/getObjectValueByDotSeparatedPathSafely.md) function
      * <kbd>iosnv</kbd> - live template for [iterateObjectSkippingNullValues](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/04-Objects/iterateObjectSkippingNullValues.md) function
      * <kbd>oo</kbd> - live template for [overrideObject](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/04-Objects/overrideObject.md) function

    * Autocomplete imitators (no abbreviations) for value converters array functions
      * <kbd>arrayConstructor__POLYFILL</kbd> ([check documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/05-Arrays/arrayConstructor__POLYFILL.md))
      * <kbd>getFirstNonNullArrayElement</kbd> ([check documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/05-Arrays/getFirstNonNullArrayElement.md))
      * <kbd>getLengthOfPrimitivesArray</kbd> ([check documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/05-Arrays/getLengthOfPrimitivesArray.md))
      * <kbd>hasPrimitivesArraySpecifiedElement</kbd> ([check documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/05-Arrays/hasPrimitivesArraySpecifiedElement.md))
      * <kbd>iterate2DimensionalArray</kbd> ([check documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/05-Arrays/iterate2DimensionalArray.md))
      * <kbd>iterateAssociativeArray</kbd> ([check documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/05-Arrays/iterateAssociativeArray.md))
      
    * Parameters validation
      * <kbd>votp</kbd> - live template for [validateObjectTypeParameter](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/06-ParametersValidation/validateObjectTypeParameter.md) function
      * <kbd>votp-a</kbd> - live template for amount property specification for [validateObjectTypeParameter](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/06-ParametersValidation/validateObjectTypeParameter.md) function
      * <kbd>votp-s</kbd> - live template for string property specification for [validateObjectTypeParameter](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/06-ParametersValidation/validateObjectTypeParameter.md) function
      * <kbd>votp-p</kbd> - live template for any other property specification for [validateObjectTypeParameter](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/06-ParametersValidation/validateObjectTypeParameter.md) function
       
    * Other functions
      * <kbd>bbcn</kbd> - live template for [buildBEM_ClassName](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/07-OtherFunctions/buildBEM_ClassName.md) function
      * <kbd>sn</kbd> - live template for [substituteNull](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/07-OtherFunctions/substituteNull.md) function
      * <kbd>bce</kbd> - live template for [buildCalcExpression](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/07-OtherFunctions/buildCalcExpression.md) function
      * <kbd>log</kbd> - autocomplete imitator for [log](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/07-OtherFunctions/log.md) function
  
  * Mixins
    * General
    
      * <kbd>ainn</kbd> - live template for [applyIfNotNull](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/00-GeneralUtils/applyIfNotNull.md) mixin 
      * <kbd>ainz</kbd> - live template for [applyIfNotZero](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/00-GeneralUtils/applyIfNotZero.md) mixin 

      * Sizing
        * Width
          * <kbd>ws</kbd> - live template for [widthSizing](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/01-Sizing/01-Width/WidthSizing.md) mixin
          * <kbd>fillViewportWidthIgnoringParentPaddings</kbd> - autocomplete imitator for [eponymous function](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/01-Sizing/01-Width/fillViewportWidthIgnoringParentPaddings.md)
          * <kbd>tcws</kbd> - [TableCellWidthSizing](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/01-Sizing/01-Width/TableCellWidthSizing.md) mixin
        * Borders
          * <kbd>bds</kbd> - live template for [BordersSizing](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/01-Sizing/03-Borders/BordersSizing.md) mixin
          * <kbd>bfr</kbd> - unified template for [4 mixins for the border fillets radius defining](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/01-Sizing/03-Borders/BordersFilletsRadius.md) mixin 
        * Paddings
          * <kbd>pd</kbd> - live template for [Paddings](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/01-Sizing/04-Paddings/Paddings.md) mixin
      
      * Positioning
        * <kbd>chww</kbd> - live template for [centerHorizontallyWithoutWrapper](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/02-Positioning/centerHorizontallyWithoutWrapper.md) mixin
        * <kbd>ptr</kbd> - live template for [placeToRight](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/02-Positioning/placeToRight.md) mixin
        * <kbd>vcapb</kbd> - live template for [VerticallyCenteredAbsolutelyPositionedBlock](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/02-Positioning/VerticallyCenteredAbsolutelyPositionedBlock.md) mixin

      * Positional relationship
        * <kbd>prs</kbd> - live template for [PositionalRelationship](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/03-PositionalRelationship.md#positionalrelationship-mixin) mixin
        * <kbd>rf</kbd> - live template for [retireFrom](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/03-PositionalRelationship.md#retirefrom-mixin) mixin
        * <kbd>ptfs</kbd> - live template for [pushTargetFromSelf](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/03-PositionalRelationship.md#pushtargetfromself-mixin) mixin
        * <kbd>rfewss</kbd> - live template for [retireFromElementWithSameSelector](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/03-PositionalRelationship.md#retirefromelementwithsameselector-mixin) mixin
        * <kbd>wigf</kbd> - live template for [whenItGoingFirst](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/03-PositionalRelationship.md#whenitgoingfirst-mixin) mixin
        * <kbd>wigl</kbd> - live template for [whenItGoingLast](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/03-PositionalRelationship.md#whenitgoinglast-mixin) mixin
        * <kbd>wija</kbd> - live template for [whenItJustAfter](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/03-PositionalRelationship.md#whenitjustafter) mixin
        * <kbd>wtgjai</kbd> - live template for [whenTargetGoingJustAfterIt](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/03-PositionalRelationship.md#whentargetgoingjustafterit) mixin
        * <kbd>wtwssgjat</kbd> - live template for  [whenTargetWithSameSelectorGoingJustAfterIt](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/03-PositionalRelationship.md#whentargetwithsameselectorgoingjustafterit) mixin

      * Layout
        * <kbd>ccwchp</kbd> - live template for [CenteredContentWithComputedHorizontalPaddings](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/05-Layout/CenteredContentWithComputedHorizontalPaddings.md) mixin
        * <kbd>cnt</kbd> - live template for [Centerer](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/05-Layout/Centerer.md) mixin
        * <kbd>fbv</kbd> - live template for [fillBodyVertically](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/05-Layout/fillBodyVertically.md) mixin
        * <kbd>ftdl</kbd> - live template for [FixedTranslucentDimLayer](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/05-Layout/FixedTranslucentDimLayer.md) mixin

      * Typography
        * <kbd>slteos</kdb> - live template for [SingleLineTextElementOverflowSafety](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/05-TypographyUtils/SingleLineTextElementOverflowSafety.md) mixin
        * <kbd>mlt</kdb> - live template for [MultiLineTextElementOverflowSafetyWithoutExtraSpaceCausedByLineHeight](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/05-TypographyUtils/MultiLineTextElementOverflowSafetyWithoutExtraSpaceCausedByLineHeight.md) mixin

      * Other
        * <kbd>pcsaov</kbd> - live template for [provideClippedShadowsAndOutlinesVisibility](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/06-RestUtils/provideClippedShadowsAndOutlinesVisibility.md) mixin
        * <kbd>sprt</kdb> - live template for [Sprite](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/06-RestUtils/Sprite.md) mixin
    
    * Styles initialization

      * <kbd>si</kbd> - live template for [InitialGlobalCSS_Rules](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/04-StylesInitialization/InitialGlobalCSS_Rules.md) and [CrossBrowserStylesReset](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/04-StylesInitialization/CrossBrowserStylesReset.md) mixins
      * <kbd>blep</kbd> - live template for [ButtonLikeElementsPrimer`](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/04-StylesInitialization/ButtonLikeElementsPrimer.md) mixins

* Idioms templates
  * Media queries definitions 
    * <kbd>med2c</kbd> - the media queries definitions for 2-pattern layout
    * <kbd>med3c</kbd> - the media queries definitions for 3-patterns layout
    * <kbd>med4c</kbd> - the media queries definitions for 4-patterns layout
    * <kbd>med3c</kbd> - the media queries definitions for 5-patterns layout
  * Media queries
    * <kbd>wsc</kbd> - **+WideScreensConfiguration()** mixin (must be preliminarily defined) invocation.
    * <kbd>msc</kbd> - **+MediumScreensConfiguration()** mixin (must be preliminarily defined) invocation.
    * <kbd>nsc</kbd> - **+NarrowScreensConfiguration()** mixin (must be preliminarily defined) invocation.
    * <kbd>wmsc</kbd> - **+WideAndMediumScreensConfiguration()** mixin (must be preliminarily defined) invocation.
    * <kbd>mnsc</kbd> - **+MediumAndNarrowScreensConfiguration()** mixin (must be preliminarily defined) invocation.

* Components
  * <kbd>ossll</kbd> - live template for [OverflowSafeSingleLineLabel](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/blob/master/CoreLibrary/Package/Documentation/Components/OverflowSafeSingleLineLabel/OverflowSafeSingleLineLabel.md) mixin/component (Available for Pug and Stylus contexts)

* Other 
  * <kbd>iydf</kdb> - live template inserting the import (from **@yamato-daiwa/frontend** package) declaration 

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
