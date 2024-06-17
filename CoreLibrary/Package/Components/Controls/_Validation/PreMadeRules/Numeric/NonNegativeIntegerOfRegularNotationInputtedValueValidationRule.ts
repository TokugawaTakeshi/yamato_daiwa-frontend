import type InputtedValueValidation from "../../InputtedValueValidation";
import nonNegativeIntegerOfRegularNotationInputtedValueValidationRuleLocalization__english from
    "./NonNegativeIntegerOfRegularNotationInputtedValueValidationRuleLocalization.english";
import { isNumber, isString, isNotUndefined, Logger, InvalidParameterValueError } from "@yamato-daiwa/es-extensions";


class NonNegativeIntegerOfRegularNotationInputtedValueValidationRule implements InputtedValueValidation.Rule {

  public static localization: NonNegativeIntegerOfRegularNotationInputtedValueValidationRule.Localization =
      nonNegativeIntegerOfRegularNotationInputtedValueValidationRuleLocalization__english;

  public readonly mustFinishValidationIfValueIsInvalid: boolean;

  private readonly errorMessageBuilder: NonNegativeIntegerOfRegularNotationInputtedValueValidationRule.ErrorMessage.Builder;


  public constructor(
    compoundParameter:
        InputtedValueValidation.Rule.ConstructorParameter &
        Readonly<{
          errorMessageBuilder?: NonNegativeIntegerOfRegularNotationInputtedValueValidationRule.ErrorMessage.Builder;
          errorMessage?: string;
          localization?: NonNegativeIntegerOfRegularNotationInputtedValueValidationRule.Localization;
        }>
  ) {

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
          NonNegativeIntegerOfRegularNotationInputtedValueValidationRule.localization.errorMessageBuilder;
    }

  }


  public check(rawValue: unknown): InputtedValueValidation.Rule.CheckingResult {

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


    return (/^\d+$/u).test(String(rawValue)) ?
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
