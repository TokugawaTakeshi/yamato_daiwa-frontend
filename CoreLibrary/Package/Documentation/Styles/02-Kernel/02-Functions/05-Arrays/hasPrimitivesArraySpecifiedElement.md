# `hasPrimitivesArraySpecifiedElement` Has the array of strings/numbers/booleans specified element

[![Official IntelliJ IDEA plugin live template](https://img.shields.io/badge/IntelliJ_IDEA_Live_Template-hasPrimitivesArraySpecifiedElement-blue.svg?style=flat)](https://plugins.jetbrains.com/plugin/17677-yamato-daiwa-frontend)

```
hasPrimitivesArraySpecifiedElement(targetArray: Array<string | number | boolean>, targetElement: string | number | boolean): boolean
```

```stylus
sample1 = "ALPHA" "BRAVO" "CHARLIE"
hasPrimitivesArraySpecifiedElement(sample1, "BRAVO") // => true
hasPrimitivesArraySpecifiedElement(sample1, "DELTA") // => false


// Single-element arrays support
sample2 = "ALPHA"
hasPrimitivesArraySpecifiedElement(sample2, "ALPHA") // => true
hasPrimitivesArraySpecifiedElement(sample2, "BRAVO") // => false
```
