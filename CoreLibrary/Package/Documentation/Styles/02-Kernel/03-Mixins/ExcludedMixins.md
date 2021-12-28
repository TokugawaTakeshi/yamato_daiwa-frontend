# Excluded mixins

Below mixin has not been included for various reasons. However, if you are need one of them,you can use below code.

## `TwoSpacedItemsComposition`

```stylus
TwoSpacedItemsComposition(parametersObject, restParameters__MUST_NOT_BE...)

  validateSingleParametersObject({
    targetObject: parametersObject,
    propertiesSpecification: {
      minimalHorizontalSpaceBetweenItems: {
        required: false,
        type: DataTypes.unit
      },
      verticalSpaceBetweenItems: {
        required: false,
        type: DataTypes.unit
      }
    },
    restParameters: restParameters__MUST_NOT_BE,
    mixinOrFunctionName: "TwoSpacedItemsComposition" 
  })


  display flex
  flex-wrap wrap
  justify-content space-between
  align-items center

  margin-top: -(parametersObject.verticalSpaceBetweenItems)
  margin-left: -(parametersObject.minimalHorizontalSpaceBetweenItems)


  >*

    margin-top: parametersObject.verticalSpaceBetweenItems
    margin-left: parametersObject.minimalHorizontalSpaceBetweenItems


    &:last-child

      margin-left auto
```
