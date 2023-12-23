import { EMAIL_ADDRESS_VALID_PATTERN } from "fundamental-constants";

import type InputtedValueValidation from "../../InputtedValueValidation";

import emailAddressInputtedValueValidationRuleLocalization__english from
    "./EmailAddressInputtedValueValidationRuleLocalization.english";

import { EmailAddress, Logger, InvalidParameterValueError, isNotUndefined, isString } from "@yamato-daiwa/es-extensions";


class EmailAddressInputtedValueValidationRule implements InputtedValueValidation.Rule {

  public static localization: EmailAddressInputtedValueValidationRule.Localization =
      emailAddressInputtedValueValidationRuleLocalization__english;

  public readonly regularExpression: RegExp;
  public readonly mustFinishValidationIfValueIsInvalid: boolean;

  private readonly errorMessageBuilder: EmailAddressInputtedValueValidationRule.ErrorMessage.Builder;


  public constructor(
    compoundParameter:
        InputtedValueValidation.Rule.ConstructorParameter &
        Readonly<{
          regularExpression?: RegExp;
          errorMessageBuilder?: EmailAddressInputtedValueValidationRule.ErrorMessage.Builder;
          errorMessage?: string;
        }> = {}
  ) {

    this.regularExpression = compoundParameter.regularExpression ?? EMAIL_ADDRESS_VALID_PATTERN;
    this.mustFinishValidationIfValueIsInvalid = compoundParameter.mustFinishValidationIfValueIsInvalid ?? false;

    if (isNotUndefined(compoundParameter.errorMessageBuilder)) {
      this.errorMessageBuilder = compoundParameter.errorMessageBuilder;
    } else if (isNotUndefined(compoundParameter.errorMessage)) {
      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
       * It was proved that "errorMessage" is non-undefined, and it will not change. */
      this.errorMessageBuilder = (): string => compoundParameter.errorMessage as string;
    } else {
      this.errorMessageBuilder = EmailAddressInputtedValueValidationRule.localization.errorMessageBuilder;
    }

  }


  public check(rawValue: unknown): InputtedValueValidation.Rule.CheckingResult {

    if (!isString(rawValue)) {

      Logger.logError({
        errorType: InvalidParameterValueError.NAME,
        title: InvalidParameterValueError.localization.defaultTitle,
        description: "Unable to execute this validation because the raw value is not the string " +
            `and actually has type "${ typeof rawValue }".`,
        occurrenceLocation: "EmailAddressInputtedValueValidationRule.check(rawValue)"
      });

      return { isValid: true };

    }


    return EmailAddress.isValid(rawValue) ?
        { isValid: true } :
        {
          isValid: false,
          errorMessage: this.errorMessageBuilder({ rawValue })
        };

  }

}


namespace EmailAddressInputtedValueValidationRule {

  export type Localization = Readonly<{ errorMessageBuilder: ErrorMessage.Builder; }>;

  export namespace ErrorMessage {

    export type Builder = (templateVariables: TemplateVariables) => string;

    export type TemplateVariables = Readonly<{
      rawValue: string;
    }>;

  }

}


export default EmailAddressInputtedValueValidationRule;
