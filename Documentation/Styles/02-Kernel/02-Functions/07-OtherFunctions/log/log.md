# `log`: improved logging

Outputs the log to consoles. Using `formatObject` function, formats the objects (including nested objects case).


```stylus
sample1 = {
  alpha: "FOO",
  bravo: 1,
  charlie: {
    delta: "BAR",
    echo: 2
  }
}

// Native logging
p(sample1)
// => {"alpha":"(\"FOO\")","bravo":"(1)","charlie":"({\"delta\":\"(\\\"BAR\\\")\",\"echo\":\"(2)\"})"}
```

The `log(sample1)` gives the output:

```
{
  alpha: FOO,
  bravo: 1,
  charlie: {
    delta: BAR,
    echo: 2
  }
}
```
