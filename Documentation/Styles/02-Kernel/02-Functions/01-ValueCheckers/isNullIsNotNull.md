# `isNull`/`isNotNull` value checkers

`isNull(sample)`/`isNotNull(sample)` are not always equivalent to `sample == null`/`sample != null` is some cases.
Currently found out some caveat with rest parameters.
See below experiments report for details.


### Case 1: original null

```stylus
p("--- Sample 1 ---------------------")
sample1 = null
p(sample1)
p(typeof(sample1))
p(sample1 == null)
p(typeof(sample1) == "null")
```

In this case everyting works as expected:

```
inspect: "--- Sample 1 ---------------------"
inspect: null
inspect: 'null'
inspect: true
inspect: true
```


### Case 2: non-existing object property

```stylus
p("--- Sample 2 ---------------------")
sample2 =  {}
p(sample2.nonExistingProperty)
p(typeof(sample2.nonExistingProperty))
p(sample2.nonExistingProperty == null)
p(typeof(sample2.nonExistingProperty) == "null")
```

In this case everyting works as expected:

```
inspect: "--- Sample 2 ---------------------"
inspect: null
inspect: 'null'
inspect: true
inspect: true
```

### Case 3: function/mixin with rest parameters only

Strange things begins here.

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

Although `sample3 == null`, the `typeof(sample3) == "null"` is `true`:

```
inspect: "--- Sample 3 ---------------------"
inspect: ()
inspect: 'null'
inspect: false
inspect: true
```

### Case 4: function/mixin with rest parameters in subsequent position

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

The `p(sample4)` has been ignored. THe `typeof(sample4) == "null"` is `true` but `sample4 == null` is `false`.


### Conclusions

Above experiments shows that `sample1 == null` check is not safe.
`typeof(sample4) == "null"` is more reliable. `isNull` makes is shorter.
