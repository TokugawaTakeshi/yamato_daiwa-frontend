import type NumericMinimumInputtedValueValidationRule from "./NumericMinimumInputtedValueValidationRule";


const numericMinimumInputtedValueValidationRuleLocalization__english:
    NumericMinimumInputtedValueValidationRule.Localization =
{
  errorMessageBuilder: ({ minimalValue }: NumericMinimumInputtedValueValidationRule.ErrorMessage.TemplateVariables): string =>
      `The inputted numeric value is less than ${ minimalValue }, the minimal required value. ` +
      `Please input the number from ${ minimalValue }.`
};


export default numericMinimumInputtedValueValidationRuleLocalization__english;
