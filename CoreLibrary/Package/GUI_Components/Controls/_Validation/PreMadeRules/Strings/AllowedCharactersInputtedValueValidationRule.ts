import type InputtedValueValidation from "../../InputtedValueValidation";
import allowedCharactersInputtedValueValidationRuleLocalization__english from
    "./AllowedCharactersInputtedValueValidationRuleLocalization.english";
import {
  isString,
  splitString,
  Logger,
  InvalidParameterValueError,
  lowercaseLatinCharacters,
  uppercaseLatinCharacters,
  stringifiedDigits
} from "@yamato-daiwa/es-extensions";


class AllowedCharactersInputtedValueValidationRule implements InputtedValueValidation.Rule {

  public static localization: AllowedCharactersInputtedValueValidationRule.Localization =
      allowedCharactersInputtedValueValidationRuleLocalization__english;

  public readonly mustFinishValidationIfValueIsInvalid: boolean;

  private readonly allowedCharacters: ReadonlyArray<string>;
  private readonly errorMessageBuilder: AllowedCharactersInputtedValueValidationRule.ErrorMessage.Builder;


  public constructor(
    compoundParameter:
        InputtedValueValidation.Rule.ConstructorParameter &
        Readonly<{
          allowedCharacters: Readonly<{
            latinLowercase?: boolean;
            latinUppercase?: boolean;
            digits?: boolean;
            other?: ReadonlyArray<string>;
          }>;
          errorMessageBuilder?: AllowedCharactersInputtedValueValidationRule.ErrorMessage.Builder;
          localization?: AllowedCharactersInputtedValueValidationRule.Localization;
        }>
  ) {

    this.mustFinishValidationIfValueIsInvalid = compoundParameter.mustFinishValidationIfValueIsInvalid ?? false;

    if (
      compoundParameter.allowedCharacters.latinLowercase !== true &&
      compoundParameter.allowedCharacters.latinUppercase !== true &&
      compoundParameter.allowedCharacters.digits !== true &&
      (compoundParameter.allowedCharacters.other ?? []).length === 0
    ) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterNumber: 1,
          parameterName: "compoundParameter",
          messageSpecificPart: "No characters has been allowed."
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "AllowedCharactersInputtedValueValidationRule.constructor(compoundParameter)"
      });
    }

    this.allowedCharacters = [
      ...compoundParameter.allowedCharacters.latinLowercase === true ? lowercaseLatinCharacters : [],
      ...compoundParameter.allowedCharacters.latinUppercase === true ? uppercaseLatinCharacters : [],
      ...compoundParameter.allowedCharacters.digits === true ? stringifiedDigits : [],
      ...compoundParameter.allowedCharacters.other ?? []
    ];

    this.errorMessageBuilder =
        compoundParameter.errorMessageBuilder ??
        compoundParameter.localization?.errorMessageBuilder ??
        AllowedCharactersInputtedValueValidationRule.localization.errorMessageBuilder;

  }

  public check(rawValue: unknown): InputtedValueValidation.Rule.CheckingResult {

    if (!isString(rawValue)) {

      Logger.logError({
        errorType: InvalidParameterValueError.NAME,
        title: InvalidParameterValueError.localization.defaultTitle,
        description: `Unable to execute this validation because raw value has type '${ typeof rawValue }'.`,
        occurrenceLocation: "AllowedCharactersInputtedValueValidationRule.check(rawValue)"
      });

      return { isValid: true };

    }


    const inputtedDisallowedCharacters: Set<string> = new Set<string>();

    for (const character of splitString(rawValue, "")) {
      if (!this.allowedCharacters.includes(character)) {
        inputtedDisallowedCharacters.add(character);
      }
    }

    const isValid: boolean = inputtedDisallowedCharacters.size === 0;

    return isValid ?
        { isValid: true } :
        {
          isValid: false,
          errorMessage: this.errorMessageBuilder({
            inputtedDisallowedCharacters: Array.from(inputtedDisallowedCharacters),
            rawValue
          })
        };

  }

}


namespace AllowedCharactersInputtedValueValidationRule {

  export type Localization = Readonly<{ errorMessageBuilder: ErrorMessage.Builder; }>;

  export namespace ErrorMessage {

    export type Builder = (templateVariables: TemplateVariables) => string;

    export type TemplateVariables = Readonly<{
      inputtedDisallowedCharacters: ReadonlyArray<string>;
      rawValue: string;
    }>;

  }

}


export default AllowedCharactersInputtedValueValidationRule;
