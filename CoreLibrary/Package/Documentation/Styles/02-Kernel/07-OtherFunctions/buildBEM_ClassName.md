# `buildBEM_ClassName`: generating of BEM class

Generating BEM class according specified `block` (required), `element` and `modifier`.
The separators are `BEM_ELEMENT_SEPARATOR` (`__` as default) and `BEM_MODIFIER_SEPARATOR` (`_` as default) are 
basic variables which could be redefined.


```stylus
log(buildBEM_ClassName({ block: "Button" })) 
// => "Button"

log(buildBEM_ClassName({ block: "Button", element: "Icon" })) 
// => "Button-Icon"

log(buildBEM_ClassName({ block: "Button", modifier: "BasicTheme" })) 
// => "Button__BasicTheme"

log(buildBEM_ClassName({ block: "Header", element: "Icon", modifier: "BasicTheme" })) 
// => "Header-Icon__BasicTheme"

p(buildBEM_ClassName({
  block: "Header",
  element: "Icon",
  modifier: "BasicTheme",
  elementSeparator: "--",
  modifierSeparator: "_"
})) // => "Header--Icon_BasicTheme"
```
