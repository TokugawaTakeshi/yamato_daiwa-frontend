# Value checkers

## `isTrue`/`isFalse`

```stylus
if definedVariable

  p("Obviously, it will be printed to console.")


if undefinedVariable

  p("It will be printed too because 'typeof(undefinedVariable)' is 'ident' it means not falsy.")


// If you prefer 'undefinedVariable == true', it all right but '@yamato-daiwa/frontend' suggests 'isTrue' and 'isFalse'
// checkers
if (isTrue(undefinedVariable))

  p("It will not be printed because 'undefinedVariable' is not true.")
  error("Test has been failed.")


else if (isFalse(undefinedVariable))

  p("It will not be printed because 'undefinedVariable' is not false.")
  error("Test has been failed.")


else

  p("It will be printed if 'undefinedVariable' is neither true nor false")
```

Output:

```
inspect: "Obviously, it will be printed to console."
inspect: "It will be printed too because 'typeof(undefinedVariable)' is 'ident' it means not falsy."
inspect: "It will be printed if 'undefinedVariable' is neither true nor false"
```


## Others

The names of below functions has been developed such as everything must be obvious without explanations.
If it not such as, please open the issue with title "[FunctionName]: Unclear name".

* `isNull(value)`
* `isNotNull(value)`
* `isString(value)`
* `isEmptyString(value)`
* `isUnitlessNumber(value)`
* `isBoolean(value)`
* `isObject(value)`
