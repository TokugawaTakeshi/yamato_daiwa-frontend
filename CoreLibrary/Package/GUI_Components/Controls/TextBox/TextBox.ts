/* eslint-disable @typescript-eslint/member-ordering --
 * The members of this class has been organized semantically. */

/* ─── Constants ──────────────────────────────────────────────────────────────────────────────────────────────────── */
import YDF_BUG_REPORTING_PAGE_URI from "../../_Auxiliaries/YDF_BUG_REPORTING_PAGE_URI";

/* ─── Validation ─────────────────────────────────────────────────────────────────────────────────────────────────── */
import ValidatableControl from "../_Validation/ValidatableControl";
import type InputtedValueValidation from "../_Validation/InputtedValueValidation";

/* ─── Children Components ────────────────────────────────────────────────────────────────────────────────────────── */
import CompoundControlShell from "../CompoundControlShell/CompoundControlShell";

/* ─── Utils ──────────────────────────────────────────────────────────────────────────────────────────────────────── */
import {
  isString,
  isNumber,
  isNaturalNumberOrZero,
  isNotUndefined,
  Logger,
  UnexpectedEventError,
  PoliteErrorsMessagesBuilder
} from "@yamato-daiwa/es-extensions";
import {
  getExpectedToBeSingleDOM_Element,
  InputEventListener,
  FocusOutEventListener,
  resolveContextDOM_ElementPolymorphicSpecification
} from "@yamato-daiwa/es-extensions-browserjs";


class TextBox<
  ValidValue extends TextBox.SupportedValidatablePayloadValuesTypes,
  InvalidValue extends TextBox.SupportedValidatablePayloadValuesTypes,
  Validation extends InputtedValueValidation
