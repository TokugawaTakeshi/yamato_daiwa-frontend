/* eslint-disable @typescript-eslint/member-ordering --
* The members of this class has been organized semantically. */

import type ValueValidation from "./ValueValidation";
import { Logger, UnexpectedEventError } from "@yamato-daiwa/es-extensions";


interface ValidatableControl {

  highlightInvalidInput: () => this;

  /* [ Theory ] In general case, the scrolled element is not the "body". */
  getRootElement: () => HTMLElement;

  focus: () => this;

  resetStateToInitial: () => void;

}


namespace ValidatableControl {

  /* [ Approach ] This class could be used by JavaScript thus it is required to provide the encapsulations as possible. */
  export class Payload<ValidValue, InvalidValue, Validation extends ValueValidation> {

    readonly #ID: string = Payload.#generateSelfID();
    readonly #getComponentInstance: () => ValidatableControl;

    #value: ValidValue | InvalidValue;
    #validation: Validation;
    #isValidationPending: boolean;
    #validationResult: ValueValidation.ValidationResult;

    readonly #onHasBecomeValidEventHandlers: { [ID: string]: (() => unknown); } = {};
    readonly #onHasBecomeInvalidEventHandlers: { [ID: string]: (() => unknown); } = {};


    public constructor(namedParameters: Payload.ConstructorNamedParameters<ValidValue, InvalidValue, Validation>) {

      this.#getComponentInstance = namedParameters.getComponentInstance;

      this.#value = namedParameters.initialValue;
      this.#validation = namedParameters.validation;

      this.#validationResult = this.#validation.validate(this.#value);
      this.#isValidationPending = false;
    }


    /* === Value ==================================================================================================== */
    public get value(): ValidValue | InvalidValue { return this.#value; }

    public set value(newValue: ValidValue | InvalidValue) {

      this.#value = newValue;

      const wasValidPreviously: boolean = this.#validationResult.isValid;

      this.#validationResult = this.#validation.validate(this.#value);
      const isValidNow: boolean = this.#validationResult.isValid;

      if (!wasValidPreviously && isValidNow) {

        for (const [ handlerID, handler ] of Object.entries(this.#onHasBecomeValidEventHandlers)) {

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

        for (const [ handlerID, handler ] of Object.entries(this.#onHasBecomeInvalidEventHandlers)) {

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

      this.#isValidationPending = false;
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
        HANDLER_ID = variadicParameter.ID ?? Payload.#generateOnHasBecomeValidEventHandlerID();
      } else {
        handler = variadicParameter;
        HANDLER_ID = Payload.#generateOnHasBecomeValidEventHandlerID();
      }

      this.#onHasBecomeValidEventHandlers[HANDLER_ID] = handler;
    }

    public addOnHasBecomeInvalidEventHandler(
      variadicParameter: (() => unknown) | Readonly<{ handler: () => unknown; ID?: string; }>
    ): void {

      let handler: () => unknown;
      let HANDLER_ID: string;

      if ("handler" in variadicParameter) {
        handler = variadicParameter.handler;
        HANDLER_ID = variadicParameter.ID ?? Payload.#generateOnHasBecomeInvalidEventHandlerID();
      } else {
        handler = variadicParameter;
        HANDLER_ID = Payload.#generateOnHasBecomeInvalidEventHandlerID();
      }

      this.#onHasBecomeInvalidEventHandlers[HANDLER_ID] = handler;
    }


    /* --- Other ---------------------------------------------------------------------------------------------------- */
    public getComponentInstance(): ValidatableControl {
      return this.#getComponentInstance();
    }


    /* === Public getters and getter-like methods =================================================================== */
    public getExpectedToBeValidValue(): ValidValue {

      if (this.isInvalid) {
        Logger.throwErrorAndLog({
          errorInstance: new UnexpectedEventError("Contrary to expectations, the value is still 'null'."),
          title: UnexpectedEventError.localization.defaultTitle,
          occurrenceLocation: "ValidatableControl.Payload.getExpectedToBeValidValue()"
        });
      }


      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
       * In this case, we are guarantee the ValidValue by "this.isInvalid" check */
      return this.value as ValidValue;
    }

    public get isInvalid(): boolean {
      return !this.#validationResult.isValid;
    }

    public get isValidationPending(): boolean {
      return this.#isValidationPending;
    }

    public get validationErrorsMessages(): Array<string> {
      return this.#validationResult.errorsMessages;
    }

    public get ID(): string {
      return this.#ID;
    }


    /* === Auxiliaries ============================================================================================== */
    /* --- IDs generating ------------------------------------------------------------------------------------------- */
    static #counterForSelfID_Generating: number = 0;

    static #generateSelfID(): string {
      Payload.#counterForSelfID_Generating++;
      return `${ Payload.#counterForSelfID_Generating }`;
    }


    static #counterForOnHasBecomeValidEventHandlerID_Generating: number = 0;

    static #generateOnHasBecomeValidEventHandlerID(): string {
      Payload.#counterForOnHasBecomeValidEventHandlerID_Generating++;
      return `${ Payload.#counterForOnHasBecomeValidEventHandlerID_Generating }`;
    }


    static #counterForOnHasBecomeInvalidEventHandlerID_Generating: number = 0;

    static #generateOnHasBecomeInvalidEventHandlerID(): string {
      Payload.#counterForOnHasBecomeInvalidEventHandlerID_Generating++;
      return `${ Payload.#counterForOnHasBecomeInvalidEventHandlerID_Generating }`;
    }
  }


  export namespace Payload {
    export type ConstructorNamedParameters<ValidValue, InvalidValue, Validation extends ValueValidation> = Readonly<{
      initialValue: ValidValue | InvalidValue;
      validation: Validation;
      getComponentInstance: () => ValidatableControl;
      onHasBecomeValid?: () => unknown;
      onHasBecomeInvalid?: () => unknown;
    }>;
  }

}


export default ValidatableControl;
