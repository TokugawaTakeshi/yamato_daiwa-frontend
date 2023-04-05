import type InputtedValueValidationRule from "@Controls/_Validation/InputtedValueValidationRule";
import numericMinimumInputtedValueValidationRuleLocalization__english from
    "@Controls/_Validation/PreMadeRules/Numeric/NumericMinimumInputtedValueValidationRuleLocalization.english";
import { isNumber, isNotUndefined, Logger, InvalidParameterValueError } from "@yamato-daiwa/es-extensions";


class NumericMinimumInputtedValueValidationRule implements InputtedValueValidationRule {

  public static localization: NumericMinimumInputtedValueValidationRule.Localization =
      numericMinimumInputtedValueValidationRuleLocalization__english;

  public readonly mustFinishValidationIfValueIsInvalid: boolean;

  private readonly MINIMAL_NUMERIC_VALUE: number;
  private readonly errorMessageBuilder: NumericMinimumInputtedValueValidationRule.ErrorMessage.Builder;

  public constructor(
    compoundParameter:
        InputtedValueValidationRule.ConstructorParameter &
        Readonly<{
          minimalNumericValue: number;
          errorMessageBuilder?: NumericMinimumInputtedValueValidationRule.ErrorMessage.Builder;
          errorMessage?: string;
        }>
  ) {

    this.MINIMAL_NUMERIC_VALUE = compoundParameter.minimalNumericValue;

    this.mustFinishValidationIfValueIsInvalid = compoundParameter.mustFinishValidationIfValueIsInvalid ?? false;

    if (isNotUndefined(compoundParameter.errorMessageBuilder)) {
      this.errorMessageBuilder = compoundParameter.errorMessageBuilder;
    } else if (isNotUndefined(compoundParameter.errorMessage)) {
      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
       * It was proved that "errorMessage" is non-undefined, and it will not change. */
      this.errorMessageBuilder = (): string => compoundParameter.errorMessage as string;
    } else {
      this.errorMessageBuilder = NumericMinimumInputtedValueValidationRule.localization.errorMessageBuilder;
    }

  }


  public check(rawValue: unknown): InputtedValueValidationRule.CheckingResult {

    if (!isNumber(rawValue)) {

      Logger.logError({
        errorType: InvalidParameterValueError.NAME,
        title: InvalidParameterValueError.localization.defaultTitle,
        description: "Unable to execute this validation because the raw value is not number " +
            `and actually has type "${ typeof rawValue }".`,
        occurrenceLocation: "NumericMinimumInputtedValueValidationRule.check(rawValue)"
      });

      return { isValid: true };

    }


    return rawValue >= this.MINIMAL_NUMERIC_VALUE ?
        { isValid: true } :
        {
          isValid: false,
          errorMessage: this.errorMessageBuilder({ rawValue, minimalValue: this.MINIMAL_NUMERIC_VALUE })
        };

  }

}


namespace NumericMinimumInputtedValueValidationRule {

  export type Localization = Readonly<{ errorMessageBuilder: ErrorMessage.Builder; }>;

  export namespace ErrorMessage {

    export type Builder = (templateVariables: TemplateVariables) => string;

    export type TemplateVariables = Readonly<{
      minimalValue: number;
      rawValue: number;
    }>;

  }

}


export default NumericMinimumInputtedValueValidationRule;
