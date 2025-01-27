import componentDynamicPartsHTML from "./DateTimePicker.parts.pug";

import type InputtedValueValidation from "../_Validation/InputtedValueValidation";
import ValidatableControl from "../_Validation/ValidatableControl";
import CompoundControlShell from "../CompoundControlShell/CompoundControlShell";

/* ─── Utils ──────────────────────────────────────────────────────────────────────────────────────────────────────── */
import { type DateWithoutTime, isNotNull } from "@yamato-daiwa/es-extensions";
import {
  createDOM_ElementFromHTML_Code,
  getExpectedToBeSingleDOM_Element,
  LeftClickEventListener,
  cloneDOM_Element
} from "@yamato-daiwa/es-extensions-browserjs";


class DateTimePicker<
  ValidValue extends DateTimePicker.SupportedValidatablePayloadValuesTypes,
  InvalidValue extends DateTimePicker.SupportedValidatablePayloadValuesTypes,
  Validation extends InputtedValueValidation
> implements ValidatableControl {

  /* ━━━ Static Fields ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── Accessing to DOM ─────────────────────────────────────────────────────────────────────────────────────────── */
  protected static readonly INVALID_VALUE_STATE_CSS_CLASS: string = "DateTimePicker--YDF__InvalidValueState";

  protected static readonly NATIVE_INPUT_ELEMENT_SELECTOR: string = ".DateTimePicker--YDF-NativeInputElement";
  protected static readonly INDICATOR_BUTTON_SELECTOR: string = ".DateTimePicker--YDF-IndicatorButton";
  protected static readonly INDICATOR_BUTTON_LABEL_SELECTOR: string = ".DateTimePicker--YDF-IndicatorButton-Label";

  protected static readonly DIALOG_MOUNTING_POINT_SELECTOR: string = ".DateTimePicker--YDF-DialogMountingPoint";


  /* --- Initialization on Demand ----------------------------------------------------------------------------------- */
  protected static dialog: Element | null = null;


  /* ━━━ Instance Fields ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public readonly payload: ValidatableControl.Payload<ValidValue, InvalidValue, Validation>;

  protected dialog: Element;

  protected mustDisplayErrorsMessagesImmideatlyIfAny: boolean = false;


  /* ─── DOM ──────────────────────────────────────────────────────────────────────────────────────────────────────── */
  protected readonly shellComponent: CompoundControlShell;
  protected readonly nativeInputElement: HTMLInputElement;
  protected readonly indicatorButton: HTMLButtonElement;
  protected readonly indicatorButtonLabelElement: Element;
  protected readonly validationErrorsMessagesCollapsableListMountingPoint: Element;


  /* ─── Events ───────────────────────────────────────────────────────────────────────────────────────────────────── */
  protected readonly onIndicatorButtonClickedEventListener: LeftClickEventListener;


  /* ━━━ Reactivity ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── Validation Error Messages Highlighting ───────────────────────────────────────────────────────────────────── */
  /* eslint-disable no-underscore-dangle -- [ CONVENTION ]
   * The instance fields begins from the underscore MUST be changed only via setters or constructor. */
  protected _mustHighlightInvalidInputIfAnyValidationErrorsMessages: boolean = false;

  protected get $mustHighlightInvalidInputIfAnyValidationErrorsMessages(): boolean {
    return this._mustHighlightInvalidInputIfAnyValidationErrorsMessages;
  }

  protected set $mustHighlightInvalidInputIfAnyValidationErrorsMessages(value: boolean) {

    if (value === this._mustHighlightInvalidInputIfAnyValidationErrorsMessages) {
      return;
    }


    this._mustHighlightInvalidInputIfAnyValidationErrorsMessages = value;

    if (this._mustHighlightInvalidInputIfAnyValidationErrorsMessages) {

      this.shellComponent.$mustDisplayErrorsMessagesIfAny = true;

      if (this.payload.isInvalid) {
        this.shellComponent.rootElement.classList.add(DateTimePicker.INVALID_VALUE_STATE_CSS_CLASS);
      }

      return;

    }


    this.shellComponent.rootElement.classList.remove(DateTimePicker.INVALID_VALUE_STATE_CSS_CLASS);
    this.shellComponent.$mustDisplayErrorsMessagesIfAny = false;

  }


  /* ─── Indicator Button ─────────────────────────────────────────────────────────────────────────────────────────── */
  protected set $indicatorButtonLabel(value: string) {
    this.indicatorButtonLabelElement.textContent = value;
  }


  /* ─── Not sorted yet ───────────────────────────────────────────────────────────────────────────────────────────── */
  protected _isDialogDisplaying: boolean = false;

  protected get $isDialogDisplaying(): boolean {
    return this._isDialogDisplaying;
  }

  protected set $isDialogDisplaying(value: boolean) {

    if (value === this._isDialogDisplaying) {
      return;
    }


    this._isDialogDisplaying = value;

    if (this._isDialogDisplaying) {
      this.validationErrorsMessagesCollapsableListMountingPoint.replaceWith(this.dialog);
    }

  }
  /* eslint-enable no-underscore-dangle */


  /* ━━━ Public Static Methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public static initializeOne<
    ValidValue extends DateTimePicker.SupportedValidatablePayloadValuesTypes,
    InvalidValue extends DateTimePicker.SupportedValidatablePayloadValuesTypes,
    Validation extends InputtedValueValidation
  >(
    properties: DateTimePicker.InitializationProperties<ValidValue, InvalidValue, Validation>
  ): DateTimePicker<ValidValue, InvalidValue, Validation> {
    return new DateTimePicker<ValidValue, InvalidValue, Validation>(properties);
  }


  /* ━━━ Constructor ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  protected constructor(
    {
      rootElement,
      contextElement,
      nativeInputElementValueToValidatableValuePayloadTransformer,
      validation,
      displayingValueFormatter
    }: DateTimePicker.InitializationProperties<ValidValue, InvalidValue, Validation>
  ) {

    this.shellComponent = CompoundControlShell.initializeOne({
      rootElement,
      contextElement,
      mustDisplayErrorsMessagesIfAny: this.mustDisplayErrorsMessagesImmideatlyIfAny
    });

    this.nativeInputElement = getExpectedToBeSingleDOM_Element({
      selector: DateTimePicker.NATIVE_INPUT_ELEMENT_SELECTOR,
      contextElement: this.shellComponent.rootElement,
      expectedDOM_ElementSubtype: HTMLInputElement
    });

    this.payload = new ValidatableControl.Payload<ValidValue, InvalidValue, Validation>({
      initialValue: nativeInputElementValueToValidatableValuePayloadTransformer(this.nativeInputElement.value),
      getComponentInstance: (): ValidatableControl => this,
      validation
    });

    this.indicatorButton = getExpectedToBeSingleDOM_Element({
      selector: DateTimePicker.INDICATOR_BUTTON_SELECTOR,
      contextElement: this.shellComponent.rootElement,
      expectedDOM_ElementSubtype: HTMLButtonElement
    });

    this.onIndicatorButtonClickedEventListener = new LeftClickEventListener({
      targetElement: this.indicatorButton,
      handler: this.onClickIndicatorButton.bind(this)
    });

    this.indicatorButtonLabelElement = getExpectedToBeSingleDOM_Element({
      selector: DateTimePicker.INDICATOR_BUTTON_LABEL_SELECTOR,
      contextElement: this.shellComponent.rootElement
    });

    this.$indicatorButtonLabel = displayingValueFormatter(this.payload.value);

    this.validationErrorsMessagesCollapsableListMountingPoint = getExpectedToBeSingleDOM_Element({
      selector: DateTimePicker.DIALOG_MOUNTING_POINT_SELECTOR,
      contextElement: this.shellComponent.rootElement
    });

    this.dialog = cloneDOM_Element({
      targetElement: DateTimePicker.prepareDialogAndItsParts(),
      mustCopyAllChildren: true
    });

  }


  /* ━━━ Interface Implementation ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public highlightInvalidInput(): this {
    this.$mustHighlightInvalidInputIfAnyValidationErrorsMessages = true;
    return this;
  }

  public focus(): this {
    this.indicatorButton.focus();
    return this;
  }

  public getRootElementOffsetCoordinates(): ValidatableControl.RootElementOffsetCoordinates {
    return {
      top: this.shellComponent.rootElement.offsetTop,
      left: this.shellComponent.rootElement.offsetLeft
    };
  }

  public resetValidityHighlightingStateToInitial(): void {
    this.$mustHighlightInvalidInputIfAnyValidationErrorsMessages = this.mustDisplayErrorsMessagesImmideatlyIfAny;
  }


  /* ━━━ Events Handling ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  private onClickIndicatorButton(): void {
    this.$isDialogDisplaying = true;
  }


  /* ━━━ Initialization on Demand ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  protected static prepareDialogAndItsParts(): Element {

    if (isNotNull(DateTimePicker.dialog)) {
      return DateTimePicker.dialog;
    }


    DateTimePicker.dialog = createDOM_ElementFromHTML_Code(componentDynamicPartsHTML);

    return DateTimePicker.dialog;

  }

}


namespace DateTimePicker {

  export type SupportedValidatablePayloadValuesTypes = DateWithoutTime | null;

  export type InitializationProperties<
    ValidValue extends SupportedValidatablePayloadValuesTypes,
    InvalidValue extends SupportedValidatablePayloadValuesTypes,
    Validation extends InputtedValueValidation
  > = Readonly<
    (
      {
        rootElement: Readonly<{ selector: string; }>;
        contextElement?: ParentNode | Readonly<{ selector: string; }>;
      } |
      {
        rootElement: Element;
        contextElement?: never;
      }
    ) &
    {
      validation: Validation;
      nativeInputElementValueToValidatableValuePayloadTransformer: (value: string) => ValidValue | InvalidValue;
      displayingValueFormatter: (value: ValidValue | InvalidValue) => string;
    }>;

  export enum Matrices {
    days = "DAYS",
    months = "MONTHS",
    years = "YEARS",
    hours = "HOURS",
    minutes = "MINUTES"
  }

}


export default DateTimePicker;
