/* eslint-disable no-underscore-dangle --
 * There are eponymous protected fields and public accessors in "ValidatableControlsGroup" class. */

import type ValidatableControl from "./ValidatableControl";
import type InputtedValueValidation from "./InputtedValueValidation";

import { getExpectedToBeSingleDOM_Element } from "@yamato-daiwa/es-extensions-browserjs";
import { isNotUndefined, Logger, UnexpectedEventError } from "@yamato-daiwa/es-extensions";
import type { ArbitraryObject } from "@yamato-daiwa/es-extensions";


class ValidatableControlsGroup<ValidData extends ArbitraryObject | Array<unknown>> {

  protected static counterForID_Generating: number = -1;


  public readonly ID: string;


  protected readonly controlsPayload: ValidatableControlsGroup.GeneralizedControlsPayload;
  protected readonly isEachControlPayloadValid: { [controlPayloadID: string]: boolean; };
  protected readonly areAsynchronousChecksBeingExecutedForEachControlPayload: { [controlPayloadID: string]: boolean; };
  protected readonly SCROLLABLE_CONTAINER_HTML_ID?: string;

  protected readonly onHasBecomeValidEventHandler?: ValidatableControlsGroup.GeneralizedEventHandler;
  protected readonly onHasBecomeInvalidEventHandler?: ValidatableControlsGroup.GeneralizedEventHandler;
  protected readonly onAnyChangeEventHandler?: ValidatableControlsGroup.OnAnyChangeEventHandler;
  protected readonly onAsynchronousValidationsFinishedWithAnyResultEventHandler?: () => void;

  private _isInvalid: boolean;


  /* ━━━  Static methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public static hasAtLeastOneInvalidPayload(
    controlsAccess: ValidatableControlsGroup.GeneralizedControlsPayload
  ): boolean {
    return (Array.isArray(controlsAccess) ? controlsAccess : Object.values(controlsAccess)).
        some(
          (validatableControlPayload: ValidatableControl.Payload<unknown, unknown, InputtedValueValidation>): boolean =>
              validatableControlPayload.isInvalid
        );
  }

  public static pointOutValidationErrors(
    compoundParameter: Readonly<{
      controlsPayload: ValidatableControlsGroup.GeneralizedControlsPayload;
      scrollableContainerHTML_ID?: string;
    }>
  ): void {

    const {
      controlsPayload,
      scrollableContainerHTML_ID
    }: Parameters<typeof ValidatableControlsGroup.pointOutValidationErrors>["0"] = compoundParameter;

    let isCurrentInvalidControlPayloadTheFirstInvalidOne: boolean = true;

    for (const validatableControlPayload of Object.values(controlsPayload)) {

      if (validatableControlPayload.isInvalid) {

        const componentInstance: ValidatableControl = validatableControlPayload.getComponentInstance();

        componentInstance.highlightInvalidInput();

        if (isCurrentInvalidControlPayloadTheFirstInvalidOne) {

          componentInstance.focus();

          /* eslint-disable-next-line max-depth -- Here are all conditions are required. */
          if (isNotUndefined(scrollableContainerHTML_ID)) {
            getExpectedToBeSingleDOM_Element({ selector: `#${ scrollableContainerHTML_ID }` }).scroll({
              top: componentInstance.getRootElementOffsetCoordinates().top,
              behavior: "smooth"
            });
          }

