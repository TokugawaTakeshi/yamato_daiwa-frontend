# `provideClippedShadowsAndOutlinesVisibility`

```
provideClippedBoxShadowVisibility({
  requiredLeftOrRightSpace?: DataTypes.unit,
  requiredTopSpace?: DataTypes.unit,
  requiredBottomSpace?: DataTypes.unit
})

```

Defines the paddings in target container which which is implied to have`overflow: hidden`compensated with negative margins to make the shadow and/or outline of child elements visible.

## Problem overview

In the container with `overflow: hidden` (or other `overflow`-properties explicitly or implicitly hiding the overhanging content), the shadows/outlines of children elements will be truncated if the chilren are touching with parent's edges:

![](https://i.stack.imgur.com/7br9K.png)

The common solution is adding the paddings to parent's container. It's a valid CSS, but there are some methodological issues:

1. The `paddings` are the **geometry** while the `box-shadow` and `outline` are the **decoration** which does not affect to the document flow regardless of their thickness. In that way, the decoration forces to change the geometry.
2. The `paddings` are the parent's geometry while the `box-shadow` or `outlint` is the children's decoration. In the component-oriented methodologies, the properties of the reusable components like button are **incapsulated** and ever could be dynamic. By other words, developing the controls like buttons, we don't know at advance in which container these controls will be used, same as the changing of the container of the reusable layout could be problematic. But here, we need to know the thickness of the button's `box-shadow`/`outline` to setup the appropriate paddings of the parent.

Also, what if we have the multiple types of buttons with different shadows? What if the buttons are mixed with other elements with other shadows? What if the shadows are theme-dependent? Currently, the CSS does not respond to this demand, so whatever `provideClippedBoxShadowVisibility` solution is ugly, there are still no working alternatives.

[📖 Related topic on Stack Overflow](https://stackoverflow.com/q/64852741/4818123)
