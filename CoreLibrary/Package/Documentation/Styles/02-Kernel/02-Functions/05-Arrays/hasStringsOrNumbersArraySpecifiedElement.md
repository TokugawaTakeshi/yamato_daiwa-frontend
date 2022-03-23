# `hasStringsOrNumbersArraySpecifiedElement` Has the array of strings or numbers specified element

[![Official IntelliJ IDEA plugin live template](https://img.shields.io/badge/IntelliJ_IDEA_Live_Template-hasStringsOrNumbersArraySpecifiedElement-blue.svg?style=flat)](https://plugins.jetbrains.com/plugin/17677-yamato-daiwa-frontend)

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
