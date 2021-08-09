# `widthSizing`

```
widtnSizing(parametersObject: {
  fixedWidth?: DataTypes.unit;
  minimalWidth?: DataTypes.unit;
  maximalWidth?: DataTypes.unit;
  takeMaximumSpaceAsPossible?: DataTypes.boolean;
  truncateOnOverflow?: DataTypes.boolean;
  displayEllipsisOnOverflow?: DataTypes.unit;
  leftOrRightEqualBordersWidths?: DataTypes.unit;
  leftBorderWidth?: DataTypes.unit
  rightBorderWidth?: DataTypes.unit
  explicitBorderNoneDeclarationRequired?: DataTypes.unit;
  leftOrRightEqualPaddings?: DataTypes.unit;
  leftPadding?: DataTypes.unit;
  rightPadding?: DataTypes.unit;
  explicitPaddingZeroDeclarationRequired?: DataTypes.boolean;
})
```

Alternative width specifying approach intended to be used in frameworks development.
It is implied that all of about values are unknown at advance.

Planning to use for GUI components which will be added in the future.


## Examples

### Define fixed width

```stylus
.Element1

  widthSizing({ fixedWidth: 120px })
```


### Define minimal and maximal width

```stylus
.Element2

  widthSizing({
    minimalWidth: 120px,
    maximalWidth: 240px
  })
```

Add `takeMaximumSpaceAsPossible: true` to make `.Element2-1` take `240px` while parent element allowing.

Note that `fixedWidth` is incompatible with `minimalWidth` and `maximalWidth` and vice versa.


### Define equal borders and paddings

```stylus
.Element3

  widthSizing({
    leftOrRightEqualBordersWidths: 1px,
    leftOrRightEqualPaddings: 8px
  })
```


### Define borders and paddings individually

```stylus
.Element4

  widthSizing({
    leftBorderWidth: 1px,
    rightBorderWidth: 2px,
    leftPadding: 8px,
    rightPadding: 12px
  })
```

### Disabling borders and paddings

Some elements, e. g. `button`s or `input`s has browser-dependent borders and paddings.
The `.Element5-1` ruleset will not change them.

```stylus
.Element5-1
  
  widthSizing({ fixedWidth: 200px })
```

If you want set paddings at appropriate side to `none` when `leftBorderWidth`, `rightBorderWidth` or 
`leftOrRightEqualBordersWidths` are implicit `null` (it means "not specified" for Stylus) or explicit `null`,
set `explicitBorderNoneDeclarationRequired` flag to `true`.

There is similar flag `explicitPaddingZeroDeclarationRequired` for paddings, but when `leftPadding`, `rightPadding`
or `leftOrRightEqualPaddings` are `null` the appropriate CSS property will be set to `0`.

```stylus
.Element5-2

  widthSizing({
    fixedWidth: 200px,
    explicitBorderNoneDeclarationRequired: true,
    explicitPaddingZeroDeclarationRequired: true
  })
```

Output:

```stylus
.Element5-2 {
  width: 200px;
  border-left: none;
  border-right: none;
  padding-left: 0;
  padding-right: 0;
}
```


```stylus
.Element5-3

  widthSizing({
    explicitBorderNoneDeclarationRequired: true,
    leftBorderWidth: 1px,
    explicitPaddingZeroDeclarationRequired: true,
    rightPadding: 12px
  })
```

Output:

```stylus
.Element5-3 {
  border-left-width: 1px;
  border-right: none;
  padding-left: 0;
  padding-right: 12px;
}
```
