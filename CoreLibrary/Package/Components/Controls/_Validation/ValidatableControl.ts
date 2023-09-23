/* eslint-disable @typescript-eslint/member-ordering -- The secondary members has been organized to the end of the class. */
/* eslint-disable no-underscore-dangle -- There are eponymous protected fields and public accessors in "Payload" class. */

import type InputtedValueValidation from "./InputtedValueValidation";
import {
  Logger,
  UnexpectedEventError,
  isNotUndefined,
  nullToUndefined,
  secondsToMilliseconds
} from "@yamato-daiwa/es-extensions";


interface ValidatableControl {

  highlightInvalidInput: () => this;

  getRootElementOffsetCoordinates: () => ValidatableControl.RootElementOffsetCoordinates;

  focus: () => this;

  resetValidityHighlightingStateToInitial: () => void;

}


namespace ValidatableControl {

  export type RootElementOffsetCoordinates = Readonly<{ top: number; left: number; }>;

  export class Payload<ValidValue, InvalidValue, Validation extends InputtedValueValidation> {

    public readonly ID: string = Payload.generateSelfID();
    public readonly getComponentInstance: () => ValidatableControl;
    public readonly validation: Validation;

    /* [ Convention ] The fields begins from the underscore mush be changes only via constructor or setters. */
    protected _value: ValidValue | InvalidValue;
    protected _validationResult: InputtedValueValidation.Result;

    protected readonly onHasBecomeValidEventHandlers: Payload.EventHandlersMap = new Map();
    protected readonly onHasBecomeInvalidEventHandlers: Payload.EventHandlersMap = new Map();
    protected readonly onAnyChangeEventHandlers: Payload.EventHandlersMap = new Map();

    private waitingForStaringOfAsynchronousValidationTimeID: number | null = null;


    public constructor(compoundParameter: Payload.ConstructorCompoundParameter<ValidValue, InvalidValue, Validation>) {

      this.getComponentInstance = compoundParameter.getComponentInstance;

      this._value = compoundParameter.initialValue;
      this.validation = compoundParameter.validation;

      this._validationResult = this.validation.validate(this._value);

      if (isNotUndefined(compoundParameter.onHasBecomeValidEventHandler)) {
        this.setOnHasBecomeValidEventHandler(compoundParameter.onHasBecomeValidEventHandler);
      }

      if (isNotUndefined(compoundParameter.onHasBecomeInvalidEventHandler)) {
        this.setOnHasBecomeInvalidEventHandler(compoundParameter.onHasBecomeInvalidEventHandler);
      }

    }


    /* ━━━ Value ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    public get value(): ValidValue | InvalidValue { return this._value; }

    public $setValue(
      {
        newValue,
        asynchronousValidationDelay__seconds,
        onAsynchronousValidationStatusChangedEventCallback
      }: Readonly<{
        newValue: ValidValue | InvalidValue;
        asynchronousValidationDelay__seconds?: number;
        onAsynchronousValidationStatusChangedEventCallback?: InputtedValueValidation.AsynchronousChecks.Callback;
      }>
    ): void {

      this._value = newValue;

      const wasValidPreviously: boolean = this.validationResult.isValid;
      this._validationResult = this.validation.validate(this._value);
      const isValidNow: boolean = this.validationResult.isValid;

      for (const [ handlerID, handler ] of this.onAnyChangeEventHandlers.entries()) {

        try {

          handler();

        } catch (error: unknown) {
          Logger.logError({
            errorType: "CustomEventHandlerExecutionFailure",
            title: "Custom event handler execution failure",
            description:
                `The error occurred during the execution of "OnAnyChange" event handler with ID "${ handlerID }".`,
            occurrenceLocation: "ValidatableControl.Payload.$[set]value(newValue)",
            caughtError: error
          });
        }

      }


      if (!wasValidPreviously && this.validationResult.isValid) {

        for (const [ handlerID, handler ] of this.onHasBecomeValidEventHandlers.entries()) {

          try {

            handler();

          } catch (error: unknown) {
            Logger.logError({
              errorType: "CustomEventHandlerExecutionFailure",
              title: "Custom event handler execution failure",
              description:
                  `The error occurred during the execution of "OnHasBecomeValid" event handler with ID "${ handlerID }".`,
              occurrenceLocation: "ValidatableControl.Payload.[set]$value(newValue)",
              caughtError: error
            });
          }
        }

      } else if (wasValidPreviously && !this.validationResult.isValid) {

        for (const [ handlerID, handler ] of this.onHasBecomeInvalidEventHandlers.entries()) {

          try {

            handler();

          } catch (error: unknown) {
            Logger.logError({
              errorType: "CustomEventHandlerExecutionFailure",
              title: "Custom event handler execution failure",
              description:
                  `The error occurred during the execution of "OnHasBecomeInvalid" event handler with ID '${ handlerID }'.`,
              occurrenceLocation: "ValidatableControl.Payload.[set]$value(newValue)",
              caughtError: error
            });
          }
        }

      }

    }

    protected onAsynchronousValidationStatusChanged(
      status: InputtedValueValidation.AsynchronousChecks.Status,
      updatedValidationResult: InputtedValueValidation.Result,
      additionalHandler?: InputtedValueValidation.AsynchronousChecks.Callback
    ): void {

      const wasValidPreviously: boolean = this.validationResult.isValid;

      if (isNotUndefined(onAsynchronousValidationStatusChanged)) {

      additionalHandler?.(status);

      this.onValidationResultUpdated(wasValidPreviously);

    }


    /* ━━━ Public methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    /* ─── Event handlers ─────────────────────────────────────────────────────────────────────────────────────────── */
    public setOnAnyChangeEventHandlers(
      polymorphicParameter: Payload.GeneralizedEventHandler | Readonly<{ handler: Payload.GeneralizedEventHandler; ID: string; }>
    ): void {
      this.onAnyChangeEventHandlers.set(
        "handler" in polymorphicParameter ? polymorphicParameter.ID : Payload.generateOnAnyChangeEventHandlerID(),
        "handler" in polymorphicParameter ? polymorphicParameter.handler : polymorphicParameter
      );
    }

