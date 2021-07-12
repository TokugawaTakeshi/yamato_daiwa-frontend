# `getFirstNonNullArrayElement` Retrieving of first non-null element of array

Returns first non-null element for array or null if no such elements.


```stylus
sample1 = null null "ALPHA" null "BRAVO"
p(getFirstNonNullArrayElement(sample1)); // => "ALPHA"

sample2 = null null null
p(getFirstNonNullArrayElement(sample2)); // => null
```
