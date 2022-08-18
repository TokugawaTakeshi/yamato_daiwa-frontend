import type ValueValidation from "./ValueValidation";
import {
  isString,
  isNumber,
  isNonNegativeInteger,
  Logger,
  InvalidParameterValueError,
  lowercaseLatinCharacters,
  uppercaseLatinCharacters,
  stringifiedDigits,
  splitString
} from "@yamato-daiwa/es-extensions";


export function minimalNumericValueValidationRule(
  {
    minimalNumericValue,
    errorMessage,
    finishValidationIfInvalid = false
  }: {
    minimalNumericValue: number;
    errorMessage: string;
    finishValidationIfInvalid?: boolean;
  }
): { minimalNumericValue: ValueValidation.ContextIndependentValueValidationRule; } {
  return {
    minimalNumericValue: {
      checker(rawValue: unknown): boolean {

        if (!isNumber(rawValue)) {
          Logger.logError({
            errorType: InvalidParameterValueError.NAME,
            title: InvalidParameterValueError.localization.defaultTitle,
            description: `Unable to execute this validation because raw value has type '${ typeof rawValue }'.`,
            occurrenceLocation: "minimalNumericValueValidationRule.checker(rawValue)"
          });
          return true;
        }

        return rawValue >= minimalNumericValue;
      },
      errorMessage,
      finishValidationIfInvalid
    }
  };
}

export function maximalNumericValueValidationRule(
  {
    maximalNumericValue,
    errorMessage,
    finishValidationIfInvalid = false
  }: {
    maximalNumericValue: number;
    errorMessage: string;
    finishValidationIfInvalid?: boolean;
  }
): { maximalNumericValue: ValueValidation.ContextIndependentValueValidationRule; } {
  return {
    maximalNumericValue: {
      checker(rawValue: unknown): boolean {

        if (!isNumber(rawValue)) {
          Logger.logError({
            errorType: InvalidParameterValueError.NAME,
            title: InvalidParameterValueError.localization.defaultTitle,
            description: `Unable to execute this validation because raw value has type '${ typeof rawValue }'.`,
            occurrenceLocation: "maximalNumericValueValidationRule.checker(rawValue)"
          });
          return true;
        }

        return rawValue <= maximalNumericValue;
      },
      errorMessage,
      finishValidationIfInvalid
    }
  };
}

export function nonNegativeIntegerOfRegularNotationValidationRule(
  { errorMessage, finishValidationIfInvalid }: { errorMessage: string; finishValidationIfInvalid?: boolean; }
): { nonNegativeIntegerOfRegularNotationValidationRule: ValueValidation.ContextIndependentValueValidationRule; } {
  return {
    nonNegativeIntegerOfRegularNotationValidationRule: {
      checker: (rawValue: unknown): boolean => isNonNegativeInteger(rawValue) && /^\d+$/u.test(String(rawValue)),
      errorMessage,
      finishValidationIfInvalid
    }
  };
}


export function minimalCharactersCountValidationRule(
  {
    minimalCharactersCount,
    errorMessage,
    finishValidationIfInvalid = false
  }: {
    minimalCharactersCount: number;
    errorMessage: string;
    finishValidationIfInvalid?: boolean;
  }
): { minimalCharactersCount: ValueValidation.ContextIndependentValueValidationRule; } {
  return {
    minimalCharactersCount: {
      checker(rawValue: unknown): boolean {

        if (!isString(rawValue)) {
          Logger.logError({
            errorType: InvalidParameterValueError.NAME,
            title: InvalidParameterValueError.localization.defaultTitle,
            description: `Unable to execute this validation because raw value has type '${ typeof rawValue }'.`,
            occurrenceLocation: "minimalCharactersCountValidationRule.checker(rawValue)"
          });
          return true;
        }

        return rawValue.length >= minimalCharactersCount;
      },
      errorMessage,
      finishValidationIfInvalid
    }
  };
}

export function maximalCharactersCountValidationRule(
  {
    maximalCharactersCount,
    errorMessage,
    finishValidationIfInvalid = false
  }: {
    maximalCharactersCount: number;
    errorMessage: string;
    finishValidationIfInvalid?: boolean;
  }
): { maximalCharactersCount: ValueValidation.ContextIndependentValueValidationRule; } {
  return {
    maximalCharactersCount: {
      checker(rawValue: unknown): boolean {

        if (!isString(rawValue)) {
          Logger.logError({
            errorType: InvalidParameterValueError.NAME,
            title: InvalidParameterValueError.localization.defaultTitle,
            description: `Unable to execute this validation because raw value has type '${ typeof rawValue }'.`,
            occurrenceLocation: "maximalCharactersCountValidationRule.checker(rawValue)"
          });
          return true;
        }

        return rawValue.length <= maximalCharactersCount;
      },
      errorMessage,
      finishValidationIfInvalid
    }
  };
}


