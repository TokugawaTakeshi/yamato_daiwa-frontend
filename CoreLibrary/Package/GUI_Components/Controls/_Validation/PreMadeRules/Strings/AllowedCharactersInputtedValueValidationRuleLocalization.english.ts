import type AllowedCharactersInputtedValueValidationRule from "./AllowedCharactersInputtedValueValidationRule";


const allowedCharactersInputtedValueValidationRuleLocalization__english:
    AllowedCharactersInputtedValueValidationRule.Localization =
{
  errorMessageBuilder: (
    templateVariables: AllowedCharactersInputtedValueValidationRule.ErrorMessage.TemplateVariables
  ): string =>
    `Below characters are disallowed: ${ templateVariables.inputtedDisallowedCharacters.join(",") }. ` +
    "Please remove these characters."
};


export default allowedCharactersInputtedValueValidationRuleLocalization__english;
