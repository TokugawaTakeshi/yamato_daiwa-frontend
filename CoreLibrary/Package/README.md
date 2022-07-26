# Yamato Daiwa Frontend 〔YDF〕

[![NPM Version](https://img.shields.io/npm/v/@yamato-daiwa/frontend)](https://www.npmjs.com/package/@yamato-daiwa/frontend)
[![IntelliJ IDEA plugin](https://img.shields.io/badge/IntelliJ_IDEA-Official_Plugin-088BF8.svg?style=flat)](https://plugins.jetbrains.com/plugin/17677-yamato-daiwa-frontend)

The toolkit for the frontend development with [Pug](https://pugjs.org/api/getting-started.html) and 
[Stylus](https://github.com/stylus/stylus/) pre-processors.

![Hero image of @yamato-daiwa/frontend](https://repository-images.githubusercontent.com/376180981/885d8a83-98a8-47d0-b2e2-5abf042ef184)


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
@require "RELATIVE/PATH/TO/node_modules/@yamato-daiwa/frontend/Functionality.styl"
```

Please note that this including will not cause any output CSS rules -  100% of YDF functionality has been provided via variables 
and mixins.


### Get components

Again, neither Pug nor Stylus including will not cause any output CSS rules.

#### Markup (Pug)

```pug
include RELATIVE/PATH/TO/node_modules/@yamato-daiwa/frontend/Components.pug
```

#### Styles

```stylus
@require "RELATIVE/PATH/TO/node_modules/@yamato-daiwa/frontend/Components.styl"
```


### Table of contents

#### Markup
##### Pages templates

<dl>
  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/PagesTemplates/RegularWebPage.md">RegularWebPage</a></dt>
  <dd>The basic HTML5 page with pre-filled required HTML tags.</dd>
  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/PagesTemplates/StaticPreviewAnywherePage/StaticPreviewAnywherePage.md">StaticPreviewAnywherePage</a></dt>
  <dd>The top page for static HTML/CSS implementation stage.</dd>
</dl>


#### Styles
##### Assets

* [Fundamental constants and enumerations](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/01-Assets/01-FundamentalConstantsAndEnums/FundamentalConstantsAndEnums.md) 
  * [DataTypes](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/01-Assets/01-FundamentalConstantsAndEnums/FundamentalConstantsAndEnums.md#datatypes---stylus-data-types) enumeration
  * [NARROWEST_SCREEN_WIDTH_UNIT](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/01-Assets/01-FundamentalConstantsAndEnums/FundamentalConstantsAndEnums.md#narrowest_screen_width_unit---the-narrowest-screen-width-unit) contant
* Colors
  * [ShadesOfGray__39ColorsW3C_Palette](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/01-Assets/02-Colors/ShadesOfGray__39ColorsW3C_Palette/ShadesOfGray__39ColorsW3C_Palette.md)  
  * [TemporaryHighlighting](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/01-Assets/02-Colors/TemporaryHighlighting/TemporaryHighlighting.md)
  * [PracticalColorCoordinateSystem](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/01-Assets/02-Colors/PracticalColorCoordinateSystem/PracticalColorCoordinateSystem.md)

##### Kernel
###### Basic variables

* [Typography](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/01-BasicVariables/01-BasicVariables.md#typography)
  * [Font stacks](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/01-BasicVariables/01-BasicVariables.md#font-stacks)
  * [Dimensions](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/01-BasicVariables/01-BasicVariables.md#dimensions)
* [ZIndexes](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/01-BasicVariables/01-BasicVariables.md#zindexes)
* [BEM Related](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/01-BasicVariables/01-BasicVariables.md#bem-related)

###### Functions

<ul>

  <li>
    <b>Value checkers</b>
    <ul>
      <li><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#isnull--isnotnull">isNull</a></li>
      <li><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#isnull--isnotnull">isNotNull</a></li>
      <li>isString</li>    
      <li>isEmptyString</li>    
      <li>isNonEmptyString</li>
      <li><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#isdimensionalamount--isdimensionlessamount--isdimensionalordimensionlessamount">isDimensionalOrDimensionlessAmount</a></li>
      <li><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#isdimensionalamount--isdimensionlessamount--isdimensionalordimensionlessamount">isDimensionalAmount</a></li>
      <li><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#isdimensionalamount--isdimensionlessamount--isdimensionalordimensionlessamount">isDimensionlessAmount</a></li>
      <li><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#isnaturalnumber">isNaturalNumber</a></li>
      <li><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#istrue--isfalse">isTrue</a></li>
      <li><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#istrue--isfalse">isFalse</a></li>
      <li>isBoolean</li>  
      <li>isObject</li>  
      <li>isIdentifier</li>  
    </ul>
  </li>

  <li>
    <b>Value converters</b>
    <ul>
      <li>emptyStringToNull</li>
      <li>nullToZero</li>
      <li>nullToEmptyString</li>
    </ul>    
  </li>

  <li>
    <b>Strings</b>
    <dl>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/03-Strings/buildString.md">buildString</a></dt>
      <dd>Allows to create the dynamic strings using the syntax similar to <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals">ES6 Template literals</a>.</dd>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/03-Strings/capitalizeFirstLatinCharacter.md">capitalizeFirstLatinCharacter</a></dt>
      <dd>Capitalizes first lowercase latin character (a-z) of the string.</dd>
    </dl>
  </li>
  
  <li>
    <b>Objects</b>
    <dl>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/04-Objects/deeplyCloneAndOverrideObject.md">deeplyCloneAndOverrideObject</a></dt>
      <dd>Allows to clone and immediately override the object without affecting to initial object.</dd>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/04-Objects/deeplyCloneObject.md">deeplyCloneObject</a></dt>
      <dd>Creates the deep copy of the object.</dd>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/04-Objects/formatObject.md">formatObject</a></dt>
      <dd>Formats the object-type data.</dd>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/04-Objects/getObjectNonNullValuesCount.md">getObjectNonNullValuesCount</a></dt>
      <dd>Returns the count of non-null values of specified object.</dd>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/04-Objects/getObjectValueByDotSeparatedPathSafely.md">getObjectValueByDotSeparatedPathSafely</a></dt>
      <dd>Accesses to nested object without risk being thrown the error when some property does not exist.</dd>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/04-Objects/iterateObjectSkippingNullValues.md">iterateObjectSkippingNullValues</a></dt>
      <dd>Iterates the object's keys and values skipping entries with null value.</dd>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/04-Objects/overrideObject.md">overrideObject</a></dt>
      <dd>Overrides object herewith unlike native <b>merge</b>/<b>extend</b> works correctly with nested objects.</dd>
    </dl>
  </li>

  <li>
    <b>Arrays</b>
    <dl>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/05-Arrays/arrayConstructor__POLYFILL.md">arrayConstructor__POLYFILL</a></dt>
      <dd>The workaround for <a href="https://github.com/stylus/stylus/issues/2582">Unsolicited two-dimensional array when trying to declare the plain one-dimensional array</a> issue.</dd>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/05-Arrays/getFirstNonNullArrayElement.md">getFirstNonNullArrayElement</a></dt>
      <dd>Returns first non-null element of the array or null if there are no such elements.</dd>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/05-Arrays/getLengthOfPrimitivesArray.md">getLengthOfPrimitivesArray</a></dt>
      <dd>Returns the elements count of array of strings, numbers or booleans.</dd>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/05-Arrays/hasPrimitivesArraySpecifiedElement.md">hasPrimitivesArraySpecifiedElement</a></dt>
      <dd>Checks has certain array of strings/numbers/booleans the specified element.</dd> 
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/05-Arrays/iterate2DimensionalArray.md">iterate2DimensionalArray</a></dt>
      <dd>Iterates the 2-dimensional array supporting single element case.</dd> 
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/05-Arrays/iterateAssociativeArray.md">iterateAssociativeArray</a></dt>
      <dd>Iterates the associative array supporting single element case.</dd>
    </dl>
  </li>
  
  <li>
    <b>Parameters validation</b>
    <dl>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/06-ParametersValidation/validateObjectTypeParameter.md">validateObjectTypeParameter</a></dt>
      <dd>Validating of the parameters of function and mixins.</dd>
    </dl>
  </li>

  <li>
    <b>Other</b>
    <dl>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/07-OtherFunctions/buildBEM_ClassName.md">buildBEM_ClassName</a></dt> 
      <dd>Builds BEM class according specified block, element and modifier.</dd>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/07-OtherFunctions/substituteNull.md">substituteNull</a></dt>
      <dd>Substitutes the second argument's value when first one is `null`.</dd>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/07-OtherFunctions/buildCalcExpression.md">buildCalcExpression</a></dt>
      <dd>Generates <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/calc()"><code>calc()</code></a> expression; interpolation is available.</dd>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/07-OtherFunctions/log.md">log</a></dt>
      <dd>Makes log output to console. Unlike native similar <b>p()</b> build-in function formats the objects.</dd>    
    </dl>
  </li>

</ul>


###### Utility mixins

<ul>

  <li>
    <b>General</b>
    <dl>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/00-GeneralUtils/applyIfNotNull.md">applyIfNotNull</a></dt>
      <dd>Adds each specified CSS property to target ruleset when it is not null. Intended to be used in cases when CSS values are being retrieved via variables/parameters thus unknown in advance.</dd>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/00-GeneralUtils/applyIfNotZero.md">applyIfNotZero</a></dt>
      <dd>Adds each specified CSS property to target ruleset when it is not zero. Intended to be used in cases when CSS values are being retrieved via variables/parameters thus unknown in advance.</dd>
    </dl>
  </li>
  <li>
    <b>Sizing</b>
    <ul>
      <li>
        <b>Width</b>
        <dl>
          <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/01-Sizing/01-Width/WidthSizing.md">WidthSizing</a></dt>
          <dd>Alternative to native CSS approach of width specifying intended to be used in customizable UI components development.</dd>
          <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/01-Sizing/01-Width/fillViewportWidthIgnoringParentPaddings.md">fillViewportWidthIgnoringParentPaddings</a></dt>
          <dd>Makes element fill the viewport's width ignoring parent's side paddings with some limitations.</dd>
          <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/01-Sizing/01-Width/TableCellWidthSizing.md">TableCellWidthSizing</a></dt>
          <dd>Allows to define the width, borders and paddings of table cell by various combinations of properties.</dd>
        </dl>
      </li>  
      <li>
        <b>Borders</b>
        <dl>
          <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/01-Sizing/03-Borders/BordersSizing.md">BordersSizing</a></dt>
          <dd>Alternative to native CSS approach of specifying of the border width (thickness) and radius intended to be used in customizable UI components development.</dd>
          <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/01-Sizing/03-Borders/BordersFilletsRadius.md">Border fillets radius</a></dt>
          <dd>Allows to define the top, bottom, left or right fillets radius.</dd>
        </dl>
      </li>
      <li>
        <b>Paddings</b>
        <dl>
          <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/01-Sizing/04-Paddings/Paddings.md">Paddings</a></dt>
          <dd>Alternative to native CSS approach of paddings specifying intended to be used in customizable UI components development.</dd>
        </dl>
      </li>
    </ul>
  </li>
  <li>
    <b>Positioning</b>
    <dl>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/02-Positioning/centerHorizontallyWithoutWrapper.md">centerHorizontallyWithoutWrapper</a></dt>
      <dd>Centering of the block or inline-block elements without wrapper.</dd>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/02-Positioning/placeToRight.md">placeToRight</a></dt>
      <dd>Places the element to right side or the container by relative positioning and <code>transform</code>.</dd>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/02-Positioning/VerticallyCenteredAbsolutelyPositionedBlock.md">VerticallyCenteredAbsolutelyPositionedBlock</a></dt>
      <dd>Centers vertically the absolutely positioned block.</dd>
    </dl>
  </li>
  <li>
    <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/03-PositionalRelationship.md">Positional relationship</a>
    <dl>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/03-PositionalRelationship.md#positionalrelationship-mixin">PositionalRelationship</a></dt>
      <dd>Low-level mixin for the defining of the space between two or more elements.</dd>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/03-PositionalRelationship.md#retirefrom-mixin">retireFrom</a></dt>
      <dd>Allows to define how much element <b>B</b> must retire from <b>A</b> by top/left margin.</dd>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/03-PositionalRelationship.md#pushtargetfromself-mixin">pushTargetFromSelf</a></dt>
      <dd>Allows to define how much element <b>B</b> must push <b>A</b> from self by <b>A</b>'s top/left margin.</dd>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/03-PositionalRelationship.md#retirefromelementwithsameselector-mixin">retireFromElementWithSameSelector</a></dt>
      <dd>Allows to define how much certain element must retire from other element with same selector.</dd>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/03-PositionalRelationship.md#whenitgoingfirst-mixin">whenItGoingFirst</a></dt>
      <dd>Allows to define CSS properties for certain element when it is going first in some container.</dd>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/03-PositionalRelationship.md#whenitgoinglast-mixin">whenItGoingLast</a></dt>
      <dd>Allows to define CSS properties for certain element when it is going last in some container.</dd>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/03-PositionalRelationship.md#whenitjustafter">whenItJustAfter</a></dt>
      <dd>Allows to specify any CSS properties for element <b>B</b> when it is going after element <b>A</b>.</dd>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/03-PositionalRelationship.md#whentargetgoingjustafterit">whenTargetGoingJustAfterIt</a></dt>
      <dd>Allows to specify any CSS properties for the target element <b>X</b> when it is going after currently being declared element.</dd>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/03-PositionalRelationship.md#whentargetwithsameselectorgoingjustafterit">whenTargetWithSameSelectorGoingJustAfterIt</a></dt>
      <dd>The equivalent of <code>+whenTargetGoingJustAfterIt({ targetElementSelector: ".X" })</code> for the case when reference element's selector is also <b>.X</b>.</dd>
    </dl>
  </li>
  <li>
    <b>Layout</b>
    <dl>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/05-Layout/CenteredContentWithComputedHorizontalPaddings.md">CenteredContentWithComputedHorizontalPaddings</a></dt>
      <dd>Centering of the element by computed horizontal symmetric paddings. Intended applied to the page containers on wide screens.</dd>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/05-Layout/Centerer.md">Centerer</a></dt>
      <dd>Centering of the block elements with `auto` margins, minimal and maximal widths. Intended to be applied to containers.</dd>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/05-Layout/fillBodyVertically.md">fillBodyVertically</a></dt>
      <dd>Fills "body" when "body" and "html" takes 100% of viewport's height as minimum with or without vertical scrolling availability.</dd>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/05-Layout/FixedTranslucentDimLayer.md">FixedTranslucentDimLayer</a></dt>
      <dd>The mixin intended to be applied to <b>div</b> element to overlap the other content which translucent dim layer. Such element is being frequently used as underlay for modal dialogs.</dd>
    </dl>
  </li>
  <li>
    <b>Typography</b>
    <dl>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/05-TypographyUtils/SingleLineTextElementOverflowSafety.md">SingleLineTextElementOverflowSafety</a></dt>
      <dd>Provides the text overflow safety for single-line elements</dd>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/05-TypographyUtils/MultiLineTextElementOverflowSafetyWithoutExtraSpaceCausedByLineHeight.md">MultiLineTextElementOverflowSafetyWithoutExtraSpaceCausedByLineHeight</a></dt>
      <dd>Defines the font size and line height, herewith there will not be extra vertical space above first line and below last line caused by "line-height".</dd>
    </dl>
  </li>
  <li>
    <b>Other</b>
    <dl>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/06-RestUtils/provideClippedShadowsAndOutlinesVisibility.md">provideClippedShadowsAndOutlinesVisibility</a></dt>
      <dd>The ugly but still no-alternatives solution of clipped by <code>overflow</code> shadows and outlines problem.</dd>
      <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/06-RestUtils/Sprite.md">Sprite</a></dt>
      <dd>Mixin for the making of the element to sprite.</dd>
    </dl>
  </li>
</ul>


###### Styles initialization

<dl>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/04-StylesInitialization/CrossBrowserStylesReset.md">CrossBrowserStylesReset</a></dt>
  <dd>The resetting of browser dependent styles and some usually redefinable styles like default margins of <code>body</code> based on <a href="https://meyerweb.com/eric/tools/css/reset/">Eric Mayer's <b>Reset CSS</b></a>.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/04-StylesInitialization/InitialGlobalCSS_Rules.md">InitialGlobalCSS_Rules</a></dt>
  <dd>Some basic CSS rules like default font size and default line height intended to be applying directly after <b>CrossBrowserStylesReset</b>.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/04-StylesInitialization/ButtonLikeElementsPrimer.md">ButtonLikeElementsPrimer</a></dt>
  <dd>Resets all styles which usually pre-defined on buttons and similar elements such as the target element becomes even with unstyled span.</dd>

</dl>



##### Build-in plugins

###### Additional color palettes

* [FlatUI_Colors](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/03-BuildInPlugins/ColorPalettes/FlatUI/FlatUI_ColorsPalette.md)
* [MaterialDesignColors](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/03-BuildInPlugins/ColorPalettes/MaterialDesign/MaterialDesignColorsPalette.md)


##### Components

<dl>
  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Components/OverflowSafeSingleLineLabel/OverflowSafeSingleLineLabel.md">OverflowSafeSingleLineLabel</a></dt>
  <dd>Improved solution of <a href="https://stackoverflow.com/questions/68667208/keep-hanging-characters-visible-in-spite-of-line-height-1-and-overflow-hidd">horizontal text overflow safety of single line labels</a> problem.</dd>
</dl>
