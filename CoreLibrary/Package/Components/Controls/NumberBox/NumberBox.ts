/* eslint-disable @typescript-eslint/member-ordering --
 * The members of this class has been organized semantically. */

/* ─── Validation ─────────────────────────────────────────────────────────────────────────────────────────────────── */
import type ValidatableControl from "../_Validation/ValidatableControl";
import type InputtedValueValidation from "../_Validation/InputtedValueValidation";

/* ─── Children Components ────────────────────────────────────────────────────────────────────────────────────────── */
import CompoundControlShell from "../CompoundControlShell/CompoundControlShell";

/* ─── Utils ──────────────────────────────────────────────────────────────────────────────────────────────────────── */
import { getExpectedToBeSingleDOM_Element } from "@yamato-daiwa/es-extensions-browserjs";


class NumberBox<
  ValidValue extends NumberBox.SupportedValidatablePayloadValuesTypes,
  InvalidValue extends NumberBox.SupportedValidatablePayloadValuesTypes,
  Validation extends InputtedValueValidation
> implements ValidatableControl {

  /* ━━━ Static Fields ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── Accessing to DOM ─────────────────────────────────────────────────────────────────────────────────────────── */
  protected static readonly NATIVE_INPUT_ELEMENT_SELECTOR: string = ".NumberBox--YDF-NativeInput";
  protected static readonly BUTTONS_SELECTOR: string = ".NumberBox--YDF-Button";

  protected static readonly INVALID_VALUE_STATE_CSS_CLASS: string = "NumberBox--YDF__InvalidInputState";


  /* ━━━ Instance Fields ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public readonly payload: ValidatableControl.Payload<ValidValue, InvalidValue, Validation>;

  protected readonly ID: string = NumberBox.generateSelfID();

  protected readonly validityHighlightingActivationMode: NumberBox.ValidityHighlightingActivationModes;


  /* ─── DOM ──────────────────────────────────────────────────────────────────────────────────────────────────────── */
  protected readonly shellComponent: CompoundControlShell;
  protected readonly nativeInputElement: HTMLInputElement;


  /* ─── Reactivity ───────────────────────────────────────────────────────────────────────────────────────────────── */
  /* eslint-disable no-underscore-dangle -- [ CONVENTION ]
   * The instance fields begins from the underscore MUST be changed only via setters. */
  protected _mustHighlightInvalidInputIfAnyValidationErrorsMessages: boolean = false;

  protected get $mustHighlightInvalidInputIfAnyValidationErrorsMessages(): boolean {
    return this._mustHighlightInvalidInputIfAnyValidationErrorsMessages;
  }

  protected set $mustHighlightInvalidInputIfAnyValidationErrorsMessages(value: boolean) {

    if (this._mustHighlightInvalidInputIfAnyValidationErrorsMessages === value) {
      return;
    }


    this._mustHighlightInvalidInputIfAnyValidationErrorsMessages = value;

    if (this._mustHighlightInvalidInputIfAnyValidationErrorsMessages) {

      this.shellComponent.$mustDisplayErrorsMessagesIfAny = true;

      if (this.payload.isInvalid) {
        this.shellComponent.rootElement.classList.add(NumberBox.INVALID_VALUE_STATE_CSS_CLASS);
      }

      return;

    }


    this.shellComponent.rootElement.classList.remove(NumberBox.INVALID_VALUE_STATE_CSS_CLASS);
    this.shellComponent.$mustDisplayErrorsMessagesIfAny = false;

  }


  /* ━━━ Public Static Methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public static pickOneBySelector<Validation extends InputtedValueValidation>(
    initializationProperties: NumberBox.InitializationProperties.AlwaysNonEmptyValueScenario<Validation>
  ): NumberBox<number, number, Validation>;

  public static pickOneBySelector<Validation extends InputtedValueValidation>(
    initializationProperties: NumberBox.InitializationProperties.CouldBeInitiallyEmptyButRequiredValueScenario<Validation>
  ): NumberBox<number | null, number, Validation>;

  public static pickOneBySelector<Validation extends InputtedValueValidation>(
    initializationProperties: NumberBox.InitializationProperties.OptionalValueScenario<Validation>
  ): NumberBox<number | null, number | null, Validation>;

  public static pickOneBySelector<
    ValidValue extends NumberBox.SupportedValidatablePayloadValuesTypes,
    InvalidValue extends NumberBox.SupportedValidatablePayloadValuesTypes,
    Validation extends InputtedValueValidation
  >(
    initializationProperties: NumberBox.InitializationProperties<Validation>
  ): NumberBox<ValidValue, InvalidValue, Validation> {
    return new NumberBox<ValidValue, InvalidValue, Validation>(initializationProperties);
  }


  /* ━━━ Interface implementation ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public highlightInvalidInput(): this {
    this.$mustHighlightInvalidInputIfAnyValidationErrorsMessages = true;
    return this;
  }

  public focus(): this {
    this.nativeInputElement.focus();
    return this;
  }

  public getRootElementOffsetCoordinates(): ValidatableControl.RootElementOffsetCoordinates {
    return {
      top: this.shellComponent.rootElement.offsetTop,
      left: this.shellComponent.rootElement.offsetLeft
    };
  }

  public resetValidityHighlightingStateToInitial(): void {
    this.$mustHighlightInvalidInputIfAnyValidationErrorsMessages =
        this.validityHighlightingActivationMode === NumberBox.ValidityHighlightingActivationModes.immediate;
  }


  /* ━━━ Constructor ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  protected constructor(initializationProperties: NumberBox.InitializationProperties<Validation>) {

    this.shellComponent = CompoundControlShell.pickOneBySelector({
      targetCompoundControlShellSelector: initializationProperties.selector,
      contextElement: initializationProperties.contextElement,
      mustDisplayErrorsMessagesIfAny:
          initializationProperties.validityHighlightingActivationMode ===
          NumberBox.ValidityHighlightingActivationModes.immediate
    });

    this.nativeInputElement = getExpectedToBeSingleDOM_Element({
      selector: NumberBox.NATIVE_INPUT_ELEMENT_SELECTOR,
      contextElement: this.shellComponent.rootElement,
      expectedDOM_ElementSubtype: HTMLInputElement
    });
  }


  /* ━━━ Routines ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── IDs generating ───────────────────────────────────────────────────────────────────────────────────────────── */
  protected static counterForSelfID_Generating: number = 0;

  protected static generateSelfID(): string {
    NumberBox.counterForSelfID_Generating++;
    return `NUMBER_BOX--YDF-${ NumberBox.counterForSelfID_Generating }`;
  }


  protected static counterForOnPayloadHasBecomeValidEventHandlerID_Generating: number = 0;

  protected static generateOnPayloadHasBecomeValidEventHandlerID(componentID: string): string {
    NumberBox.counterForOnPayloadHasBecomeValidEventHandlerID_Generating++;
    return `${ componentID }-ON_PAYLOAD_HAS_BECOME_VALID_EVENT_HANDLER-` +
        `${ NumberBox.counterForOnPayloadHasBecomeValidEventHandlerID_Generating }`;
  }


  protected static counterForOnPayloadHasBecomeInvalidEventHandlerID_Generating: number = 0;

  protected static generateOnPayloadHasBecomeInvalidEventHandlerID(componentID: string): string {
    NumberBox.counterForOnPayloadHasBecomeInvalidEventHandlerID_Generating++;
    return `${ componentID }-ON_PAYLOAD_HAS_BECOME_INVALID_EVENT_HANDLER-` +
        `${ NumberBox.counterForOnPayloadHasBecomeInvalidEventHandlerID_Generating }`;
  }


  protected static counterForOnAsynchronousValidationStatusChangedEventHandlerIDsGenerating: number = 0;

  protected static generateOnAsynchronousValidationStatusChangedEventHandlerID(componentID: string): string {
    NumberBox.counterForOnAsynchronousValidationStatusChangedEventHandlerIDsGenerating++;
    return `${ componentID }-ON_ASYNCHRONOUS_VALIDATION_STATUS_CHANGED_EVENT_HANDLER-` +
        `${ NumberBox.counterForOnAsynchronousValidationStatusChangedEventHandlerIDsGenerating }`;
  }

}


