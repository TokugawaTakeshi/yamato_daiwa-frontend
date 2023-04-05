import type InputtedValueValidationRule from "@Controls/_Validation/InputtedValueValidationRule";
import maximalCharactersCountInputtedValueValidationRuleLocalization__english from
    "@Controls/_Validation/PreMadeRules/Strings/MaximalCharactersCountInputtedValueValidationRuleLocalization.english";
import { isString, isNotUndefined, Logger, InvalidParameterValueError } from "@yamato-daiwa/es-extensions";


class MaximalCharactersCountInputtedValueValidationRule implements InputtedValueValidationRule {

  public static localization: MaximalCharactersCountInputtedValueValidationRule.Localization =
      maximalCharactersCountInputtedValueValidationRuleLocalization__english;

  public readonly mustFinishValidationIfValueIsInvalid: boolean;

  private readonly MAXIMAL_CHARACTERS_COUNT: number;
  private readonly errorMessageBuilder: MaximalCharactersCountInputtedValueValidationRule.ErrorMessage.Builder;


  public constructor(
    compoundParameter:
        InputtedValueValidationRule.ConstructorParameter &
        Readonly<{
          maximalCharactersCount: number;
          errorMessageBuilder?: MaximalCharactersCountInputtedValueValidationRule.ErrorMessage.Builder;
          errorMessage?: string;
        }>
  ) {

    this.mustFinishValidationIfValueIsInvalid = compoundParameter.mustFinishValidationIfValueIsInvalid ?? false;

    this.MAXIMAL_CHARACTERS_COUNT = compoundParameter.maximalCharactersCount;

    if (isNotUndefined(compoundParameter.errorMessageBuilder)) {
      this.errorMessageBuilder = compoundParameter.errorMessageBuilder;
    } else if (isNotUndefined(compoundParameter.errorMessage)) {
      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
       * It was proved that "errorMessage" is non-undefined, and it will not change. */
      this.errorMessageBuilder = (): string => compoundParameter.errorMessage as string;
    } else {
      this.errorMessageBuilder = MaximalCharactersCountInputtedValueValidationRule.localization.errorMessageBuilder;
    }

  }


  public check(rawValue: unknown): InputtedValueValidationRule.CheckingResult {

    if (!isString(rawValue)) {

      Logger.logError({
        errorType: InvalidParameterValueError.NAME,
        title: InvalidParameterValueError.localization.defaultTitle,
        description: "Unable to execute this validation because the raw value is not the string " +
            `and actually has type "${ typeof rawValue }".`,
        occurrenceLocation: "MaximalCharactersCountInputtedValueValidationRule.check(rawValue)"
      });

      return { isValid: true };

    }


    const isValid: boolean = rawValue.length <= this.MAXIMAL_CHARACTERS_COUNT;

    return isValid ?
        { isValid: true } :
        {
          isValid: false,
          errorMessage: this.errorMessageBuilder({ rawValue, maximalCharactersCount: this.MAXIMAL_CHARACTERS_COUNT })
        };

  }

}


namespace MaximalCharactersCountInputtedValueValidationRule {

  export type Localization = Readonly<{ errorMessageBuilder: ErrorMessage.Builder; }>;

  export namespace ErrorMessage {

    export type Builder = (templateVariables: TemplateVariables) => string;

    export type TemplateVariables = Readonly<{
      maximalCharactersCount: number;
      rawValue: string;
    }>;

  }

}


export default MaximalCharactersCountInputtedValueValidationRule;
