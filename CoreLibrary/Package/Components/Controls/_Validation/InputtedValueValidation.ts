/* eslint-disable max-classes-per-file --
* This limitation is unsolicited for the namespaced classes, however there is no ESLint option allowing this case. */
import { isBoolean, isNonEmptyString, Logger } from "@yamato-daiwa/es-extensions";

import inputtedValueValidationLocalization__english from "./InputtedValueValidationLocaization.english";


abstract class InputtedValueValidation {

  public static localization: InputtedValueValidation.Localization = inputtedValueValidationLocalization__english;


  public readonly isInputRequired: InputtedValueValidation.InputRequirementChecker;

  protected readonly hasValueBeenOmitted: InputtedValueValidation.OmittedValueChecker;
  protected readonly requiredInputIsMissingValidationErrorMessage: string;

  protected readonly staticRules: ReadonlyArray<InputtedValueValidation.Rule>;
  protected readonly contextDependentRules: ReadonlyArray<InputtedValueValidation.Rule>;
  protected readonly asynchronousRules: ReadonlyArray<InputtedValueValidation.AsynchronousRule>;
  protected readonly asynchronousChecksCallback?: InputtedValueValidation.AsynchronousChecks.Callback;


  protected constructor(compoundParameter: InputtedValueValidation.ConstructorCompoundParameter) {

    this.hasValueBeenOmitted = compoundParameter.omittedValueChecker;

    if (isBoolean(compoundParameter.isInputRequired)) {
      const isInputRequired: boolean = compoundParameter.isInputRequired;
      this.isInputRequired = (): boolean => isInputRequired;
    } else {
      this.isInputRequired = compoundParameter.isInputRequired;
    }

    this.requiredInputIsMissingValidationErrorMessage =
        compoundParameter.requiredInputIsMissingValidationErrorMessage ??
        InputtedValueValidation.localization.requiredInputIsMissingValidationErrorMessage;

    this.staticRules = compoundParameter.staticRules ?? [];
    this.contextDependentRules = compoundParameter.contextDependentRules ?? [];

    this.asynchronousRules = compoundParameter.asynchronousRules ?? [];
    this.asynchronousChecksCallback = compoundParameter.asynchronousValidationsCallback;

  }


  public validate(rawValue: unknown): InputtedValueValidation.Result {

    const isInputRequired: boolean = this.isInputRequired();

    if (this.hasValueBeenOmitted(rawValue)) {
      return isInputRequired ?
          {
            isValid: false,
            errorsMessages: [ this.requiredInputIsMissingValidationErrorMessage ]
          } :
          { isValid: true };
    }


    const validationErrorsMessages: Array<string> = [];

    for (const staticValidationRule of this.staticRules) {

      const checkingResult: InputtedValueValidation.Rule.CheckingResult = staticValidationRule.check(rawValue);

      if (!checkingResult.isValid) {

        validationErrorsMessages.push(checkingResult.errorMessage);

        if (staticValidationRule.mustFinishValidationIfValueIsInvalid) {
          break;
        }

      }

    }

    if (validationErrorsMessages.length > 0) {
      return {
        isValid: false,
        errorsMessages: validationErrorsMessages
      };
    }


    for (const contextDependentValidationRule of this.contextDependentRules) {

      const checkingResult: InputtedValueValidation.Rule.CheckingResult = contextDependentValidationRule.check(rawValue);

      if (!checkingResult.isValid) {

        validationErrorsMessages.push(checkingResult.errorMessage);

        if (contextDependentValidationRule.mustFinishValidationIfValueIsInvalid) {
          break;
        }

      }

    }

    if (validationErrorsMessages.length > 0) {
      return {
        isValid: false,
        errorsMessages: validationErrorsMessages
      };
    }


    this.executeAsynchronousValidationIfAny(rawValue);


    return {
      isValid: true
    };

  }

