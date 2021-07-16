# Parameters validation

## Single Object of Parameters

### Guide

#### Optional parameter

If the `parametersObject` is optional, specify the empty object as default value:

```stylus
buildBEM_Class(parametersObject = {}, restParameters__MUST_NOT_BE...)

  // ..
```

If don't do this, the Stylus will throw the native error before validation starts:

```
argument "parametersObject" required for buildBEM_Class(parametersObject, restParameters__MUST_NOT_BE)
```


#### Prevent the subsequent parameter

Specify the subsequent parameter (suggested name: `restParameters__MUST_NOT_BE`) using the Stylus
[rest parameters literal](https://stylus-lang.com/docs/vargs.html) and pass it to `validateSingleParametersObject`:

```stylus
buildBEM_Class(parametersObject, restParameters__MUST_NOT_BE...)

  validateSingleParametersObject({
    targetObject: parametersObject,
    restParameters: restParameters__MUST_NOT_BE,
    // ...
  })
```

If user will specify more that one parameter, validator will throw below error:


```stylus
buildBEM_Class({}, "ALPHA")
```

```
The function/mixin 'buildBEM_Class' must have exactly one parameter, of object type.
Please check it's specification:
// ...
```

#### Each property checking

##### Requirement check

Set `required: true` for desired property to mark it as required:

```stylus
buildBEM_Class(parametersObject, restParameters__MUST_NOT_BE...)

  validateSingleParametersObject({
    targetObject: parametersObject,
    propertiesSpecification: {
      block: {
        type: DataTypes.string,
        required: true
      },
      element: {
        type: DataTypes.string,
        required: false
      },
      modifier: {
        type: DataTypes.string,
        required: false
      }
    },
    restParameters: restParameters__MUST_NOT_BE,
    mixinOrFunctionName: "buildBEM_Class"
  })
```

If it will be omitted the error like below will be thrown:


##### Default value

Specify the `default` value which will be substituted when target property will be omitted in the property specification.

```stylus
validateSingleParametersObject({
  targetObject: parametersObject,
  propertiesSpecification: {
    block: {
      type: DataTypes.string,
      required: true
    },
    element: {
      type: DataTypes.string,
      required: false
    },
    modifier: {
      type: DataTypes.string,
      required: false
    },
    elementSeparator: {
      type: DataTypes.string,
      defaultValue: BEM_ELEMENT_SEPARATOR
    },
    modifierSeparator: {
      type: DataTypes.string,
      defaultValue: BEM_ELEMENT_SEPARATOR
    }
  },
  restParameters: restParameters__MUST_NOT_BE,
  mixinOrFunctionName: "buildBEM_Class"
})
```

```stylus
p(buildBEM_Class({
  block: "Component",
  element: "Element",
  modifier: "Modifier",
  elementSeparator: "--",
  modifierSeparator: "_"
})) // => "Component--Element_Modifier"


p(buildBEM_Class({
  block: "Component",
  element: "Element",
  modifier: "Modifier"
})) // => "Component-Element-Modifier"
```


##### Type checking

Specify the `type` of each property specification.

```stylus
buildBEM_Class(parametersObject, restParameters__MUST_NOT_BE...)

  validateSingleParametersObject({
    targetObject: parametersObject,
    propertiesSpecification: {
      block: {
        type: DataTypes.string,
        required: true
      },
      element: {
        type: DataTypes.string,
        required: false
      },
      modifier: {
        type: DataTypes.string,
        required: false
      }
    },
    restParameters: restParameters__MUST_NOT_BE,
    mixinOrFunctionName: "buildBEM_Class"
  })
```

If it will be violated, the error as below will be thrown.

```stylus
p(buildBEM_Class({ block: 1 }))
```

```
The property 'block' in parameters object of mixin/function 'buildBEM_Class' must be a string, but really it's has type 'unit' and value: 1
```
