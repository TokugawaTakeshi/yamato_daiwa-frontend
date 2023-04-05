import type InputtedValueValidationRule from "@Controls/_Validation/InputtedValueValidationRule";
import nonNegativeIntegerOfRegularNotationInputtedValueValidationRuleLocalization__english from
    "@Controls/_Validation/PreMadeRules/Numeric/NonNegativeIntegerOfRegularNotationInputtedValueValidationRuleLocalization.english";
import { isNumber, isString, Logger, InvalidParameterValueError } from "@yamato-daiwa/es-extensions";


class NonNegativeIntegerOfRegularNotationInputtedValueValidationRule implements InputtedValueValidationRule {

  public static localization: NonNegativeIntegerOfRegularNotationInputtedValueValidationRule.Localization =
      nonNegativeIntegerOfRegularNotationInputtedValueValidationRuleLocalization__english;

  public readonly mustFinishValidationIfValueIsInvalid: boolean;

  private readonly errorMessageBuilder: NonNegativeIntegerOfRegularNotationInputtedValueValidationRule.ErrorMessage.Builder;


  public constructor(
    compoundParameter:
        InputtedValueValidationRule.ConstructorParameter &
        { errorMessageBuilder?: NonNegativeIntegerOfRegularNotationInputtedValueValidationRule.ErrorMessage.Builder; }
  ) {

    this.mustFinishValidationIfValueIsInvalid = compoundParameter.mustFinishValidationIfValueIsInvalid ?? false;

    this.errorMessageBuilder =
        compoundParameter.errorMessageBuilder ??
        NonNegativeIntegerOfRegularNotationInputtedValueValidationRule.localization.errorMessageBuilder;

  }


  public check(rawValue: unknown): InputtedValueValidationRule.CheckingResult {

    if (!isNumber(rawValue) && !isString(rawValue)) {

      Logger.logError({
        errorType: InvalidParameterValueError.NAME,
        title: InvalidParameterValueError.localization.defaultTitle,
        description: "Unable to execute this validation because the raw value is neither number not stringified number " +
            `and actually has type "${ typeof rawValue }".`,
        occurrenceLocation: "NonNegativeIntegerOfRegularNotationInputtedValueValidationRule.check(rawValue)"
      });


      return { isValid: true };

    }


    return /^\d+$/u.test(String(rawValue)) ?
        { isValid: true } :
        {
          isValid: false,
          errorMessage: this.errorMessageBuilder({ rawValue })
        };

  }

}


namespace NonNegativeIntegerOfRegularNotationInputtedValueValidationRule {

  export type Localization = Readonly<{ errorMessageBuilder: ErrorMessage.Builder; }>;

  export namespace ErrorMessage {

    export type Builder = (templateVariables: TemplateVariables) => string;

    export type TemplateVariables = Readonly<{ rawValue: string | number; }>;

  }

}


export default NonNegativeIntegerOfRegularNotationInputtedValueValidationRule;
