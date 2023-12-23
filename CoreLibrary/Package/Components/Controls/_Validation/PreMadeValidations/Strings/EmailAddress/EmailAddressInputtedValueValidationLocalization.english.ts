import type EmailAddressInputtedValueValidation from "./EmailAddressInputtedValueValidation";
import emailAddressInputtedValueValidationRuleLocalization__english from
    "../../../PreMadeRules/Strings/EmailAddressInputtedValueValidationRuleLocalization.english";
import type MinimalCharactersCountInputtedValueValidationRule from
    "../../../PreMadeRules/Strings/MinimalCharactersCountInputtedValueValidationRule";


const emailAddressInputtedValueValidationLocalization__english: EmailAddressInputtedValueValidation.Localization = {

  requiredInputIsMissingValidationErrorMessage:
      "The email address is required. Please input the email address.",

  minimalCharactersCountValidationErrorMessageBuilder: (
    { rawValue, minimalCharactersCount }: MinimalCharactersCountInputtedValueValidationRule.ErrorMessage.TemplateVariables
  ): string =>
      `${ rawValue.length } characters is not enough for the email address. ` +
      `Please check the correct email address and input at least ${ minimalCharactersCount } characters.`,

  invalidEmailAddressErrorMessageBuilder: emailAddressInputtedValueValidationRuleLocalization__english.errorMessageBuilder

};


export default emailAddressInputtedValueValidationLocalization__english;