namespace NumberBox {

  export type SupportedValidatablePayloadValuesTypes = number | null;

  export enum Scenarios {
    alwaysNonEmptyValue = "ALWAYS_NON_EMPTY_VALUE",
    couldBeInitiallyEmptyButRequiredValue = "COULD_BE_INITIALLY_EMPTY_BUT_REQUIRED_VALUE",
    optionalValue = "OPTIONAL_VALUE"
  }

  export type InitializationProperties<Validation extends InputtedValueValidation> =
      InitializationProperties.AlwaysNonEmptyValueScenario<Validation> |
      InitializationProperties.CouldBeInitiallyEmptyButRequiredValueScenario<Validation> |
      InitializationProperties.OptionalValueScenario<Validation>;

  export namespace InitializationProperties {

    export type Common<Validation extends InputtedValueValidation> = Readonly<{
      selector: string;
      contextElement?: ParentNode | Readonly<{ selector: string; }>;
      invalidInputPrevention?: InvalidInputPrevention;
      validation: Validation;
      validityHighlightingActivationMode: ValidityHighlightingActivationModes;
    }>;

    export type AlwaysNonEmptyValueScenario<Validation extends InputtedValueValidation> =
        Readonly<{
          scenario: Scenarios.alwaysNonEmptyValue;
          overridingPreInputtedInitialValue?: number;
        }> &
        Common<Validation>;

    export type CouldBeInitiallyEmptyButRequiredValueScenario<Validation extends InputtedValueValidation> =
        Readonly<{
          scenario: Scenarios.couldBeInitiallyEmptyButRequiredValue;
          overridingPreInputtedInitialValue?: number | null;
        }> &
        Common<Validation>;

    export type OptionalValueScenario<Validation extends InputtedValueValidation> =
        Readonly<{
          scenario: Scenarios.optionalValue;
          overridingPreInputtedInitialValue?: number | null;
        }> &
        Common<Validation>;

  }

  export type InvalidInputPrevention = Readonly<{
    minimalNumericValue?: number;
    maximalNumericValue?: number;
  }>;

  export enum ValidityHighlightingActivationModes {
    immediate = "IMMEDIATE",
    onFirstInputtedCharacter = "ON_FIRST_INPUTTED_CHARACTER",
    onFocusOut = "ON_FOCUS_OUT"
  }

}


export default NumberBox;
