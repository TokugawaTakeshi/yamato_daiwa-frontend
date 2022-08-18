# Functionality of Yamato Daiwa ECMAScript extensions

Most functionality of [Yamato Daiwa ECMAScript extensions core library](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/README.md)
is available once include **Functionality.pug**, except:

* All TypeScript types aliases and interfaces, because they does not exist on JavaScript.
* [isIPv4AddressLiesInRange](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/isIPv4AddressLiesInRange.md) function
* [getObjectPropertySafely](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Objects/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/getObjectPropertySafely.md),
  because you can use optional chaining without dealing with TypeScript errors.
* **substituteWhenNull** and **substituteWhenUndefined** because with Pug 3, you can use [nullish coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)
* **HTTPStatusCodes** and other enumerations related with HTTP statuses
* All error classes

These functions could be used for data mocking, for example, on [static preview stage](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/PagesTemplates/StaticPreviewAnywherePage/StaticPreviewAnywherePage.md#the-concept-of-static-preview).
