import {
  Logger,
  isBoolean,
  isUndefined,
  substituteWhenUndefined
} from "@yamato-daiwa/es-extensions";


abstract class ValueValidation {

  private readonly inputIsRequired: boolean | ((...parameters: Array<unknown>) => boolean);
  private readonly omittedValueChecker: ValueValidation.OmittedValueChecker;
  private readonly requiredInputIsMissingValidationErrorMessage: string;
  private readonly contextIndependentRules?: ValueValidation.ContextIndependentRules;
  private readonly contextDependentRules?: ValueValidation.ContextDependentRules;
  private readonly asynchronousValidationRules?: ValueValidation.AsynchronousRules;

  protected constructor(parametersObject: ValueValidation.ParametersObject) {
    this.inputIsRequired = parametersObject.inputIsRequired;
    this.omittedValueChecker = parametersObject.omittedValueChecker;
    this.requiredInputIsMissingValidationErrorMessage = substituteWhenUndefined(
      parametersObject.requiredValueIsMissingCustomValidationErrorMessage, "This value is required."
    );
    this.contextIndependentRules = parametersObject.contextIndependentValidationRules;
    this.contextDependentRules = parametersObject.contextDependentValidationRules;
  }

  public validate(rawValue: unknown): ValueValidation.ValidationResult {

    if (this.omittedValueChecker(rawValue)) {
      return {
        isValid: !this.isInputRequired,
        errorsMessages: [ ...this.isInputRequired ? [ this.requiredInputIsMissingValidationErrorMessage ] : [] ]
      };
    }

    if (isUndefined(this.contextIndependentRules)) {
      return { isValid: true, errorsMessages: [] };
    }

    const mutableValidationResult: ValueValidation.ValidationResult = {
      isValid: true,
      errorsMessages: []
    };

    for (const validationRule of Object.values(this.contextIndependentRules)) {
      if (!validationRule.checker(rawValue)) {
        mutableValidationResult.isValid = false;
        mutableValidationResult.errorsMessages.push(validationRule.errorMessage);
        if (validationRule.finishValidationIfInvalid === true) {
          break;
        }
      }
    }

    if (isUndefined(this.contextDependentRules)) {
      return mutableValidationResult;
    }


    for (const validationRule of Object.values(this.contextDependentRules)) {
      if (!validationRule.checker(rawValue)) {
        mutableValidationResult.isValid = false;
        mutableValidationResult.errorsMessages.push(validationRule.errorMessage);
        if (validationRule.finishValidationIfInvalid === true) {
          break;
        }
      }
    }

    if (isUndefined(this.asynchronousValidationRules)) {
      return mutableValidationResult;
    }

    for (const validationRule of Object.values(this.asynchronousValidationRules)) {
      validationRule.checker(rawValue).
          then().
          catch(
            (error: unknown): void => {
              Logger.logError({
                errorType: "AsynchronousValidationFailedError",
                title: "Asynchronous validation failed error",
                description: "The error occurred during the asynchronous validation.",
                occurrenceLocation: "ValueValidation.validate(rawValue)",
                caughtError: error
              });
            }
          );
    }

    return mutableValidationResult;
  }

  public get isInputRequired(): boolean {
    return isBoolean(this.inputIsRequired) ? this.inputIsRequired : this.inputIsRequired();
  }
}


namespace ValueValidation {

  export type ParametersObject = {
    inputIsRequired: boolean | ((...parameters: Array<unknown>) => boolean);
    omittedValueChecker: OmittedValueChecker;
    requiredValueIsMissingCustomValidationErrorMessage?: string;
    contextIndependentValidationRules?: ContextIndependentRules;
    contextDependentValidationRules?: ContextDependentRules;
    asynchronousValidationRules?: Array<(rawData: unknown) => boolean>;
  };

  export type OmittedValueChecker = (rawValue: unknown) => boolean;

  export type ContextIndependentRules = {
    [ruleName: string]: ContextIndependentValueValidationRule;
  };

  export type ContextDependentRules = {
    [ruleName: string]: ContextDependentRule;
  };

  export type ContextDependentRule = {
    checker: (rawData: unknown) => boolean;
    errorMessage: string;
    finishValidationIfInvalid?: boolean;
  };

  export type AsynchronousRules = {
    [ruleName: string]: AsynchronousRule;
  };

  export type AsynchronousRule = {
    checker: (rawData: unknown) => Promise<boolean>;
  };

  export type ValidationResult = {
    isValid: boolean;
    errorsMessages: Array<string>;
  };

  export type ContextIndependentValueValidationRule = {
    checker: (rawData: unknown) => boolean;
    errorMessage: string;
    finishValidationIfInvalid?: boolean;
  };
}


export default ValueValidation;
