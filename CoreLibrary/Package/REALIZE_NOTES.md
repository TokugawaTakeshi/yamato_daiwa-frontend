## New functionality

## Assets

### Color palettes

* [**PracticalColorCoordinateSystem**]((https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/01-Assets/03-Colors/PracticalColorCoordinateSystem/PracticalColorCoordinateSystem.md)) 
  Color palette of Practical Color Coordinate System (PCCS) 
* [**FlatUI_Colors**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/03-BuildInPlugins/ColorPalettes/FlatUI/FlatUI_ColorsPalette.md)
  First version of color palette introduced in [flatuicolors.com](https://flatuicolors.com/). 


## Variables

* [MAIN_SANS_SERIF_FONT_STACK](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/01-BasicVariables/01-BasicVariables.md#font-stacks)
* [MAIN_SERIF_FONT_STACK](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/01-BasicVariables/01-BasicVariables.md#font-stacks)
* [MAIN_MONOSPACED_FONT_STACK](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/01-BasicVariables/01-BasicVariables.md#font-stacks)


## Functions
### Values checkers

* [**isNonEmptyString**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md)
* [**isDimensionalOrDimensionlessAmount**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md)
* [**isDimensionalAmount**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md)
* [**isNaturalNumber**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/01-ValueCheckers.md#isnaturalnumber)


## Mixin utils

* [**BordersSizing**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/03-UtilityMixins/01-Sizing/03-Borders/BordersSizing.md)
  The alternative to native CSS method of defining of the border width (thickness) and radius intended to be used in customizable components development.


### Strings

* [**capitalizeFirstLatinCharacter**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/03-Strings/capitalizeFirstLatinCharacter.md)
  Capitalizes first lowercase latin character (a-z) of the string.

### Objects

* [formatObject](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/02-Functions/04-Objects/formatObject.md)
  Beautifies the object (hash).


## Improvements

* [SingleLineTextElementOverflowSafety](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/02-Kernel/05-TypographyUtils/SingleLineTextElementOverflowSafety.md) 
  Provides the text overflow safety for single-line elements

## Breaking changes

### Assets

* **ShadeOfGray__{NUMBER}--W3C_Palette** has been replaced with the array **ShadesOfGray__39ColorsW3C_Palette** of 39
  elements (from **0** to **38**). Reason: striving to organize logically related variables to enumerations and arrays.
  Please check [updated documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/01-Assets/03-Colors/ShadesOfGray__39ColorsW3C_Palette/ShadesOfGray__39ColorsW3C_Palette.md)
  for details.
* **{COLOR_NAME}__Base--MaterialDesignColor** and **{COLOR_NAME}__{COLOR_CODE}--MaterialDesignColor** has been replaces
  with the object **MaterialDesignColors.{TONE}.{COLOR_CODE}** (where **TONE** is the past **COLOR_NAME** in 
  [camel case](https://en.wikipedia.org/wiki/Camel_case)). Reason: striving to organize logically related variables to
  enumerations and arrays. Please check [updated documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/03-BuildInPlugins/ColorPalettes/MaterialDesign/MaterialDesignColorsPalette.md)
  for details.
* **NN--TemporaryHighlighting** has been replaced with the object **TemporaryHighlighting.{TONE}.{OPACITY}**. Reason: 
  striving to organize logically related variables to enumerations and arrays. Please check [updated documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Styles/01-Assets/03-Colors/TemporaryHighlighting/TemporaryHighlighting.md)
  for details.
* Variables **GRID_MINIMAL_WIDTH** and **GRID_MAXIMAL_WIDTH** has been removed. Reason: these values are layout-dependent
  while multiple layouts per website/web application are usual. 
* All fonts assets has been removed. Reason: unlike colors such big number of fonts does not require even on prototyping stage.
  For prototype, default sans-serif, serif and monospace fonts are enough while for the final design forts are being decided
  by designer. If you are want removed fonts for some reasons, we appended the code listing with removed declarations of 
  font stacks. Variables **MAIN_SANS_SERIF_FONT_STACK** (even with **MAIN_FONT_STACK** as default), **MAIN_SERIF_FONTS_STACK**, 
  **MAIN_MONOSPACED_FONTS_STACK** has been prepared instead and could be overwritten.
* **unit** and **unitlessNumber** has been removed from **DataTypes** enumeration. **dimensionalAmount** and 
  **dimensionlessAmount** has been added instead, but it is not just renaming. Reason: it is required to clearly 
  discriminate dimensional and dimensionless values for the development of the future functionality, while **unit** 
  term is pretty ambiguous is Stylus.


### Basic variables

* The default value of **BASIC_LINE_HEIGHT_IN_MULTILINE_TEXT_BLOCKS** has been changes from absolute **20px** to relative
  **1.4** value. Reason: better adaptivity and flexibility.
* The default value of **BEM_ELEMENT_SEPARATOR** has been changed to `__` and default value of **BEM_MODIFIER_SEPARATOR**
  has been changed to **BEM_MODIFIER_SEPARATOR**. Reason: alignment with standard convention of BEM developers


### Functions
#### Value checkers

* **isUnitlessNumber** has been renamed to **isDimensionlessAmount**. Reason: there is no antonym of **unitless** including
  **unit** root. Now, whew this function has been renamed to **isDimensionlessAmount**, it is clear that **isDimensionalAmount**
  is antonym.

#### Arrays

* **getStringsOrNumbersArrayLength** has been renamed to **getLengthOfPrimitivesArray**. Reason: "primitives" is correct
  generalizing term in Stylus context.
* **hasStringsOrNumbersArraySpecifiedElement** has been renamed to **hasPrimitivesArraySpecifiedElement**. Reason: "primitives"
  is correct generalizing term in Stylus context.

#### Parameters validation

* **validateObjectTypeParameter** has been replaced with **validateObjectTypeParameter** which has more reach functionality
including nested objects support.

#### Other functions 

* **buildBEM_Class** has been renamed to **buildBEM_ClassName**.
* **substituteWhenNull** has been renamed to **substituteNull**.


### Mixins

* **widthSizing** has been renamed to **WidthSizing**
* In **WidthSizing** (**widthSizing** in the past)
  * **leftOrRightEqualBordersWidths** has been renamed to **leftOrRightSymmetricBordersWidths**
  * **leftOrRightEqualPaddings** has been renamed to **leftOrRightSymmetricPaddings**
* The properties **leftOrRightEqualBordersWidths** and **leftOrRightEqualPaddings** of **TableCellWidthSizing** mixin
  has been renamed to **leftOrRightSymmetricBordersWidths** and **leftOrRightSymmetricPaddings** respectively. Reason:
  unification to **symmetric** word.
* **SingleLineElementOverflowTolerance** has been replaced with to **SingleLineTextElementOverflowSafety**
* **MultilineTextWithoutExtraSpaceCausedByLineHeight** has been renamed to **MultiLineTextElementOverflowSafetyWithoutExtraSpaceCausedByLineHeight**