  protected executeAsynchronousValidationIfAny(rawValue: unknown): void {

    if (this.asynchronousRules.length === 0) {
      return;
    }


    const asynchronousChecks: InputtedValueValidation.AsynchronousChecks = this.asynchronousRules.reduce(
      (
        accumulatingValue: InputtedValueValidation.AsynchronousChecks,
        asynchronousValidationRule: InputtedValueValidation.AsynchronousRule
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

    for (const validationRule of this.asynchronousRules) {

      validationRule.

          check(rawValue).

          then((checkingResult: InputtedValueValidation.AsynchronousRule.CheckingResult): void => {

						asynchronousChecks[validationRule.ID] = {
							isPending: false,
							hasValidValueBeenConfirmed: checkingResult.isValid,
							hasInvalidValueBeenConfirmed: !checkingResult.isValid,
							hasErrorOccurred: false,
							message: checkingResult.isValid ?
									validationRule.messages.validValueHasBeenConfirmed :
									checkingResult.errorMessage ?? validationRule.messages.errorHasOccurred
						};

						this.asynchronousChecksCallback?.(
              new InputtedValueValidation.AsynchronousChecks.Status(asynchronousChecks)
            );

					}).

          catch((error: Error): void => {

            Logger.logError({
              errorType: "AsynchronousValidationFailure",
              title: "Asynchronous validation failed",
              description: `The asynchronous validation ${ validationRule.ID } has failed.`,
              occurrenceLocation: "inputtedValueValidation.executeAsynchronousValidationIfAny(rawValue)",
              caughtError: error
            });

            asynchronousChecks[validationRule.ID] = {
              isPending: false,
              hasValidValueBeenConfirmed: false,
              hasInvalidValueBeenConfirmed: false,
              hasErrorOccurred: true,
              message: validationRule.messages.errorHasOccurred
            };

            this.asynchronousChecksCallback?.(new InputtedValueValidation.AsynchronousChecks.Status(asynchronousChecks));

          });
    }

  }

}


namespace InputtedValueValidation {

  export type Localization = Readonly<{
    requiredInputIsMissingValidationErrorMessage: string;
  }>;


  export type ConstructorCompoundParameter = Readonly<{
    isInputRequired: boolean | InputRequirementChecker;
    omittedValueChecker: OmittedValueChecker;
    requiredInputIsMissingValidationErrorMessage?: string;
    staticRules?: ReadonlyArray<Rule>;
    contextDependentRules?: ReadonlyArray<Rule>;
    asynchronousRules?: ReadonlyArray<AsynchronousRule>;
    asynchronousValidationsCallback?: AsynchronousChecks.Callback;
  }>;


  export type OmittedValueChecker = (rawValue: unknown) => boolean;
  export type InputRequirementChecker = () => boolean;


  export interface Rule {

    readonly mustFinishValidationIfValueIsInvalid: boolean;

    readonly check: (rawValue: unknown) => Rule.CheckingResult;

  }

  export namespace Rule {

    export type CheckingResult = Readonly<
      {
        isValid: true;
      } | {
        isValid: false;
        errorMessage: string;
      }
    >;

    export type ConstructorParameter = Readonly<{
      mustFinishValidationIfValueIsInvalid?: boolean;
    }>;

  }


  export interface AsynchronousRule {
    readonly ID: string;
    readonly messages: AsynchronousRule.Messages;
    readonly check: (rawValue: unknown) => Promise<AsynchronousRule.CheckingResult>;
  }

  export namespace AsynchronousRule {

    export type Messages = Readonly<{
      checkingInProgress: string;
      validValueHasBeenConfirmed: string;
      invalidValueHasBeenConfirmed: string;
      errorHasOccurred: string;
    }>;

    export type CheckingResult = Readonly<{
      isValid: boolean;
      errorMessage?: string;
    }>;

  }


  export type Result = Readonly<
    {
      isValid: true;
    } |
    {
      isValid: false;
      errorsMessages: ReadonlyArray<string>;
    }
  >;


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