    public setOnHasBecomeValidEventHandler(
      polymorphicParameter: Payload.GeneralizedEventHandler | Readonly<{ handler: Payload.GeneralizedEventHandler; ID: string; }>
    ): void {
      this.onHasBecomeValidEventHandlers.set(
        "handler" in polymorphicParameter ? polymorphicParameter.ID : Payload.generateOnHasBecomeValidEventHandlerID(),
        "handler" in polymorphicParameter ? polymorphicParameter.handler : polymorphicParameter
      );
    }

    public setOnHasBecomeInvalidEventHandler(
      polymorphicParameter: Payload.GeneralizedEventHandler | Readonly<{ handler: Payload.GeneralizedEventHandler; ID: string; }>
    ): void {
      this.onHasBecomeInvalidEventHandlers.set(
        "handler" in polymorphicParameter ? polymorphicParameter.ID : Payload.generateOnHasBecomeInvalidEventHandlerID(),
        "handler" in polymorphicParameter ? polymorphicParameter.handler : polymorphicParameter
      );
    }


    /* ━━━ Public getters and getter-like methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
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

    public get isEmpty(): boolean {
      return this.validation.hasValueBeenOmitted(this.value);
    }

    public get isInvalid(): boolean {
      return !this.validationResult.isValid;
    }

    public get validationErrorsMessages(): ReadonlyArray<string> {
      return this.validationResult.isValid ? [] : this.validationResult.errorsMessages;
    }


    /* ━━━ Routines ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    /* ─── Additional setters ─────────────────────────────────────────────────────────────────────────────────────── */
    protected get validationResult(): InputtedValueValidation.Result {
      return this._validationResult;
    }


    /* ─── IDs generating ─────────────────────────────────────────────────────────────────────────────────────────── */
    protected static counterForSelfID_Generating: number = 0;

    protected static generateSelfID(): string {
      Payload.counterForSelfID_Generating++;
      return `${ Payload.counterForSelfID_Generating }`;
    }


    protected static counterForOnAnyChangeEventHandlersIDsGenerating: number = 0;

    protected static generateOnAnyChangeEventHandlerID(): string {
      Payload.counterForOnAnyChangeEventHandlersIDsGenerating++;
      return `ON_ANY_CHANGE-GENERATED-${ Payload.counterForOnAnyChangeEventHandlersIDsGenerating }`;
    }

    protected static counterForOnHasBecomeValidEventHandlersIDsGenerating: number = 0;

    protected static generateOnHasBecomeValidEventHandlerID(): string {
      Payload.counterForOnHasBecomeValidEventHandlersIDsGenerating++;
      return `ON_HAS_BECOME_VALID-GENERATED-${ Payload.counterForOnHasBecomeValidEventHandlersIDsGenerating }`;
    }


    protected static counterForOnHasBecomeInvalidEventHandlersIDsGenerating: number = 0;

    protected static generateOnHasBecomeInvalidEventHandlerID(): string {
      Payload.counterForOnHasBecomeInvalidEventHandlersIDsGenerating++;
      return `ON_HAS_BECOME_INVALID-GENERATED-${ Payload.counterForOnHasBecomeInvalidEventHandlersIDsGenerating }`;
    }

  }


  export namespace Payload {

    export type ConstructorCompoundParameter<ValidValue, InvalidValue, Validation extends InputtedValueValidation> = Readonly<{
      initialValue: ValidValue | InvalidValue;
      validation: Validation;
      getComponentInstance: () => ValidatableControl;
      onHasBecomeValidEventHandler?: GeneralizedEventHandler | Readonly<{ handler: GeneralizedEventHandler; ID: string; }>;
      onHasBecomeInvalidEventHandler?: GeneralizedEventHandler | Readonly<{ handler: GeneralizedEventHandler; ID: string; }>;
    }>;

    export type EventHandlerID = string;

    export type GeneralizedEventHandler = () => unknown;

    export type EventHandlersMap = Map<EventHandlerID, GeneralizedEventHandler>;

  }

}


export default ValidatableControl;
