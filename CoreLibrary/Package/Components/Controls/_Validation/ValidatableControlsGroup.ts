/* eslint-disable no-underscore-dangle --
 * There are eponymous protected fields and public accessors in "ValidatableControlsGroup" class. */

import type ValidatableControl from "./ValidatableControl";
import type InputtedValueValidation from "./InputtedValueValidation";

import { getExpectedToBeSingleDOM_Element } from "@yamato-daiwa/es-extensions-browserjs";
import { isNotUndefined, Logger, UnexpectedEventError } from "@yamato-daiwa/es-extensions";
import type { ArbitraryObject } from "@yamato-daiwa/es-extensions";


export default class ValidatableControlsGroup<ValidData extends ArbitraryObject | Array<unknown>> {

  protected static counterForID_Generating: number = -1;


  public readonly ID: string;


  protected readonly controlsPayload: ValidatableControlsGroup.GeneralizedControlsPayload;
  protected readonly controlsPayloadAndValidityMap: { [controlPayloadID: string]: boolean; };
  protected readonly SCROLLING_CONTAINER_HTML_ID?: string;

  protected _isInvalid: boolean;


  /* === Static methods ============================================================================================= */
  public static hasInvalidInputs(
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
      scrollingContainerHTML_ID?: string;
    }>
  ): void {

    const {
      controlsPayload,
      scrollingContainerHTML_ID
    }: {
      controlsPayload: ValidatableControlsGroup.GeneralizedControlsPayload;
      scrollingContainerHTML_ID?: string;
    } = compoundParameter;

    let isCurrentControlTheFirstInvalidOne: boolean = true;

    for (const validatableControlPayload of Array.isArray(controlsPayload) ? controlsPayload : Object.values(controlsPayload)) {

      if (validatableControlPayload.isInvalid) {

        const componentInstance: ValidatableControl = validatableControlPayload.getComponentInstance();

        componentInstance.highlightInvalidInput();

        if (isCurrentControlTheFirstInvalidOne) {

          componentInstance.focus();

          /* eslint-disable-next-line max-depth -- Here are all conditions are required. */
          if (isNotUndefined(scrollingContainerHTML_ID)) {
            getExpectedToBeSingleDOM_Element({ selector: `#${ scrollingContainerHTML_ID }` }).scroll({
              top: componentInstance.getRootElement().offsetTop,
              behavior: "smooth"
            });
          }

          isCurrentControlTheFirstInvalidOne = false;

        }

      }

    }

  }


  /* === Instancing ================================================================================================= */
  public constructor(
    compoundParameter: Readonly<{
      controlsPayload: ValidatableControlsGroup.GeneralizedControlsPayload;
      scrollingContainerHTML_ID?: string;
      onHasBecomeValid?: () => unknown;
      onHasBecomeInvalid?: () => unknown;
    }>
  ) {

    ValidatableControlsGroup.counterForID_Generating++;
    this.ID = `${ ValidatableControlsGroup.counterForID_Generating }`;

    this.controlsPayload = compoundParameter.controlsPayload;

    const controlsPayloadAndValidityMap: { [controlPayloadID: string]: boolean; } = {};

    for (
      const controlPayload of
      Array.isArray(this.controlsPayload) ? this.controlsPayload.values() : Object.values(this.controlsPayload)
    ) {

      controlsPayloadAndValidityMap[controlPayload.ID] = !controlPayload.isInvalid;

      controlPayload.addOnHasBecomeValidEventHandler({
        ID: `VALIDATABLE-CONTROL_GROUP-${ this.ID }--CONTROL-${ controlPayload.ID }`,
        handler: (): void => {

          const wasInvalidPreviously: boolean = this._isInvalid;

          this.controlsPayloadAndValidityMap[controlPayload.ID] = true;
          this._isInvalid = this.isAtLeastOneControlPayloadInvalid();

          if (wasInvalidPreviously && !this._isInvalid) {
            compoundParameter.onHasBecomeValid?.();
          }

        }
      });

      controlPayload.addOnHasBecomeInvalidEventHandler({
        ID: `VALIDATABLE-CONTROL_GROUP-${ this.ID }--CONTROL-${ controlPayload.ID }`,
        handler: (): void => {

          const wasValidPreviously: boolean = !this._isInvalid;

          this.controlsPayloadAndValidityMap[controlPayload.ID] = false;
          this._isInvalid = true;

          if (wasValidPreviously) {
            compoundParameter.onHasBecomeInvalid?.();
          }

        }
      });

    }

    this.controlsPayloadAndValidityMap = controlsPayloadAndValidityMap;
    this._isInvalid = this.isAtLeastOneControlPayloadInvalid();
    this.SCROLLING_CONTAINER_HTML_ID = compoundParameter.scrollingContainerHTML_ID;

  }

  public get isInvalid(): boolean {
    return this._isInvalid;
  }


  /* === Instance methods =========================================================================================== */
  public pointOutValidationErrors(): void {
    ValidatableControlsGroup.pointOutValidationErrors({
      controlsPayload: this.controlsPayload,
      scrollingContainerHTML_ID: this.SCROLLING_CONTAINER_HTML_ID
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


  /* === Auxiliary methods =========================================================================================== */
  /* [ Approach ] This method has not been made getter because of recomputing on each invocation while here the value
   *  of "_isInvalid" is cached. */
  private isAtLeastOneControlPayloadInvalid(): boolean {
    return Object.values(this.controlsPayloadAndValidityMap).
        some((isCurrentControlPayloadValid: boolean): boolean => !isCurrentControlPayloadValid);
  }

}


namespace ValidatableControlsGroup {

  export type GeneralizedControlsPayload =
      Readonly<{ [controlKey: string]: ValidatableControl.Payload<unknown, unknown, InputtedValueValidation>; }> |
      Array<ValidatableControl.Payload<unknown, unknown, InputtedValueValidation>>;

}
