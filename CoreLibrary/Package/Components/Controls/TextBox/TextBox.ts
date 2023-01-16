/* eslint-disable @typescript-eslint/member-ordering --
 * The members of this class has been organized semantically. */

/* --- Constants ---------------------------------------------------------------------------------------------------- */
import YDF_BUG_REPORTING_PAGE_URI from "../../_Auxiliaries/YDF_BUG_REPORTING_PAGE_URI";

/* --- Validation --------------------------------------------------------------------------------------------------- */
import ValidatableControl from "../_Validation/ValidatableControl";
import type ValueValidation from "../_Validation/ValueValidation";

/* --- Children components ------------------------------------------------------------------------------------------ */
import CompoundControlShell from "../CompoundControlShell/CompoundControlShell";

/* --- Utils -------------------------------------------------------------------------------------------------------- */
import {
  isNumber,
  isNotUndefined,
  isNull,
  isString,
  Logger,
  InvalidParameterValueError,
  UnexpectedEventError,
  PoliteErrorsMessagesBuilder
} from "@yamato-daiwa/es-extensions";
import { getExpectedToBeSingleDOM_Element } from "@yamato-daiwa/es-extensions-browserjs";


class TextBox<
  ValidValue extends number | string | null,
  InvalidValue extends number | string | null,
  Validation extends ValueValidation
