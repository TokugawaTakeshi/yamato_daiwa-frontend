abstract class InputtedValueValidationRule {

  public readonly errorMessage: string;
  public readonly mustFinishValidationIfValueIsInvalid: boolean;


  protected constructor(compoundParameter: InputtedValueValidationRule.ConstructorParameter) {
    this.errorMessage = compoundParameter.errorMessage;
    this.mustFinishValidationIfValueIsInvalid = compoundParameter.mustFinishValidationIfValueIsInvalid ?? false;
  }


  public abstract isValid(rawValue: unknown): boolean;

}


namespace InputtedValueValidationRule {

  export type ConstructorParameter = Readonly<{
    errorMessage: string;
    mustFinishValidationIfValueIsInvalid?: boolean;
  }>;

}


export default InputtedValueValidationRule;
