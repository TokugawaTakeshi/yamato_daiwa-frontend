# `MultilineTextWithoutExtraSpaceCausedByLineHeight`

```
MultilineTextWithoutExtraSpaceCausedByLineHeight({ 
  fontSize: unit, 
  lineHeight: unit, 
  doNotUsePseudoElements?: boolean 
})
```

Defines the font size and line height, herewith there will not be extra vertical space above first line and below last
line caused by `line-height`. 

* Intended to be used for block element line headings and paragraphs.
* Includes `word-break: break-all` to prevent the overflow.

The `fontSize` and `lineHeight` must ever be of same unit (e. g. `px` or `rem`) or `lineHeight` must be the dimensionless
value (current font size multiplier).

````stylus
// Do. The `fontSize` and `lineHeight` are of same unit. 
.Paragraph1

  MultilineTextWithoutExtraSpaceCausedByLineHeight({ fontSize: 13px, lineHeight: 17px })

// Do. The `lineHeight` is  dimensionless value.
.Paragraph2

  MultilineTextWithoutExtraSpaceCausedByLineHeight({ fontSize: 13px, lineHeight: 1.4 })
  

// Don't. Currently the different units are not supported.
.Paragraph3

  MultilineTextWithoutExtraSpaceCausedByLineHeight({ fontSize: 13px, lineHeight: 1.2rem })
````

As default, `:before` and `:after` pseudo elements withe negative margins are being used to compensate the extra space.
If you need these pseudo elements for other purposes or creating the styles for the mail magazine where the pseudo elements
are not allowed, set option `doNotUsePseudoElements` to `true`. However, in this case you will loose margins as tool for
defining the vertical space between two elements.

```stylus
.Paragraph1

  MultilineTextWithoutExtraSpaceCausedByLineHeight({ fontSize: 13px, lineHeight: 17px })


.Paragraph2

  MultilineTextWithoutExtraSpaceCausedByLineHeight({ fontSize: 13px, lineHeight: 17px, doNotUsePseudoElements: true })
```

Output:

```css
.Paragraph1 {
  font-size: 13px;
  line-height: 17px;
  word-break: break-all;
}

.Paragraph1:before {
  content: '';
  display: block;
  margin-top: -2px;
}

.Paragraph1:after {
  content: '';
  display: block;
  margin-bottom: -2px;
}

.Paragraph2 {
  font-size: 13px;
  line-height: 17px;
  word-break: break-all;
  margin-top: -2px;
  margin-bottom: -2px;
}
```
