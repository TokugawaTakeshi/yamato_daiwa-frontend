# `iterate2DimensionalArray` Iterates 2-dimensional array

Iterates the array consisting of nested arrays with arbitrary elements count.
Has the same effect as `for element, index in targetArray` until elements count became 1.

```stylus
sample1 = (11 "ALPHA" true { hash: 1 }) ("BRAVO" 22 false)

iterate2DimensionalArray(sample1, @(nestedArray, index){
  p("Element No. " + index + ":")
  p(nestedArray)
})
```

Output: 

```
'Element No. 0:'
11 "ALPHA" true {"hash":"(1)"}
'Element No. 1:'
"BRAVO" 22 false
```

## Single-element arrays support

Regular `for/in` iteration:

```stylus
sample2 = (11 "ALPHA" true { hash: 1 })

for nestedArray, index in sample1

  p("Element No. " + index + ":")
  p(nestedArray)
```

As it can be seen on the output Stylus iterated one-dimensional array `11 "一" true { hash: 1 }` instead on two-dimensional
array with single element `(11 "一" true { hash: 1 })`.

```
'Element No. 0:'
11
'Element No. 1:'
"ALPHA"
'Element No. 2:'
true
'Element No. 3:'
{"hash":"(1)"}
```

Because `iterate2DimensionalArray` assumes that the argument is always the 2-dimensional array, it will be only one
iteration for single-element array:

```stylus
sample2 = (11 "ALPHA" true { hash: 1 })

iterate2DimensionalArray(sample2, @(nestedArray, index){
  p("Element No. " + index + ":")
  p(nestedArray)
})
```

Output:

```
'Element No. 0:'
inspect: 11 "ALPHA" true {"hash":"(1)"}
```
