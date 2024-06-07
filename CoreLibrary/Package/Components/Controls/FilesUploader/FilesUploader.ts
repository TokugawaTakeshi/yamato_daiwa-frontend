/* eslint-disable @typescript-eslint/member-ordering --
 * The members of this class has been organized semantically. */

/* ─── Validation ─────────────────────────────────────────────────────────────────────────────────────────────────── */
import ValidatableControl from "../_Validation/ValidatableControl";
import type InputtedValueValidation from "../_Validation/InputtedValueValidation";

/* ─── Children components ────────────────────────────────────────────────────────────────────────────────────────── */
import CompoundControlShell from "../CompoundControlShell/CompoundControlShell";

/* ─── Utils ──────────────────────────────────────────────────────────────────────────────────────────────────────── */
import { encodeFileToBase64, Logger, InvalidParameterValueError, isNotNull } from "@yamato-daiwa/es-extensions";
import { getExpectedToBeSingleDOM_Element, addLeftClickEventHandler } from "@yamato-daiwa/es-extensions-browserjs";


class FilesUploader<
  ValidValue extends FilesUploader.SupportedValidatablePayloadValuesTypes,
  InvalidValue extends FilesUploader.SupportedValidatablePayloadValuesTypes,
  Validation extends InputtedValueValidation
