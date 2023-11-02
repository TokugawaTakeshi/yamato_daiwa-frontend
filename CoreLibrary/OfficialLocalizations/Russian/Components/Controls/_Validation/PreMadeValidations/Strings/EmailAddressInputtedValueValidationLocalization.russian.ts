import type {
  EmailAddressInputtedValueValidation,
  MinimalCharactersCountInputtedValueValidationRule
} from "@yamato-daiwa/frontend";


const emailAddressInputtedValueValidationLocalization__russian: EmailAddressInputtedValueValidation.Localization = {

  requiredInputIsMissingValidationErrorMessage:
      "Ввод электронного адреса обязателен. Пожалуйста, введите адрес электронной почты.",

  invalidEmailAddressErrorMessageBuilder: (): string =>
      "Введён невозможный адрес электронной почты. Пожалуйста, проверьте электронный адрес и откорректируйте ввод.",

  minimalCharactersCountValidationErrorMessageBuilder: (
    { rawValue, minimalCharactersCount }: MinimalCharactersCountInputtedValueValidationRule.ErrorMessage.TemplateVariables
  ): string =>
      `${ rawValue.length } символов недостаточно для электронного адреса. ` +
      `Пожалуйста, введите ${ minimalCharactersCount } characters.`

};


export default emailAddressInputtedValueValidationLocalization__russian;
