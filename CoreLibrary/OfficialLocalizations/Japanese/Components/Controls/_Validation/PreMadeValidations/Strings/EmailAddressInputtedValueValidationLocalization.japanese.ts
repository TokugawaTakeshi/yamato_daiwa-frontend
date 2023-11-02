import type {
  EmailAddressInputtedValueValidation,
  MinimalCharactersCountInputtedValueValidationRule
} from "@yamato-daiwa/frontend";


const emailAddressInputtedValueValidationLocalization__japanese: EmailAddressInputtedValueValidation.Localization = {

  requiredInputIsMissingValidationErrorMessage:
      "メールアドレスは必須となっております。お手数ですが、メールアドレスをご入力下さい。",

  invalidEmailAddressErrorMessageBuilder: (): string =>
      "入力されたメールアドレスは不正です。お手数ですが、メールアドレスを確認の上、正しいメールアドレスを入力してください。",

  minimalCharactersCountValidationErrorMessageBuilder: (
    { rawValue, minimalCharactersCount }: MinimalCharactersCountInputtedValueValidationRule.ErrorMessage.TemplateVariables
  ): string =>
      `${ rawValue.length } characters is not enough for the email address. ` +
      `Please check the correct email address and input at least ${ minimalCharactersCount } characters.`

};


export default emailAddressInputtedValueValidationLocalization__japanese;
