# @yamato-daiwa/frontend

<div style="border: 1px solid #F1C40F; padding: 12px 14px">
  ⚠ Currently the library is under development.
</div>


Toolkit for the frontend development with Pug and Stylus pre-processors.


## Installation

```
npm i @yamato-daiwa/frontend -E
```


## Temporary simple documentation

Refer to this documentation until the official documentation is under development.


### Stylus

#### Get functionality

```stylus
@require "PATH_TO_NODE_MODULES/@yamato-daiwa/frontend/Functionality.styl"
```


#### Constants

##### Narrowest screen width unit

`NARROWEST_SCREEN_WIDTH_UNIT` equals `320px`.
It's iPhone screens width and currently just a small percentage of mobile devices has narrower screens.

The maximal width of layout grid frequently set to multiple of `NARROWEST_SCREEN_WIDTH_UNIT`:

* 2 * NARROWEST_SCREEN_WIDTH_UNIT = 640px
* 3 * NARROWEST_SCREEN_WIDTH_UNIT = 960px
* 4 * NARROWEST_SCREEN_WIDTH_UNIT = 1280px


##### Stylus data types

Pseudo enumeration including the data types of Stylus pre-processor.

```
DataTypes = {
  unit: "unit",
  string: "string",
  boolean: "boolean",
  object: "object"
}
```


#### Colors

##### Shades of gray W3C palette

