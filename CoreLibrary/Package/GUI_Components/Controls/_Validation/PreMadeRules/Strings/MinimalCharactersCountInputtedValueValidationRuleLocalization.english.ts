import type MinimalCharactersCountInputtedValueValidationRule from "./MinimalCharactersCountInputtedValueValidationRule";


const minimalCharactersCountInputtedValueValidationRuleLocalization__english:
    MinimalCharactersCountInputtedValueValidationRule.Localization =
    {
      errorMessageBuilder: (
        templateVariables: MinimalCharactersCountInputtedValueValidationRule.ErrorMessage.TemplateVariables
      ): string =>
          "Not enough characters has been inputted. " +
          `Please input at least ${ templateVariables.minimalCharactersCount } characters.`
    };


export default minimalCharactersCountInputtedValueValidationRuleLocalization__english;
