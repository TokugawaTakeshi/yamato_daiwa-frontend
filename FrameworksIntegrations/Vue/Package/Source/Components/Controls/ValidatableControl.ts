/* eslint-disable @typescript-eslint/member-ordering -- The secondary members has been organized to the end of the class. */

import type { InputtedValueValidation } from "@yamato-daiwa/frontend";
import type { ComponentPublicInstance as VueComponentPublicInstance } from "vue";
import {
  Logger,
  UnexpectedEventError,
  isArbitraryObject,
  isUndefined,
  isFunctionLike
} from "@yamato-daiwa/es-extensions";
import VueComponentNotFoundError from "../_Errors/VueComponentNotFound/VueComponentNotFoundError";


interface ValidatableControl {

  highlightInvalidInput: () => this;

  getRootElementOffsetCoordinates: () => Element;

  focus: () => this;

  resetValidityHighlightingStateToInitial: () => ValidatableControl.RootElementOffsetCoordinates;

}


namespace ValidatableControl {

  export type RootElementOffsetCoordinates = Readonly<{ top: number; left: number; }>;

  export function isValidatableControl(potentialValidatableControl: unknown): potentialValidatableControl is ValidatableControl {
    return isArbitraryObject(potentialValidatableControl) &&
        isFunctionLike(potentialValidatableControl.highlightInvalidInput) &&
        isFunctionLike(potentialValidatableControl.getRootElementOffsetCoordinates) &&
        isFunctionLike(potentialValidatableControl.focus) &&
        isFunctionLike(potentialValidatableControl.resetValidityHighlightingStateToInitial);
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

      if (compoundParameter.mustThrowErrorIsNotFoundOrNotValidatableControl === true) {
        Logger.throwErrorAndLog({
          errorInstance: new VueComponentNotFoundError({ vueReferenceID: compoundParameter.vueReferenceID }),
          title: VueComponentNotFoundError.localization.defaultTitle,
          occurrenceLocation: "ValidatableControl.getValidatableControlInstanceByVueReferenceID(compoundParameter)"
        });
      }


      return null;

   }


    if (!isValidatableControl(potentialValidatableControl)) {

      if (compoundParameter.mustThrowErrorIsNotFoundOrNotValidatableControl === true) {
        Logger.throwErrorAndLog({
          errorType: "VueReferenceValueIsNotValidatableControl",
          title: "Vue reference value is not validatable control",
          description:
              `The Vue reference "${ compoundParameter.vueReferenceID }" is not referring to the component implementing ` +
                "the \"ValidatableControl\" interface.",
          occurrenceLocation: "ValidatableControl.getValidatableControlInstanceByVueReferenceID(compoundParameter)"
        });
      }


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
          errorInstance: new UnexpectedEventError("Contrary os expectations, the value is still 'null'."), // TODO Чё?
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


    /* === Routines ================================================================================================= */
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
