/* eslint-disable max-classes-per-file --
* This limitation is unsolicited for the namespaced classes, however there is no ESLint option allowing this case. */

import type InputtedValueValidationRule from "@Controls/_Validation/InputtedValueValidationRule";
import type InputtedValueValidationAsynchronousRule from
    "@Controls/_Validation/InputtedValueValidationAsynchronousRule";

import { isBoolean, isNonEmptyString, Logger } from "@yamato-daiwa/es-extensions";

import inputtedValueValidationLocalization__english from
    "@Controls/_Validation/InputtedValueValidationLocaization.english";


abstract class InputtedValueValidation {

  public static localization: InputtedValueValidation.Localization = inputtedValueValidationLocalization__english;


  protected readonly omittedValueChecker: InputtedValueValidation.OmittedValueChecker;
  protected readonly isInputRequired: boolean;
  protected readonly requiredInputIsMissingValidationErrorMessage: string;

  protected readonly staticRules: ReadonlyArray<InputtedValueValidationRule>;
  protected readonly contextDependentRules: ReadonlyArray<InputtedValueValidationRule>;
  protected readonly asynchronousValidationRules: ReadonlyArray<InputtedValueValidationAsynchronousRule>;
  protected readonly asynchronousChecksCallback?: InputtedValueValidation.AsynchronousChecks.Callback;


  protected constructor(compoundParameter: InputtedValueValidation.ConstructorCompoundParameter) {

    this.omittedValueChecker = compoundParameter.omittedValueChecker;
    this.isInputRequired = isBoolean(compoundParameter.isInputRequired) ?
        compoundParameter.isInputRequired :
        compoundParameter.isInputRequired();

    this.requiredInputIsMissingValidationErrorMessage =
        compoundParameter.requiredValueIsMissingCustomValidationErrorMessage ??
        InputtedValueValidation.localization.requiredInputIsMissingValidationErrorMessage;

    this.staticRules = compoundParameter.staticRules ?? [];
    this.contextDependentRules = compoundParameter.contextDependentValidationRules ?? [];

    this.asynchronousValidationRules = compoundParameter.asynchronousValidationRules ?? [];

    this.asynchronousChecksCallback = compoundParameter.asynchronousValidationsCallback;

  }


  public validate(rawValue: unknown): InputtedValueValidation.Result {

    if (this.omittedValueChecker(rawValue)) {
      return {
        isValid: !this.isInputRequired,
        errorsMessages: this.isInputRequired ? [ this.requiredInputIsMissingValidationErrorMessage ] : []
      };
    }


    let isValueStillValid: boolean = true;
    const validationErrorsMessages: Array<string> = [];

    for (const validationRule of this.staticRules) {

      if (!validationRule.isValid(rawValue)) {

        isValueStillValid = false;
        validationErrorsMessages.push(validationRule.errorMessage);

        if (validationRule.mustFinishValidationIfValueIsInvalid) {
          break;
        }

      }

    }

    if (!isValueStillValid) {
      return {
        isValid: false,
        errorsMessages: validationErrorsMessages
      };
    }


    for (const validationRule of this.contextDependentRules) {

      if (!validationRule.isValid(rawValue)) {

        isValueStillValid = false;
        validationErrorsMessages.push(validationRule.errorMessage);

        if (validationRule.mustFinishValidationIfValueIsInvalid) {
          break;
        }

      }

    }

    if (!isValueStillValid) {
      return {
        isValid: false,
        errorsMessages: validationErrorsMessages
      };
    }


    this.executeAsynchronousValidationIfAny(rawValue);


    return {
      isValid: true,
      errorsMessages: []
    };

  }

