# `substituteWhenNull` 

```
substituteWhenNull<NonNullable>(targetValue: NonNullable | null, defaultValue: NonNullable): NonNullable
```

Substitutes the second parameter `defaultValue` when the first parameter `targetValue` is explicit null or not defined
variable.

```stylus
sample1 = "ALPHA"
sample2 = null

p(substituteWhenNull(sample1, "BRAVO"))  // => "ALPHA" ("sample1" is defined, no need to substitute the default value)
p(substituteWhenNull(sample2, "BRAVO"))  // => "BRAVO" ("sample2" is explicit null, default value has been substituted)
p(substituteWhenNull(sample3, "BRAVO"))  // => "BRAVO" ("sample3" is not defined, default value has been substituted)
```