export function minimalElementsCountValidationRule(
  {
    minimalElementsCount,
    errorMessage,
    finishValidationIfInvalid = false
  }: {
    minimalElementsCount: number;
    errorMessage: string;
    finishValidationIfInvalid?: boolean;
  }
): { minimalElementsCount: ValueValidation.ContextIndependentValueValidationRule; } {
  return {
    minimalElementsCount: {
      checker(rawValue: unknown): boolean {

        if (!Array.isArray(rawValue)) {
          Logger.logError({
            errorType: InvalidParameterValueError.NAME,
            title: InvalidParameterValueError.localization.defaultTitle,
            description: `Unable to execute this validation because raw value has type '${ typeof rawValue }'.`,
            occurrenceLocation: "minimalElementsCountValidationRule.checker(rawValue)"
          });
          return true;
        }

        return rawValue.length >= minimalElementsCount;
      },
      errorMessage,
      finishValidationIfInvalid
    }
  };
}

export function maximalElementsCountValidationRule(
  {
    maximalElementsCount,
    errorMessage
  }: {
    maximalElementsCount: number;
    errorMessage: string;
  }
): { maximalElementsCount: ValueValidation.ContextIndependentValueValidationRule; } {
  return {
    maximalElementsCount: {
      checker(rawValue: unknown): boolean {

        if (!Array.isArray(rawValue)) {
          Logger.logError({
            errorType: InvalidParameterValueError.NAME,
            title: InvalidParameterValueError.localization.defaultTitle,
            description: `Unable to execute this validation because raw value has type '${ typeof rawValue }'.`,
            occurrenceLocation: "maximalElementsCountValidationRule.checker(rawValue)"
          });
          return true;
        }

        return rawValue.length <= maximalElementsCount;
      },
      errorMessage
    }
  };
}


export function allowedCharactersValidationRule(
  {
    errorMessageTemplate,
    finishValidationIfInvalid = false,
    allowedCharacters
  }: {
    finishValidationIfInvalid?: boolean;
    errorMessageTemplate: (foundDisallowedCharacters: Array<string>) => string;
    allowedCharacters: {
      latinLowercase?: boolean;
      latinUppercase?: boolean;
      stringifiedDigits?: boolean;
      other?: Array<string>;
    };
  }
): {
  allowedCharacters: ValueValidation.ContextIndependentValueValidationRule & { foundDisallowedCharacters: Array<string>; };
} {
  return {
    allowedCharacters: {
      foundDisallowedCharacters: [],
      checker(rawValue: unknown): boolean {

        if (!isString(rawValue) && !isNumber(rawValue)) {
          Logger.logError({
            errorType: InvalidParameterValueError.NAME,
            title: InvalidParameterValueError.localization.defaultTitle,
            description: `Unable to execute this validation because raw value has type '${ typeof rawValue }'.`,
            occurrenceLocation: "allowedCharactersValidationRule.checker(rawValue)"
          });
          return true;
        }

        const latinLowercaseCharactersAreAllowed: boolean = allowedCharacters.latinLowercase ?? false;
        const latinUppercaseCharactersAreAllowed: boolean = allowedCharacters.latinUppercase ?? false;
        const stringifiedDigitsAreAllowed: boolean = allowedCharacters.stringifiedDigits ?? false;
        const otherAllowedCharacters: Array<string> = allowedCharacters.other ?? [];

        const allAllowedCharacters: Array<string> = [
          ...latinLowercaseCharactersAreAllowed ? lowercaseLatinCharacters : [],
          ...latinUppercaseCharactersAreAllowed ? uppercaseLatinCharacters : [],
          ...stringifiedDigitsAreAllowed ? stringifiedDigits : [],
          ...otherAllowedCharacters
        ];

        const foundDisallowedCharacters: Array<string> = [];

        for (const character of splitString(String(rawValue), "")) {
          if (!allAllowedCharacters.includes(character)) {
            foundDisallowedCharacters.push(character);
          }
        }

        this.foundDisallowedCharacters = foundDisallowedCharacters;
        return foundDisallowedCharacters.length === 0;
      },
      get errorMessage(): string { return errorMessageTemplate(this.foundDisallowedCharacters); },
      finishValidationIfInvalid
    }
  };
}


export function memberOfEnumerationValidationRule(
  { allowedValues, errorMessage }: { allowedValues: Array<number | string>; errorMessage: string; }
): { memberOfEnumeration: ValueValidation.ContextIndependentValueValidationRule; } {
  return {
    memberOfEnumeration: {
      checker(rawValue: unknown): boolean {

        if (!isString(rawValue) && !isNumber(rawValue)) {
          Logger.logError({
            errorType: InvalidParameterValueError.NAME,
            title: InvalidParameterValueError.localization.defaultTitle,
            description: `Unable to execute this validation because raw value has type '${ typeof rawValue }'.`,
            occurrenceLocation: "memberOfEnumerationValidationRule.checker(rawValue)"
          });
          return true;
        }

        return allowedValues.includes(rawValue);
      },
      errorMessage
    }
  };
}
