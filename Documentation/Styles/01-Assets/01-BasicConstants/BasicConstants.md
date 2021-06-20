# Basic constants

Because the Stylus pre-processor does not allow to define the readonly variables, the `contant` term is conventional.


## Narrowest screen width unit

`NARROWEST_SCREEN_WIDTH_UNIT` is equals equals `320px`.
It's the iPhone 5 screens width and currently just a small percentage of mobile devices has narrower screens.

Is responsive/adaptive layout, the minimal grid width frequently being set to `NARROWEST_SCREEN_WIDTH_UNIT` and maximal 
grid width is being frequently set to multiple of `NARROWEST_SCREEN_WIDTH_UNIT`:

* `2 * NARROWEST_SCREEN_WIDTH_UNIT = 640px`
* `3 * NARROWEST_SCREEN_WIDTH_UNIT = 960px`
* `4 * NARROWEST_SCREEN_WIDTH_UNIT = 1280px`


## Stylus data types

Pseudo enumeration including the data types of Stylus pre-processor.

```stylus
DataTypes = {
  unit: "unit",
  string: "string",
  boolean: "boolean",
  object: "object"
}
```
