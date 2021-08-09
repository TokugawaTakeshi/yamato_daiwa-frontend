# `TableCellWidthSizing`

```
specifyWidthSizing({
  fixedTotalWidth?: DataTypes.unit;
  totalMinimalWidth?: DataTypes.unit;
  totalMaximalWidth?: DataTypes.unit;
  fixedContentWidth?: DataTypes.unit;
  contentMinimalWidth?: DataTypes.unit;
  contentMaximalWidth?: DataTypes.unit;
  leftOrRightEqualBordersWidths?: DataTypes.unit;
  leftBorderWidth?: DataTypes.unit;
  rightBorderWidth?: DataTypes.unit;
  leftOrRightEqualPaddings?: DataTypes.unit;
  leftPadding?: DataTypes.unit;
  rightPadding?: DataTypes.unit;
  truncateOnOverflow?: DataTypes.boolean;
  displayEllipsisOnOverflow?: DataTypes.boolean;
})
```

Allows to define the width, borders and paddings of table cell by various combinations of parameters.
For example, you can specify...

**Note** Because to define the table's column width it's required to define one of its cell width, the *cell width*
and *column width* cold be equivalent. Herewith the defining of different width of cells same column is incorrect
from the viewpoint of HTML/CSS.

**Note** Before define the table geometry, be sure that [`table-layout`](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout) 
property has been set to desired value (`fixed` for defining the column width by first cell of this column). 


## Frequent pattens
### Fixed total cell width 

```stylus
.TableCell1

  TableCellWidthSizing({
    fixedTotalWidth: 220px,
    leftBorderWidth: 1px,
    leftPadding: 6px,
    rightPadding: 8px,
    rightBorderWidth: 2px
  })
```

Do not set fixed total width to each cell (column) because will become unresponsive!
It's recommended to set the fixed width for narrow cells (columns) only.


### Compute cell width based on content, border and paddings widths

The `fixedContentWidth` is how much horizontal space you need between left and right paddings.
The `width` property will be computed basing on `fixedContentWidth` and paddings and/or borders widths.

```stylus
.TableCell2-1

  TableCellWidthSizing({
    fixedContentWidth: 120px,
    leftBorderWidth: 1px,
    leftPadding: 6px,
    rightPadding: 8px,
    rightBorderWidth: 2px
  })
```

You can mix the difference units:

```stylus
.TableCell2-2

  TableCellWidthSizing({
    fixedContentWidth: 10ch,
    leftBorderWidth: 1px,
    leftPadding: 0.75rem,
    rightPadding: 0.45rem,
    rightBorderWidth: 2px
  })
```

### Minimal and maximal content width

```stylus
.TableCell3

  TableCellWidthSizing({
    contentMinimalWidth: 120px,
    contentMaximalWidth: 140px,
    leftBorderWidth: 1px,
    leftPadding: 6px,
    rightPadding: 8px,
    rightBorderWidth: 2px
  })
```

In this case:

* `min-width` will be computed basing on specified `contentMinimalWidth`, borders, and paddings
* `max-width` will be computed basing on specified `contentMaximalWidth`, borders, and paddings
