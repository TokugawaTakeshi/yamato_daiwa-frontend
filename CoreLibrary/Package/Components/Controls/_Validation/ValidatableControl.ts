/* eslint-disable @typescript-eslint/member-ordering -- The secondary members has been organized to the end of the class. */
/* eslint-disable no-underscore-dangle -- There are eponymous protected fields and public accessors in "Payload" class. */

import type InputtedValueValidation from "./InputtedValueValidation";
import { Logger, UnexpectedEventError } from "@yamato-daiwa/es-extensions";


interface ValidatableControl {

  highlightInvalidInput: () => this;

  getRootElement: () => HTMLElement;

  focus: () => this;

  resetStateToInitial: () => void;

}


namespace ValidatableControl {

  export class Payload<ValidValue, InvalidValue, Validation extends InputtedValueValidation> {

    public readonly ID: string = Payload.generateSelfID();
    public readonly getComponentInstance: () => ValidatableControl;

    protected _value: ValidValue | InvalidValue;

    protected validation: Validation;
    protected validationResult: InputtedValueValidation.Result;
    protected isValidationPending: boolean;

    protected onHasBecomeValidEventHandlers: { [ID: string]: (() => unknown); } = {};
    protected onHasBecomeInvalidEventHandlers: { [ID: string]: (() => unknown); } = {};


    public constructor(compoundParameter: Payload.ConstructorCompoundParameter<ValidValue, InvalidValue, Validation>) {

      this.getComponentInstance = compoundParameter.getComponentInstance;

      this._value = compoundParameter.initialValue;

      this.validation = compoundParameter.validation;
      this.validationResult = this.validation.validate(this._value);
      this.isValidationPending = false;

    }


    /* === Value ==================================================================================================== */
    public get value(): ValidValue | InvalidValue { return this._value; }

    public set value(newValue: ValidValue | InvalidValue) {

      this._value = newValue;

      const wasValidPreviously: boolean = this.validationResult.isValid;
      this.validationResult = this.validation.validate(this._value);
      const isValidNow: boolean = this.validationResult.isValid;

      if (!wasValidPreviously && isValidNow) {

        for (const [ handlerID, handler ] of Object.entries(this.onHasBecomeValidEventHandlers)) {

          try {

            handler();

          } catch (error: unknown) {

            Logger.throwErrorAndLog({
              errorType: "CustomEventHandlerExecutionFailure",
              description: "The error occurred during the execution of 'OnHasBecomeValid' event handler " +
                  `with ID '${ handlerID }'.`,
              title: "Custom event handler execution failure",
              occurrenceLocation: "ValidatableControl.Payload.[set]value(newValue)",
              wrappableError: error
            });

          }
        }

      } else if (wasValidPreviously && !isValidNow) {

        for (const [ handlerID, handler ] of Object.entries(this.onHasBecomeInvalidEventHandlers)) {

          try {

            handler();

          } catch (error: unknown) {

            Logger.throwErrorAndLog({
              errorType: "CustomEventHandlerExecutionFailure",
              description: "The error occurred during the execution of 'OnHasBecomeInvalid' event handler " +
                  `with ID '${ handlerID }'.`,
              title: "Custom event handler execution failure",
              occurrenceLocation: "ValidatableControl.Payload.[set]value(newValue)",
              wrappableError: error
            });

          }
        }
      }

      this.isValidationPending = false;

    }


    /* === Public methods =========================================================================================== */
    /* --- Event handlers ------------------------------------------------------------------------------------------- */
    public addOnHasBecomeValidEventHandler(
      variadicParameter: (() => unknown) | Readonly<{ handler: () => unknown; ID?: string; }>
    ): void {

      let handler: () => unknown;
      let HANDLER_ID: string;

      if ("handler" in variadicParameter) {
        handler = variadicParameter.handler;
        HANDLER_ID = variadicParameter.ID ?? Payload.generateOnHasBecomeValidEventHandlerID();
      } else {
        handler = variadicParameter;
        HANDLER_ID = Payload.generateOnHasBecomeValidEventHandlerID();
      }

      this.onHasBecomeValidEventHandlers[HANDLER_ID] = handler;

    }

    public addOnHasBecomeInvalidEventHandler(
      variadicParameter: (() => unknown) | Readonly<{ handler: () => unknown; ID?: string; }>
    ): void {

      let handler: () => unknown;
      let HANDLER_ID: string;

      if ("handler" in variadicParameter) {
        handler = variadicParameter.handler;
        HANDLER_ID = variadicParameter.ID ?? Payload.generateOnHasBecomeInvalidEventHandlerID();
      } else {
        handler = variadicParameter;
        HANDLER_ID = Payload.generateOnHasBecomeInvalidEventHandlerID();
      }

      this.onHasBecomeInvalidEventHandlers[HANDLER_ID] = handler;

    }


    /* === Public getters and getter-like methods =================================================================== */
    public getExpectedToBeValidValue(): ValidValue {

      if (this.isInvalid) {
        Logger.throwErrorAndLog({
          errorInstance: new UnexpectedEventError("Contrary to expectations, the value is still invalid."),
          title: UnexpectedEventError.localization.defaultTitle,
          occurrenceLocation: "ValidatableControl.Payload.getExpectedToBeValidValue()"
        });
      }


      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
       * In this case, we are guarantee the ValidValue by "this.isInvalid" check */
      return this.value as ValidValue;

    }

    public get isInvalid(): boolean {
      return !this.validationResult.isValid;
    }

    public get validationErrorsMessages(): ReadonlyArray<string> {
      return this.validationResult.errorsMessages;
    }


    /* === Routines ================================================================================================= */
    /* --- IDs generating ------------------------------------------------------------------------------------------- */
    protected static counterForSelfID_Generating: number = 0;

    protected static generateSelfID(): string {
      Payload.counterForSelfID_Generating++;
      return `${ Payload.counterForSelfID_Generating }`;
    }


    protected static counterForOnHasBecomeValidEventHandlerID_Generating: number = 0;

    protected static generateOnHasBecomeValidEventHandlerID(): string {
      Payload.counterForOnHasBecomeValidEventHandlerID_Generating++;
      return `GENERATED-${ Payload.counterForOnHasBecomeValidEventHandlerID_Generating }`;
    }


    protected static counterForOnHasBecomeInvalidEventHandlerID_Generating: number = 0;

    protected static generateOnHasBecomeInvalidEventHandlerID(): string {
      Payload.counterForOnHasBecomeInvalidEventHandlerID_Generating++;
      return `GENERATED-${ Payload.counterForOnHasBecomeInvalidEventHandlerID_Generating }`;
    }

  }


  export namespace Payload {
    export type ConstructorCompoundParameter<ValidValue, InvalidValue, Validation extends InputtedValueValidation> = Readonly<{
      initialValue: ValidValue | InvalidValue;
      validation: Validation;
      getComponentInstance: () => ValidatableControl;
      onHasBecomeValid?: () => unknown;
      onHasBecomeInvalid?: () => unknown;
    }>;
  }

}


export default ValidatableControl;
