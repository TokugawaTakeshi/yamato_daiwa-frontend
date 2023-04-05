import type NumericMinimumInputtedValueValidationRule from
    "@Controls/_Validation/PreMadeRules/Numeric/NumericMinimumInputtedValueValidationRule";


const numericMinimumInputtedValueValidationRuleLocalization__english:
    NumericMinimumInputtedValueValidationRule.Localization =
{
  errorMessageBuilder: (templateVariables: NumericMinimumInputtedValueValidationRule.ErrorMessage.TemplateVariables): string =>
      `The inputted numeric value is less than ${ templateVariables.minimalValue }, the minimal required value. ` +
      `Please input the number from ${ templateVariables.minimalValue }.`
};


export default numericMinimumInputtedValueValidationRuleLocalization__english;
