import type MaximalElementsCountInputtedValueValidationRule from "./MaximalElementsCountInputtedValueValidationRule";


const maximalElementsCountInputtedValueValidationRuleLocalization__english:
    MaximalElementsCountInputtedValueValidationRule.Localization =
{
  errorMessageBuilder: (
    templateVariables: MaximalElementsCountInputtedValueValidationRule.ErrorMessage.TemplateVariables
  ): string =>
      "Too many items has been inputted. " +
      `Please input no more than ${ templateVariables.maximalElementsCount } items.`
};


export default maximalElementsCountInputtedValueValidationRuleLocalization__english;