> implements ValidatableControl {

  /* ━━━ Static Fields ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── Accessing to DOM ─────────────────────────────────────────────────────────────────────────────────────────── */
  protected static readonly NATIVE_INPUT_ELEMENT_SELECTOR: string = ".FilesUploader--YDF-HiddenInputElement";
  protected static readonly FILES_PICKING_BUTTON_ELEMENT_SELECTOR: string = ".FilesUploader--YDF-FilePickingButton";
  protected static readonly DRAG_AND_DROP_AREA_ELEMENT_SELECTOR: string = ".FilesUploader--YDF-DragAndDropArea";

  protected static readonly INVALID_VALUE_STATE_CSS_CLASS: string = ".FilesUploader--YDF-FilesUploader__InvalidValueState";


  /* ━━━ Instance Fields ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public readonly payload: ValidatableControl.Payload<ValidValue, InvalidValue, Validation>;

  protected mustDisplayErrorsMessagesImmideatlyIfAny: boolean = false;


  /* ─── DOM ──────────────────────────────────────────────────────────────────────────────────────────────────────── */
  protected readonly shellComponent: CompoundControlShell;
  protected readonly nativeInputElement: HTMLInputElement;
  protected readonly filesPickingButtonElement: HTMLInputElement | null;
  protected readonly dragAndDropAreaElement: HTMLInputElement | null;


  /* ─── Reactivity ───────────────────────────────────────────────────────────────────────────────────────────────── */
  /* eslint-disable no-underscore-dangle -- [ CONVENTION ]
   * The instance fields begins from the underscore MUST be changed only via setters or constructor. */
  protected _mustHighlightInvalidInputIfAnyValidationErrorsMessages: boolean = false;
  protected _isUserDraggingFileNow: boolean = false;

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
        this.shellComponent.rootElement.classList.add(FilesUploader.INVALID_VALUE_STATE_CSS_CLASS);
      }

      return;

    }


    this.shellComponent.rootElement.classList.remove(FilesUploader.INVALID_VALUE_STATE_CSS_CLASS);
    this.shellComponent.$mustDisplayErrorsMessagesIfAny = false;

  }

  protected get $isUserDraggingNow(): boolean {
    return this._isUserDraggingFileNow;
  }

  protected set $isUserDraggingNow(value: boolean) {

    if (value === this._isUserDraggingFileNow) {
      return;
    }


    this._isUserDraggingFileNow = value;

  }


  /* ━━━ Public Static Methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public static pickOneBySelector<Validation extends InputtedValueValidation>(
    initializationProperties: FilesUploader.InitializationProperties.SingleRequiredFileScenario<Validation>
  ): FilesUploader<string, string | null, Validation>;

  public static pickOneBySelector<Validation extends InputtedValueValidation>(
    initializationProperties: FilesUploader.InitializationProperties.SingleOptionalFileScenario<Validation>
  ): FilesUploader<string | null, string | null, Validation>;

  public static pickOneBySelector<Validation extends InputtedValueValidation>(
    initializationProperties: FilesUploader.InitializationProperties.ArbitraryFilesCountScenario<Validation>
  ): FilesUploader<Array<string>, Array<string>, Validation>;

  public static pickOneBySelector<
    ValidValue extends FilesUploader.SupportedValidatablePayloadValuesTypes,
    InvalidValue extends FilesUploader.SupportedValidatablePayloadValuesTypes,
    Validation extends InputtedValueValidation
  >(
    properties: FilesUploader.InitializationProperties<Validation>
  ): FilesUploader<ValidValue, InvalidValue, Validation> {
    return new FilesUploader<ValidValue, InvalidValue, Validation>(properties);
  }


  /* ━━━ Interface Implementation ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public highlightInvalidInput(): this {
    this.$mustHighlightInvalidInputIfAnyValidationErrorsMessages = true;
    return this;
  }

  public focus(): this {
    (this.filesPickingButtonElement ?? this.dragAndDropAreaElement)?.focus();
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


  /* ━━━ Constructor ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  protected constructor(initializationProperties: FilesUploader.InitializationProperties<Validation>) {

    this.shellComponent = CompoundControlShell.pickOneBySelector({
      targetCompoundControlShellSelector: initializationProperties.selector,
      contextElement: initializationProperties.contextElement,
      mustDisplayErrorsMessagesIfAny: this.mustDisplayErrorsMessagesImmideatlyIfAny
    });

    this.nativeInputElement = getExpectedToBeSingleDOM_Element({
      selector: FilesUploader.NATIVE_INPUT_ELEMENT_SELECTOR,
      contextElement: this.shellComponent.rootElement,
      expectedDOM_ElementSubtype: HTMLInputElement
    });

    this.filesPickingButtonElement = this.shellComponent.rootElement.
        querySelector(FilesUploader.FILES_PICKING_BUTTON_ELEMENT_SELECTOR);

    if (isNotNull(this.filesPickingButtonElement)) {
      addLeftClickEventHandler({
        targetElement: this.filesPickingButtonElement,
        handler: this.onClickPickFilesButton.bind(this)
      });
    }


    this.dragAndDropAreaElement = this.shellComponent.rootElement.
        querySelector(FilesUploader.DRAG_AND_DROP_AREA_ELEMENT_SELECTOR);

    if (isNotNull(this.dragAndDropAreaElement)) {
      this.dragAndDropAreaElement.ondragover = this.onDraggingStarted.bind(this);
      this.dragAndDropAreaElement.ondragleave = this.onDraggingTerminated.bind(this);
    }


    let payloadInitialValue: FilesUploader.SupportedValidatablePayloadValuesTypes;

    switch (initializationProperties.scenario) {

      case FilesUploader.Scenarios.singleRequiredFile: {

        if (!initializationProperties.validation.isInputRequired()) {
          Logger.throwErrorAndLog({
            errorInstance: new InvalidParameterValueError({
              parameterNumber: 1,
              parameterName: "initializationProperties",
              messageSpecificPart:
                  "Contradictory initialization options. " +
                  "The \"singleRequiredFile\" scenario has been specified, while according to \"validation\", " +
                    "the input is optional."
            }),
            title: InvalidParameterValueError.localization.defaultTitle,
            occurrenceLocation: "FilesUploader.pickOneBySelector(initializationProperties)"
          });
        }

        payloadInitialValue = initializationProperties.initialFileURI ?? null;

        break;

      }

      case FilesUploader.Scenarios.singleOptionalFile: {

        if (initializationProperties.validation.isInputRequired()) {
          Logger.throwErrorAndLog({
            errorInstance: new InvalidParameterValueError({
              parameterNumber: 1,
              parameterName: "properties",
              messageSpecificPart:
                  "Contradictory initialization options. " +
                  "The \"singleOptionalFile\" scenario has been specified, while according to \"validation\" the " +
                    "input is required."
            }),
            title: InvalidParameterValueError.localization.defaultTitle,
            occurrenceLocation: "FilesUploader.pickOneBySelector(initializationProperties)"
          });
        }

        payloadInitialValue = initializationProperties.initialFileURI ?? null;

        break;

      }

      case FilesUploader.Scenarios.arbitraryFilesCount: {
        payloadInitialValue = initializationProperties.initialFilesURIs ?? [];
      }

    }

    this.payload = new ValidatableControl.Payload<ValidValue, InvalidValue, Validation>({
      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
       * TypeScript complains that "Type null is not assignable to type ValidValue | InvalidValue" while both `ValidValue`
       *   and `InvalidValue` are constrained to polymorphic type `FilesUploader.SupportedValidatablePayloadValuesTypes`
       *   which could be `null`. */
      initialValue: payloadInitialValue as ValidValue | InvalidValue,
      getComponentInstance: (): ValidatableControl => this,
      validation: initializationProperties.validation
    });

  }


  /* ━━━ Protected Methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── Actions Handling ─────────────────────────────────────────────────────────────────────────────────────────── */
  protected onClickPickFilesButton(): void {
    this.nativeInputElement.click();
  }

  protected onDraggingStarted(dragEvent: DragEvent): void {
    dragEvent.preventDefault();
    this.$isUserDraggingNow = true;
  }

  protected onDraggingTerminated(): void {
    this.$isUserDraggingNow = false;
  }


  /* --- 未整理 ------------------------------------------------------------------------------------------------------- */
  protected async tempName1(newFiles: ReadonlyArray<File>): Promise<void> {

    // eslint-disable-next-line no-warning-comments
    // TODO 表示
    let newBase64EncodedFiles: Array<string>;

    try {

      newBase64EncodedFiles = await Promise.all(
        newFiles.map(async (file: File): Promise<string> => encodeFileToBase64(file))
      );

    } catch (error: unknown) {

      Logger.logError({
        errorType: "FileBase64EncodingError",
        title: "File base 64 encoding error",
        description: "The error occurred during the base64 file encoding.",
        occurrenceLocation: "FilesUploader.tempName1(newFiles)",
        caughtError: error
      });

      return;

    }


    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore 時間的に
    this.payload.$value = Array.from(newBase64EncodedFiles);

  }


}


