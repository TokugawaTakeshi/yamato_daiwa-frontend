# Value checkers

All value checkers returns **true** when the first and only parameter matches with expected type, otherwise returns **false**.

* isNull
* isNotNull
* isString
* isEmptyString
* isNonEmptyString
* isDimensionalOrDimensionlessQuantity
* isDimensionalAmount
* isDimensionlessQuantity
* isNaturalNumber
* isBoolean
* isTrue
* isFalse
* isObject
* isIdentifier

All of above function has [Live Templates](https://www.jetbrains.com/help/idea/using-live-templates.html) in
[official IntelliJ IDEA plugin](https://plugins.jetbrains.com/plugin/17677-yamato-daiwa-frontend), but the abbreviations
are even with function name - it compensates the poor Stylus autocomplete in the integrated development environments of
IntelliJ IDEA family.


## Notable checkers
### isNull / isNotNull

`isNull(sample)`/`isNotNull(sample)` are *not* always equivalent to `sample == null`/`sample != null`.
Currently, found out some caveat with rest parameters.
See below experiments report for details.

#### Case 1: original null

```stylus
p("--- Sample 1 ---------------------")
sample1 = null
p(sample1)
p(typeof(sample1))
p(sample1 == null)
p(typeof(sample1) == "null")
```

In this case everything works as expected:

```
inspect: "--- Sample 1 ---------------------"
inspect: null
inspect: 'null'
inspect: true
inspect: true
```


#### Case 2: non-existing object property

```stylus
p("--- Sample 2 ---------------------")
sample2 =  {}
p(sample2.nonExistingProperty)
p(typeof(sample2.nonExistingProperty))
p(sample2.nonExistingProperty == null)
p(typeof(sample2.nonExistingProperty) == "null")
```

In this case everything works as expected:

```
inspect: "--- Sample 2 ---------------------"
inspect: null
inspect: 'null'
inspect: true
inspect: true
```

#### Case 3: function/mixin with rest parameters only

Strange things begins here:

```stylus
p("--- Sample 3 ---------------------")
sampleFunction1(parameters...)

  sample3 = parameters

  p(sample3)
  p(typeof(sample3))
  p(sample3 == null)
  p(typeof(sample3) == "null")

sampleFunction1()
```

Although `sample3 == null`, the `typeof(sample3) == "null"` (null wrapped by string literal) is `true`:

```
inspect: "--- Sample 3 ---------------------"
inspect: ()
inspect: 'null'
inspect: false
inspect: true
```

#### Case 4: function/mixin with rest parameters in subsequent position

```stylus
p("--- Sample 4 ---------------------")
sampleFunction2(parameter, restParameters...)

  sample4 = restParameters

  p("Checkpoint1")
  p(sample4)
  p("Checkpoint2")
  p(typeof(sample4))
  p(sample4 == null)
  p(typeof(sample4) == "null")

sampleFunction2("TEST")
```

The `p(sample4)` has been ignored. The `typeof(sample4) == "null"` is `true` but `sample4 == null` is `false`.


#### Conclusions

Above experiments shows that `sample1 == null` check is not safe.
`typeof(sample4) == "null"` is more reliable. `isNull` makes is shorter.


### isTrue / isFalse

Being type-unsafe language, Stylus as all popular CSS pre-processors has coercion of non-boolean values to
booleans (for example in conditional statements). However sometimes it could confuse. For example, the statement
`is someVariable` will be truthy (in Stylus language) if **someVariable** has not been initialized. To avoid this confusion,
it is safer to check explicitly like `someVariable == true` or `someVariable == false`, but `isTrue(someVariable)` and
`isFalse(someVariable)` is alternative.

```stylus
definedVariable = true

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


### isDimensionalAmount / isDimensionlessQuantity / isDimensionalOrDimensionlessQuantity

For the Stylus, both `typeof(2)` (dimensionless amount example) and `typeof(2px)` (dimensional amount example) are `"unit"`.
**isDimensionalAmount** and **isDimensionlessQuantity** could distinguish these two cases. Additionally, 
**isDimensionalOrDimensionlessQuantity** is equivalent of `typeof(value) == "unit"`.

It is also required to respect that units could be omitted for 0 case is CSS.
When expect the amount as parameter, you must to agree consider 0 as dimensional amount or no.
That is why `isDimensionalAmount` has second parameter, but to make it's meaning clear without documentation, it has object type.


```stylus
p(isDimensionalOrDimensionlessAmount(2px))  // => true
p(isDimensionalAmount(2px, { considerDimensionlessZeroAsDimensionalAmount: true }))      // => true
p(isDimensionlessAmount(2px, { considerDimensionlessZeroAsDimensionlessAmount: true }))  // => false

p(isDimensionalOrDimensionlessAmount(2))    // => true
p(isDimensionalAmount(2, { considerDimensionlessZeroAsDimensionalAmount: true }))    // => false
p(isDimensionlessAmount(2))  // => true

p(isDimensionalAmount(0, { considerDimensionlessZeroAsDimensionalAmount: true }))    // => true
p(isDimensionalAmount(0, { considerDimensionlessZeroAsDimensionalAmount: false }))   // => false
p(isDimensionlessAmount(0))  // => true
p(isDimensionlessAmount(0))  // => true
```


### isNaturalNumber

According Math, the <dfn>natural number</dfn> is the numbers for counting of real objects and ordering beings from 1.
Please note that 0 is not a natural number.

```stylus
p(isNaturalNumber(1))       // => true

p(isNaturalNumber(0))      // => false
p(isNaturalNumber(1.1))     // => false
p(isNaturalNumber(1e+1))      // => false
p(isNaturalNumber(-1))      // => false
```
