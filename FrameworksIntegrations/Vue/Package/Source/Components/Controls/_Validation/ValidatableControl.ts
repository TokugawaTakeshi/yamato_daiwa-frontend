/* eslint-disable @typescript-eslint/member-ordering -- The secondary members has been organized to the end of the class. */

import {
  Logger,
  UnexpectedEventError,
  isArbitraryObject,
  isUndefined,
  isFunctionLike
} from "@yamato-daiwa/es-extensions";
import type { ComponentPublicInstance as VueComponentPublicInstance } from "vue";
import type { InputtedValueValidation } from "@yamato-daiwa/frontend";


interface ValidatableControl {

  highlightInvalidInput: () => this;

  getRootElement: () => Element;

  focus: () => this;

  resetStateToInitial: () => void;

}


namespace ValidatableControl {

  export function isValidatableControl(potentialValidatableControl: unknown): potentialValidatableControl is ValidatableControl {
    return isArbitraryObject(potentialValidatableControl) &&
        isFunctionLike(potentialValidatableControl.highlightInvalidInput) &&
        isFunctionLike(potentialValidatableControl.getRootElement) &&
        isFunctionLike(potentialValidatableControl.focus) &&
        isFunctionLike(potentialValidatableControl.resetStateToInitial);
  }

  export function getValidatableControlInstanceByVueReferenceID(
    compoundParameter: Readonly<{
      parentVueComponentInstance: VueComponentPublicInstance;
      vueReferenceID: string;
    }>
  ): ValidatableControl | null;

  export function getValidatableControlInstanceByVueReferenceID(
    compoundParameter: Readonly<{
      parentVueComponentInstance: VueComponentPublicInstance;
      vueReferenceID: string;
      mustThrowErrorIsNotFoundOrNotValidatableControl: true;
    }>
  ): ValidatableControl;

  export function getValidatableControlInstanceByVueReferenceID(
    compoundParameter: Readonly<{
      parentVueComponentInstance: VueComponentPublicInstance;
      vueReferenceID: string;
      mustThrowErrorIsNotFoundOrNotValidatableControl?: true;
    }>
  ): ValidatableControl | null {

    const potentialValidatableControl: unknown = compoundParameter.parentVueComponentInstance.
        $refs[compoundParameter.vueReferenceID];

    if (isUndefined(potentialValidatableControl)) {
      return null;
    }


    if (!isValidatableControl(potentialValidatableControl)) {
      return null;
    }

    return potentialValidatableControl;

  }


  export class Payload<ValidValue, InvalidValue, Validation extends InputtedValueValidation> {

    public readonly VUE_REFERENCE_ID: string;

    public readonly value: ValidValue | InvalidValue;
    public readonly validation: Validation;
    public readonly isValidationPending: boolean;

    private readonly validationResult: InputtedValueValidation.Result;


    public static createInitialInstance<ValidValue, InvalidValue, Validation extends InputtedValueValidation>(
      compoundParameter: Readonly<{
        initialValue: ValidValue | InvalidValue;
        validation: Validation;
      }>
    ): Payload<ValidValue, InvalidValue, Validation> {
      return new Payload<ValidValue, InvalidValue, Validation>(compoundParameter);
    }


    private constructor(
      {
        initialValue,
        validation,
        vueReferenceID
      }: Readonly<{
        initialValue: ValidValue | InvalidValue;
        validation: Validation;
        vueReferenceID?: string;
      }>
    ) {

      this.value = initialValue;
      this.validation = validation;

      this.validationResult = validation.validate(this.value);
      this.isValidationPending = false;

      this.VUE_REFERENCE_ID = vueReferenceID ?? Payload.generateAssociatedComponentVueReferenceID();

    }


    public get validationErrorsMessages(): Array<string> {
      return this.validationResult.errorsMessages;
    }

    public get isInvalid(): boolean {
      return !this.validationResult.isValid;
    }

    public getExpectedToBeValidValue(): ValidValue {

      if (this.isInvalid) {
        Logger.throwErrorAndLog({
          errorInstance: new UnexpectedEventError("Contrary os expectations, the value is still 'null'."),
          title: UnexpectedEventError.localization.defaultTitle,
          occurrenceLocation: "ValidatableControl.Payload.getExpectedToBeValidValue()"
        });
      }


      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
      * In this case, we are guarantee the ValidValue by "this.isInvalid" check */
      return this.value as ValidValue;
    }


    public updateImmutably(
      {
        newValue
      }: {
        newValue: ValidValue | InvalidValue;
      }
    ): Payload<ValidValue, InvalidValue, Validation> {
      return new Payload<ValidValue, InvalidValue, Validation>({
        initialValue: newValue,
        validation: this.validation
      });
    }


    /* === Auxiliaries ============================================================================================== */
    /* --- IDs generating ------------------------------------------------------------------------------------------- */
    protected static counterForAssociatedComponentVueReferenceID_Generating: number = 0;

    protected static generateAssociatedComponentVueReferenceID(): string {
      Payload.counterForAssociatedComponentVueReferenceID_Generating++;
      return `VALIDATABLE_CONTROL-${ Payload.counterForAssociatedComponentVueReferenceID_Generating }`;
    }

  }


  export function VModelChecker(rawVModel: unknown, valueChecker: (rawValue: unknown) => boolean): boolean {
    return isArbitraryObject(rawVModel) ? valueChecker(rawVModel.value) : false;
  }

}


export default ValidatableControl;