namespace FilesUploader {

  export type SupportedValidatablePayloadValuesTypes = string | Array<string> | null;

  export enum Scenarios {
    singleRequiredFile = "SINGLE_REQUIRED_FILE",
    singleOptionalFile = "SINGLE_OPTIONAL_FILE",
    arbitraryFilesCount = "ARBITRARY_FILES_COUNT"
  }

  export type InitializationProperties<Validation extends InputtedValueValidation> =
      InitializationProperties.SingleRequiredFileScenario<Validation> |
      InitializationProperties.SingleOptionalFileScenario<Validation> |
      InitializationProperties.ArbitraryFilesCountScenario<Validation>;

  export namespace InitializationProperties {

    export type Common<Validation extends InputtedValueValidation> = Readonly<
      {
        selector: string;
        contextElement?: ParentNode | Readonly<{ selector: string; }>;
        validation: Validation;
        mustHighlightInvalidInputIfAnyValidationErrorsMessagesImmediately: boolean;
      }>;

    export type SingleRequiredFileScenario<Validation extends InputtedValueValidation> =
        Readonly<{
          initialFileURI?: string;
          scenario: Scenarios.singleRequiredFile;
        }> &
        Common<Validation>;

    export type SingleOptionalFileScenario<Validation extends InputtedValueValidation> =
        Readonly<{
          initialFileURI?: string;
          scenario: Scenarios.singleOptionalFile;
        }> &
        Common<Validation>;

    export type ArbitraryFilesCountScenario<Validation extends InputtedValueValidation> =
        Readonly<{
          initialFilesURIs?: Array<string>;
          scenario: Scenarios.arbitraryFilesCount;
        }> &
        Common<Validation>;

  }

}


export default FilesUploader;
