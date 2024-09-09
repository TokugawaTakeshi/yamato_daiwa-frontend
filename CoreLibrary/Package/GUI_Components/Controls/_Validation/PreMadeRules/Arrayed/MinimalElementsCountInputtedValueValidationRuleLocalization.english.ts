import type MinimalElementsCountInputtedValueValidationRule from "./MinimalElementsCountInputtedValueValidationRule";


const minimalElementsCountInputtedValueValidationRuleLocalization__english:
    MinimalElementsCountInputtedValueValidationRule.Localization =
    {
      errorMessageBuilder: (
        templateVariables: MinimalElementsCountInputtedValueValidationRule.ErrorMessage.TemplateVariables
      ): string =>
          "Too few items has been inputted. " +
          `Please input no at least ${ templateVariables.minimalElementsCount } items.`
    };


export default minimalElementsCountInputtedValueValidationRuleLocalization__english;
