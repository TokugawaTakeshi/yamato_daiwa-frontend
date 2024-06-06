/* eslint-disable @typescript-eslint/member-ordering -- The secondary members has been organized to the end of the class. */
/* eslint-disable no-underscore-dangle -- There are eponymous protected fields and public accessors in "Payload" class. */

import type InputtedValueValidation from "./InputtedValueValidation";
import {
  Logger,
  UnexpectedEventError,
  isUndefined,
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
    public readonly validation: Validation;
    public readonly getComponentInstance: () => ValidatableControl;

    /* [ Convention ] The fields begin from the underscore mush be changes only via constructor or setters. */
    protected _value: ValidValue | InvalidValue;
    protected _validationResult: InputtedValueValidation.Result;
    protected _asynchronousChecksStatus: InputtedValueValidation.AsynchronousChecks.Status | null = null;

    protected readonly onHasBecomeValidEventHandlers: Payload.GeneralizedEventHandlersMap = new Map();
    protected readonly onHasBecomeInvalidEventHandlers: Payload.GeneralizedEventHandlersMap = new Map();
    protected readonly onAnyChangeEventHandlers: Payload.GeneralizedEventHandlersMap = new Map();
    protected readonly onAsynchronousValidationStatusChangedEventHandlers: Payload.
        OnAsynchronousValidationStatusChangedEventHandlersMap = new Map();

    protected waitingForStaringOfAsynchronousValidationTimeID: number | null = null;


    public constructor(compoundParameter: Payload.ConstructorCompoundParameter<ValidValue, InvalidValue, Validation>) {

      this._value = compoundParameter.initialValue;
      this.validation = compoundParameter.validation;
      this._validationResult = this.validation.validate(this._value);

      this.getComponentInstance = compoundParameter.getComponentInstance;

      if (isNotUndefined(compoundParameter.onHasBecomeValidEventHandler)) {
        this.setOnHasBecomeValidEventHandler(compoundParameter.onHasBecomeValidEventHandler);
      }

      if (isNotUndefined(compoundParameter.onHasBecomeInvalidEventHandler)) {
        this.setOnHasBecomeInvalidEventHandler(compoundParameter.onHasBecomeInvalidEventHandler);
      }

      if (isNotUndefined(compoundParameter.onAsynchronousValidationStatusChangedEventHandler)) {
        this.setOnAsynchronousValidationStatusChangedEventHandler(
          compoundParameter.onAsynchronousValidationStatusChangedEventHandler
        );
      }

    }


    /* ━━━ Value ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    public get value(): ValidValue | InvalidValue { return this._value; }

    public $setValue(
      {
        newValue,
        asynchronousValidationDelay__seconds
      }: Readonly<{
        newValue: ValidValue | InvalidValue;
        asynchronousValidationDelay__seconds?: number;
      }>
    ): void {

      this._value = newValue;

      this.validationResult = this.validation.validate(
        this._value,
        {
          mustPostponeAsynchronousValidation: isNotUndefined(asynchronousValidationDelay__seconds),
          asynchronousChecksCallback: this.onAsynchronousChecksStatusChanged.bind(this)
        }
      );

      if (isUndefined(asynchronousValidationDelay__seconds)) {
        return;
      }


      clearTimeout(
        nullToUndefined(this.waitingForStaringOfAsynchronousValidationTimeID)
      );

      /* [ Approach ] No need in asynchronous validations if the value has not passed the static validations. */
      if (this.isInvalid) {
        return;
      }


      this.waitingForStaringOfAsynchronousValidationTimeID = window.setTimeout(
        (): void => {

          this.validation.executeAsynchronousChecksIfAny(
            this._value,
            this.validationResult,
            this.onAsynchronousChecksStatusChanged.bind(this)
          );

        },
        secondsToMilliseconds(asynchronousValidationDelay__seconds)
      );


    }


    /* ━━━ Public methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    /* ─── Event handlers ─────────────────────────────────────────────────────────────────────────────────────────── */
    public setOnValueAnyChangeEventHandlers(
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

    public setOnAsynchronousValidationStatusChangedEventHandler(
      polymorphicParameter:
          Payload.OnAsynchronousValidationStatusChangedEventHandler |
          Readonly<{ handler: Payload.OnAsynchronousValidationStatusChangedEventHandler; ID: string; }>
    ): void {
      this.onAsynchronousValidationStatusChangedEventHandlers.set(
        "handler" in polymorphicParameter ?
            polymorphicParameter.ID :
            Payload.generateOnAsynchronousValidationStatusChangedEventHandlerID(),
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
    /* ─── Event handlers ─────────────────────────────────────────────────────────────────────────────────────────── */
    protected onAsynchronousChecksStatusChanged(
      asynchronousChecksStatus: InputtedValueValidation.AsynchronousChecks.Status,
      newestValidationResult: InputtedValueValidation.Result
    ): void {
      this.validationResult = newestValidationResult;
      this.asynchronousChecksStatus = asynchronousChecksStatus;
    }

    /* ─── Additional getters & setters ───────────────────────────────────────────────────────────────────────────── */
    protected get validationResult(): InputtedValueValidation.Result {
      return this._validationResult;
    }

    protected set validationResult(validationResult: InputtedValueValidation.Result) {

      const wasValidPreviously: boolean = this._validationResult.isValid;

      this._validationResult = validationResult;

      for (const [ handlerID, handler ] of this.onAnyChangeEventHandlers.entries()) {

        try {

          handler();

        } catch (error: unknown) {
          Logger.logError({
            errorType: "CustomEventHandlerExecutionFailure",
            title: "Custom event handler execution failure",
            description:
                `The error occurred during the execution of "OnAnyChange" event handler with ID "${ handlerID }".`,
            occurrenceLocation: "ValidatableControl.Payload.$[set]validationResult(validationResult)",
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
              occurrenceLocation: "ValidatableControl.Payload.[set]validationResult(validationResult)",
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
                  `The error occurred during the execution of "OnHasBecomeInvalid" event handler with ID "${ handlerID }".`,
              occurrenceLocation: "ValidatableControl.Payload.[set]validationResult(validationResult)",
              caughtError: error
            });

          }

        }

      }

    }


    public get asynchronousChecksStatus(): InputtedValueValidation.AsynchronousChecks.Status | null {
      return this._asynchronousChecksStatus;
    }

    protected set asynchronousChecksStatus(asynchronousChecksStatus: InputtedValueValidation.AsynchronousChecks.Status) {

      this._asynchronousChecksStatus = asynchronousChecksStatus;

      for (const [ handlerID, handler ] of this.onAsynchronousValidationStatusChangedEventHandlers.entries()) {

        try {

          handler(asynchronousChecksStatus);

        } catch (error: unknown) {

          Logger.logError({
            errorType: "CustomEventHandlerExecutionFailure",
            title: "Custom event handler execution failure",
            description:
                "The error occurred during the execution of \"OnAsynchronousValidationStatusChanged\" event handler " +
                  `with ID "${ handlerID }".`,
            occurrenceLocation: "ValidatableControl.Payload.[set]asynchronousChecksStatus(asynchronousChecksStatus)",
            caughtError: error
          });

        }

      }

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


    protected static counterForOnAsynchronousValidationStatusChangedEventHandlerIDsGenerating: number = 0;

    protected static generateOnAsynchronousValidationStatusChangedEventHandlerID(): string {
      Payload.counterForOnAsynchronousValidationStatusChangedEventHandlerIDsGenerating++;
      return "ON_ASYNCHRONOUS_VALIDATION_STATUS_CHANGED-GENERATED-" +
          `${ Payload.counterForOnAsynchronousValidationStatusChangedEventHandlerIDsGenerating }`;
    }

  }


  export namespace Payload {

    export type ConstructorCompoundParameter<ValidValue, InvalidValue, Validation extends InputtedValueValidation> = Readonly<{
      initialValue: ValidValue | InvalidValue;
      validation: Validation;
      getComponentInstance: () => ValidatableControl;
      onHasBecomeValidEventHandler?: GeneralizedEventHandler | Readonly<{ handler: GeneralizedEventHandler; ID: string; }>;
      onHasBecomeInvalidEventHandler?: GeneralizedEventHandler | Readonly<{ handler: GeneralizedEventHandler; ID: string; }>;
      onAsynchronousValidationStatusChangedEventHandler?:
          OnAsynchronousValidationStatusChangedEventHandler |
          Readonly<{
            handler: OnAsynchronousValidationStatusChangedEventHandler;
            ID: string;
          }>;
    }>;

    export type EventHandlerID = string;

    export type GeneralizedEventHandler = () => unknown;
    export type GeneralizedEventHandlersMap = Map<EventHandlerID, GeneralizedEventHandler>;

    export type OnAsynchronousValidationStatusChangedEventHandler = (
      status: InputtedValueValidation.AsynchronousChecks.Status
    ) => unknown;
    export type OnAsynchronousValidationStatusChangedEventHandlersMap = Map<
      EventHandlerID, OnAsynchronousValidationStatusChangedEventHandler
    >;

  }

}


export default ValidatableControl;
