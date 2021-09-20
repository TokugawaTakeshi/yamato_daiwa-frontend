# `buildString`

```
buildString(template: string, variables: { [key: string]: string | number }): string
```

Allows to build the strings using ES6 template literals.
However, it's required to pass the second parameters with variables names and values.  


```stylus
p(buildString("Good morning, ${name}", {
  name: "Takeshi"
})) // => "Good morning, Takeshi"

p(buildString("Good morning, ${givenName} ${familyName}", {
  givenName: "Takeshi",
  familyName: "Tokugawa"
})) // => "Good morning, Takeshi Tokugawa"
```


## String building methods comparison

### Method 1: String concatenation (native)

```stylus
givenName = "Takeshi"
familyName = "Tokugawa"

p("Good morning, " + givenName + " " + familyName)
```

### Method 2: Sprintf (native)

```stylus
givenName = "Takeshi"
familyName = "Tokugawa"

outputString = "Good morning, %s %s" % (unquote(givenName) unquote(familyName))

p(outputString)
```

### Method 3: `buildString`

```stylus
p(buildString("Good morning, ${givenName} ${familyName}", {
  givenName: "Takeshi",
  familyName: "Tokugawa"
})) // => "Good morning, Takeshi Tokugawa"
```
