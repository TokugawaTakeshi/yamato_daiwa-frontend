import type ValidatableControl from "./ValidatableControl";
import type ValueValidation from "./ValueValidation";
import { Logger, UnexpectedEventError } from "@yamato-daiwa/es-extensions";
import type { ArbitraryObject } from "@yamato-daiwa/es-extensions";
import { getExpectedToBeSingleDOM_Element } from "@yamato-daiwa/es-extensions-browserjs";


export default class ValidatableControlsGroup<ValidData extends ArbitraryObject> {

  static #counterForID_Generating: number = -1;

  public readonly ID: string;

  readonly #controlsPayload: ValidatableControlsGroup.GeneralizedControlsPayload;
  readonly #controlsPayloadAndValidityMap: { [controlPayloadID: string]: boolean; };
  readonly #SCROLLING_CONTAINER_HTML_ID: string;

  #isInvalid: boolean;


  /* === Static methods ============================================================================================= */
  public static hasInvalidInputs(
    controlsAccess: ValidatableControlsGroup.GeneralizedControlsPayload
  ): boolean {
    return (Array.isArray(controlsAccess) ? controlsAccess : Object.values(controlsAccess)).some(
      (validatableControlPayload: ValidatableControl.Payload<unknown, unknown, ValueValidation>): boolean =>
          validatableControlPayload.isInvalid
    );
  }

  public static pointOutValidationErrors(
    namedParameters: Readonly<{
      controlsPayload: ValidatableControlsGroup.GeneralizedControlsPayload;
      scrollingContainerHTML_ID: string;
    }>
  ): void {

    const {
      controlsPayload,
      scrollingContainerHTML_ID
    }: {
      controlsPayload: ValidatableControlsGroup.GeneralizedControlsPayload;
      scrollingContainerHTML_ID: string;
    } = namedParameters;

    let isFirstInvalidInput: boolean = true;

    for (const validatableControlPayload of Array.isArray(controlsPayload) ? controlsPayload : Object.values(controlsPayload)) {

      if (validatableControlPayload.isInvalid) {

        const componentInstance: ValidatableControl = validatableControlPayload.getComponentInstance();

        componentInstance.highlightInvalidInput();

        if (isFirstInvalidInput) {

          componentInstance.focus();

          getExpectedToBeSingleDOM_Element({ selector: `#${ scrollingContainerHTML_ID }` }).scroll({
            top: componentInstance.getRootElement().offsetTop,
            behavior: "smooth"
          });

          isFirstInvalidInput = false;
        }
      }
    }
  }


  /* === Instancing ================================================================================================= */
  public constructor(
    namedParameters: Readonly<{
      controlsPayload: ValidatableControlsGroup.GeneralizedControlsPayload;
      scrollingContainerHTML_ID: string;
      onHasBecomeValid?: () => unknown;
      onHasBecomeInvalid?: () => unknown;
    }>
  ) {

    ValidatableControlsGroup.#counterForID_Generating++;
    this.ID = `${ ValidatableControlsGroup.#counterForID_Generating }`;

    this.#controlsPayload = namedParameters.controlsPayload;

    const controlsPayloadAndValidityMap: { [controlPayloadID: string]: boolean; } = {};

    for (
      const controlPayload of
      Array.isArray(this.#controlsPayload) ? this.#controlsPayload.values() : Object.values(this.#controlsPayload)
    ) {

      controlsPayloadAndValidityMap[controlPayload.ID] = !controlPayload.isInvalid;

      controlPayload.addOnHasBecomeValidEventHandler({
        ID: `VALIDATABLE-CONTROL_GROUP-${ this.ID }--CONTROL-${ controlPayload.ID }`,
        handler: (): void => {

          const wasInvalidPreviously: boolean = this.#isInvalid;

          this.#controlsPayloadAndValidityMap[controlPayload.ID] = true;
          this.#isInvalid = this.isAtLeastOneControlPayloadInvalid();

          if (wasInvalidPreviously && !this.#isInvalid) {
            namedParameters.onHasBecomeValid?.();
          }
        }
      });

      controlPayload.addOnHasBecomeInvalidEventHandler({
        ID: `VALIDATABLE-CONTROL_GROUP-${ this.ID }--CONTROL-${ controlPayload.ID }`,
        handler: (): void => {

          const wasValidPreviously: boolean = !this.#isInvalid;

          this.#controlsPayloadAndValidityMap[controlPayload.ID] = false;
          this.#isInvalid = true;

          if (wasValidPreviously) {
            namedParameters.onHasBecomeInvalid?.();
          }
        }
      });
    }

    this.#controlsPayloadAndValidityMap = controlsPayloadAndValidityMap;
    this.#isInvalid = this.isAtLeastOneControlPayloadInvalid();
    this.#SCROLLING_CONTAINER_HTML_ID = namedParameters.scrollingContainerHTML_ID;
  }

  public get isInvalid(): boolean {
    return this.#isInvalid;
  }


  /* === Instance methods =========================================================================================== */
  public pointOutValidationErrors(): void {
    ValidatableControlsGroup.pointOutValidationErrors({
      controlsPayload: this.#controlsPayload,
      scrollingContainerHTML_ID: this.#SCROLLING_CONTAINER_HTML_ID
    });
  }

  public getExpectedToBeValidData(): ValidData {

    if (this.#isInvalid) {
      Logger.throwErrorAndLog({
        errorInstance: new UnexpectedEventError("Contrary to expectations, the payload is still invalid."),
        title: UnexpectedEventError.localization.defaultTitle,
        occurrenceLocation: "validatableControlsGroup.getExpectedToBeValidPayload()"
      });
    }


    const payload: ArbitraryObject = {};

    for (const [ key, controlPayload ] of Object.entries(this.#controlsPayload)) {

      payload[key] = controlPayload.getExpectedToBeValidValue();

    }

    return payload as ValidData;
  }


  /* === Auxiliary methods =========================================================================================== */
  /* [ Approach ] This method has not been made getter is recomputing on each invocation while here the value of "#isInvalid"
  *     is cached. */
  private isAtLeastOneControlPayloadInvalid(): boolean {
    return Object.values(this.#controlsPayloadAndValidityMap).
        some((isCurrentControlPayloadValid: boolean): boolean => !isCurrentControlPayloadValid);
  }
}


namespace ValidatableControlsGroup {

  export type GeneralizedControlsPayload =
      Readonly<{ [controlKey: string]: ValidatableControl.Payload<unknown, unknown, ValueValidation>; }> |
      Array<ValidatableControl.Payload<unknown, unknown, ValueValidation>>;
}
