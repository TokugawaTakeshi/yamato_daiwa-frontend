# @yamato-daiwa/frontend

<div style="border: 1px solid #F1C40F; padding: 12px 14px">
  ⚠ Currently the library is under development.
</div>


Currently the toolkit for the frontend development with [Stylus](https://github.com/stylus/stylus/) pre-processor.


## Installation

```
npm i @yamato-daiwa/frontend -E
```


## Temporary simple documentation

Please refer to this documentation during the official documentation is under development.


### Get functionality

```stylus
@require "PATH_TO_NODE_MODULES/@yamato-daiwa/frontend/Functionality.styl"
```

### Table of contents

* Assets
  * [📖 Basic constants](Documentation/Styles/01-Assets/01-BasicConstants/BasicConstants.md)
  * [📖 Font stacks](Documentation/Styles/01-Assets/02-FontStacks/FontStacks.md)
  * [📖 Colors](Documentation/Styles/01-Assets/03-Colors/Colors.md)
  
* [📖 Basic variables](Documentation/Styles/02-Kernel/01-BasicVariables/BasicVariables.md)

* Functions
  
  * [📖 Value checkers](Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers/ValueCheckers.md) 
  * [📖 Value converters](Documentation/Styles/02-Kernel/02-Functions/02-ValueConverters/ValueConverters.md)
    
  * Arrays
    * [📖 `arrayConstructor__POLYFILL`](Documentation/Styles/02-Kernel/02-Functions/03-Arrays/arrayConstructor__POLYFILL/arrayConstructor__POLYFILL.md)
      Fixes the [Unsolicited two-dimensional array when trying to declare the plain one-dimensional array](https://github.com/stylus/stylus/issues/2582) issue.
    * [📖 `getFirstNonNullArrayElement`](Documentation/Styles/02-Kernel/02-Functions/03-Arrays/getFirstNonNullElement/getFirstNonNullArrayElement.md)
      Returns first non-null element for array or null if no such elements.
    * [📖 `getStringsOrNumbersArrayLength`](Documentation/Styles/02-Kernel/02-Functions/03-Arrays/getStringsOrNumbersArrayLength/getStringsOrNumbersArrayLength.md)
      Returns the elements count of array of strings of numbers.
    * [📖 `hasStringsOrNumbersArraySpecifiedElement`](Documentation/Styles/02-Kernel/02-Functions/03-Arrays/hasStringsOrNumbersArraySpecifiedElement/hasStringsOrNumbersArraySpecifiedElement.md)
      Checks has certain array of strings of numbers the specified element.
    * [📖 `iterate2DimensionalArray`](Documentation/Styles/02-Kernel/02-Functions/03-Arrays/iterate2DimensionalArray/iterate2DimensionalArray.md)
      Iterate the 2-dimensional array supporting single-element case.
    * [📖 `iterateAssociativeArray`](Documentation/Styles/02-Kernel/02-Functions/03-Arrays/iterateAssociativeArray/iterateAssociativeArray.md)
      Iterates associative array supporting single-element case.
      
  * Objects (hashes)
    * [📖 `getObjectValueByDotSeparatedPathSafely`](Documentation/Styles/02-Kernel/02-Functions/04-Objects/getObjectValueByDotSeparatedPathSafely/getObjectValueByDotSeparatedPathSafely.md)
      Accesses to nested object (hash) without risk being throw the error when some property does not exist. 
    * [📖 `deeplyCloneObject`](Documentation/Styles/02-Kernel/02-Functions/04-Objects/deeplyCloneObject/deeplyCloneObject.md)
      Creates the autonomous clone of the object. 


### Motivation

It is considered that the programming in the overkill for creating of stylesheets.
Maybe is so until writing the flexible and customizable UI framework.

The `@yamato-daiwa/frontend` synthetically improving the programming functionality of Stylus pre-processor
allows flexibly work with unknown at-advance data, namely the customization data from the framework users.


### Roadmap

#### Functions

The functions are the utilities for the future flexible UI-kit.

##### Objects

* `overrideObject` (next realize)
* `deeplyCloneAndOverrideObject` (next realize)
* `getNonNullObjectValuesCount`
* `iterateObjectSkippingNullValues`


##### Parameters validation

The parameters validation is important for the mixins with flexible customization therefore a lot of parameters/properties.


#### Utility mixins

##### Common

* `applyIfNotNull`
* `applyIfNotZero`
* `TextTruncation`


##### Width sizing

* `specifyWidthSizing` helper function
* `WidthSizing` mixin 
* `fillViewportWidthIgnoringParentPaddings`
* `TableCellSizing`


##### Height sizing

* `specifyHeightSizing` helper function
* `computeHeightByHeightSizingSpecification` helper function
* `HeightSizing` mixin


##### Borders and padding


For the none-library projects, just `padding` and `border` properties could be enough, but this functionality is targeting to
component development 

* `specifyBorderRadius`
* `applyBorderRadiusSpecification`
* `specifyBorders` helper function
* `applyBordersSpecification`
* `BorderTopFilletsRadius`/`BorderBottomFilletsRadius`/`BorderLeftFilletsRadius`/`BorderRightFilletsRadius`
* `specifyPaddings` helper function
* `applyPaddingsSpecification`
* `EqualLeftAndRightPaddings`
* `EqualTopAndBottomPaddings`


#### Positioning

Horizontal and vertical centering, placing to right without wrappers.

* `HorizontalCenteringWithoutWrapper`
* `CenteredContentWithComputedSidePaddings`
* `VerticallyCenteredAbsolutelyPositionedBlock`
* `placeToRight`


#### Positional relationship

The `margin-top` and `margin-bottom` are being frequently set to the elements like `p`, `h1`, `h2` etc. in UI frameworks.
However, we can not know at advance it which environment those elements will be used, which element will precede and which
element will be after.

Below mixins will allow to define which element must to retire from other element selectively.

* `PositionalRelationship`
* `retireFrom`
* `pushTargetFromSelf`
* `pushTargetWithSameSelectorFromSelf`
* `whenItJustAfter`
* `whenTargetGoingJustAfterIt`
* `whenTargetWithSameSelectorGoingJustAfterIt`
