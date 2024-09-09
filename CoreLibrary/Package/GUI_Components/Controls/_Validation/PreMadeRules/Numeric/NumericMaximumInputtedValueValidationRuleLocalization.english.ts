import type NumericMaximumInputtedValueValidationRule from "./NumericMaximumInputtedValueValidationRule";


const numericMaximumInputtedValueValidationRuleLocalization__english:
    NumericMaximumInputtedValueValidationRule.Localization =
{
  errorMessageBuilder: (templateVariables: NumericMaximumInputtedValueValidationRule.ErrorMessage.TemplateVariables): string =>
      `The inputted numeric value is exceeding the ${ templateVariables.maximalValue }, the maximal allowed value. ` +
      `Please input the number not greater than ${ templateVariables.maximalValue }.`
};


export default numericMaximumInputtedValueValidationRuleLocalization__english;
