/* --- Validation --------------------------------------------------------------------------------------------------- */
import ValidatableControl from "../_Validation/ValidatableControl";
import type InputtedValueValidation from "../_Validation/InputtedValueValidation";

/* --- Children components ------------------------------------------------------------------------------------------ */
import CompoundControlShell from "../CompoundControlShell/CompoundControlShell";

/* --- Utils -------------------------------------------------------------------------------------------------------- */
import { encodeFileToBase64, isNotNull, isNotUndefined, isNull, Logger } from "@yamato-daiwa/es-extensions";
import { getExpectedToBeSingleDOM_Element, addLeftClickEventHandler } from "@yamato-daiwa/es-extensions-browserjs";


class FilesUploader<
  ValidValue extends FilesUploader.SupportedValidatablePayloadValuesTypes,
  InvalidValue extends FilesUploader.SupportedValidatablePayloadValuesTypes,
  Validation extends InputtedValueValidation
> implements ValidatableControl {

  protected static readonly NATIVE_INPUT_ELEMENT_SELECTOR: string = ".FilesUploader--YDF-HiddenInputElement";
  protected static readonly FILES_PICKING_BUTTON_ELEMENT_SELECTOR: string = ".FilesUploader--YDF-FilePickingButton";
  protected static readonly DRAG_AND_DROP_AREA_ELEMENT_SELECTOR: string = ".FilesUploader--YDF-DragAndDropArea";

  protected static readonly INVALID_VALUE_STATE_CSS_CLASS: string = ".FilesUploader--YDF-FilesUploader__InvalidValueState";

  public readonly payload: ValidatableControl.Payload<ValidValue, InvalidValue, Validation>;

  protected invalidInputHighlightingIfAnyValidationErrorsMessages: boolean = false;

  protected readonly shellComponent: CompoundControlShell;

  protected readonly nativeInputElement: HTMLInputElement;
  protected readonly filesPickingButtonElement: HTMLInputElement | null;
  protected readonly dragAndDropAreaElement: HTMLInputElement | null;


  /* === Public static methods ====================================================================================== */
  public static pickOneBySelector<Validation extends InputtedValueValidation>(
    properties: FilesUploader.InitializationProperties.SingleRequiredFileCase<Validation>
  ): FilesUploader<string, string | null, Validation>;

  public static pickOneBySelector<Validation extends InputtedValueValidation>(
    properties: FilesUploader.InitializationProperties.SingleOptionalFileCase<Validation>
  ): FilesUploader<string | null, string | null, Validation>;

  public static pickOneBySelector<Validation extends InputtedValueValidation>(
    properties: FilesUploader.InitializationProperties.MultipleFilesCase<Validation>
  ): FilesUploader<Array<string>, Array<string>, Validation>;

  public static pickOneBySelector<
    ValidValue extends FilesUploader.SupportedValidatablePayloadValuesTypes,
    InvalidValue extends FilesUploader.SupportedValidatablePayloadValuesTypes,
    Validation extends InputtedValueValidation
  >(
    properties: FilesUploader.InitializationProperties<Validation>
  ): FilesUploader<ValidValue, InvalidValue, Validation> {
    return new FilesUploader<ValidValue, InvalidValue, Validation>(properties).
        initializeNativeInputElement().
        initializeFilesPickingButtonIfItPresents();
  }


  /* === Constructor ================================================================================================ */
  protected constructor(properties: FilesUploader.InitializationProperties<Validation>) {

    let contextElement: Element | undefined;

    if (isNotUndefined(properties.contextElement)) {
      contextElement = properties.contextElement;
    } else if (isNotUndefined(properties.contextElementSelector)) {
      contextElement = document.querySelectorAll(properties.contextElementSelector)[0];
    }


    this.shellComponent = CompoundControlShell.pickOneBySelector({
      ...isNotUndefined(contextElement) ? { contextElement } : null,
      targetCompoundControlShellSelector: properties.selector,
      mustDisplayErrorsMessagesIfAny: this.invalidInputHighlightingIfAnyValidationErrorsMessages
    });

    this.nativeInputElement = getExpectedToBeSingleDOM_Element({
      selector: FilesUploader.NATIVE_INPUT_ELEMENT_SELECTOR,
      context: this.shellComponent.rootElement,
      expectedDOM_ElementSubtype: HTMLInputElement
    });

    this.filesPickingButtonElement = document.querySelector(FilesUploader.FILES_PICKING_BUTTON_ELEMENT_SELECTOR);
    this.dragAndDropAreaElement = document.querySelector(FilesUploader.DRAG_AND_DROP_AREA_ELEMENT_SELECTOR);

    let payloadInitialValue: ValidValue | InvalidValue;


    if ("maximalFilesCount" in properties) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore 時間的に
      payloadInitialValue = null;
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore 時間的に
      payloadInitialValue = [];
    }

    this.payload = new ValidatableControl.Payload<ValidValue, InvalidValue, Validation>({
      initialValue: payloadInitialValue,
      getComponentInstance: (): ValidatableControl => this,
      validation: properties.validation
    });

  }


  /* === Interface implementation =================================================================================== */
  public highlightInvalidInput(): this {

    this.invalidInputHighlightingIfAnyValidationErrorsMessages = true;

    if (this.payload.isInvalid) {
      this.shellComponent.rootElement.classList.add(FilesUploader.INVALID_VALUE_STATE_CSS_CLASS);
    }

    this.shellComponent.$mustDisplayErrorsMessagesIfAny = true;

    return this;

  }

  public focus(): this {

    if (isNotNull(this.filesPickingButtonElement)) {
      this.filesPickingButtonElement.focus();
    } else if (isNotNull(this.dragAndDropAreaElement)) {
      this.dragAndDropAreaElement.focus();
    }

    return this;

  }

  public getRootElementOffsetCoordinates(): ValidatableControl.RootElementOffsetCoordinates {
    return {
      top: this.shellComponent.rootElement.offsetTop,
      left: this.shellComponent.rootElement.offsetLeft
    };
  }

  // eslint-disable-next-line class-methods-use-this
  public resetStateToInitial(): void {
    // eslint-disable-next-line no-warning-comments
    // TODO
  }


  /* === Protected methods ========================================================================================== */
  /* --- Initializing ----------------------------------------------------------------------------------------------- */
  protected initializeFilesPickingButtonIfItPresents(): this {

    if (isNull(this.filesPickingButtonElement)) {
      return this;
    }


    addLeftClickEventHandler({
      targetElement: this.filesPickingButtonElement,
      handler: this.onClickPickFilesButton.bind(this)
    });

    return this;

  }

  protected initializeNativeInputElement(): this {

    this.nativeInputElement.addEventListener("change", (event: Event): void => {

      // eslint-disable-next-line no-inline-comments
      if (!(event.target instanceof HTMLInputElement)) { /* Empty */ }

    });

    return this;

  }


  /* --- Actions handling ------------------------------------------------------------------------------------------- */
  protected onClickPickFilesButton(): void {
    this.nativeInputElement.click();
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
    this.payload.value = Array.from(newBase64EncodedFiles);

  }


}


