# Basic variables

Below variable should be changes only one time before styles declaration (or should not be changed if you are satisfied
width default values).


## Grid width

| Variable name | [Type](../../01-Assets/BasicConstants.md#stylus-data-types) | Default value |
|---|---|---|
| `GRID_MINIMAL_WIDTH` | `DataTypes.unit` | [`NARROWEST_SCREEN_WIDTH_UNIT`](../../01-Assets/BasicConstants.md#narrowest-screen-width-unit) |
| `GRID_MAXIMAL_WIDTH` | `DataTypes.unit`  | [`4 * NARROWEST_SCREEN_WIDTH_UNIT`](../../01-Assets/BasicConstants.md#narrowest-screen-width-unit) |


## Typography

| Variable name | [Type](../../01-Assets/BasicConstants.md#stylus-data-types) | Default value |
|---|---|---|
| `MAIN_FONT_STACK` | `DataTypes.unit` | [`NativeSansSerif--FontsStack`](../../01-Assets/02-FontStacks/FontStacks.md) |
| `BASIC_FONT_SIZE` | `DataTypes.unit` | `14px` |
| `BASIC_LINE_HEIGHT` | `DataTypes.unit` | `1` |
| `BASIC_FONT_SIZE_IN_MULTILINE_TEXT_BLOCKS` | `DataTypes.unit` | `14px` |
| `BASIC_LINE_HEIGHT_IN_MULTILINE_TEXT_BLOCKS` | `DataTypes.unit` | `20px` |


## Z-Indexes

The `ZIndexes` is a pseudo enumerate.

| Enumerate element | Default value |
|---|---|
| `ZIndexes.floatingNotifications` | `60` |
| `ZIndexes.blockingOverlay` | `50` |
| `ZIndexes.floatingAboveModalsComponents` | `40` |
| `ZIndexes.modalsUnderlay` | `30` |
| `ZIndexes.floatingBelowModalsComponents` | `20` |
| `ZIndexes.drawers` | `10` |
| `ZIndexes.lowermostLayer` | `0` |


## BEM Related

✏ [BEM (Block, Element, Modifier)](https://en.bem.info/methodology/) is the methodology of front-end development 
of websites and web applications.


| Variable name | [Type](../../01-Assets/BasicConstants.md#stylus-data-types) | Default value |
|---|---|---|
| `BEM_ELEMENT_SEPARATOR` | `DataTypes.string` | `-`
| `BEM_MODIFIER_SEPARATOR` | `DataTypes.string`  | `__`
