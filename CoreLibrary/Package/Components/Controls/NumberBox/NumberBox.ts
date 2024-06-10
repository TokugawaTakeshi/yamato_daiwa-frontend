/* eslint-disable @typescript-eslint/member-ordering --
 * The members of this class has been organized semantically. */

/* ─── Validation ─────────────────────────────────────────────────────────────────────────────────────────────────── */
import ValidatableControl from "../_Validation/ValidatableControl";
import type InputtedValueValidation from "../_Validation/InputtedValueValidation";

/* ─── Children Components ────────────────────────────────────────────────────────────────────────────────────────── */
import CompoundControlShell from "../CompoundControlShell/CompoundControlShell";

/* ─── Utils ──────────────────────────────────────────────────────────────────────────────────────────────────────── */
import { getExpectedToBeSingleDOM_Element, addInputEventHandler } from "@yamato-daiwa/es-extensions-browserjs";
import { isNotUndefined, isNumber } from "@yamato-daiwa/es-extensions";


class NumberBox<
  ValidValue extends NumberBox.SupportedValidatablePayloadValuesTypes,
  InvalidValue extends NumberBox.SupportedValidatablePayloadValuesTypes,
  Validation extends InputtedValueValidation
> implements ValidatableControl {

  /* ━━━ Static Fields ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── Accessing to DOM ─────────────────────────────────────────────────────────────────────────────────────────── */
  protected static readonly NATIVE_INPUT_ELEMENT_SELECTOR: string = ".NumberBox--YDF-NativeInput";
  protected static readonly VALUE_INCREMENTING_BUTTON_DATE_ATTRIBUTE_KEY: string = "data-button-incrementing";
  protected static readonly VALUE_DECREMENTING_BUTTON_DATE_ATTRIBUTE_KEY: string = "data-button-decrementing";

  protected static readonly INVALID_VALUE_STATE_CSS_CLASS: string = "NumberBox--YDF__InvalidInputState";


  /* ━━━ Instance Fields ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public readonly payload: ValidatableControl.Payload<ValidValue, InvalidValue, Validation>;

  protected readonly ID: string = NumberBox.generateSelfID();

  protected readonly scenario: NumberBox.Scenarios;
  protected readonly validityHighlightingActivationMode: NumberBox.ValidityHighlightingActivationModes;
  protected readonly minimalValue?: number;
  protected readonly maximalValue?: number;
  protected readonly step: number;


  /* ─── DOM ──────────────────────────────────────────────────────────────────────────────────────────────────────── */
  protected readonly shellComponent: CompoundControlShell;
  protected readonly nativeInputElement: HTMLInputElement;
  protected readonly valueIncrementingButton: Element;
  protected readonly valueDecrementingButton: Element;


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

    this.scenario = initializationProperties.scenario;
    this.validityHighlightingActivationMode = initializationProperties.validityHighlightingActivationMode;
    this.minimalValue = initializationProperties.invalidInputPrevention?.minimalValue;
    this.maximalValue = initializationProperties.invalidInputPrevention?.minimalValue;
    this.step = initializationProperties.invalidInputPrevention?.step ?? 1;

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


    this.valueIncrementingButton = getExpectedToBeSingleDOM_Element({
      selector: `[${ NumberBox.VALUE_INCREMENTING_BUTTON_DATE_ATTRIBUTE_KEY }]`,
      contextElement: this.shellComponent.rootElement
    });

    this.valueIncrementingButton.removeAttribute(NumberBox.VALUE_INCREMENTING_BUTTON_DATE_ATTRIBUTE_KEY);


    this.valueDecrementingButton = getExpectedToBeSingleDOM_Element({
      selector: `[${ NumberBox.VALUE_DECREMENTING_BUTTON_DATE_ATTRIBUTE_KEY }]`,
      contextElement: this.shellComponent.rootElement
    });

    this.valueDecrementingButton.removeAttribute(NumberBox.VALUE_DECREMENTING_BUTTON_DATE_ATTRIBUTE_KEY);


    let payloadInitialValue: NumberBox.SupportedValidatablePayloadValuesTypes;

    if (isNotUndefined(initializationProperties.overridingPreInputtedInitialValue)) {

      payloadInitialValue = initializationProperties.overridingPreInputtedInitialValue;

      this.nativeInputElement.value = isNumber(payloadInitialValue) ? payloadInitialValue.toString() : "";

    } else {

      payloadInitialValue = this.transformInputtedRawValue(this.nativeInputElement.value);

      if (
        this.nativeInputElement.value.length === 0 &&
            initializationProperties.scenario === NumberBox.Scenarios.alwaysNonEmptyValue
      ) {
        this.nativeInputElement.value = "0";
      }

    }

    this.payload = new ValidatableControl.Payload<ValidValue, InvalidValue, Validation>({

      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
      * Although both `ValidValue` and `InvalidValue` constrained to `NumberBox.SupportedValidatablePayloadValuesTypes`
      *   it is not enough to convince the TypeScript. Most likely, there is no way to pass the correspondence
      *   between specific scenario and `ValidValue`/`InvalidValue`. */
      initialValue: payloadInitialValue as ValidValue | InvalidValue,
      getComponentInstance: (): ValidatableControl => this,
      validation: initializationProperties.validation,
      onHasBecomeValidEventHandler: {
        handler: this.onPayloadHasBecomeValidEventHandler.bind(this),
        ID: NumberBox.generateOnPayloadHasBecomeValidEventHandlerID(this.ID)
      },
      onHasBecomeInvalidEventHandler: {
        handler: this.onPayloadHasBecomeInvalidEventHandler.bind(this),
        ID: NumberBox.generateOnPayloadHasBecomeInvalidEventHandlerID(this.ID)
      },
      onAsynchronousValidationStatusChangedEventHandler: {
        handler: this.onPayloadAsynchronousValidationStatusChangedEventHandler.bind(this),
        ID: NumberBox.generateOnAsynchronousValidationStatusChangedEventHandlerID(this.ID)
      }

    });

    this.shellComponent.$validationErrorsMessages = this.payload.validationErrorsMessages;

    this._mustHighlightInvalidInputIfAnyValidationErrorsMessages =
        this.validityHighlightingActivationMode === NumberBox.ValidityHighlightingActivationModes.immediate;

    addInputEventHandler({
      targetElement: this.nativeInputElement,
      handler: this.onTypeCharacterEventListener.bind(this)
    });

    this.nativeInputElement.addEventListener("blur", this.onFocusOutEventListener.bind(this));

    this.initializeHTML_AttributesOfNativeInputElement();

  }


  /* ━━━ Public Accessors / Mutators ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public get $isReadonly(): boolean {
    return this.nativeInputElement.readOnly;
  }

  public set $isReadonly(value: boolean) {
    if (this.nativeInputElement.readOnly !== value) {
      this.nativeInputElement.readOnly = value;
    }
  }

  public get $isDisabled(): boolean {
    return this.nativeInputElement.disabled;
  }

  public set $isDisabled(value: boolean) {
    if (this.nativeInputElement.disabled !== value) {
      this.nativeInputElement.disabled = value;
    }
  }


  /* ━━━ Events Handling ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  protected onPayloadHasBecomeValidEventHandler(): void {
    this.shellComponent.rootElement.classList.remove(NumberBox.INVALID_VALUE_STATE_CSS_CLASS);
    this.nativeInputElement.removeAttribute("aria-invalid");
  }

  protected onPayloadHasBecomeInvalidEventHandler(): void {

    if (this.$mustHighlightInvalidInputIfAnyValidationErrorsMessages) {
      this.shellComponent.rootElement.classList.add(NumberBox.INVALID_VALUE_STATE_CSS_CLASS);
    }

    this.nativeInputElement.setAttribute("aria-invalid", "");

  }

  protected onPayloadAsynchronousValidationStatusChangedEventHandler(
    asynchronousValidationStatus: InputtedValueValidation.AsynchronousChecks.Status
  ): void {

    this.shellComponent.$asynchronousValidationsStatus = asynchronousValidationStatus;
    this.shellComponent.$validationErrorsMessages = this.payload.validationErrorsMessages;

    if (asynchronousValidationStatus.hasAtLeastOneInvalidValueBeenConfirmed) {
      this.shellComponent.$mustDisplayErrorsMessagesIfAny = true;
    }

  }

  protected onTypeCharacterEventListener(): void {

    const newValue: ValidValue | InvalidValue = this.transformInputtedRawValue(this.nativeInputElement.value);

    this.payload.$setValue({
      newValue,
      asynchronousValidationDelay__seconds: 1
    });

    this.shellComponent.$validationErrorsMessages = this.payload.validationErrorsMessages;

    if (
      !this.$mustHighlightInvalidInputIfAnyValidationErrorsMessages &&
      this.validityHighlightingActivationMode === NumberBox.ValidityHighlightingActivationModes.onFirstInputtedCharacter
    ) {
      this.$mustHighlightInvalidInputIfAnyValidationErrorsMessages = true;
    }

  }

  protected onIncremenValue(): void {

    /* [ Theory ] The `Number(null)` will be `0`. */
    /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- */
    this.payload.$setValue({ newValue: (Number(this.payload.value) + this.step) as ValidValue | InvalidValue });

  }

  protected onDecrementValue(): void {

    /* [ Theory ] The `Number(null)` will be `0`. */
    /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- */
    this.payload.$setValue({ newValue: (Number(this.payload.value) - this.step) as ValidValue | InvalidValue });

  }

  protected onFocusOutEventListener(): void {
    this.$mustHighlightInvalidInputIfAnyValidationErrorsMessages = true;
  }


  /* ━━━ Initialization ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  protected initializeHTML_AttributesOfNativeInputElement(): void {
    if (this.payload.validation.isInputRequired()) {
      this.nativeInputElement.setAttribute("required", "");
    } else {
      this.nativeInputElement.removeAttribute("required");
    }
  }


  /* ━━━ Routines ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  protected transformInputtedRawValue(rawValue: string): ValidValue | InvalidValue {

    if (rawValue.length > 0) {
      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- */
      return Number(rawValue) as ValidValue | InvalidValue;
    }


    /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- */
    return (this.scenario === NumberBox.Scenarios.alwaysNonEmptyValue ? 0 : null) as ValidValue | InvalidValue;

  }


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
    minimalValue?: number;
    maximalValue?: number;
    step?: number;
  }>;

  export enum ValidityHighlightingActivationModes {
    immediate = "IMMEDIATE",
    onFirstInputtedCharacter = "ON_FIRST_INPUTTED_CHARACTER",
    onFocusOut = "ON_FOCUS_OUT"
  }

}


export default NumberBox;
