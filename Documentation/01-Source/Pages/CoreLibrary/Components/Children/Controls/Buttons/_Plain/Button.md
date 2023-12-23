# Button

## Intro

<div style="text-align: right">Still waters run deep</div>

The innocent appearance of rectangle (filled or not, with borders or not, with rounded corners or not)
create a deceptive impression of novice engineers. The button is _very_ complicated component:

* It could be **button** tag, **input** tag, **a** tag. Each one has own features.
* The symmetric vertical paddings does not mean that the text will be vertically centered. Furthermore, it visually
  depends on specific font and language.
* The symmetric vertical paddings and font size are popular method of vertical sizing. It will be completely broken when
  you will need append or prepend the icon. Furthermore, the icons could have different proportions, the height 
  exists the font size, additional paddings inside SVG canvas, etc.
* It has a lot of stated like **hover**, **active** (**pressed**), **disabled**. The changing of icon color
  depending on these states will be very hard challenge, especially if all icons has different filling method.

As framework developers, we took care about encapsulating of this complexity.
However, not all limitations could not be resolved simply.
