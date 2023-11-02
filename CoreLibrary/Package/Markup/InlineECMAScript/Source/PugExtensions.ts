export {

  /* ━━━ AJAX ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  AJAX_Service,
  FetchAPI_Service,
  serializeURI_QueryParameters,


  /* ━━━ Arrays ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  addElementsToArray,
  createArrayOfNatualNumbers,
  cropArray,
  getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne,
  getIndexesOfArrayElementsWhichSatisfiesThePredicate,
  getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne,
  getLastElementOfArray,
  removeArrayElementsByIndexes,
  removeArrayElementsByPredicates,
  replaceArrayElementsByIndexesImmutably,
  replaceArrayElementsByPredicates,
  twoDimensionalizeArray,


  /* ━━━ Constants and enumerations ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── Date & Time ──────────────────────────────────────────────────────────────────────────────────────────────── */
  CHARACTERS_COUNT_OF_DATE_PART_IN_ISO8601_STRING,
  DaysOfWeek,
  HOURS_PER_STELLAR_DAY,
  MAXIMAL_DAYS_AT_MONTH,
  MINUTES_PER_HOUR,
  MONTHS_PER_YEAR,
  MonthsNames,
  SECONDS_PER_MINUTE,

  /* ─── HTTP ─────────────────────────────────────────────────────────────────────────────────────────────────────── */
  HTTP_Methods,
  HTTP_StatusCodes,
  InformationalResponsesHTTP_StatusCodes,
  SuccessfulResponsesHTTP_StatusCodes,
  RedirectionResponsesHTTP_StatusCodes,
  ClientErrorsHTTP_StatusCodes,
  ServerErrorsHTTP_StatusCodes,


  /* ━━━ Data mocking ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  DataMocking,
  MockGatewayHelper,
  MockGatewayHelperLocalization__English,


  /* ━━━ Date & Time ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
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


  /* ━━━ Default value substituters ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  substituteWhenNull,
  substituteWhenUndefined,


  /* ━━━ Errors ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  AlgorithmMismatchError,
  algorithmMismatchErrorLocalization__english,
  ClassRedundantSubsequentInitializationError,
  classRedundantSubsequentInitializationErrorLocalization__english,
  ClassRequiredInitializationHasNotBeenExecutedError,
  classRequiredInitializationHasNotBeenExecutedErrorLocalization__english,
  ConfigFileNotFoundError,
  configFileNotFoundErrorLocalization__english,
  CrossBrowserIssueError,
  crossBrowserIssueErrorLocalization__english,
  DataRetrievingFailedError,
  dataRetrievingFailedErrorLocalization__english,
  DataSubmittingFailedError,
  dataSubmittingFailedErrorLocalization__english,
  DOM_ElementRetrievingFailedError,
  DOM_ElementRetrievingFailedErrorLocalization__english,
  FileReadingFailedError,
  fileReadingFailedErrorLocalization__english,
  FileWritingFailedError,
  fileWritingFailedErrorLocalization__english,
  ImproperUsageError,
  improperUsageErrorLocalization__english,
  IncompatiblePropertiesInObjectTypeParameterError,
  incompatiblePropertiesInObjectTypeParameterErrorLocalization__english,
  InterProcessInteractionFailedError,
  interProcessInteractionFailedErrorLocalization__english,
  InvalidConfigError,
  invalidConfigErrorLocalization__english,
  InvalidExternalDataError,
  invalidExternalDataErrorLocalization__english,
  InvalidParameterValueError,
  invalidParameterValueErrorLocalization__english,
  ModuleDynamicLoadingFailedError,
  moduleDynamicLoadingFailedErrorLocalization__english,
  UnexpectedEventError,
  unexpectedEventErrorLocalization__english,
  UnsupportedScenarioError,
  unsupportedScenarioErrorLocalization__english,


  /* ━━━ Files ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  encodeFileToBase64,

  /* ━━━ Logging ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── PoliteErrorsMessageBuilder ───────────────────────────────────────────────────────────────────────────────── */
  PoliteErrorsMessagesBuilder,
  PoliteErrorsMessagesBuilder__English,

  /* ─── Rest ─────────────────────────────────────────────────────────────────────────────────────────────────────── */
  Logger,
  loggerLocalization__english,


  /* ━━━ Maps ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  addMultiplePairsToMap,
  createMapBasedOnOtherMap,
  filterMap,


  /* ━━━ Numbers ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  formatNumberWith4KetaKanji,
  getArithmeticMean,
  isStringifiedNonNegativeIntegerOfRegularNotation,
  roundDownToSpecificIntegerPlaceValue,
  roundToSpecificNearestIntegerPlaceValue,
  roundToSpecifiedNearestDecimalPlaceValue,
  roundUpToSpecificIntegerPlaceValue,
  separateEach3DigitsGroupWithComma,
  separateEach4DigitsGroupWithComma,


  /* ━━━ Objects ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  getObjectPropertySafely,


  /* ━━━ Pagination ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  computeFirstItemNumberForSpecificPaginationPage,
  computeLastItemNumberForSpecificPaginationPage,
  getItemsOfPaginationPage,
  PaginationCollection,


  /* ━━━ Promises ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  PromisesQueue,


  /* ━━━ Random values generators ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  getRandomString,
  RandomStringsGenerator,
  getRandomArrayElement,
  getRandomBoolean,
  getRandomInteger,
  getRandomLatinCharacter,
  getRandomObjectPropertyValue,
  getRandomSubarray,
  getSpecificBooleanValueWithProbability,
  removeRandomArrayElement,


  /* ━━━ Raw object data processor ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  RawObjectDataProcessor,
  RawObjectDataProcessorLocalization__English,
  convertPotentialStringToNumberIfPossible,
  convertPotentialStringToIntegerIfPossible,
  convertPotentialStringToFloatIfPossible,


  /* ━━━ Sets ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  createSetBasedOnOtherSet,
  addMultipleElementsToSet,


  /* ━━━ Strings ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── Characters assets ────────────────────────────────────────────────────────────────────────────────────────── */
  EscapeCharacters,
  lowercaseLatinCharacters,
  SpaceCharacters,
  SpaceCharactersStringifiedHexCharactersForRegularExpressionWithUnicodeFlag,
  stringifiedDigits,
  uppercaseLatinCharacters,

  /* ─── Regular expressions ──────────────────────────────────────────────────────────────────────────────────────── */
  getMatchingWithFirstRegularExpressionCapturingGroup,
  extractMatchingsWithRegularExpression,
  replaceMatchesWithRegularExpressionToDynamicValue,

  /* ─── URI ──────────────────────────────────────────────────────────────────────────────────────────────────────── */
  /* --- Files and directories -------------------------------------------------------------------------------------- */
  appendLastFileNameExtension,
  extractAllFileNameExtensions,
  extractLastExtensionOfFileName,
  removeAllFileNameExtensions,

  /* --- Rest ------------------------------------------------------------------------------------------------------- */
  appendFragmentToURI,
  getURI_PartWithoutFragment,
  getURI_Fragment,
  removeSpecificSegmentsFromURI_Path,
  explodeURI_PathToSegments,

  /* ─── Rest ─────────────────────────────────────────────────────────────────────────────────────────────────────── */
  appendCharacterIfItDoesNotPresentInLastPosition,
  areStringifiedDigitsOnly,
  capitalizeFirstCharacter,
  cropString,
  EmailAddress,
  explodeCasedPhraseToWords,
  getEnglishAbbreviatedOrdinalNumber,
  getLastCharacter,
  getPositionsOfAllSubstringOccurrences,
  hasStringOnlySpecificCharacters,
  insertSubstring,
  insertSubstringIf,
  isIPv4AddressLiesInRange,
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


  /* ━━━ Type guards ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── Arrays ───────────────────────────────────────────────────────────────────────────────────────────────────── */
  isArrayOfCertainTypeElements,
  isArrayOfLength,
  isEmptyArray,
  isNonEmptyArray,

  /* ─── Nullables ────────────────────────────────────────────────────────────────────────────────────────────────── */
  isNeitherUndefinedNorNull,
  isEitherUndefinedOrNull,
  isNotNull,
  isNotUndefined,
  isNull,
  isUndefined,

  /* ─── Numbers ──────────────────────────────────────────────────────────────────────────────────────────────────── */
  isDecimalFractionOfAnySign,
  isNaturalNumber,
  isNegativeDecimalFraction,
  isNegativeInteger,
  isNegativeIntegerOrZero,
  isNonNegativeInteger,
  isNumber,
  isPositiveDecimalFraction,

  /* ─── Objects ──────────────────────────────────────────────────────────────────────────────────────────────────── */
  isArbitraryObject,
  isEmptyObject,
  isNonEmptyArbitraryObject,
  isNonEmptyObject,
  isNonNullObject,

  /* ─── Strings ──────────────────────────────────────────────────────────────────────────────────────────────────── */
  isEmptyString,
  isNonEmptyString,
  isString,
  isStringOfLength,
  IsStringOfLengthCheckingOperation,

  /* ─── Rest ─────────────────────────────────────────────────────────────────────────────────────────────────────── */
  isBoolean,
  isElementOfEnumeration,
  isFunctionLike,


  /* ━━━ Value transformers ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  emptyStringToNull,
  nullToEmptyString,
  nullToUndefined,
  nullToZero,
  undefinedToEmptyArray,
  undefinedToEmptyString,
  undefinedToNull

} from "@yamato-daiwa/es-extensions";

export { default as buildEmailLinkHrefAttributeValue } from "./PugExtensions/buildEmailLinkHrefAttributeValue";
export { default as buildPhoneNumberLinkHrefAttributeValue } from "./PugExtensions/buildPhoneNumberLinkHrefAttributeValue";

export { default as PugMixinsObjectTypeParametersProcessor } from "./PugExtensions/PugMixinsObjectTypeParametersProcessor";
