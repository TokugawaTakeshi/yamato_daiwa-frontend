/* eslint-disable max-classes-per-file --
* This limitation is unsolicited for the namespaced classes, however there is no ESLint option allowing this case. */
import AccessControlService from "./AccessControlService";
import {
  InputtedValueValidation,
  EmailAddressInputtedValueValidationRule,
  MinimalCharactersCountInputtedValueValidationRule,
  MaximalCharactersCountInputtedValueValidationRule,
  AllowedCharactersInputtedValueValidationRule
} from "@yamato-daiwa/frontend";
import { isEmptyString } from "@yamato-daiwa/es-extensions";


namespace InputtedSigningInDataValidations {

  export class UserName extends InputtedValueValidation {

    public constructor() {
      super({
        isInputRequired: true,
        omittedValueChecker: isEmptyString,
        requiredInputIsMissingValidationErrorMessage: "Please input the user name.",
        staticRules: [
          new AllowedCharactersInputtedValueValidationRule({
            allowedCharacters: {
              latinLowercase: true,
              latinUppercase: true,
              digits: true,
              other: [ "-", "_" ]
            }
          }),
          new MinimalCharactersCountInputtedValueValidationRule({
            minimalCharactersCount: 2,
            mustFinishValidationIfValueIsInvalid: true
          }),
          new MaximalCharactersCountInputtedValueValidationRule({
            maximalCharactersCount: 16
          })
        ],
        asynchronousRules: [
          {
            ID: "AVAILABILITY",
            messages: {
              checkingInProgress: "Checking of the inputted user name for the availability",
              errorHasOccurred:
                  "The error has occurred during the checking of the inputted user name for the availability. " +
                  "We will not prevent the data submitting but please not that inputted data could be denied after " +
                      "submitting.",
              invalidValueHasBeenConfirmed: "Sorry, the inputted user name is already in use. " +
                  "Would you please to select the other user name?",
              validValueHasBeenConfirmed: "The inputted user name is available."
            },
            check: async (rawValue: unknown): Promise<InputtedValueValidation.AsynchronousRule.CheckingResult> =>
                ({ isValid: await AccessControlService.isUserNameAvailable(String(rawValue)) })
          },
          {
            ID: "OBSCENITY",
            messages: {
              checkingInProgress: "Checking of the inputted name for the obscenity",
              errorHasOccurred:
                  "The error has occurred during the checking of the inputted user name for the obscenity. " +
                  "We will not prevent the data submitting but please not that inputted data could be denied after " +
                      "submitting.",
              invalidValueHasBeenConfirmed: "The inputted user name includes obscenity. " +
                  "Please refrain from the usage of the cursing.",
              validValueHasBeenConfirmed: "The inputted user name including nothing of known obscenity. " +
                  "Thank you for the cooperation with the code of conduct."
            },
            async check(rawValue: unknown): Promise<InputtedValueValidation.AsynchronousRule.CheckingResult> {
              return {
                isValid: await AccessControlService.isUserNameIncludingProfanity(String(rawValue))
              };
            }
          }
        ]
      });
    }

  }

  export class Email extends InputtedValueValidation {

    public constructor() {
      super({
        isInputRequired: false,
        omittedValueChecker: isEmptyString,
        staticRules: [
          new EmailAddressInputtedValueValidationRule()
        ]
      });
    }

  }

  export class Password extends InputtedValueValidation {

    public constructor() {
      super({
        isInputRequired: true,
        omittedValueChecker: isEmptyString,
        requiredInputIsMissingValidationErrorMessage: "Please input the password.",
        staticRules: [
          new AllowedCharactersInputtedValueValidationRule({
            allowedCharacters: {
              latinLowercase: true,
              latinUppercase: true,
              digits: true,
              other: [
                "!",
                "@",
                "#",
                "$",
                "^",
                "*",
                "-",
                "_",
                "+",
                "=",
                "{",
                "}",
                "[",
                "]",
                "|",
                "\\",
                "/",
                ":",
                ";",
                "<",
                ">",
                ",",
                ".",
                "?"
              ]
            }
          }),
          new MinimalCharactersCountInputtedValueValidationRule({
            minimalCharactersCount: 8,
            mustFinishValidationIfValueIsInvalid: true
          }),
          new MaximalCharactersCountInputtedValueValidationRule({
            maximalCharactersCount: 32
          })
        ]
      });
    }

  }

}


export default InputtedSigningInDataValidations;
