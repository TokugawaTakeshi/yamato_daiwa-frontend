import type InputtedValueValidation from "../../InputtedValueValidation";
import minimalElementsCountInputtedValueValidationRuleLocalization__english from
    "./MinimalElementsCountInputtedValueValidationRuleLocalization.english";
import {
  stringifyAndFormatArbitraryValue,
  InvalidParameterValueError,
  Logger,
  isNotUndefined
} from "@yamato-daiwa/es-extensions";


class MinimalElementsCountInputtedValueValidationRule implements InputtedValueValidation.Rule {

  public static localization: MinimalElementsCountInputtedValueValidationRule.Localization =
      minimalElementsCountInputtedValueValidationRuleLocalization__english;

  public readonly mustFinishValidationIfValueIsInvalid: boolean;

  private readonly MINIMAL_ELEMENTS_COUNT: number;
  private readonly errorMessageBuilder: MinimalElementsCountInputtedValueValidationRule.ErrorMessage.Builder;


  public constructor(
    compoundParameter:
        InputtedValueValidation.Rule.ConstructorParameter &
        Readonly<{
          maximalElementsCount: number;
          errorMessageBuilder?: MinimalElementsCountInputtedValueValidationRule.ErrorMessage.Builder;
          errorMessage?: string;
          localization?: MinimalElementsCountInputtedValueValidationRule.Localization;
        }>
  ) {

    this.mustFinishValidationIfValueIsInvalid = compoundParameter.mustFinishValidationIfValueIsInvalid ?? false;

    this.MINIMAL_ELEMENTS_COUNT = compoundParameter.maximalElementsCount;

    if (isNotUndefined(compoundParameter.errorMessageBuilder)) {
      this.errorMessageBuilder = compoundParameter.errorMessageBuilder;
    } else if (isNotUndefined(compoundParameter.errorMessage)) {
      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
       * It was proved that "errorMessage" is non-undefined, and it will not change. */
      this.errorMessageBuilder = (): string => compoundParameter.errorMessage as string;
    } else {
      this.errorMessageBuilder =
          compoundParameter.localization?.errorMessageBuilder ??
          MinimalElementsCountInputtedValueValidationRule.localization.errorMessageBuilder;
    }

  }


  public check(rawValue: unknown): InputtedValueValidation.Rule.CheckingResult {

    if (!Array.isArray(rawValue)) {

      Logger.logError({
        errorType: InvalidParameterValueError.NAME,
        title: InvalidParameterValueError.localization.defaultTitle,
        description: "Unable to execute this validation because the raw value is not the array " +
            `and actually has type "${ typeof rawValue }".`,
        occurrenceLocation: "MinimalElementsCountInputtedValueValidationRule.check(rawValue)"
      });

      return { isValid: true };

    }


    const isValid: boolean = rawValue.length >= this.MINIMAL_ELEMENTS_COUNT;

    return isValid ?
        { isValid: true } :
        {
          isValid: false,
          errorMessage: this.errorMessageBuilder({
            formattedRawValue: stringifyAndFormatArbitraryValue(rawValue),
            minimalElementsCount: this.MINIMAL_ELEMENTS_COUNT
          })
        };

  }

}


namespace MinimalElementsCountInputtedValueValidationRule {

  export type Localization = Readonly<{ errorMessageBuilder: ErrorMessage.Builder; }>;

  export namespace ErrorMessage {

    export type Builder = (templateVariables: TemplateVariables) => string;

    export type TemplateVariables = Readonly<{
      minimalElementsCount: number;
      formattedRawValue: string;
    }>;

  }

}


export default MinimalElementsCountInputtedValueValidationRule;
