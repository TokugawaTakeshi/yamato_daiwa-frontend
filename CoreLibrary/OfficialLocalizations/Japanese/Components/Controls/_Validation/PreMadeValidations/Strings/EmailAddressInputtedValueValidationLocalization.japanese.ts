import type { EmailAddressInputtedValueValidation } from "@yamato-daiwa/frontend";
import emailAddressInputtedValueValidationRuleLocalization__english from
    "../../PreMadeRules/Strings/EmailAddressInputtedValueValidationRuleLocalization.english";


const emailAddressInputtedValueValidationLocalization__japanese: EmailAddressInputtedValueValidation.Localization = {

  requiredInputIsMissingValidationErrorMessage: "メールアドレスは必須です。ご入力をお願いいたします。",

  minimalCharactersCountValidationErrorMessageBuilder: (): string =>
      "入力されたメールアドレスは「文字数が少なすぎる」可能性があります。正しいメールアドレスかどうかご確認ください。",

  invalidEmailAddressErrorMessageBuilder: emailAddressInputtedValueValidationRuleLocalization__english.errorMessageBuilder

};


export default emailAddressInputtedValueValidationLocalization__japanese;
