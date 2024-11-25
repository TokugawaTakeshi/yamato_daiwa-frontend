import type InputtedValueValidation from "../../InputtedValueValidation";
import maximalElementsCountInputtedValueValidationRuleLocalization__english from
    "./MaximalElementsCountInputtedValueValidationRuleLocalization.english";
import {
  stringifyAndFormatArbitraryValue,
  isNotUndefined,
  Logger,
  InvalidParameterValueError
} from "@yamato-daiwa/es-extensions";


class MaximalElementsCountInputtedValueValidationRule implements InputtedValueValidation.Rule {

  public static localization: MaximalElementsCountInputtedValueValidationRule.Localization =
      maximalElementsCountInputtedValueValidationRuleLocalization__english;

  public readonly mustFinishValidationIfValueIsInvalid: boolean;

  private readonly MAXIMAL_ELEMENTS_COUNT: number;
  private readonly errorMessageBuilder: MaximalElementsCountInputtedValueValidationRule.ErrorMessage.Builder;


  public constructor(
    compoundParameter:
        InputtedValueValidation.Rule.ConstructorParameter &
        Readonly<{
          maximalElementsCount: number;
          errorMessageBuilder?: MaximalElementsCountInputtedValueValidationRule.ErrorMessage.Builder;
          errorMessage?: string;
          localization?: MaximalElementsCountInputtedValueValidationRule.Localization;
        }>
  ) {

    this.mustFinishValidationIfValueIsInvalid = compoundParameter.mustFinishValidationIfValueIsInvalid ?? false;

    this.MAXIMAL_ELEMENTS_COUNT = compoundParameter.maximalElementsCount;

    if (isNotUndefined(compoundParameter.errorMessageBuilder)) {
      this.errorMessageBuilder = compoundParameter.errorMessageBuilder;
    } else if (isNotUndefined(compoundParameter.errorMessage)) {
      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
       * It was proved that "errorMessage" is non-undefined, and it will not change. */
      this.errorMessageBuilder = (): string => compoundParameter.errorMessage as string;
    } else {
      this.errorMessageBuilder =
          compoundParameter.localization?.errorMessageBuilder ??
          MaximalElementsCountInputtedValueValidationRule.localization.errorMessageBuilder;
    }

  }


  public check(rawValue: unknown): InputtedValueValidation.Rule.CheckingResult {

    if (!Array.isArray(rawValue)) {

      Logger.logError({
        errorType: InvalidParameterValueError.NAME,
        title: InvalidParameterValueError.localization.defaultTitle,
        description: "Unable to execute this validation because the raw value is not the array " +
            `and actually has type "${ typeof rawValue }".`,
        occurrenceLocation: "MaximalElementsCountInputtedValueValidationRule.check(rawValue)"
      });

      return { isValid: true };

    }


    const isValid: boolean = rawValue.length <= this.MAXIMAL_ELEMENTS_COUNT;

    return isValid ?
        { isValid: true } :
        {
          isValid: false,
          errorMessage: this.errorMessageBuilder({
            formattedRawValue: stringifyAndFormatArbitraryValue(rawValue),
            maximalElementsCount: this.MAXIMAL_ELEMENTS_COUNT
          })
        };

  }

}


namespace MaximalElementsCountInputtedValueValidationRule {

  export type Localization = Readonly<{ errorMessageBuilder: ErrorMessage.Builder; }>;

  export namespace ErrorMessage {

    export type Builder = (templateVariables: TemplateVariables) => string;

    export type TemplateVariables = Readonly<{
      maximalElementsCount: number;
      formattedRawValue: string;
    }>;

  }

}


export default MaximalElementsCountInputtedValueValidationRule;