Based on shades of gray palette posted in [W3C Schools website](https://www.w3schools.com/colors/colors_shades.asp).
Includes 39 shades of gray (the `NUMBER` if from 0 to 38).

```
ShadeOfGray__{NUMBER}--W3C_Palette
```

##### Material Design

```
{COLOR_NAME}__Base--MaterialDesignColor
{COLOR_NAME}__{COLOR_CODE}--MaterialDesignColor
```

Available `COLOR_NAME` values:

* `Red`
* `Pink`
* `Purple`
* `DeepPurple`
* `Indigo`
* `Blue`
* `LightBlue`
* `Cyan`
* `Teal`
* `Green`
* `LightGreen`
* `Lime`
* `Yellow`
* `Amber`
* `Orange`
* `DeepOrange`
* `Brown`
* `Grey`
* `BlueGrey`

Available `COLOR_CODE` values:

* P50
* P100
* P200
* P300
* P400
* P500
* P600
* P700
* P800
* P900
* A100 (Except `Brown`, `Grey`, `BlueGrey`)
* A200 (Except `Brown`, `Grey`, `BlueGrey`)
* A300 (Except `Brown`, `Grey`, `BlueGrey`)
* A400 (Except `Brown`, `Grey`, `BlueGrey`)

For example:

* `Red__Base--MaterialDesignColor`
* `Pink__P300--MaterialDesignColor`
* `Purple__A200--MaterialDesignColor`

Full information about Material Design color palette you can check in 
[Material Design official website](https://material.io/archive/guidelines/style/color.html#color-color-palette). 


##### Semitransparent color for temporary highlighting

Generally most of `div`s and other HTML elements has not the background to border.
Below semitransparent colors allows to visualize the elements boundaries, but those are not aimed in production code.

```
{COLOR}__Opacity{OPACITY}Percents--TemporaryHighlighting
```

Available `COLOR` values: 

* `Red`
* `Orange`
* `Yellow`
* `Green`
* `Cyan`
* `Blue`
* `Magenta`
* `Purple`

Available `OPACITY` values:

* 10
* 25
* 50
* 75


#### Font stacks

Based on data from [cssfontstack.com](https://www.cssfontstack.com/).
Usage example: 

```stylus
.Article

  font-family Arial--FontsStack 
```


##### SansSerif

* `NativeSansSerif--FontsStack`
* `Arial--FontsStack`
* `ArialBlack--FontsStack`
* `ArialNarrow--FontsStack`
* `ArialRoundedMT_Bold--FontsStack`
* `Calibri--FontsStack`
* `Candara--FontsStack`
* `CenturyGothic--FontsStack`
* `CenturyGothic--FontsStack`
* `FranklinGothic--FontsStack`
* `Futura--FontsStack`
* `Geneva--FontsStack`
* `GillSans--FontsStack`
* `Helvatica--FontsStack`
* `Impact--FontsStack`
* `LucidaGrande--FontsStack`
* `Optima--FontsStack`
* `SegoeUI--FontsStack`
* `Tahoma--FontsStack`
* `TrebuchetMS--FontsStack`
* `Verdana--FontsStack`
* `MS_SansSerif--FontsStack`


##### Serif

* `BigCaslon--FontsStack`
* `BodoniMT--FontsStack`
* `BookAntiqua--FontsStack`
* `CalistoMT--FontsStack`
* `Cambria--FontsStack`
* `Didot--FontsStack`
* `Garamond--FontsStack`
* `Georgia--FontsStack`
* `GoudeOldStyle--FontsStack`
* `HoeflerText--FontsStack`
* `LucidaBright--FontsStack`
* `LucidaSans--FontsStack`
* `Palatino--FontsStack`
* `Perpetua--FontsStack`
* `Rockwell--FontsStack`
* `RockwellExtraBold--FontsStack`
* `Baskerville--FontsStack`
* `TimesNewRoman--FontsStack`
* `MS_Serif--FontsStack`


##### Monospace

* `Consolas--FontsStack`
* `CourierNew--FontsStack`
* `LucidaConsole--FontsStack`
* `LucidaSansTypewriter--FontsStack`
* `Monaco--FontsStack`
* `AdaleMono--FontsStack`


##### Other font stacks

* `Copperplate--FontsStack`
* `Papyrus--FontsStack`
* `BrushScriptFont--FontsStack`
* `ComicSans--FontsStack`


#### Japanese

* `CommonGothics--FontsStack`
* `MeiryoUI--FontsStack`
* `Gyoshotai--FontsStack`
* `Kyokashotai--FontsStack`


##### Japanese language support

Monospace fonts are being frequently used for code listings.
Basically those are support only alphabetic characters, but the code could include characters of other languages
(for example in comments and string literals).

In the case of Japanese language, if to use `Consolas--FontsStack` (`Consolas, monaco, monospace`) for listing
with Japanese characters, default font for these characters will be used and basically is pretty rough.
Below stacks are including the fallback smooth font (Meiryo UI) for the characters which monospace font does not cover.

* `Consolas__SmoothJapaneseSymbols--FontsStack`
* `CourierNew__SmoothJapaneseSymbols--FontsStack`
* `LucidaConsole__SmoothJapaneseSymbols--FontsStack`
* `LucidaSansTypewriter__SmoothJapaneseSymbols--FontsStack`
* `Monaco__SmoothJapaneseSymbols--FontsStack`
* `AdaleMono__SmoothJapaneseSymbols--FontsStack`


##### Fallback font for other languages

Please feel free to suggest the fonts stack like `Consolas__SmoothJapaneseSymbols--FontsStack` for other languages.
No need to waste your time for the forking of repository and creating the pull request - just suggest it in
[issues](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/issues).


#### Value checkers

## `isTrue`/`isFalse`

```stylus
definedVariable = true

if definedVariable
    
  p("Obviously, it will be printed to console")
  
  
if undefinedVariable

  p("It will be printed too because 'typeof(undefinedVariable)' is 'ident' it means not falsy.")


// If you prefer 'undefinedVariable == true', it all right but '@yamato-daiwa/frontend' suggests 'isTrue' and 'isFalse'
// checkers
if (isTrue(undefinedVariable))

  p("Expected that it will not be printed")


else if (isFalse(undefinedVariable))

  p("Expected that it will not be printed")
  

else

  p("It will be printed")
```


## Others

* `isNull(value)`
* `isNotNull(value)`
* `isString(value)`
* `isEmptyString(value)`
* `isUnitlessNumber(value)`
* `isBoolean(value)`
* `isObject(value)`
