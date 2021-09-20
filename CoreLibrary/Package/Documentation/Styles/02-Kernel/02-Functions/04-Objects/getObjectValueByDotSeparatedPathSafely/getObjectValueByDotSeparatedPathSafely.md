# `getObjectValueByDotSeparatedPathSafely` Save access to nested objects (hashes) which could not be

```
getObjectValueByDotSeparatedPathSafely(targetObject: object, dotSeparatedPath: string): any
```

```stylus
sample = {
  alpha: "FOO",
  bravo: {
    charlie: "BAR"
  }
}

p(sample.bravo.delta.golf)
```

It will be error similar to JavaScript's `TypeError: Cannot read property 'XXX' of undefined` because
nested object `bravo` has not child object `delta`:

```
sample.bravo.delta has no property .golf
```

However what if it's unknown at advance will `bravo` nested object or no?
The specialized solution suggested by `@yamato-daiwa/frontend` is `getObjectValueByDotSeparatedPathSafely`:

```
p(getObjectValueByDotSeparatedPathSafely(sample, "bravo.delta.golf")) // => null
```

When some nested object does not exist, `null` will be returned instead.
