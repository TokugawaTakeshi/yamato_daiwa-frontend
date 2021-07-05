# `getObjectNonNullValuesCount` Retrieving the count of non-null object values

```
getObjectNonNullValuesCount(targetObject: object): number
```

```stylus
sample = {
  themes: {
    redmond: {}
    sunny: null
  }
}


p(getObjectNonNullValuesCount(sample)) // => 1
p(length(values(sample))) // => 2
```
