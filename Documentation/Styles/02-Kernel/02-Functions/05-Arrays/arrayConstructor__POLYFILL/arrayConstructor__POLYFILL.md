# `arrayConstructor__POLYFILL`

Fixes the [Unsolicited two-dimensional array when trying to declare the plain one-dimensional array](https://github.com/stylus/stylus/issues/2582)
issue. No comments about this phenomenon has been left from the Styles maintenance team (last check: 26 June 2021).


```stylus
borderRadiusSpecification = {
  all: null,
  topSideFillets: null,
  leftSideFillets: null,
}

p(borderRadiusSpecification.all borderRadiusSpecification.topSideFillets borderRadiusSpecification.leftSideFillets)
// => (null) ((null) ((null)))
```

The second and third element has been braced. The `arrayConstructor__POLYFILL` solves it.

```stylus
p(arrayConstructor__POLYFILL(borderRadiusSpecification.all, borderRadiusSpecification.topSideFillets, borderRadiusSpecification.leftSideFillets))
// => null (null) (null)
```

## Investigations report

There no documentation there has been clarified what means the curly braces (please let to know if it has been added).
In [Build-in function](https://stylus-lang.com/docs/bifs.html) section, there are some mentions of so-called "pairs":

> ## keys(pairs)
> Return keys in the given pairs:
>
> ```stylus
> pairs = (one 1) (two 2) (three 3)
> keys(pairs)
> // => one two three
> ```
>
> ## values(pairs)
> Return values in the given pairs:
>
> ```stylus
> pairs = (one 1) (two 2) (three 3)
> values(pairs)
> // => 1 2 3
> ```
>
> [Stylus documentation](https://stylus-lang.com/docs/bifs.html)


However, the experiments detects that each braces group could contain more than two elements:

```stylus
sample = ("one" 11 "ALPHA") ("two" 22 "BRAVO") ("three" 33 "CHARLIE")

p(sample) // => ("one" 11 "ALPHA") ("two" 22 "BRAVO") ("three" 33 "CHARLIE")
p(keys(sample)) // => "one" ("two") ("three")
p(values(sample)) // => ("one" 11 "ALPHA") ("two" 22 "BRAVO") ("three" 33 "CHARLIE")
```

Currently, it's completely undefined why the values in below example has been braced.  

```stylus
p(borderRadiusSpecification.all borderRadiusSpecification.topSideFillets borderRadiusSpecification.leftSideFillets)
// => (null) ((null) ((null)))
```
