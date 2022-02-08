# @yamato-daiwa/frontend - [YDF]

[![NPM Version](https://img.shields.io/npm/v/@yamato-daiwa/frontend)](https://www.npmjs.com/package/@yamato-daiwa/frontend)
[![IntelliJ IDEA plugin](https://img.shields.io/badge/IntelliJ_IDEA-Official_Plugin-088BF8.svg?style=flat)](https://plugins.jetbrains.com/plugin/17677-yamato-daiwa-frontend)

The toolkit for the frontend development with [Pug](https://pugjs.org/api/getting-started.html) and 
[Stylus](https://github.com/stylus/stylus/) pre-processors.

![Hero image of @yamato-daiwa/frontend](https://repository-images.githubusercontent.com/376180981/885d8a83-98a8-47d0-b2e2-5abf042ef184)


## Roadmap

Currently, the Pug and Stylus auxiliaries are under refactoring.
The next step will be the adding of the UI components.

[🛣️ Version 1.0 (2022 Spring sprint)](https://yamato-daiwa.myjetbrains.com/youtrack/agiles/121-7/122-13)

**Hint:** Set the unlabeled slider in the top right corner of the screen to `XL` to see the tags and descriptions.

![image](https://user-images.githubusercontent.com/41653501/141427847-a61da481-e9fa-4dce-af3a-fd1d3c0afcde.png)

## ⚠️ Request to Stack Overflow users with `>=1500` reputation

[My account](https://stackoverflow.com/users/4818123/takeshi-tokugawa-yd) has not enough reputation to create the tag
for `@yamato-daiwa/frontend` and start to answer the related questions. Please create it instead of me and notify
me to [tokugawa.takesi@gmail.com](mailto:tokugawa.takesi@gmail.com).

* **Tag name**: `@yamato-daiwa/frontend`
* **Description**: The toolkit for the frontend development with Pug and Stylus pre-processors.


## Installation

```
npm i @yamato-daiwa/frontend -E
```


## Documentation

### Get functionality

```stylus
@require "PATH_TO_NODE_MODULES/@yamato-daiwa/frontend/Functionality.styl"
```

### Get components

#### Markup (Pug)

```pug
include "PATH_TO_NODE_MODULES/@yamato-daiwa/frontend/Components.pug
```

#### Styles

```stylus
@require "PATH_TO_NODE_MODULES/@yamato-daiwa/frontend/Components.styl"
```


### Table of contents

#### Markup
##### Pages templates

* [📖 `RegularWebPage`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/PagesTemplates/RegularWebPage.md)
  The basic HTML5 page with pre-filled required HTML tags.
* [📖 `StaticPreviewAnywherePage`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/PagesTemplates/StaticPreviewAnywherePage/StaticPreviewAnywherePage.md)
  The top page for static HTML/CSS implementation stage.

#### Styles
##### Assets

* [📖 Fundamental constants and enumerations](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/01-Assets/01-FundamentalConstantsAndEnums/FundamentalConstantsAndEnums.md) 
  * [📖 DataTypes](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/01-Assets/01-FundamentalConstantsAndEnums/FundamentalConstantsAndEnums.md#datatypes---stylus-data-types) enumeration
  * [📖 NARROWEST_SCREEN_WIDTH_UNIT](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/01-Assets/01-FundamentalConstantsAndEnums/FundamentalConstantsAndEnums.md#narrowest_screen_width_unit---the-narrowest-screen-width-unit)
* Colors
  * [📖 ShadesOfGray__W3C_Palette](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/01-Assets/02-Colors/ShadesOfGray__39ColorsW3C_Palette/ShadesOfGray__39ColorsW3C_Palette.md)  
  * [📖 TemporaryHighlighting](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/01-Assets/02-Colors/TemporaryHighlighting/TemporaryHighlighting.md)
  * [📖 PracticalColorCoordinateSystem](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/01-Assets/02-Colors/PracticalColorCoordinateSystem/PracticalColorCoordinateSystem.md)

##### Kernel
###### Basic variables

* [📖 Typography](Documentation/Styles/02-Kernel/01-BasicVariables/01-BasicVariables.md#typography)
  * [📖 Font stacks](Documentation/Styles/02-Kernel/01-BasicVariables/01-BasicVariables.md#font-stacks)
  * [📖 Dimensions](Documentation/Styles/02-Kernel/01-BasicVariables/01-BasicVariables.md#dimensions)
* [📖 ZIndexes](Documentation/Styles/02-Kernel/01-BasicVariables/01-BasicVariables.md#zindexes)
* [📖 BEM Related](Documentation/Styles/02-Kernel/01-BasicVariables/01-BasicVariables.md#bem-related)

##### Build-in plugins

###### Additional color palettes

* [📖 FlatUI_Colors](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/03-BuildInPlugins/ColorPalettes/FlatUI/FlatUI_ColorsPalette.md)
* [📖 MaterialDesignColors](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/03-BuildInPlugins/ColorPalettes/MaterialDesign/MaterialDesignColorsPalette.md)

##### Functions
###### Value checkers

* [📖 isNull](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#isnull--isnotnull)
* [📖 isNotNull](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#isnull--isnotnull)
* isString
* isEmptyString
* isNonEmptyString
* [📖 isDimensionalOrDimensionlessAmount](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#isdimensionalamount--isdimensionlessamount--isdimensionalordimensionlessamount)
* [📖 isDimensionalAmount](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#isdimensionalamount--isdimensionlessamount--isdimensionalordimensionlessamount)
* [📖 isDimensionlessAmount](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#isdimensionalamount--isdimensionlessamount--isdimensionalordimensionlessamount)
* [📖 isTrue](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#istrue--isfalse)
* [📖 isFalse](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#istrue--isfalse)
* isBoolean
* isObject
* isIdentifier


[//]: # ()
[//]: # (##### Value converters)

[//]: # ()
[//]: # (The names of below functions has been developed such as everything must be obvious without explanations.)

[//]: # (If it not such as, please open the issue with title "[FunctionName]: Unclear name".)

[//]: # ()
[//]: # (* `emptyStringToNull&#40;value&#41;`)

[//]: # (* `nullToZero&#40;value&#41;`)

[//]: # (* `nullToEmptyString&#40;value&#41;`)

[//]: # (    )
[//]: # (##### Strings)

[//]: # (    )
[//]: # (* [📖 `buildString`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/03-Strings/buildString/buildString.md&#41;)

[//]: # (  Allows to create the dynamic strings using the [ES6 Template literals]&#40;https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals&#41;.  )

[//]: # ()
[//]: # (##### Objects &#40;hashes&#41;)

[//]: # (    )
[//]: # (* [📖 `deeplyCloneAndOverrideObject`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/04-Objects/deeplyCloneAndOverrideObject/deeplyCloneAndOverrideObject.md&#41;)

[//]: # (  Allows to clone and immediately override the object without affecting to initial object.)

[//]: # (* [📖 `deeplyCloneObject`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/04-Objects/deeplyCloneObject/deeplyCloneObject.md&#41;)

[//]: # (  Creates the deep copy object the object.)

[//]: # (* [📖 `getObjectNonNullValuesCount`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/04-Objects/getObjectNonNullValuesCount/getObjectNonNullValuesCount.md&#41;)

[//]: # (  Returns the count of non-null values of specified object.)

[//]: # (* [📖 `getObjectValueByDotSeparatedPathSafely`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/04-Objects/getObjectValueByDotSeparatedPathSafely/getObjectValueByDotSeparatedPathSafely.md&#41;)

[//]: # (  Accesses to nested object &#40;hash&#41; without risk being throw the error when some property does not exist.)

[//]: # (* [📖 `iterateObjectSkippingNullValues`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/04-Objects/iterateObjectSkippingNullValues/iterateObjectSkippingNullValues.md&#41;)

[//]: # (  Iterates the object's keys and values skipping entries with `null` value.)

[//]: # (* `formatObject` Stringifies and formats object for logging)

[//]: # ()
[//]: # (##### Arrays)

[//]: # (    )
[//]: # (* [📖 `arrayConstructor__POLYFILL`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/05-Arrays/arrayConstructor__POLYFILL/arrayConstructor__POLYFILL.md&#41;)

[//]: # (  Fixes the [Unsolicited two-dimensional array when trying to declare the plain one-dimensional array]&#40;https://github.com/stylus/stylus/issues/2582&#41; issue.)

[//]: # (* [📖 `getFirstNonNullArrayElement`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/05-Arrays/getFirstNonNullElement/getFirstNonNullArrayElement.md&#41;)

[//]: # (  Returns first non-null element for array or null if no such elements.)

[//]: # (* [📖 `getStringsOrNumbersArrayLength`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/05-Arrays/getStringsOrNumbersArrayLength/getStringsOrNumbersArrayLength.md&#41;)

[//]: # (  Returns the elements count of array of strings of numbers.)

[//]: # (* [📖 `hasStringsOrNumbersArraySpecifiedElement`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/05-Arrays/hasStringsOrNumbersArraySpecifiedElement/hasStringsOrNumbersArraySpecifiedElement.md&#41;)

[//]: # (  Checks has certain array of strings of numbers the specified element.)

[//]: # (* [📖 `iterate2DimensionalArray`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/05-Arrays/iterate2DimensionalArray/iterate2DimensionalArray.md&#41;)

[//]: # (  Iterate the 2-dimensional array supporting single-element case.)

[//]: # (* [📖 `iterateAssociativeArray`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/05-Arrays/iterateAssociativeArray/iterateAssociativeArray.md&#41;)

[//]: # (  Iterates associative array supporting single-element case.)

[//]: # ()
[//]: # (##### Logging)

[//]: # ()
[//]: # (* [📖 `log`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/07-OtherFunctions/log.md&#41;)

[//]: # (  Makes log output to console. Unlike native similar `p` function formats the objects.)

[//]: # ()
[//]: # (##### Parameters validation)

[//]: # ()
[//]: # (* [📖 `validateSingleParametersObject`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/06-ParametersValidation/validateSingleParametersObject.md&#41;)

[//]: # (  Validating of the parameters of function and mixins.)

[//]: # (      )
[//]: # ()
[//]: # (##### Other)

[//]: # ()
[//]: # (  * [`buildBEM_Class`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/07-OtherFunctions/buildBEM_Class.md&#41; )

[//]: # (    Builds BEM class according specified block, element and modifier.)

[//]: # (  * [`substituteWhenNull`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/07-OtherFunctions/substituteWhenNull.md&#41; )

[//]: # (    Substitutes the second argument's value when first one is `null`)

[//]: # (  * [`buildCalcExpression`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/07-OtherFunctions/buildCalcExpression.md&#41;)

[//]: # (    Generates [`calc&#40;&#41;`]&#40;https://developer.mozilla.org/en-US/docs/Web/CSS/calc&#40;&#41;&#41; expression; interpolation)

[//]: # (    is available.)

[//]: # ()
[//]: # (#### Mixins)

[//]: # ()
[//]: # (##### Basic)

[//]: # ()
[//]: # (* [📖 `applyIfNotNull`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/applyIfNotNull.md&#41; )

[//]: # (  adds each specified CSS property to target ruleset when if it's not null. Intended to be used in cases when CSS values )

[//]: # (  are unknown in advance.)

[//]: # (* [📖 `applyIfNotZero`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/applyIfNotZero.md&#41; )

[//]: # (  adds each specified CSS property to target ruleset when if it's not zero. Intended to be used in cases when CSS values )

[//]: # (  are unknown in advance.)

[//]: # ()
[//]: # ()
[//]: # (##### Width sizing)

[//]: # ()
[//]: # (* [📖 `widthSizing`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/01-Sizing/01-WidthSizing/widthSizing.md&#41;)

[//]: # (  Alternative width specifying approach intended to be used in frameworks development.)

[//]: # (* `fillViewportWidthIgnoringParentPaddings` Takes 100% of viewport in spite of parent element's paddings.)

[//]: # (* [📖 `TableCellWidthSizing`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/01-Sizing/01-WidthSizing/TableCellWidthSizing.md&#41; )

[//]: # (  Allows to define the width, borders and paddings of table cell by various combinations of parameters.)

[//]: # ()
[//]: # (##### Height sizing)

[//]: # ()
[//]: # (* [📖 `textBoxLikeElementsHeightSizing`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/01-Sizing/02-HeightSizing/textBoxLikeElementsHeightSizing.md&#41;)

[//]: # (  The vertical sizing of block and inline block elements only with text content.)

[//]: # ()
[//]: # (##### Paddings)

[//]: # ()
[//]: # (* [📖 `Paddings` mixin]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/03-Paddings.md&#41;)

[//]: # (  The alternative to native CSS method of defining of the paddings intended to be used in customizable components development.)

[//]: # ()
[//]: # ()
[//]: # (##### Layout)

[//]: # ()
[//]: # (* [📖 `fillBodyVertically`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/05-Layout/fillBodyVertically.md&#41;)

[//]: # (  Fills `<body>` when `<body>` and `<html>` takes 100% of viewport's height as minimum with or without vertical scrolling)

[//]: # (  availability.)

[//]: # (* [📖 `FixedTranslucentDimLayer`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/05-Layout/FixedTranslucentDimLayer.md&#41;)

[//]: # (  The mixin intended to be applied to `div` element to overlap the other content which translucent dim layer.)

[//]: # (  Such element is frequently being used as underlay for modal dialogs.)

[//]: # (* [📖 `Centerer`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/05-Layout/Centerer.md&#41;)

[//]: # (  Centering of the block elements with `auto` margins, minimal and maximal widths. Intended to be used on containers.)

[//]: # (* [📖 `provideClippedShadowsAndOutlinesVisibility`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/05-Layout/provideClippedShadowsAndOutlinesVisibility.md&#41;)

[//]: # (  The ugly but still no-alternatives solution of clipped by `overflow` shadows and outlines problem. Indented to be used on non-containers.)

[//]: # ()
[//]: # ()
[//]: # (##### Positioning)

[//]: # ()
[//]: # (* [📖 `centerHorizontallyWithoutWrapper`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/05-Layout/centerHorizontallyWithoutWrapper.md&#41;)

[//]: # (  Centering of the block and inline-block elements without wrapper.)

[//]: # (* [📖 `CenteredContentWithComputedHorizontalPaddings`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/05-Layout/CenteredContentWithComputedHorizontalPaddings.md&#41;)

[//]: # (  Centering of the element by computed horizontal symmetric paddings. Intended to be used on the page containers on wide screens.)

[//]: # (* [📖 `placeToRight`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/04-Positioning/placeToRight.md&#41;)

[//]: # (  Placing the element to right side or the container by relative positioning and `transform`.)

[//]: # (* [📖 `VerticallyCenteredAbsolutelyPositionedBlock`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/04-Positioning/VerticallyCenteredAbsolutelyPositionedBlock.md&#41;)

[//]: # (  Centers vertically the absolutely positioned block.)

[//]: # ()
[//]: # (##### Positional relationship)

[//]: # ()
[//]: # (* [📖 Introduction]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/06-PositionalRelationship/PositionalRelationship.md&#41; )

[//]: # (* [📖 `PositionalRelationship` mixin]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/06-PositionalRelationship/PositionalRelationship.md#positionalrelationship-mixin&#41;)

[//]: # (  Low-level mixin for the defining of the vertical space between two or more elements.)

[//]: # (* [📖 `retireFrom` mixin]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/06-PositionalRelationship/PositionalRelationship.md#retirefrom-mixin&#41;)

[//]: # (  Allows to define how much element `B` must retire from `A` by top/left margin.)

[//]: # (* [📖 `pushTargetFromSelf` mixin]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/06-PositionalRelationship/PositionalRelationship.md#pushtargetfromself-mixin&#41;)

[//]: # (  Allows to define how much element `B` must push `A` from self by `A`'s top/left margin.)

[//]: # (* [📖 `retireFromElementWithSameSelector` mixin]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/06-PositionalRelationship/PositionalRelationship.md#retirefromelementwithsameselector-mixin&#41;)

[//]: # (  Allows to define how much certain element must retire from other element with same selector.)

[//]: # (* [📖 `whenItGoingFirst` mixin]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/06-PositionalRelationship/PositionalRelationship.md#whenitgoingfirst-mixin&#41;)

[//]: # (  Allows to define CSS properties for certain element when it is going first in some container.)

[//]: # (* [📖 `whenItGoingLast` mixin]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/06-PositionalRelationship/PositionalRelationship.md#whenitgoinglast-mixin&#41;)

[//]: # (  Allows to define CSS properties for certain element when it is going last in some container.)

[//]: # (* [📖 `whenItJustAfter` mixin]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/06-PositionalRelationship/PositionalRelationship.md#whenitjustafter&#41;)

[//]: # (  Allows to specify any CSS properties for element `B` when it is going after element `A`.)

[//]: # (* [📖 `whenTargetGoingJustAfterIt` mixin]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/06-PositionalRelationship/PositionalRelationship.md#whentargetgoingjustafterit&#41;)

[//]: # (  Allows to specify any CSS properties for the target element `X` when it is going after currently being declared element.)

[//]: # (* [📖 `whenTargetWithSameSelectorGoingJustAfterIt` mixin]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/06-PositionalRelationship/PositionalRelationship.md#whentargetwithsameselectorgoingjustafterit&#41;)

[//]: # (  The equivalent of `+whenTargetGoingJustAfterIt&#40;{ targetElementSelector: ".X" }&#41;` for the case when reference element's selector is also `.X`.)

[//]: # ()
[//]: # ()
[//]: # (##### Other mixin utils)

[//]: # ()
[//]: # (* [📖 Sprite]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/09-Rest/Sprite.md&#41;)

[//]: # (  Mixin for the making of the element to sprite. )

[//]: # ()
[//]: # ()
[//]: # (#### Styles initialization)

[//]: # ()
[//]: # (* [📖 `CrossBrowserStylesReset`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/04-StylesInitialization/CrossBrowserStylesReset.md&#41;)

[//]: # (  The resetting of browser dependent styles and some usually redefinable styles like default margins of `body` based on)

[//]: # (  [Eric Mayer's **Reset CSS**]&#40;https://meyerweb.com/eric/tools/css/reset/&#41;.)

[//]: # (* [`InitialGlobalCSS_Rules`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/04-StylesInitialization/InitialGlobalCSS_Rules.md&#41;)

[//]: # (  Some basic CSS rules like default font size and default line height intended to be applying directly after )

[//]: # (  `CrossBrowserStylesReset`. )

[//]: # (* [`ButtonLikeElementsPrimer`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/04-StylesInitialization/ButtonLikeElementsPrimer.md&#41;)

[//]: # (  Resets all styles which usually pre-defined on buttons and similar elements such as the target element becomes even)

[//]: # (  with unstyled `span`.)

[//]: # ()
[//]: # (#### Typography)

[//]: # ()
[//]: # (* [📖 `SingleLineElementOverflowTolerance`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/07-Typography/SingleLineElementOverflowTolerance.md&#41;)

[//]: # (* [📖 `MultilineTextWithoutExtraSpaceCausedByLineHeight`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-Mixins/07-Typography/MultilineTextWithoutExtraSpaceCausedByLineHeight.md&#41;)

[//]: # (  Defines the font size and line height, herewith there will not be extra vertical space above first line and below last)

[//]: # (  line caused by `line-height`. Prevents overflow.)

[//]: # ()
[//]: # (#### Components)

[//]: # ()
[//]: # (* [📖 `OverflowSafeSingleLineLabel`]&#40;https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Components/OverflowSafeSingleLineLabel/OverflowSafeSingleLineLabel.md&#41;)

[//]: # (  Improved solution of)

[//]: # (  [horizontal text overflow safety of single line labels]&#40;https://stackoverflow.com/questions/68667208/keep-hanging-characters-visible-in-spite-of-line-height-1-and-overflow-hidd&#41;)

[//]: # (  problem.)


### Motivation

It is considered that the programming in the overkill for creating of stylesheets.
Maybe is so until writing the flexible and customizable UI framework.

The `@yamato-daiwa/frontend` synthetically improving the programming functionality of Stylus pre-processor
allows flexibly work with unknown at-advance data, namely the customization data from the framework users.
