import ValueValidation from "./ValueValidation";
import {
  Logger,
  UnexpectedEventError,
  isArbitraryObject,
  isUndefined,
  isNotUndefined
} from "@yamato-daiwa/es-extensions";


interface ValidatableControl {

  highlightInvalidInput: () => this;

  /* [ Theory ] In general case, the scrolled element is not "body". */
  getRootElementForScrollingProviding: () => Element;

  focus: () => this;

  resetStateToInitial: () => void;
}


namespace ValidatableControl {

  export class Payload<ValidValue, InvalidValue, Validation extends ValueValidation> {

    public readonly value: ValidValue | InvalidValue;
    public readonly validation: Validation;
    public readonly isValidationPending: boolean;
    private readonly validationResult: ValueValidation.ValidationResult;

    /* [ Theory ]
     * The saving of control component instance inside validatable control payload could cause the infinite
     * recursion ("RangeError: Maximum call stack size exceeded") */
    private getComponentInstanceMethodImplementation?: () => ValidatableControl;


    public static createInitialInstance<ValidValue, InvalidValue, Validation extends ValueValidation>(
      {
        initialValue,
        validation
      }: {
        initialValue: ValidValue | InvalidValue;
        validation: Validation;
      }
    ): Payload<ValidValue, InvalidValue, Validation> {
      return new Payload<ValidValue, InvalidValue, Validation>({ initialValue, validation });
    }

    private constructor(
      {
        initialValue,
        validation,
        getComponentInstance
      }: {
        initialValue: ValidValue | InvalidValue;
        validation: Validation;
        getComponentInstance?: () => ValidatableControl;
      }
    ) {

      this.value = initialValue;
      this.validation = validation;

      this.validationResult = validation.validate(this.value);
      this.isValidationPending = false;

      if (isNotUndefined(getComponentInstance)) {
        this.getComponentInstanceMethodImplementation = getComponentInstance;
      }
    }

    /* [ Theory ] Actually, it will be the mutation of Vue property, but currently no negative effect has been confirmed. */
    public completeInitialization(
      { getComponentInstanceMethodImplementation }: { getComponentInstanceMethodImplementation: () => ValidatableControl; }
    ): void {
      this.getComponentInstanceMethodImplementation = getComponentInstanceMethodImplementation;
    }

    public getComponentInstance(): ValidatableControl {

      if (isUndefined(this.getComponentInstanceMethodImplementation)) {
        Logger.throwErrorAndLog({
          errorType: "IncompleteInitializationError",
          title: "Incomplete initialization",
          description: "The component instance is still unavailable. Call 'completeInitialization' inside 'created' hook " +
              "of target 'ValidatableControl'.",
          occurrenceLocation: "validatableControl.getComponentInstance()"
        });
      }


      return this.getComponentInstanceMethodImplementation();
    }

    public get validationErrorsMessages(): Array<string> {
      return this.validationResult.errorsMessages;
    }

    public get isInvalid(): boolean {
      return !this.validationResult.isValid;
    }

    public getExpectedToBeValidValue(): ValidValue {

      if (this.isInvalid) {
        Logger.throwErrorAndLog({
          errorInstance: new UnexpectedEventError("Contrary os expectations, the value is still 'null'."),
          title: UnexpectedEventError.localization.defaultTitle,
          occurrenceLocation: "ValidatableControl.Payload.getExpectedToBeValidValue()"
        });
      }


      return this.value as ValidValue;
    }


    public updateImmutably(
      {
        newValue
      }: {
        newValue: ValidValue | InvalidValue;
      }
    ): Payload<ValidValue, InvalidValue, Validation> {
      return new Payload<ValidValue, InvalidValue, Validation>({
        initialValue: newValue,
        validation: this.validation,
        getComponentInstance: this.getComponentInstanceMethodImplementation
      });
    }

    public resetSelfAndAssociatedComponentImmutably(
      {
        newValue
      }: {
        newValue: ValidValue | InvalidValue;
      }
    ): Payload<ValidValue, InvalidValue, Validation> {

      this.getComponentInstanceMethodImplementation?.().resetStateToInitial();

      return new Payload<ValidValue, InvalidValue, Validation>({
        initialValue: newValue,
        validation: this.validation,
        getComponentInstance: this.getComponentInstanceMethodImplementation
      });
    }
  }


  export function VModelChecker(rawVModel: unknown, valueChecker: (rawValue: unknown) => boolean): boolean {

    if (!isArbitraryObject(rawVModel)) {
      return false;
    }


    return valueChecker(rawVModel.value);
  }
}


export default ValidatableControl;
