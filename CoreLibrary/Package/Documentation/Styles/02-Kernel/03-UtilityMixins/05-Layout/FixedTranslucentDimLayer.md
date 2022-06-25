# `FixedTranslucentDimLayer`

```
FixedTranslucentDimLayer({
  ZIndex: DataTypes.unit = ZIndexes.blockingOverlay,
  backgroundColor: DataTypes.colorDefinition = rgba(black, 0.25)
})
```

The mixin intended to be applied to `div` element to overlap the other content which translucent dim layer.
Such element is frequently being used as underlay for modal dialogs.

```stylus
.ModalDialog

  &-DimUnderlay

    FixedTranslucentDimLayer({
      ZIndex: 1,
      backgroundColor: rgb(255, 255, 128)
    })
```
