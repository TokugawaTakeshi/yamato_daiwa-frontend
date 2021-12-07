# Paddings
## `Paddings` mixin

[![Official plugin](https://img.shields.io/badge/IntelliJ_IDEA_Live_Template-pd-blue.svg?style=flat)](https://plugins.jetbrains.com/plugin/17677-yamato-daiwa-frontend)

The alternative to native CSS method of defining of the paddings intended to be used in customizable components development.

```stylus
.Example1

  // Equivalent to `padding: 3px`
  Paddings({ all: 3px })


.Example2

  // Equivalent to `padding-left: 4px; padding-right: 4px;`
  Paddings({ horizontalSymmetric: 4px })


.Example3

  // Equivalent to `padding-top: 5px; padding-bottom: 5px;`
  Paddings({ verticalSymmetric: 5px })

  
.Example4

  // Equivalent to `padding: 3px 2px 4px 1px;`
  Paddings({
    left: 1px,
    right: 2px,
    top: 3px,
    bottom: 4px
  })
```

### `verticalUpwardShifting` property

`padding: 6px 0` does not mean that text between top and bottom paddings will be ideally centered: visually it will be
the offset about `1px`.  Moreover, this offset depending on the font and the language. 

`verticalUpwardShifting` allows to reduce the `top` padding to compensate this offset.

```stylus
.Example5
  
  Paddings({
    verticalSymmetric: 6px,
    verticalUpwardShifting: 1px
  })
```

The output CSS will be:

```css
.Example5 {
  padding-top: calc(6px - 1px);
  padding-bottom: 6px;
}
```
