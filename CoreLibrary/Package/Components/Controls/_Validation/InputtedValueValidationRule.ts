interface InputtedValueValidationRule {

  readonly mustFinishValidationIfValueIsInvalid: boolean;

  readonly check: (rawValue: unknown) => InputtedValueValidationRule.CheckingResult;

}


namespace InputtedValueValidationRule {

  export type CheckingResult = Readonly<
    {
      isValid: true;
    } | {
      isValid: false;
      errorMessage: string;
    }
  >;

  export type ConstructorParameter = Readonly<{
    mustFinishValidationIfValueIsInvalid?: boolean;
  }>;

}


export default InputtedValueValidationRule;
