# Font stacks

Most of font stack variables has been created based on data from [cssfontstack.com](https://www.cssfontstack.com/).
Usage example:

```stylus
.Article

  font-family Arial--FontsStack 
```


## SansSerif

* `NativeSansSerif--FontsStack` (borrowed from [Reboot/Bootstrap](https://getbootstrap.com/docs/5.0/content/reboot/#native-font-stack))
* `Arial--FontsStack`
* `ArialBlack--FontsStack`
* `ArialNarrow--FontsStack`
* `ArialRoundedMT_Bold--FontsStack`
* `Calibri--FontsStack`
* `Candara--FontsStack`
* `CenturyGothic--FontsStack`
* `CenturyGothic--FontsStack`
* `FranklinGothic--FontsStack`
* `Futura--FontsStack`
* `Geneva--FontsStack`
* `GillSans--FontsStack`
* `Helvatica--FontsStack`
* `Impact--FontsStack`
* `LucidaGrande--FontsStack`
* `Optima--FontsStack`
* `SegoeUI--FontsStack`
* `Tahoma--FontsStack`
* `TrebuchetMS--FontsStack`
* `Verdana--FontsStack`
* `MS_SansSerif--FontsStack`


## Serif

* `BigCaslon--FontsStack`
* `BodoniMT--FontsStack`
* `BookAntiqua--FontsStack`
* `CalistoMT--FontsStack`
* `Cambria--FontsStack`
* `Didot--FontsStack`
* `Garamond--FontsStack`
* `Georgia--FontsStack`
* `GoudeOldStyle--FontsStack`
* `HoeflerText--FontsStack`
* `LucidaBright--FontsStack`
* `LucidaSans--FontsStack`
* `Palatino--FontsStack`
* `Perpetua--FontsStack`
* `Rockwell--FontsStack`
* `RockwellExtraBold--FontsStack`
* `Baskerville--FontsStack`
* `TimesNewRoman--FontsStack`
* `MS_Serif--FontsStack`


## Monospace

* `Consolas--FontsStack`
* `CourierNew--FontsStack`
* `LucidaConsole--FontsStack`
* `LucidaSansTypewriter--FontsStack`
* `Monaco--FontsStack`
* `AdaleMono--FontsStack`


### Japanese language support

Monospace fonts are being frequently used for code listings.
Basically those are support only alphabetic characters, but the code could include characters of other languages
(for example in comments and string literals).

In the case of Japanese language, if to use `Consolas--FontsStack` (`Consolas, monaco, monospace`) for listing
with Japanese characters, default font for these characters will be automatically used and basically is pretty rough.
Below stacks are including the fallback smooth font (Meiryo UI) for the characters which monospace font does not cover.

* `Consolas__SmoothJapaneseSymbols--FontsStack`
* `CourierNew__SmoothJapaneseSymbols--FontsStack`
* `LucidaConsole__SmoothJapaneseSymbols--FontsStack`
* `LucidaSansTypewriter__SmoothJapaneseSymbols--FontsStack`
* `Monaco__SmoothJapaneseSymbols--FontsStack`
* `AdaleMono__SmoothJapaneseSymbols--FontsStack`


### Fallback font for other languages

If your language has problem similar to described above problem with Japanese language and you know good fallback font,
please feel free to suggest the fonts stack like `Consolas__SmoothJapaneseSymbols--FontsStack` for your language.
You don't need to waste your time for the forking of repository and creating the pull request - just suggest it in
[issues](https://github.com/TokugawaTakeshi/yamato_daiwa-frontend/issues).


## Other font stacks

* `Copperplate--FontsStack`
* `Papyrus--FontsStack`
* `BrushScriptFont--FontsStack`
* `ComicSans--FontsStack`


## Japanese

* `CommonGothics--FontsStack`
* `MeiryoUI--FontsStack`
* `Gyoshotai--FontsStack`
* `Kyokashotai--FontsStack`
