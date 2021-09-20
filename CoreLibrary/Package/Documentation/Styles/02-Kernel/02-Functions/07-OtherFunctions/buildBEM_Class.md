# `buildBEM_Class`: generating of BEM class

Generating BEM class according specified `block` (required), `element` and `modifier`.
The separators are `BEM_ELEMENT_SEPARATOR` (`-` as default) and `BEM_MODIFIER_SEPARATOR` (`__` as default) are 
basic variables which could be redefined.


```stylus
log(buildBEM_Class({ block: "Button" })) 
// => "Button"

log(buildBEM_Class({ block: "Button", element: "Icon" })) 
// => "Button-Icon"

log(buildBEM_Class({ block: "Button", modifier: "BasicTheme" })) 
// => "Button__BasicTheme"

log(buildBEM_Class({ block: "Header", element: "Icon", modifier: "BasicTheme" })) 
// => "Header-Icon__BasicTheme"

p(buildBEM_Class({
  block: "Header",
  element: "Icon",
  modifier: "BasicTheme",
  elementSeparator: "--",
  modifierSeparator: "_"
})) // => "Header--Icon_BasicTheme"
```
