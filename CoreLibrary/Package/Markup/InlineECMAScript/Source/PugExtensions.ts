export {

  /* === Numbers ==================================================================================================== */
  formatNumberWith4KetaKanji,
  isStringifiedNonNegativeIntegerOfRegularNotation,
  roundToSpecifiedNearestDecimalPlaceValue,
  separateEach3DigitsGroupWithComma,
  separateEach4DigitsGroupWithComma,

  /* === Strings ==================================================================================================== */
  EscapeCharacters,
  lowercaseLatinCharacters,
  uppercaseLatinCharacters,
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
  toLowerCamelCase,
  toScreamingSnakeCase,
  toUpperCamelCase,
  trimSpaces,

  /* === Arrays ===================================================================================================== */
  addElementsToArray,
  getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne,
  getIndexesOfArrayElementsWhichSatisfiesThePredicate,
  getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne,
  getLastElementOfArray,
  removeArrayElementsByIndexes,
  removeArrayElementsByPredicates,
  replaceArrayElementsByIndexesImmutably,
  replaceArrayElementsByPredicates,
  twoDimensionalizeArray,

  /* === Sets ======================================================================================================= */
  addMultipleElementsToSet,

  /* === Maps ======================================================================================================= */
  addMultiplePairsToMap,
  createMapBasedOnOtherMap,
  filterMap,

  /* === Type guards ================================================================================================ */
  /* --- Numbers ---------------------------------------------------------------------------------------------------- */
  isDecimalFractionOfAnySign,
  isNaturalNumber,
  isNegativeDecimalFraction,
  isNegativeInteger,
  isNegativeIntegerOrZero,
  isNonNegativeInteger,
  isNumber,
  isPositiveDecimalFraction,

  /* --- Strings ---------------------------------------------------------------------------------------------------- */
  isEmptyString,
  isNonEmptyString,
  isString,
  isStringOfLength,

  /* --- Objects ---------------------------------------------------------------------------------------------------- */
  isArbitraryObject,
  isEmptyObject,
  isNonEmptyArbitraryObject,
  isNonEmptyObject,
  isNonNullObject,

  /* --- Arrays ----------------------------------------------------------------------------------------------------- */
  isArrayOfCertainTypeElements,
  isArrayOfLength,
  isEmptyArray,
  isNonEmptyArray,

  /* --- undefined & null ------------------------------------------------------------------------------------------- */
  isNeitherUndefinedNorNull,
  isEitherUndefinedOrNull,
  isNotNull,
  isNotUndefined,
  isNull,
  isUndefined,

  /* --- Others ----------------------------------------------------------------------------------------------------- */
  isBoolean,
  isElementOfEnumeration,
  isFunctionLike,

  /* === Date & Time ================================================================================================ */
  CalendarBuilder,
  getDaysCountInSpecificMonth,
  getMonthNameByNumber,
  getMonthNumberByName,
  getNextMonthNumber,
  getPreviousMonthNumber,
  getYearOfNextMonth,
  getYearOfPreviousMonth,
  hasTimeCome,
  millisecondsToSeconds,
  secondsToMilliseconds,
  TimePoint,
  Timer,

  /* === Value transformers ========================================================================================= */
  emptyStringToNull,
  nullToEmptyString,
  nullToUndefined,
  nullToZero,
  undefinedToEmptyArray,
  undefinedToEmptyString,
  undefinedToNull,

  /* === Random values generators =================================================================================== */
  getRandomString,
  getRandomArrayElement,
  getRandomBoolean,
  getRandomInteger,
  getRandomLatinCharacter,
  getRandomObjectPropertyValue,
  getRandomSubarray,
  getSpecificBooleanValueWithProbability,
  removeRandomArrayElement,

  /* === Constants and enumerations ================================================================================= */
  DaysOfWeek,
  HTTP_Methods,
  MonthsNames,
  HOURS_PER_STELLAR_DAY,
  MINUTES_PER_HOUR,
  SECONDS_PER_MINUTE,
  MONTHS_PER_YEAR,

  /* === Pagination ================================================================================================= */
  computeFirstItemNumberForSpecificPaginationPage,
  computeLastItemNumberForSpecificPaginationPage,
  splitToPaginationCollection,

  /* === Logging ==================================================================================================== */
  Logger,

  /* === RawObjectDataProcessor ===================================================================================== */
  RawObjectDataProcessor,
  convertPotentialStringToNumberIfPossible,
  convertPotentialStringToIntegerIfPossible,
  convertPotentialStringToFloatIfPossible

} from "@yamato-daiwa/es-extensions";

export { default as buildEmailLinkHREF_AttributeValue } from "./PugExtensions/buildEmailLinkHREF_AttributeValue";
export { default as buildPhoneNumberLinkHREF_AttributeValue } from "./PugExtensions/buildPhoneNumberLinkHREF_AttributeValue";

export { default as PugMixinsObjectTypeParametersProcessor } from "./PugExtensions/PugMixinsObjectTypeParametersProcessor";
