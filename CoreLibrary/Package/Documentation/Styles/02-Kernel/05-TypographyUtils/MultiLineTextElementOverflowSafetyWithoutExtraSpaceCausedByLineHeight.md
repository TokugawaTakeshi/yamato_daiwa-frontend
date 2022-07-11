# MultiLineTextElementOverflowSafetyWithoutExtraSpaceCausedByLineHeight

[![Official IntelliJ IDEA plugin live template](https://img.shields.io/badge/IntelliJ_IDEA_Live_Template-mlt-blue.svg?style=flat)](https://plugins.jetbrains.com/plugin/17677-yamato-daiwa-frontend)

```
MultiLineTextElementOverflowSafetyWithoutExtraSpaceCausedByLineHeight({ 
  fontSize: DataTypes.dimensionalAmount;
  lineHeight: DataTypes.dimensionalAmount | DataTypes.dimensionlessAmount; 
  doNotUsePseudoElements?: boolean;
})
```

Defines the font size and line height, herewith there will not be extra vertical space above first line and below last
line caused by `line-height`. 

* Intended to be used for block element line headings and paragraphs.
* Includes `word-break: break-all` to prevent the overflow.

As default, `:before` and `:after` pseudo elements withe negative margins are being used to compensate the extra space.
If you need these pseudo elements for other purposes or creating the styles for the mail magazine where the pseudo elements
are not allowed, set option `doNotUsePseudoElements` to `true`. However, in this case you will lose the margins as tool for
defining the vertical space between two elements.

```stylus
.Paragraph1

  MultiLineTextElementOverflowSafetyWithoutExtraSpaceCausedByLineHeight({ fontSize: 13px, lineHeight: 17px })


.Paragraph2

  MultiLineTextElementOverflowSafetyWithoutExtraSpaceCausedByLineHeight({ fontSize: 13px, lineHeight: 17px, doNotUsePseudoElements: true })
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
  margin-top: calc(-1 * calc((17px - 13px) / 2));
}

.Paragraph1:after {
  content: '';
  display: block;
  margin-bottom: calc(-1 * calc((17px - 13px) / 2));
}

.Paragraph2 {
  font-size: 13px;
  line-height: 17px;
  word-break: break-all;
  margin-top: calc(-1 * calc((17px - 13px) / 2));
  margin-bottom: calc(-1 * calc((17px - 13px) / 2));
}
```

Because the `fontSize` and `lineHeight` could be of the different units, the margin value is a `calc` expression.
But in this case both `fontSize` and `lineHeight` are pixels. If [postcss-calc](https://github.com/postcss/postcss-calc)
plugin is being used, it will reduce `calc(-1 * calc((17px - 13px) / 2));` to `2px`.
