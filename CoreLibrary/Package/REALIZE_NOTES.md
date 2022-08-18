## New functionality
### Markup

#### New functionality

* Most of functions and classes from [Yamato Daiwa ES Extensions](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions) are available now in [inline JavaScript code of Pug](https://pugjs.org/language/code.html).
* [`textOverflowSafetyTest` constant](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Markup/ConstantsAssets/textOverflowSafetyTest/textOverflowSafetyTest.md)
  The string constant intended to be used for testing of text overflow adaptation.


## Updates

* ButtonLikeElementsPrimer
  * `font-size` has been changed to `inherit`
* MultiLineTextElementOverflowSafetyWithoutExtraSpaceCausedByLineHeight
  * **lineSpacing** option has been added, incompatible with **lineHeight**
  * Now **lineHeight** option required if and only if **lineSpacing** has not been undefined


## Breaking changes
### Markup

Pug 2.X is not supported anymore.
It could be errors caused by [inline JavaScript code](https://pugjs.org/language/code.html) is include **Functionality.pug**
or extend some template of page.
