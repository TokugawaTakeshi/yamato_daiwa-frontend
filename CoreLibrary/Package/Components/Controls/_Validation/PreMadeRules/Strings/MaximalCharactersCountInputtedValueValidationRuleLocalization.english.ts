import type MaximalCharactersCountInputtedValueValidationRule from "./MaximalCharactersCountInputtedValueValidationRule";


const maximalCharactersCountInputtedValueValidationRuleLocalization__english:
    MaximalCharactersCountInputtedValueValidationRule.Localization =
    {
      errorMessageBuilder: (
        templateVariables: MaximalCharactersCountInputtedValueValidationRule.ErrorMessage.TemplateVariables
      ): string =>
          "Too many characters has been inputted. " +
          `Please leave no more than ${ templateVariables.maximalCharactersCount } characters.`
    };


export default maximalCharactersCountInputtedValueValidationRuleLocalization__english;
