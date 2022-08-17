export {

  /* === Numbers ==================================================================================================== */
  formatNumberWith4KetaKanji,
  isStringifiedNonNegativeIntegerOfRegularNotation,
  roundToSpecifiedNearestDecimalPlaceValue,
  separateEach3DigitsGroupWithComma,
  separateEach4DigitsGroupWithComma,

  /* === Strings ==================================================================================================== */
  EscapeCharacters,
  latinCharacters__lowercase,
  latinCharacters__uppercase,
  SpaceCharacters,
  SpaceCharactersStringifiedHexCharactersForRegularExpressionWithUnicodeFlag,
  stringifiedDigits,
  areStringifiedDigitsOnly,
  capitalizeFirstCharacter,
  EmailAddress,
  getLastCharacter,
  getPositionsOfAllSubstringOccurrences,
  hasStringOnlySpecificCharacters,
  insertSubstring,
  insertSubstringIf,
  removeAllSpecifiedCharacters,
  removeLastCharacter,
  removeNonDigitsCharacters,
  removeNthCharacter,
  removeSpecificCharacterFromCertainPosition,
  replace2OrMoreSpacesTo1,
  replaceBrHTML_TagToNewLineEscapeSequence,
  replaceDoubleBackslashesWithForwardSlashes,
  reverseString,
  splitString,
  stringifyAndFormatArbitraryValue,
  trimSpaces,

  /* === Arrays ===================================================================================================== */
  addElementsToArray,
  getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne,
  getIndexesOfArrayElementsWhichSatisfiesThePredicate,
  getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne,
  getLastElementOfNonEmptyArray,
  removeArrayElementsByIndexes,
  removeArrayElementsByPredicates,
  replaceArrayElementsByIndexesImmutably,
  replaceArrayElementsByPredicates,
  twoDimensionalizeArray,

  /* === Random values generators =================================================================================== */
  getRandomArrayElement,
  getRandomBoolean,
  getRandomInteger
} from "@yamato-daiwa/es-extensions";

export { default as buildEmailLinkHREF_AttributeValue } from "./PugExtensions/buildEmailLinkHREF_AttributeValue";
export { default as buildPhoneNumberLinkHREF_AttributeValue } from "./PugExtensions/buildPhoneNumberLinkHREF_AttributeValue";