> implements ValidatableControl {

  static readonly #NATIVE_INPUT_ACCEPTING_ELEMENT_SELECTOR: string = ".TextBox--YDF-InputOrTextAreaElement";
  static readonly #INVALID_VALUE_STATE_CSS_CLASS: string = "TextBox--YDF__InvalidInputState";

  readonly #ID: string = TextBox.#generateSelfID();

  readonly #payload: ValidatableControl.Payload<ValidValue, InvalidValue, Validation>;

  readonly #rawInputModifier: (rawValue: string) => ValidValue | InvalidValue;

  readonly #shellComponent: CompoundControlShell;
  readonly #nativeInputAcceptingElement: HTMLInputElement | HTMLTextAreaElement;

  #mustActivateAppropriateHighlightIfAnyErrorsMessages: boolean = false;

  readonly #payloadInitialValue: ValidValue | InvalidValue;
  readonly #mustActivateInvalidHighlightImmediatelyInitially: boolean;


  /* === Static methods ============================================================================================= */
  public static pickOneBySelector<
    ValidValue extends number | string | null,
    InvalidValue extends number | string | null,
    Validation extends ValueValidation
  >(
    properties: TextBox.InitializationProperties<ValidValue, InvalidValue, Validation>
  ): TextBox<ValidValue, InvalidValue, Validation> {
    return new TextBox<ValidValue, InvalidValue, Validation>(properties);
  }


  /* === Constructor ================================================================================================ */
  private constructor(properties: TextBox.InitializationProperties<ValidValue, InvalidValue, Validation>) {

    this.#shellComponent = CompoundControlShell.pickOneBySelector(properties.selector);

    const nativeInputAcceptingElement: Element = getExpectedToBeSingleDOM_Element({
      selector: TextBox.#NATIVE_INPUT_ACCEPTING_ELEMENT_SELECTOR,
      context: this.#shellComponent.rootElement
    });

    if (nativeInputAcceptingElement instanceof HTMLInputElement) {

      this.#nativeInputAcceptingElement = nativeInputAcceptingElement;

    } else if (nativeInputAcceptingElement instanceof HTMLTextAreaElement) {

      this.#nativeInputAcceptingElement = nativeInputAcceptingElement;

    } else {

      Logger.throwErrorAndLog({
        errorInstance: new UnexpectedEventError(PoliteErrorsMessagesBuilder.buildMessage({
          technicalDetails: `The element corresponding to selector ${ TextBox.#NATIVE_INPUT_ACCEPTING_ELEMENT_SELECTOR } ` +
              "must be the instance either of 'HTMLInputElement' or 'HTMLTextAreaElement' while actually none of them.",
          politeExplanation: "When trying to pick the native 'input' or 'textarea' element, we did expected that it will " +
              "be the instance of 'HTMLInputElement'/'HTMLTextAreaElement' respectively and during test is was such as. " +
              "This bug means that we has missed some combination of circumstances so we must to investigate it.",
          bugTrackerURI: YDF_BUG_REPORTING_PAGE_URI
        })),
        title: UnexpectedEventError.localization.defaultTitle,
        occurrenceLocation: "TextBox.constructor(properties)"
      });

    }


    let payloadInitialValue: ValidValue | InvalidValue;

    if (isNotUndefined(properties.overridingPreInputtedInitialValue)) {

      payloadInitialValue = properties.overridingPreInputtedInitialValue;

      if (isString(properties.overridingPreInputtedInitialValue)) {

        this.#nativeInputAcceptingElement.value = properties.overridingPreInputtedInitialValue;

      } else if (isNumber(properties.overridingPreInputtedInitialValue)) {

        this.#nativeInputAcceptingElement.value = properties.overridingPreInputtedInitialValue.toString();

      } else if (isNull(properties.overridingPreInputtedInitialValue)) {

        this.#nativeInputAcceptingElement.value = "";

      } else {

        Logger.throwErrorAndLog({
          errorInstance: new InvalidParameterValueError({
            parameterNumber: 1,
            parameterName: "properties.overridingPreInputtedInitialValue",
            messageSpecificPart: "The value must be either string or number or null, while actually has type " +
                `'${ typeof properties.overridingPreInputtedInitialValue }'.`
          }),
          title: InvalidParameterValueError.localization.defaultTitle,
          occurrenceLocation: "TextBox.constructor(properties)"
        });

      }

    } else {

      payloadInitialValue = properties.rawInputModifier(this.#nativeInputAcceptingElement.value);

    }


    this.#payload = new ValidatableControl.Payload<ValidValue, InvalidValue, Validation>({
      initialValue: payloadInitialValue,
      getComponentInstance: (): ValidatableControl => this,
      validation: properties.validation
    });

    this.#payload.addOnHasBecomeValidEventHandler({
      handler: this.onPayloadHasBecomeValidEventListener.bind(this),
      ID: TextBox.#generateOnPayloadHasBecomeValidEventHandlerID(this.#ID)
    });
    this.#payload.addOnHasBecomeInvalidEventHandler({
      handler: this.onPayloadHasBecomeInvalidEventListener.bind(this),
      ID: TextBox.#generateOnPayloadHasBecomeInvalidEventHandlerID(this.#ID)
    });

    this.#rawInputModifier = properties.rawInputModifier;

    this.#mustActivateInvalidHighlightImmediatelyInitially = properties.mustActivateInvalidHighlightImmediately;
    this.#mustActivateAppropriateHighlightIfAnyErrorsMessages = this.#mustActivateInvalidHighlightImmediatelyInitially;

    this.#shellComponent.setErrorsMessagesAndDisplayIfMust(this.#payload.validationErrorsMessages);

    if (this.#mustActivateAppropriateHighlightIfAnyErrorsMessages) {
      this.#shellComponent.beginDisplayingOfErrorsMessagesIfAny();
    }

    this.#nativeInputAcceptingElement.addEventListener("input", this.onInputEventListener.bind(this));
    this.#nativeInputAcceptingElement.addEventListener("blur", this.onFocusOutEventListener.bind(this));

    this.#payloadInitialValue = payloadInitialValue;
  }


  /* === Interface implementation =================================================================================== */
  public highlightInvalidInput(): this {

    this.#mustActivateAppropriateHighlightIfAnyErrorsMessages = true;

    if (this.#payload.isInvalid) {
      this.#shellComponent.rootElement.classList.add(TextBox.#INVALID_VALUE_STATE_CSS_CLASS);
    }

    this.#shellComponent.beginDisplayingOfErrorsMessagesIfAny();

    return this;
  }

  public focus(): this {
    this.#nativeInputAcceptingElement.focus();
    return this;
  }

  public getRootElement(): HTMLElement {
    return this.#shellComponent.rootElement;
  }

  public resetStateToInitial(): void {

    if (!this.#mustActivateInvalidHighlightImmediatelyInitially) {
      this.#mustActivateAppropriateHighlightIfAnyErrorsMessages = false;
      this.#shellComponent.stopDisplayingOfErrorsMessages();
      this.#shellComponent.rootElement.classList.remove(TextBox.#INVALID_VALUE_STATE_CSS_CLASS);
    }

    this.payload.value = this.#payloadInitialValue;
  }


  /* === Other public methods and getters =========================================================================== */
  public activateToReadOnlyMode(): this { this.#nativeInputAcceptingElement.readOnly = true; return this; }
  public disactiveReadOnlyMode(): this { this.#nativeInputAcceptingElement.readOnly = false; return this; }

  public disable(): this { this.#nativeInputAcceptingElement.disabled = true; return this; }
  public enable(): this { this.#nativeInputAcceptingElement.disabled = false; return this; }

  public get payload(): ValidatableControl.Payload<ValidValue, InvalidValue, Validation> { return this.#payload; }


  /* === Events ===================================================================================================== */
  private onInputEventListener(event: Event): void {

    if (!(event instanceof InputEvent)) {
      Logger.logError({
        errorType: UnexpectedEventError.NAME,
        title: UnexpectedEventError.localization.defaultTitle,
        description: PoliteErrorsMessagesBuilder.buildMessage({
          bugTrackerURI: YDF_BUG_REPORTING_PAGE_URI,
          politeExplanation: "Adding the event listener to input accepting element ('HTMLInputElement' " +
              "or 'HTMLTextAreaElement') we was expected that event of 'InputEvent' subtype will be emitted. " +
              "This bug occurrence means that under certain combination of circumstances the emitted Event could not " +
              "be of 'InputEvent' subtype. The YDF developers needs to investigate it.",
          technicalDetails: "The first parameter of 'onInputEventListener' is not an instance of 'InputEvent'."
        }),
        occurrenceLocation: "TextBox.constructor()"
      });
    }


    this.#payload.value = this.#rawInputModifier(this.#nativeInputAcceptingElement.value);
    this.#shellComponent.setErrorsMessagesAndDisplayIfMust(this.#payload.validationErrorsMessages);
  }

  private onFocusOutEventListener(): void {

    this.#mustActivateAppropriateHighlightIfAnyErrorsMessages = true;

    if (this.#payload.isInvalid) {
      this.#shellComponent.rootElement.classList.add(TextBox.#INVALID_VALUE_STATE_CSS_CLASS);
    }

    this.#shellComponent.beginDisplayingOfErrorsMessagesIfAny();
  }

  private onPayloadHasBecomeValidEventListener(): void {
    this.#shellComponent.rootElement.classList.remove(TextBox.#INVALID_VALUE_STATE_CSS_CLASS);
  }

  private onPayloadHasBecomeInvalidEventListener(): void {
    if (this.#mustActivateAppropriateHighlightIfAnyErrorsMessages) {
      this.#shellComponent.rootElement.classList.add(TextBox.#INVALID_VALUE_STATE_CSS_CLASS);
    }
  }


  /* === Auxiliaries ============================================================================================== */
  /* --- IDs generating ------------------------------------------------------------------------------------------- */
  static #counterForSelfID_Generating: number = 0;

  static #generateSelfID(): string {
    TextBox.#counterForSelfID_Generating++;
    return `TEXT-BOX--YDF-${ TextBox.#counterForSelfID_Generating }`;
  }


  static #counterForOnPayloadHasBecomeValidEventHandlerID_Generating: number = 0;

  static #generateOnPayloadHasBecomeValidEventHandlerID(componentID: string): string {
    TextBox.#counterForOnPayloadHasBecomeValidEventHandlerID_Generating++;
    return `${ componentID }-ON_PAYLOAD_HAS_BECOME_VALID_EVENT_HANDLER-` +
        `${ TextBox.#counterForOnPayloadHasBecomeValidEventHandlerID_Generating }`;
  }


  static #counterForOnPayloadHasBecomeInvalidEventHandlerID_Generating: number = 0;

  static #generateOnPayloadHasBecomeInvalidEventHandlerID(componentID: string): string {
    TextBox.#counterForOnPayloadHasBecomeInvalidEventHandlerID_Generating++;
    return `${ componentID }-ON_PAYLOAD_HAS_BECOME_INVALID_EVENT_HANDLER-` +
        `${ TextBox.#counterForOnPayloadHasBecomeInvalidEventHandlerID_Generating }`;
  }
}


namespace TextBox {

  export type InitializationProperties<
    ValidValue extends number | string | null,
    InvalidValue extends number | string | null,
    Validation extends ValueValidation
  > = Readonly<{
    selector: string;
    rawInputModifier: (rawInput: string) => ValidValue | InvalidValue;
    overridingPreInputtedInitialValue?: ValidValue | InvalidValue;
    validation: Validation;
    mustActivateInvalidHighlightImmediately: boolean;
  }>;

  export namespace RawInputModifiers {

    export function keepStringValueAsIs(rawValue: string): string { return rawValue; }

    export function convertToNumber(rawValue: string): number {
      return Number(rawValue);
    }

    export function convertToIntegerOrNull(rawValue: string): number | null {
      return rawValue.length > 0 ? Number(rawValue) : null;
    }
  }

}


export default TextBox;
