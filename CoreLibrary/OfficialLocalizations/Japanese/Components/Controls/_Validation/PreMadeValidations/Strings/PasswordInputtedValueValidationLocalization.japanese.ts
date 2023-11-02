import type {
  PasswordInputtedValueValidation,
  AllowedCharactersInputtedValueValidationRule,
  MinimalCharactersCountInputtedValueValidationRule,
  MaximalCharactersCountInputtedValueValidationRule
} from "@yamato-daiwa/frontend";


const passwordInputtedValueValidationLocalization__japanese: PasswordInputtedValueValidation.Localization = {

  requiredInputIsMissingValidationErrorMessage:
      "パスワードは必須となります。お手数ですが、パスワードを入力して下さい。",

  disallowedCharactersFoundValidationErrorMessageBuilder: (
    { inputtedDisallowedCharacters }: AllowedCharactersInputtedValueValidationRule.ErrorMessage.TemplateVariables
  ): string =>
      `パスワードに${ inputtedDisallowedCharacters.join(",") }文字が許可されていないです。` +
      "お手数ですが、こも文字を削除するか、別の文字に置き換えて下さい。",

  minimalCharactersCountValidationErrorMessageBuilder: (
    { minimalCharactersCount }: MinimalCharactersCountInputtedValueValidationRule.ErrorMessage.TemplateVariables
  ): string => `パスワードは短すぎます。お手数ですが、少なくとも${ minimalCharactersCount }文字を入力して下さい。`,

  tooManyCharactersValidationErrorMessageBuilder: (
    { maximalCharactersCount }: MaximalCharactersCountInputtedValueValidationRule.ErrorMessage.TemplateVariables
  ): string =>
      "パスワードは文字が多すぎます。" +
      `長いパスワードは常にお薦めされてはいるが、恐れがシステムの制限上最大${ maximalCharactersCount }文字を入力してくださいませんでしょうか。`

};


export default passwordInputtedValueValidationLocalization__japanese;