namespace FilesUploader {

  export type SupportedValidatablePayloadValuesTypes = string | Array<string> | null;

  export type InitializationProperties<Validation extends InputtedValueValidation> =
      InitializationProperties.SingleRequiredFileCase<Validation> |
      InitializationProperties.SingleOptionalFileCase<Validation> |
      InitializationProperties.MultipleFilesCase<Validation>;

  export namespace InitializationProperties {

    export type Common<Validation extends InputtedValueValidation> = Readonly<
      {
        selector: string;
        validation: Validation;
        mustHighlightInvalidInputIfAnyValidationErrorsMessagesImmediately: boolean;
      } & (
        {
          contextElement: Element;
          contextElementSelector?: undefined;
        } |
        {
          contextElement?: undefined;
          contextElementSelector: string;
        } |
        {
          contextElement?: undefined;
          contextElementSelector?: undefined;
        }
      )
    >;

    export type SingleRequiredFileCase<Validation extends InputtedValueValidation> =
        Common<Validation> &
        Readonly<{
          required: true;
          maximalFilesCount: 1;
        }>;

    export type SingleOptionalFileCase<Validation extends InputtedValueValidation> =
        Common<Validation> &
        Readonly<{
          required: false;
          maximalFilesCount: 1;
        }>;

    export type MultipleFilesCase<Validation extends InputtedValueValidation> = Common<Validation>;

  }

}


export default FilesUploader;