> implements ValidatableControl {

  /* ━━━ Static Fields ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── Accessing to DOM ─────────────────────────────────────────────────────────────────────────────────────────── */
  public static readonly ROOT_ELEMENT_SELECTOR: string = ".TextBox--YDF";
  protected static readonly NATIVE_INPUT_ACCEPTING_ELEMENT_SELECTOR: string = ".TextBox--YDF-InputOrTextAreaElement";
  protected static readonly INVALID_VALUE_STATE_CSS_CLASS: string = "TextBox--YDF__InvalidInputState";


  /* ━━━ Instance Fields ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public readonly INSTANCE_ID: string = TextBox.generateInstanceID();

  public readonly payload: ValidatableControl.Payload<ValidValue, InvalidValue, Validation>;

  public get rootElement(): HTMLElement {
    return this.shellComponent.rootElement;
  }

  protected readonly rawInputTypeTransformer: (rawInput: string) => ValidValue | InvalidValue;
  protected readonly validityHighlightingActivationMode: TextBox.ValidityHighlightingActivationModes;


  /* ─── DOM ──────────────────────────────────────────────────────────────────────────────────────────────────────── */
  protected readonly shellComponent: CompoundControlShell;
  protected readonly nativeInputAcceptingElement: HTMLInputElement | HTMLTextAreaElement;


  /* ─── Events ───────────────────────────────────────────────────────────────────────────────────────────────────── */
  protected inputEventListener: InputEventListener;
  protected focusOutEventListener: FocusOutEventListener;
  protected readonly onFocusOutExternalEventHandler?: () => void;


  /* ─── Reactivity ───────────────────────────────────────────────────────────────────────────────────────────────── */
  /* eslint-disable no-underscore-dangle -- [ CONVENTION ]
   * The instance fields begins from the underscore MUST be changed only via setters. */
  protected _mustHighlightInvalidInputIfAnyValidationErrorsMessages: boolean;

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
        this.shellComponent.rootElement.classList.add(TextBox.INVALID_VALUE_STATE_CSS_CLASS);
      }

      return;

    }


    this.shellComponent.rootElement.classList.remove(TextBox.INVALID_VALUE_STATE_CSS_CLASS);
    this.shellComponent.$mustDisplayErrorsMessagesIfAny = false;

  }
  /* eslint-enable no-underscore-dangle */


  /* ━━━ Public Static Methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── Picking of One ───────────────────────────────────────────────────────────────────────────────────────────── */
  public static pickOne<Validation extends InputtedValueValidation>(
    initializationProperties: TextBox.InitializationProperties.StringPayloadValue<Validation>
  ): TextBox<string, string, Validation>;

  public static pickOne<
    ValidValue extends TextBox.SupportedValidatablePayloadValuesTypes,
    InvalidValue extends TextBox.SupportedValidatablePayloadValuesTypes,
    Validation extends InputtedValueValidation
  >(
    initializationProperties: TextBox.InitializationProperties.CustomPayloadValue<ValidValue, InvalidValue, Validation>
  ): TextBox<ValidValue, InvalidValue, Validation>;

  public static pickOne<
    ValidValue extends TextBox.SupportedValidatablePayloadValuesTypes,
    InvalidValue extends TextBox.SupportedValidatablePayloadValuesTypes,
    Validation extends InputtedValueValidation
  >(
    initializationProperties: TextBox.InitializationProperties<ValidValue, InvalidValue, Validation>
  ): TextBox<ValidValue, InvalidValue, Validation> {
    return new TextBox<ValidValue, InvalidValue, Validation>({
      ...initializationProperties,
      rootElement: "selector" in initializationProperties.rootElement ?
          getExpectedToBeSingleDOM_Element({
            selector: initializationProperties.rootElement.selector,
            contextElement: initializationProperties.contextElement
          }) :
          initializationProperties.rootElement
    });
  }


  /* ─── Picking of Multiple Ones ─────────────────────────────────────────────────────────────────────────────────── */
  public static pickMultiple<Validation extends InputtedValueValidation>(
    initializationProperties: TextBox.InitializationProperties.StringPayloadValue<Validation>
  ): Array<TextBox<string, string, Validation>>;

  public static pickMultiple<
    ValidValue extends TextBox.SupportedValidatablePayloadValuesTypes,
    InvalidValue extends TextBox.SupportedValidatablePayloadValuesTypes,
    Validation extends InputtedValueValidation
  >(
    initializationProperties: TextBox.InitializationProperties.CustomPayloadValue<ValidValue, InvalidValue, Validation>
  ): Array<TextBox<ValidValue, InvalidValue, Validation>>;

  public static pickMultiple<
    ValidValue extends TextBox.SupportedValidatablePayloadValuesTypes,
    InvalidValue extends TextBox.SupportedValidatablePayloadValuesTypes,
    Validation extends InputtedValueValidation
  >(
    initializationProperties: TextBox.InitializationProperties<ValidValue, InvalidValue, Validation>
  ): Array<TextBox<ValidValue, InvalidValue, Validation>> {
    return Array.
        from(
          (resolveContextDOM_ElementPolymorphicSpecification(initializationProperties.contextElement) ?? document).
              querySelectorAll(TextBox.ROOT_ELEMENT_SELECTOR)
        ).
        map(
          (rootElement: Element): TextBox<ValidValue, InvalidValue, Validation> =>
              new TextBox<ValidValue, InvalidValue, Validation>({
                ...initializationProperties,
                rootElement
              })
        );
  }


  /* ━━━ Public Methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── Interface Implementation ─────────────────────────────────────────────────────────────────────────────────── */
  public highlightInvalidInput(): this {
    this.$mustHighlightInvalidInputIfAnyValidationErrorsMessages = true;
    return this;
  }

  public focus(): this {
    this.nativeInputAcceptingElement.focus();
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
        this.validityHighlightingActivationMode === TextBox.ValidityHighlightingActivationModes.immediate;
  }


  /* ─── Other ────────────────────────────────────────────────────────────────────────────────────────────────────── */
  public unmountAndUtilize(): void {
    this.rootElement.remove();
    this.inputEventListener.utilize();
    this.focusOutEventListener.utilize();
  }


  /* ━━━ Constructor ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  protected constructor(
    initializationProperties:
        Omit<
          TextBox.InitializationProperties<ValidValue, InvalidValue, Validation>,
          keyof TextBox.InitializationProperties.RootElementDefinition
        > &
        Readonly<{ rootElement: Element; }>
  ) {

    this.shellComponent = CompoundControlShell.pickOne({
      rootElement: initializationProperties.rootElement,
      mustDisplayErrorsMessagesIfAny:
          initializationProperties.validityHighlightingActivationMode ===
              TextBox.ValidityHighlightingActivationModes.immediate
    });

    const nativeInputAcceptingElement: Element = getExpectedToBeSingleDOM_Element({
      selector: TextBox.NATIVE_INPUT_ACCEPTING_ELEMENT_SELECTOR,
      contextElement: this.shellComponent.rootElement
    });

    if (nativeInputAcceptingElement instanceof HTMLInputElement || nativeInputAcceptingElement instanceof HTMLTextAreaElement) {

      this.nativeInputAcceptingElement = nativeInputAcceptingElement;

    } else {

      Logger.logError({
        errorType: UnexpectedEventError.NAME,
        title: UnexpectedEventError.localization.defaultTitle,
        description: PoliteErrorsMessagesBuilder.buildMessage({
          technicalDetails:
              `The element corresponding to selector "${ TextBox.NATIVE_INPUT_ACCEPTING_ELEMENT_SELECTOR }" ` +
                "must be the instance either of \"HTMLInputElement\" or \"HTMLTextAreaElement\" while actually none of them.",
          politeExplanation:
              "When trying to pick the native \"input\" or \"textarea\" element, we did expected that it will " +
                "be the instance of \"HTMLInputElement\"/\"HTMLTextAreaElement\" respectively and during test is was such as. " +
              "This bug means that we has missed some combination of circumstances so we must to investigate it.",
          bugTrackerURI: YDF_BUG_REPORTING_PAGE_URI
        }),
        occurrenceLocation: "TextBox.constructor(initializationProperties)"
      });

      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
      * For the valid TypeScript, ever `nativeInputAcceptingElement` must be initialized, or error must be thrown.
      * The second scenario makes this class completely unable to use. */
      this.nativeInputAcceptingElement = nativeInputAcceptingElement as HTMLInputElement;

    }

    this.rawInputTypeTransformer = "rawInputTypeTransformer" in initializationProperties ?

        /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
        * Possibly the TypeScript bug. It caused by omitting of keys of `RootElementDefinition` from
        *   `InitializationProperties`, but from the viewpoint of logic this operation does not touch the
        *   ``rawInputTypeTransformer` property.
        * */
        initializationProperties.rawInputTypeTransformer as (rawInput: string) => ValidValue | InvalidValue :

        /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
        * Maybe it is impossible to specify for `TextBox` class that when there is no `rawInputTypeTransformer`,
        *   both `ValidaValue` and `InvalidValue` are strings.
        * If to make `rawInputTypeTransformer` required on `initializationProperties`, no type assertion will require anymore,
        *   but it will be troublesome from the library users to specify it explicitly each time even for string
        *   payload value. */
        ((rawValue: string): string => rawValue) as (rawInput: string) => ValidValue | InvalidValue;


    let payloadInitialValue: ValidValue | InvalidValue;

    if (isNotUndefined(initializationProperties.overridingPreInputtedInitialValue)) {

      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
       * For the `TextBox.InitializationProperties.StringPayloadValue`, the both `ValidValue` and `InvalidValue` are strings,
       *    but maybe it is impossible to specify this relationship for the TypeScript. */
      payloadInitialValue = initializationProperties.overridingPreInputtedInitialValue as ValidValue | InvalidValue;

      if (isString(payloadInitialValue)) {
        this.nativeInputAcceptingElement.value = payloadInitialValue;
      } else if (isNumber(payloadInitialValue)) {
        this.nativeInputAcceptingElement.value = payloadInitialValue.toString();
      } else {
        this.nativeInputAcceptingElement.value = "";
      }

    } else {

      payloadInitialValue = this.rawInputTypeTransformer(this.nativeInputAcceptingElement.value);

    }

    this.payload = new ValidatableControl.Payload<ValidValue, InvalidValue, Validation>({
      initialValue: payloadInitialValue,
      getComponentInstance: (): ValidatableControl => this,
      validation: initializationProperties.validation,
      onHasBecomeValidEventHandler: {
        handler: this.onPayloadHasBecomeValidEventHandler.bind(this),
        ID: TextBox.generateOnPayloadHasBecomeValidEventHandlerID(this.INSTANCE_ID)
      },
      onHasBecomeInvalidEventHandler: {
        handler: this.onPayloadHasBecomeInvalidEventHandler.bind(this),
        ID: TextBox.generateOnPayloadHasBecomeInvalidEventHandlerID(this.INSTANCE_ID)
      },
      onAsynchronousValidationStatusChangedEventHandler: {
        handler: this.onPayloadAsynchronousValidationStatusChangedEventHandler.bind(this),
        ID: TextBox.generateOnAsynchronousValidationStatusChangedEventHandlerID(this.INSTANCE_ID)
      }
    });

    this.validityHighlightingActivationMode = initializationProperties.validityHighlightingActivationMode;
    this.shellComponent.$validationErrorsMessages = this.payload.validationErrorsMessages;

    /* eslint-disable no-underscore-dangle -- [ CONVENTION ]
     * The instance fields begins from the underscore MUST be changed only via setters. */
    this._mustHighlightInvalidInputIfAnyValidationErrorsMessages =
        this.validityHighlightingActivationMode === TextBox.ValidityHighlightingActivationModes.immediate;
    /* eslint-enable no-underscore-dangle */

    this.inputEventListener = new InputEventListener({
      targetElement: this.nativeInputAcceptingElement,
      handler: this.onInput.bind(this)
    });

    this.focusOutEventListener = new FocusOutEventListener({
      targetElement: this.nativeInputAcceptingElement,
      handler: this.onFocusOut.bind(this)
    });

    if (isNotUndefined(initializationProperties.onFocusLostEventHandler)) {
      this.onFocusOutExternalEventHandler = initializationProperties.onFocusLostEventHandler;
    }

    this.initializeHTML_AttributesOfNativeInputAcceptingElement(initializationProperties.invalidInputPrevention);

  }


  /* ━━━ Public Accessors / Mutators ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public get $isReadonly(): boolean {
    return this.nativeInputAcceptingElement.readOnly;
  }

  public set $isReadonly(value: boolean) {
    if (this.nativeInputAcceptingElement.readOnly !== value) {
      this.nativeInputAcceptingElement.readOnly = value;
    }
  }

  public get $isDisabled(): boolean {
    return this.nativeInputAcceptingElement.disabled;
  }

  public set $isDisabled(value: boolean) {
    if (this.nativeInputAcceptingElement.disabled !== value) {
      this.nativeInputAcceptingElement.disabled = value;
    }
  }


  /* ━━━ Events Handling ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  protected onPayloadHasBecomeValidEventHandler(): void {
    this.shellComponent.rootElement.classList.remove(TextBox.INVALID_VALUE_STATE_CSS_CLASS);
    this.nativeInputAcceptingElement.removeAttribute("aria-invalid");
  }

  protected onPayloadHasBecomeInvalidEventHandler(): void {

    if (this.$mustHighlightInvalidInputIfAnyValidationErrorsMessages) {
      this.shellComponent.rootElement.classList.add(TextBox.INVALID_VALUE_STATE_CSS_CLASS);
    }

    this.nativeInputAcceptingElement.setAttribute("aria-invalid", "");

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

  protected onInput(): void {

    this.payload.$setValue({
      newValue: this.rawInputTypeTransformer(this.nativeInputAcceptingElement.value),
      asynchronousValidationDelay__seconds: 1
    });

    this.shellComponent.$validationErrorsMessages = this.payload.validationErrorsMessages;

    if (
      !this.$mustHighlightInvalidInputIfAnyValidationErrorsMessages &&
      this.validityHighlightingActivationMode === TextBox.ValidityHighlightingActivationModes.onFirstInputtedCharacter
    ) {
      this.$mustHighlightInvalidInputIfAnyValidationErrorsMessages = true;
    }

  }

  protected onFocusOut(): void {
    this.$mustHighlightInvalidInputIfAnyValidationErrorsMessages = true;
    this.onFocusOutExternalEventHandler?.();
  }


  /* ━━━ Initialization ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  protected initializeHTML_AttributesOfNativeInputAcceptingElement(
    invalidInputPrevention?: TextBox.InitializationProperties.InvalidInputPrevention
  ): void {

    if (this.payload.validation.isInputRequired()) {
      this.nativeInputAcceptingElement.setAttribute("required", "");
    } else {
      this.nativeInputAcceptingElement.removeAttribute("required");
    }


    if (isNaturalNumberOrZero(invalidInputPrevention?.minimalCharactersCount)) {
      this.nativeInputAcceptingElement.setAttribute(
        "minlength", String(invalidInputPrevention.minimalCharactersCount)
      );
    }

    if (isNaturalNumberOrZero(invalidInputPrevention?.maximalCharactersCount)) {
      this.nativeInputAcceptingElement.setAttribute(
        "maxlength", String(invalidInputPrevention.maximalCharactersCount)
      );
    }

    if (isNaturalNumberOrZero(invalidInputPrevention?.minimalNumericValue)) {
      this.nativeInputAcceptingElement.setAttribute(
        "min", String(invalidInputPrevention.minimalNumericValue)
      );
    }

    if (isNaturalNumberOrZero(invalidInputPrevention?.maximalNumericValue)) {
      this.nativeInputAcceptingElement.setAttribute(
        "max", String(invalidInputPrevention.maximalNumericValue)
      );
    }

  }


  /* ━━━ Routines ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── IDs generating ───────────────────────────────────────────────────────────────────────────────────────────── */
  protected static counterForSelfID_Generating: number = 0;

  protected static generateInstanceID(): string {
    TextBox.counterForSelfID_Generating++;
    return `TEXT_BOX--YDF-${ TextBox.counterForSelfID_Generating }`;
  }


  protected static counterForOnPayloadHasBecomeValidEventHandlerID_Generating: number = 0;

  protected static generateOnPayloadHasBecomeValidEventHandlerID(componentID: string): string {
    TextBox.counterForOnPayloadHasBecomeValidEventHandlerID_Generating++;
    return `${ componentID }-ON_PAYLOAD_HAS_BECOME_VALID_EVENT_HANDLER-` +
        `${ TextBox.counterForOnPayloadHasBecomeValidEventHandlerID_Generating }`;
  }


  protected static counterForOnPayloadHasBecomeInvalidEventHandlerID_Generating: number = 0;

  protected static generateOnPayloadHasBecomeInvalidEventHandlerID(componentID: string): string {
    TextBox.counterForOnPayloadHasBecomeInvalidEventHandlerID_Generating++;
    return `${ componentID }-ON_PAYLOAD_HAS_BECOME_INVALID_EVENT_HANDLER-` +
        `${ TextBox.counterForOnPayloadHasBecomeInvalidEventHandlerID_Generating }`;
  }


  protected static counterForOnAsynchronousValidationStatusChangedEventHandlerIDsGenerating: number = 0;

  protected static generateOnAsynchronousValidationStatusChangedEventHandlerID(componentID: string): string {
    TextBox.counterForOnAsynchronousValidationStatusChangedEventHandlerIDsGenerating++;
    return `${ componentID }-ON_ASYNCHRONOUS_VALIDATION_STATUS_CHANGED_EVENT_HANDLER-` +
        `${ TextBox.counterForOnAsynchronousValidationStatusChangedEventHandlerIDsGenerating }`;
  }

}


namespace TextBox {

  export type SupportedValidatablePayloadValuesTypes = number | string | null;

  export type InitializationProperties<
    ValidValue extends SupportedValidatablePayloadValuesTypes,
    InvalidValue extends SupportedValidatablePayloadValuesTypes,
    Validation extends InputtedValueValidation
  > =
      InitializationProperties.StringPayloadValue<Validation> |
      InitializationProperties.CustomPayloadValue<ValidValue, InvalidValue, Validation>;


  export namespace InitializationProperties {

    export type Common<Validation extends InputtedValueValidation> =
        RootElementDefinition &
        Readonly<{
          invalidInputPrevention?: InvalidInputPrevention;
          validation: Validation;
          validityHighlightingActivationMode: ValidityHighlightingActivationModes;
          onFocusLostEventHandler?: () => void;
        }>;

    export type RootElementDefinition = Readonly<
      {
        rootElement: Readonly<{ selector: string; }>;
        contextElement?: ParentNode | Readonly<{ selector: string; }>;
      } |
      {
        rootElement: Element;
        contextElement?: never;
      }
    >;

    export type StringPayloadValue<Validation extends InputtedValueValidation> =
        Common<Validation> &
        Readonly<{
          overridingPreInputtedInitialValue?: string;
        }>;

    export type CustomPayloadValue<
      ValidValue extends SupportedValidatablePayloadValuesTypes,
      InvalidValue extends SupportedValidatablePayloadValuesTypes,
      Validation extends InputtedValueValidation
    > =
        Common<Validation> &
        Readonly<{
          rawInputTypeTransformer: (rawInput: string) => ValidValue | InvalidValue;
          overridingPreInputtedInitialValue?: ValidValue | InvalidValue;
        }>;

    export type InvalidInputPrevention = Readonly<{
      minimalCharactersCount?: number;
      maximalCharactersCount?: number;
      minimalNumericValue?: number;
      maximalNumericValue?: number;
    }>;

  }

  export enum ValidityHighlightingActivationModes {
    immediate = "IMMEDIATE",
    onFirstInputtedCharacter = "ON_FIRST_INPUTTED_CHARACTER",
    onFocusOut = "ON_FOCUS_OUT"
  }

  export namespace RawInputModifiers {

    export function keepStringValueAsIs(rawValue: string): string { return rawValue; }


    export function convertToNumberHerewithEmptyStringToZero(rawValue: string): number {

      if (rawValue === "") {
        return 0;
      }


      const numericValue: number = Number(rawValue);

      return isNaN(numericValue) ? 0 : numericValue;

    }

    export function convertToIntegerHerewithEmptyStringToNull(rawValue: string): number | null {

      if (rawValue === "") {
        return null;
      }


      const numericValue: number = Number(rawValue);

      return Number.isInteger(numericValue) ? numericValue : null;

    }

  }

}


export default TextBox;
