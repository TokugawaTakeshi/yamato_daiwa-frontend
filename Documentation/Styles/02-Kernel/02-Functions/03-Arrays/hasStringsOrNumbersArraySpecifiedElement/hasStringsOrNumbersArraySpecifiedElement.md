# `hasStringsOrNumbersArraySpecifiedElement` Has the array of strings or numbers specified element

```
hasStringsOrNumbersArraySpecifiedElement(targetArray: Array<string | number>, targetElement: string | number): boolean
```

```stylus
sample1 = "ALPHA" "BRAVO" "CHARLIE"
hasStringsOrNumbersArraySpecifiedElement(sample1, "BRAVO") // => true
hasStringsOrNumbersArraySpecifiedElement(sample1, "DELTA") // => false


// Single-element arrays support
sample2 = "ALPHA"
hasStringsOrNumbersArraySpecifiedElement(sample2, "ALPHA") // => true
hasStringsOrNumbersArraySpecifiedElement(sample2, "BRAVO") // => false
```
