# @yamato-daiwa/frontend - [YDF]

[![NPM Version](https://img.shields.io/npm/v/@yamato-daiwa/frontend)](https://www.npmjs.com/package/@yamato-daiwa/frontend)
[![IntelliJ IDEA plugin](https://img.shields.io/badge/IntelliJ_IDEA-Official_Plugin-088BF8.svg?style=flat)](https://plugins.jetbrains.com/plugin/17677-yamato-daiwa-frontend)

The toolkit for the frontend development with [Pug](https://pugjs.org/api/getting-started.html) and 
[Stylus](https://github.com/stylus/stylus/) pre-processors.

Currently, most of the functionality has the auxiliary role, but in the future GUI components will be added.

[🛣️ Roadmap](https://yamato-daiwa.myjetbrains.com/youtrack/agiles/121-8/current)

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

#### Assets

* [📖 Basic constants](Documentation/Styles/01-Assets/BasicConstants.md)
* [📖 Font stacks](Documentation/Styles/01-Assets/02-FontStacks/FontStacks.md)
* [📖 Colors](Documentation/Styles/01-Assets/03-Colors/Colors.md)
  
* [📖 Basic variables](Documentation/Styles/02-Kernel/01-BasicVariables/BasicVariables.md)


#### Functions

##### Value checkers
    
* [`isTrue`/`isFalse`](Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers/isTrueIsFalse.md)
* [`isString(value)`](Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers/isNullIsNotNull.md)
* `isEmptyString(value)`
* `isUnitlessNumber(value)`
* `isBoolean(value)`
* `isObject(value)`
* `isIdentifier(value)`

##### Value converters

The names of below functions has been developed such as everything must be obvious without explanations.
If it not such as, please open the issue with title "[FunctionName]: Unclear name".

* `emptyStringToNull(value)`
* `nullToZero(value)`
* `nullToEmptyString(value)`
    
##### Strings
    
* [📖 `buildString`](Documentation/Styles/02-Kernel/02-Functions/03-Strings/buildString/buildString.md)
  Allows to create the dynamic strings using the [ES6 Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).  

##### Objects (hashes)
    
* [📖 `deeplyCloneAndOverrideObject`](Documentation/Styles/02-Kernel/02-Functions/04-Objects/deeplyCloneAndOverrideObject/deeplyCloneAndOverrideObject.md)
  Allows to clone and immediately override the object without affecting to initial object.
* [📖 `deeplyCloneObject`](Documentation/Styles/02-Kernel/02-Functions/04-Objects/deeplyCloneObject/deeplyCloneObject.md)
  Creates the deep copy object the object.
* [📖 `getObjectNonNullValuesCount`](Documentation/Styles/02-Kernel/02-Functions/04-Objects/getObjectNonNullValuesCount/getObjectNonNullValuesCount.md)
  Returns the count of non-null values of specified object.
* [📖 `getObjectValueByDotSeparatedPathSafely`](Documentation/Styles/02-Kernel/02-Functions/04-Objects/getObjectValueByDotSeparatedPathSafely/getObjectValueByDotSeparatedPathSafely.md)
  Accesses to nested object (hash) without risk being throw the error when some property does not exist.
* [📖 `iterateObjectSkippingNullValues`](Documentation/Styles/02-Kernel/02-Functions/04-Objects/iterateObjectSkippingNullValues/iterateObjectSkippingNullValues.md)
  Iterates the object's keys and values skipping entries with `null` value.
* `formatObject` Stringifies and formats object for logging

##### Arrays
    
* [📖 `arrayConstructor__POLYFILL`](Documentation/Styles/02-Kernel/02-Functions/05-Arrays/arrayConstructor__POLYFILL/arrayConstructor__POLYFILL.md)
  Fixes the [Unsolicited two-dimensional array when trying to declare the plain one-dimensional array](https://github.com/stylus/stylus/issues/2582) issue.
* [📖 `getFirstNonNullArrayElement`](Documentation/Styles/02-Kernel/02-Functions/05-Arrays/getFirstNonNullElement/getFirstNonNullArrayElement.md)
  Returns first non-null element for array or null if no such elements.
* [📖 `getStringsOrNumbersArrayLength`](Documentation/Styles/02-Kernel/02-Functions/05-Arrays/getStringsOrNumbersArrayLength/getStringsOrNumbersArrayLength.md)
  Returns the elements count of array of strings of numbers.
* [📖 `hasStringsOrNumbersArraySpecifiedElement`](Documentation/Styles/02-Kernel/02-Functions/05-Arrays/hasStringsOrNumbersArraySpecifiedElement/hasStringsOrNumbersArraySpecifiedElement.md)
  Checks has certain array of strings of numbers the specified element.
* [📖 `iterate2DimensionalArray`](Documentation/Styles/02-Kernel/02-Functions/05-Arrays/iterate2DimensionalArray/iterate2DimensionalArray.md)
  Iterate the 2-dimensional array supporting single-element case.
* [📖 `iterateAssociativeArray`](Documentation/Styles/02-Kernel/02-Functions/05-Arrays/iterateAssociativeArray/iterateAssociativeArray.md)
  Iterates associative array supporting single-element case.

##### Logging

* [📖 `log`](Documentation/Styles/02-Kernel/02-Functions/07-OtherFunctions/log.md)
  Makes log output to console. Unlike native similar `p` function formats the objects.

##### Parameters validation

* [📖 `validateSingleParametersObject`](Documentation/Styles/02-Kernel/02-Functions/06-ParametersValidation/validateSingleParametersObject.md)
  Validating of the parameters of function and mixins.
      

##### Other

  * [`buildBEM_Class`](Documentation/Styles/02-Kernel/02-Functions/07-OtherFunctions/buildBEM_Class.md) 
    Builds BEM class according specified block, element and modifier.
  * [`substituteWhenNull`](Documentation/Styles/02-Kernel/02-Functions/07-OtherFunctions/substituteWhenNull.md) 
    Substitutes the second argument's value when first one is `null`
  * [`buildCalcExpression`](Documentation/Styles/02-Kernel/02-Functions/07-OtherFunctions/buildCalcExpression.md)
    Generates [`calc()`](https://developer.mozilla.org/en-US/docs/Web/CSS/calc()) expression; interpolation
    is available.

#### Mixins

##### Basic

* [📖 `applyIfNotNull`](Documentation/Styles/02-Kernel/03-Mixins/applyIfNotNull.md) 
  adds each specified CSS property to target ruleset when if it's not null. Intended to be used in cases when CSS values 
  are unknown in advance.
* [📖 `applyIfNotZero`](Documentation/Styles/02-Kernel/03-Mixins/applyIfNotZero.md) 
  adds each specified CSS property to target ruleset when if it's not zero. Intended to be used in cases when CSS values 
  are unknown in advance.

##### Width sizing

* [📖 `widthSizing`](Documentation/Styles/02-Kernel/03-Mixins/01-Sizing/01-WidthSizing/widthSizing.md)
  Alternative width specifying approach intended to be used in frameworks development.
* `fillViewportWidthIgnoringParentPaddings` Takes 100% of viewport in spite of parent element's paddings.
* [📖 `TableCellWidthSizing`](Documentation/Styles/02-Kernel/03-Mixins/01-Sizing/01-WidthSizing/TableCellWidthSizing.md) 
  Allows to define the width, borders and paddings of table cell by various combinations of parameters.

#### Paddings

* [📖 `Paddings` mixin](Documentation/Styles/02-Kernel/03-Mixins/03-Paddings.md)
  The alternative to native CSS method of defining of the paddings intended to be used in customizable components development.


##### Positional relationship

* [📖 Introduction](Documentation/Styles/02-Kernel/03-Mixins/06-PositionalRelationship/PositionalRelationship.md) 
* [📖 `PositionalRelationship` mixin](Documentation/Styles/02-Kernel/03-Mixins/06-PositionalRelationship/PositionalRelationship.md#positionalrelationship-mixin)
  Low-level mixin for the defining of the vertical space between two or more elements.
* [📖 `retireFrom` mixin](Documentation/Styles/02-Kernel/03-Mixins/06-PositionalRelationship/PositionalRelationship.md#retirefrom-mixin)
  Allows to define how much element `B` must retire from `A` by top/left margin.
* [📖 `pushTargetFromSelf` mixin](Documentation/Styles/02-Kernel/03-Mixins/06-PositionalRelationship/PositionalRelationship.md#pushtargetfromself-mixin)
  Allows to define how much element `B` must push `A` from self by `A`'s top/left margin.
* [📖 `retireFromElementWithSameSelector` mixin](Documentation/Styles/02-Kernel/03-Mixins/06-PositionalRelationship/PositionalRelationship.md#retirefromelementwithsameselector-mixin)
  Allows to define how much certain element must retire from other element with same selector.
* [📖 `whenItGoingFirst` mixin](Documentation/Styles/02-Kernel/03-Mixins/06-PositionalRelationship/PositionalRelationship.md#whenitgoingfirst-mixin)
  Allows to define CSS properties for certain element when it is going first in some container.
* [📖 `whenItGoingLast` mixin](Documentation/Styles/02-Kernel/03-Mixins/06-PositionalRelationship/PositionalRelationship.md#whenitgoinglast-mixin)
  Allows to define CSS properties for certain element when it is going last in some container.
* [📖 `whenItJustAfter` mixin](Documentation/Styles/02-Kernel/03-Mixins/06-PositionalRelationship/PositionalRelationship.md#whenitjustafter)
  Allows to specify any CSS properties for element `B` when it is going after element `A`.
* [📖 `whenTargetGoingJustAfterIt` mixin](Documentation/Styles/02-Kernel/03-Mixins/06-PositionalRelationship/PositionalRelationship.md#whentargetgoingjustafterit)
  Allows to specify any CSS properties for the target element `X` when it is going after currently being declared element.
* [📖 `whenTargetWithSameSelectorGoingJustAfterIt` mixin](Documentation/Styles/02-Kernel/03-Mixins/06-PositionalRelationship/PositionalRelationship.md#whentargetwithsameselectorgoingjustafterit)
  The equivalent of `+whenTargetGoingJustAfterIt({ targetElementSelector: ".X" })` for the case when reference element's selector is also `.X`.


##### Layout

* [📖 `fillBodyVertically`](Documentation/Styles/02-Kernel/03-Mixins/05-Layout/fillBodyVertically.md)
  Fills `<body>` when `<body>` and `<html>` takes 100% of viewport's height as minimum with or without vertical scrolling
  availability.

##### Typography

* [📖 `SingleLineElementOverflowTolerance`](Documentation/Styles/02-Kernel/03-Mixins/07-Typography/SingleLineElementOverflowTolerance.md)
* [📖 `MultilineTextWithoutExtraSpaceCausedByLineHeight`](Documentation/Styles/02-Kernel/03-Mixins/07-Typography/MultilineTextWithoutExtraSpaceCausedByLineHeight.md)
  Defines the font size and line height, herewith there will not be extra vertical space above first line and below last
  line caused by `line-height`. Prevents overflow.



#### Components

* [📖 `OverflowSafeSingleLineLabel`](Documentation/Components/OverflowSafeSingleLineLabel/OverflowSafeSingleLineLabel.md)
  Improved solution of
  [horizontal text overflow safety of single line labels](https://stackoverflow.com/questions/68667208/keep-hanging-characters-visible-in-spite-of-line-height-1-and-overflow-hidd)
  problem.


### Motivation

It is considered that the programming in the overkill for creating of stylesheets.
Maybe is so until writing the flexible and customizable UI framework.

The `@yamato-daiwa/frontend` synthetically improving the programming functionality of Stylus pre-processor
allows flexibly work with unknown at-advance data, namely the customization data from the framework users.