          isCurrentInvalidControlPayloadTheFirstInvalidOne = false;

        }

      }

    }

  }


  /* ━━━ Constructor ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public constructor(
    compoundParameter: Readonly<{
      controlsPayload: ValidatableControlsGroup.GeneralizedControlsPayload;
      scrollingContainerHTML_ID?: string;
      onHasBecomeValidEventHandler?: ValidatableControlsGroup.GeneralizedEventHandler;
      onHasBecomeInvalidEventHandler?: ValidatableControlsGroup.GeneralizedEventHandler;
      onAnyChangeEventHandler?: ValidatableControlsGroup.OnAnyChangeEventHandler;
      onAsynchronousValidationsFinishedWithAnyResultEventHandler?: () => void;
    }>
  ) {

    ValidatableControlsGroup.counterForID_Generating++;
    this.ID = `VALIDATABLE_CONTROLS_GROUP-${ ValidatableControlsGroup.counterForID_Generating }`;

    this.controlsPayload = compoundParameter.controlsPayload;

    this.onHasBecomeValidEventHandler = compoundParameter.onHasBecomeValidEventHandler;
    this.onHasBecomeInvalidEventHandler = compoundParameter.onHasBecomeInvalidEventHandler;
    this.onAnyChangeEventHandler = compoundParameter.onAnyChangeEventHandler;
    this.onAsynchronousValidationsFinishedWithAnyResultEventHandler = compoundParameter.
        onAsynchronousValidationsFinishedWithAnyResultEventHandler;

    const isEachControlPayloadValid: { [controlPayloadID: string]: boolean; } = {};
    const areAsynchronousChecksBeingExecutedForEachControlPayload: { [controlPayloadID: string]: boolean; } = {};

    for (const controlPayload of Object.values(this.controlsPayload)) {

      isEachControlPayloadValid[controlPayload.ID] = !controlPayload.isInvalid;

      controlPayload.setOnValueAnyChangeEventHandlers({
        ID: `ON_VALUE_ANY_CHANGE_EVENT_HANDLER--VALIDATABLE-CONTROL_GROUP-${ this.ID }--CONTROL-${ controlPayload.ID }`,
        handler: (): void => { this.onAnyChangeOfSpecificControlEventHandler(controlPayload); }
      });

      areAsynchronousChecksBeingExecutedForEachControlPayload[controlPayload.ID] = false;

      controlPayload.setOnAsynchronousValidationStatusChangedEventHandler({
        ID: `ON_VALUE_ANY_CHANGE_EVENT_HANDLER--VALIDATABLE-CONTROL_GROUP-${ this.ID }--CONTROL-${ controlPayload.ID }`,
        handler: (asynchronousValidationStatus: InputtedValueValidation.AsynchronousChecks.Status): void => {
          this.onAsynchronousValidationStatusChangedEventHandler(controlPayload, asynchronousValidationStatus);
        }
      });

    }

    this.isEachControlPayloadValid = isEachControlPayloadValid;
    this._isInvalid = this.isAtLeastOneControlPayloadInvalid();
    this.areAsynchronousChecksBeingExecutedForEachControlPayload = areAsynchronousChecksBeingExecutedForEachControlPayload;
    this.SCROLLABLE_CONTAINER_HTML_ID = compoundParameter.scrollingContainerHTML_ID;

  }


  /* ━━━ Public instance methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public pointOutValidationErrors(): void {
    ValidatableControlsGroup.pointOutValidationErrors({
      controlsPayload: this.controlsPayload,
      scrollableContainerHTML_ID: this.SCROLLABLE_CONTAINER_HTML_ID
    });
  }

  public getExpectedToBeValidData(): ValidData {

    if (this._isInvalid) {
      Logger.throwErrorAndLog({
        errorInstance: new UnexpectedEventError("Contrary to expectations, the payload is still invalid."),
        title: UnexpectedEventError.localization.defaultTitle,
        occurrenceLocation: "validatableControlsGroup.getExpectedToBeValidPayload()"
      });
    }


    const payload: ArbitraryObject = {};

    for (const [ key, controlPayload ] of Object.entries(this.controlsPayload)) {
      payload[key] = controlPayload.getExpectedToBeValidValue();
    }


    /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- The validity of data has been guaranteed. */
    return payload as ValidData;

  }

  public getPossiblyInvalidPayload(): ValidatableControlsGroup.PossiblyInvalidData {
    return Object.entries(this.controlsPayload).reduce(
      (
        possiblyInvalidData: ValidatableControlsGroup.PossiblyInvalidData,
        [ controlKey, controlPayload ]: [ string, ValidatableControlsGroup.GeneralizedControlPayload ]
      ): ValidatableControlsGroup.PossiblyInvalidData => {
        possiblyInvalidData[controlKey] = controlPayload.value;
        return possiblyInvalidData;
      },
      {}
    );
  }


  /* ━━━ Public getters ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public get isInvalid(): boolean {
    return this._isInvalid;
  }

  public get areTherePendingAsynchronousValidation(): boolean {
    return Object.values(this.areAsynchronousChecksBeingExecutedForEachControlPayload).includes(true);
  }


  /* ━━━ Routines ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* eslint-disable @typescript-eslint/member-ordering -- No need to hoist the secondary static fields. */

  /* ─── Events handlers ─────────────────────────────────────────────────────────────────────────────────────────── */
  protected onAnyChangeOfSpecificControlEventHandler(
    controlPayload: ValidatableControlsGroup.GeneralizedControlPayload
  ): void {

    const wasGroupValidPreviously: boolean = !this._isInvalid;
    this.isEachControlPayloadValid[controlPayload.ID] = !controlPayload.isInvalid;
    this._isInvalid = this.isAtLeastOneControlPayloadInvalid();

    const hasBecomeValid: boolean = !wasGroupValidPreviously && !this._isInvalid;
    const hasBecomeInvalid: boolean = wasGroupValidPreviously && this._isInvalid;

    if (hasBecomeValid) {

      try {

        this.onHasBecomeValidEventHandler?.();

      } catch (error: unknown) {

        Logger.logError({
          errorType: "CustomEventHandlerExecutionFailure",
          title: "Custom event handler execution failure",
          description: "The error occurred during the execution of \"OnHasBecomeValid\" event handler",
          occurrenceLocation: "validatableControl.onHasBecomeValid()",
          caughtError: error
        });

      }

    } else if (hasBecomeInvalid) {

      try {

        this.onHasBecomeInvalidEventHandler?.();

      } catch (error: unknown) {

        Logger.logError({
          errorType: "CustomEventHandlerExecutionFailure",
          title: "Custom event handler execution failure",
          description: "The error occurred during the execution of \"OnHasBecomeInvalid\" event handler",
          occurrenceLocation: "validatableControl.onHasBecomeInvalid()",
          caughtError: error
        });

      }

    }

    try {

      this.onAnyChangeEventHandler?.({ hasBecomeInvalid, hasBecomeValid });

    } catch (error: unknown) {

      Logger.logError({
        errorType: "CustomEventHandlerExecutionFailure",
        title: "Custom event handler execution failure",
        description: "The error occurred during the execution of \"OnAnyChange\" event handler",
        occurrenceLocation: "validatableControl.onAnyChange()",
        caughtError: error
      });

    }

  }


  protected onAsynchronousValidationStatusChangedEventHandler(
    controlPayload: ValidatableControlsGroup.GeneralizedControlPayload,
    asynchronousValidationStatus: InputtedValueValidation.AsynchronousChecks.Status
  ): void {

    const wasAsynchronousCheckBeenExecuted: boolean = this.areTherePendingAsynchronousValidation;
    this.areAsynchronousChecksBeingExecutedForEachControlPayload[controlPayload.ID] =
        asynchronousValidationStatus.hasAtLeastOneCheckNotFinishedYet;

    if (wasAsynchronousCheckBeenExecuted && !this.areTherePendingAsynchronousValidation) {
      this.onAsynchronousValidationsFinishedWithAnyResultEventHandler?.();
    }

  }

  /* [ Approach ] This method has not been made getter because of recomputing on each invocation while here the value
   *  of "_isInvalid" is cached. */
  protected isAtLeastOneControlPayloadInvalid(): boolean {
    return Object.values(this.isEachControlPayloadValid).
        some((isCurrentControlPayloadValid: boolean): boolean => !isCurrentControlPayloadValid);
  }

}


namespace ValidatableControlsGroup {

  export type GeneralizedControlsPayload = Readonly<{ [controlKey: string]: GeneralizedControlPayload; }>;

  export type GeneralizedControlPayload = ValidatableControl.Payload<unknown, unknown, InputtedValueValidation>;

  export type GeneralizedEventHandler = () => void;

  export type PossiblyInvalidData = { [controlKey: string]: unknown; };

  export type OnAnyChangeEventHandler = (compoundParameter: OnAnyChangeEventHandler.CompoundParameter) => void;

  export namespace OnAnyChangeEventHandler {
    export type CompoundParameter = Readonly<{ hasBecomeValid: boolean; hasBecomeInvalid: boolean; }>;
  }

}


export default ValidatableControlsGroup;
