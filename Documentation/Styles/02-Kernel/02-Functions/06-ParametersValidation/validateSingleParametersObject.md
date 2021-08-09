# Parameters validation

## Single Object of Parameters

Stylus pre-processor supports the named parameters:

```stylus
exampleMixin(alpha = 1, bravo = "foo", charlie = false)
```

However, the engineer is free specify the keys and values when call tre function/mixin, of values only:

```stylus
exampleMixin(1, "foo", false)
```

Most engineers prefers quick-and-dirty coding rather than invest the efforts and time to maintainability including readability.
The **single object of parameters** pattern together with validation no leave choice to engineer specify keys on no -
those must be specified now:

```stylus
exampleMixin({
  alpha: 1, 
  bravo: "foo", 
  charlie: false
})
```

### Validation guide

#### Optional single object of parameter

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

If user will specify more that one parameter like:

```stylus
buildBEM_Class({}, "ALPHA")
```

the validator will throw below error:


```
The function/mixin 'buildBEM_Class' must have exactly one parameter, of object type.
Please check it's specification:
// ...
```

#### Checking of each property

##### Requirement check

* Set `required: true` for desired property to mark it as required.
* It it's optional, you can skip the `required: false`:

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
        type: DataTypes.string
      }
    },
    restParameters: restParameters__MUST_NOT_BE,
    mixinOrFunctionName: "buildBEM_Class"
  })
```

If thr required parameter will be omitted like:

```stylus
buildBEM_Class({ element: "Icon" })
```

the error like below will be thrown:

```
The property 'block' in parameters object of mixin/function 'buildBEM_Class' is required, but really it's omited or explicitly set 'null'.
    at validateSingleParametersObject() (Styles/02-Kernel/02-Functions/06-ParametersValidation.styl:2:1)
    at buildBEM_Class() (Styles/02-Kernel/02-Functions/07-OtherFunctions.styl:15:1)
```


##### Default value

Specify the `default` value which will be substituted when target property will be omitted in the property specification.
Don't specify the `required: true` or `required: false` if you defined the `defaultValue`.

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
      defaultValue: BEM_MODIFIER_SEPARATOR
    }
  },
  restParameters: restParameters__MUST_NOT_BE,
  mixinOrFunctionName: "buildBEM_Class"
})
```

Testing:

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

If it will be violated like:

```stylus
p(buildBEM_Class({ block: 1 }))
```

the error as below will be thrown:

```
The property 'block' in parameters object of mixin/function 'buildBEM_Class' must be a string, but really it's has type 'unit' and value: 1
```


##### Properties incompatibility

For the specific property, set the array of incompatible properties names to `incompatibleWith`:

```stylus
widthSizing(specification, restParameters__MUST_NOT_BE...)

  validateSingleParametersObject({
    targetObject: specification,
    propertiesSpecification: {
      fixedWidth: {
        type: DataTypes.unit,
        incompatibleWith: "minimalWidth" "maximalWidth"
      },
      minimalWidth: {
        type: DataTypes.unit
      },
      maximalWidth: {
        type: DataTypes.unit
      },
      // ...
    },
    restParameters: restParameters__MUST_NOT_BE,
    mixinOrFunctionName: "widthSizing"
  })
```

Now, if incompatible properties will be specified like:

```stylus
widthSizing({
  fixedWidth: 100px,
  minimalWidth: 80px
})
```

the error like below will the thrown:


```
The property 'fixedWidth' is incompatible with property 'minimalWidth' for the function/mixin 'widthSizing'
```
