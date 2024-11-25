import type InputtedValueValidation from "../../InputtedValueValidation";
import numericMaximumInputtedValueValidationRuleLocalization__english from
    "./NumericMaximumInputtedValueValidationRuleLocalization.english";
import { isNumber, isNotUndefined, Logger, InvalidParameterValueError } from "@yamato-daiwa/es-extensions";


class NumericMaximumInputtedValueValidationRule implements InputtedValueValidation.Rule {

  public static localization: NumericMaximumInputtedValueValidationRule.Localization =
      numericMaximumInputtedValueValidationRuleLocalization__english;

  public readonly mustFinishValidationIfValueIsInvalid: boolean;

  private readonly MAXIMAL_NUMERIC_VALUE: number;
  private readonly errorMessageBuilder: NumericMaximumInputtedValueValidationRule.ErrorMessage.Builder;


  public constructor(
    compoundParameter:
        InputtedValueValidation.Rule.ConstructorParameter &
        Readonly<{
          maximalNumericValue: number;
          errorMessageBuilder?: NumericMaximumInputtedValueValidationRule.ErrorMessage.Builder;
          errorMessage?: string;
          localization?: NumericMaximumInputtedValueValidationRule.Localization;
        }>
  ) {

    this.MAXIMAL_NUMERIC_VALUE = compoundParameter.maximalNumericValue;

    this.mustFinishValidationIfValueIsInvalid = compoundParameter.mustFinishValidationIfValueIsInvalid ?? false;

    if (isNotUndefined(compoundParameter.errorMessageBuilder)) {
      this.errorMessageBuilder = compoundParameter.errorMessageBuilder;
    } else if (isNotUndefined(compoundParameter.errorMessage)) {
      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
       * It was proved that "errorMessage" is non-undefined, and it will not change. */
      this.errorMessageBuilder = (): string => compoundParameter.errorMessage as string;
    } else {
      this.errorMessageBuilder =
          compoundParameter.localization?.errorMessageBuilder ??
          NumericMaximumInputtedValueValidationRule.localization.errorMessageBuilder;
    }

  }


  public check(rawValue: unknown): InputtedValueValidation.Rule.CheckingResult {

    if (!isNumber(rawValue)) {

      Logger.logError({
        errorType: InvalidParameterValueError.NAME,
        title: InvalidParameterValueError.localization.defaultTitle,
        description: "Unable to execute this validation because the raw value is not number " +
            `and actually has type "${ typeof rawValue }".`,
        occurrenceLocation: "NumericMaximumInputtedValueValidationRule.check(rawValue)"
      });

      return { isValid: true };

    }


    return rawValue <= this.MAXIMAL_NUMERIC_VALUE ?
        { isValid: true } :
        {
          isValid: false,
          errorMessage: this.errorMessageBuilder({ rawValue, maximalValue: this.MAXIMAL_NUMERIC_VALUE })
        };

  }

}


namespace NumericMaximumInputtedValueValidationRule {

  export type Localization = Readonly<{ errorMessageBuilder: ErrorMessage.Builder; }>;

  export namespace ErrorMessage {

    export type Builder = (templateVariables: TemplateVariables) => string;

    export type TemplateVariables = Readonly<{
      maximalValue: number;
      rawValue: number;
    }>;

  }

}


export default NumericMaximumInputtedValueValidationRule;
