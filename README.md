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


#### Value checkers

* `isNull(value)`
* `isNotNull(value)`
* `isString(value)`
* `isEmptyString(value)`
* `isUnitlessNumber(value)`
* `isBoolean(value)`
* `isObject(value)`
