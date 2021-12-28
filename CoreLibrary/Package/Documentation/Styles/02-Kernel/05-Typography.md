# Typography

## Customization cases & approaches

### Case 1: I don't need the customization now, give me the minimalistic typography, quick!

Invoke the mixin `provideTypography()` to generate the dedicated CSS classes. 

```stylus
provideTypography()
```

See the functionality list which element are become available.

Maybe you wish to append the prefixes to standard CSS classes.

```stylus
provideTypography(overridings: { prefix: "TypographyTesting" })
```

### Case 2: I want to customize the default typography


### Case 3: I want to create my own preset