  protected executeAsynchronousValidationIfAny(rawValue: unknown): void {

    if (this.asynchronousValidationRules.length === 0) {
      return;
    }


    const checksStatus: InputtedValueValidation.AsynchronousChecks = this.asynchronousValidationRules.reduce(
      (
        accumulatingValue: InputtedValueValidation.AsynchronousChecks,
        asynchronousValidationRule: InputtedValueValidationAsynchronousRule
      ): InputtedValueValidation.AsynchronousChecks => {

        accumulatingValue[asynchronousValidationRule.ID] = {
          message: asynchronousValidationRule.messages.checkingInProgress,
          isPending: true,
          hasInvalidValueBeenConfirmed: false,
          hasValidValueBeenConfirmed: false,
          hasErrorOccurred: false
        };

        return accumulatingValue;

      }, {}
    );

    for (const validationRule of this.asynchronousValidationRules) {

      validationRule.

          isValid(rawValue).

          then((checkingResult: InputtedValueValidationAsynchronousRule.CheckingResult): void => {

            checksStatus[validationRule.ID] = {
              isPending: false,
              hasValidValueBeenConfirmed: checkingResult.isValid,
              hasInvalidValueBeenConfirmed: !checkingResult.isValid,
              hasErrorOccurred: false,
              message: checkingResult.isValid ?
                  validationRule.messages.validValueHasBeenConfirmed :
                  checkingResult.errorMessage ?? validationRule.messages.errorHasOccurred
            };

            this.asynchronousChecksCallback?.(new InputtedValueValidation.AsynchronousChecks.Status(checksStatus));

          }).

          catch((error: Error): void => {

            Logger.logError({
              errorType: "AsynchronousValidationFailure",
              title: "Asynchronous validation failed",
              description: `The asynchronous validation ${ validationRule.ID } has failed.`,
              occurrenceLocation: "inputtedValueValidation.executeAsynchronousValidationIfAny(rawValue)",
              caughtError: error
            });

            checksStatus[validationRule.ID] = {
              isPending: false,
              hasValidValueBeenConfirmed: false,
              hasInvalidValueBeenConfirmed: false,
              hasErrorOccurred: true,
              message: validationRule.messages.errorHasOccurred
            };

            this.asynchronousChecksCallback?.(new InputtedValueValidation.AsynchronousChecks.Status(checksStatus));

          });
    }

  }

}


namespace InputtedValueValidation {

  export type Localization = Readonly<{
    requiredInputIsMissingValidationErrorMessage: string;
  }>;


  export type ConstructorCompoundParameter = Readonly<{
    isInputRequired: boolean | ((...parameters: Array<unknown>) => boolean);
    omittedValueChecker: OmittedValueChecker;
    requiredValueIsMissingCustomValidationErrorMessage?: string;
    staticRules?: ReadonlyArray<InputtedValueValidationRule>;
    contextDependentValidationRules?: ReadonlyArray<InputtedValueValidationRule>;
    asynchronousValidationRules?: ReadonlyArray<InputtedValueValidationAsynchronousRule>;
    asynchronousValidationsCallback?: AsynchronousChecks.Callback;
  }>;

  export type OmittedValueChecker = (rawValue: unknown) => boolean;

  export type Result = Readonly<{
    isValid: boolean;
    errorsMessages: ReadonlyArray<string>;
  }>;


  export type AsynchronousChecks = { [validationRuleName: string]: AsynchronousCheck.Status; };

  export namespace AsynchronousChecks {

    export type Callback = (status: Status) => void;

    export class Status {

      public readonly hasAtLeastOneCheckNotFinishedYet: boolean = false;
      public readonly hasAllChecksFinished: boolean = true;
      public readonly hasAtOneCheckErrorOccurred: boolean = false;
      public readonly hasNoInvalidValuesBeenConfirmed: boolean = true;
      public readonly hasAtLeastOneInvalidValueBeenConfirmed: boolean = false;
      public readonly errorsMessages: Array<string> = [];

      public constructor(checks: AsynchronousChecks) {

        for (const checking of Object.values(checks)) {

          if (checking.isPending) {
            this.hasAtLeastOneCheckNotFinishedYet = true;
            this.hasAllChecksFinished = false;
          }


          if (checking.hasErrorOccurred) {
            this.hasAtOneCheckErrorOccurred = true;
          }

          if (checking.hasInvalidValueBeenConfirmed) {

            this.hasNoInvalidValuesBeenConfirmed = false;
            this.hasAtLeastOneInvalidValueBeenConfirmed = true;

            if (isNonEmptyString(checking.message)) {
              this.errorsMessages.push(checking.message);
            }

          }

        }

      }

    }

  }

  export namespace AsynchronousCheck {

    export type Status = {
      message: string;
      isPending: boolean;
      hasValidValueBeenConfirmed: boolean;
      hasInvalidValueBeenConfirmed: boolean;
      hasErrorOccurred: boolean;
    };

  }

}


export default InputtedValueValidation;
