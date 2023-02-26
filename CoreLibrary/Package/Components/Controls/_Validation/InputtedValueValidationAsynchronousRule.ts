abstract class InputtedValueValidationAsynchronousRule {

  public abstract readonly ID: string;

  public readonly messages: InputtedValueValidationAsynchronousRule.Messages;


  protected constructor(messages: InputtedValueValidationAsynchronousRule.Messages) {
    this.messages = messages;
  }


  public abstract isValid(rawValue: unknown): Promise<InputtedValueValidationAsynchronousRule.CheckingResult>;

}


namespace InputtedValueValidationAsynchronousRule {

  export type Messages = Readonly<{
    checkingInProgress: string;
    validValueHasBeenConfirmed: string;
    invalidValueHasBeenConfirmed: string;
    errorHasOccurred: string;
  }>;

  export type CheckingResult = Readonly<{
    isValid: boolean;
    errorMessage?: string;
  }>;

}


export default InputtedValueValidationAsynchronousRule;
