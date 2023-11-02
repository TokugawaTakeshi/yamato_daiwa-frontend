import type EmailAddressInputtedValueValidation from "./EmailAddressInputtedValueValidation";

import type MinimalCharactersCountInputtedValueValidationRule from
    "../../../PreMadeRules/Strings/MinimalCharactersCountInputtedValueValidationRule";


const emailAddressInputtedValueValidationLocalization__english: EmailAddressInputtedValueValidation.Localization = {

  requiredInputIsMissingValidationErrorMessage:
      "The email address is required. Please input the email address.",

  invalidEmailAddressErrorMessageBuilder: (): string =>
      "The inputted email address is invalid. Pleas check the email address and correct the input.",

  minimalCharactersCountValidationErrorMessageBuilder: (
    { rawValue, minimalCharactersCount }: MinimalCharactersCountInputtedValueValidationRule.ErrorMessage.TemplateVariables
  ): string =>
      `${ rawValue.length } characters is not enough for the email address. ` +
      `Please check the correct email address and input at least ${ minimalCharactersCount } characters.`

};


export default emailAddressInputtedValueValidationLocalization__english;
