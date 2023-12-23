/* eslint-disable @typescript-eslint/member-ordering --
 * The members of this class has been organized semantically. */

import type ValidatableControl from "../_Validation/ValidatableControl";
import type InputtedValueValidation from "../_Validation/InputtedValueValidation";
import type CompoundControlShell from "../CompoundControlShell/CompoundControlShell";


class NumberBox<Validation extends InputtedValueValidation> implements ValidatableControl {

  /* ━━━ Static Fields ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── Accessing to DOM ─────────────────────────────────────────────────────────────────────────────────────────── */
  protected static readonly NATIVE_INPUT_ELEMENT_SELECTOR: string = ".NumberBox--YDF-NativeInput";
  protected static readonly BUTTONS_SELECTOR: string = ".NumberBox--YDF-Button";

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
