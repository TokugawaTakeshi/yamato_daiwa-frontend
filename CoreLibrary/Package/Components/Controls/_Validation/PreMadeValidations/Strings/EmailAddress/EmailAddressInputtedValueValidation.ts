import InputtedValueValidation from "../../../InputtedValueValidation";

import EmailAddressInputtedValueValidationRule from
    "../../../PreMadeRules/Strings/EmailAddressInputtedValueValidationRule";
import MinimalCharactersCountInputtedValueValidationRule from
    "../../../PreMadeRules/Strings/MinimalCharactersCountInputtedValueValidationRule";

import { isEmptyString } from "@yamato-daiwa/es-extensions";


class EmailAddressInputtedValueValidation extends InputtedValueValidation {

  public static localization: EmailAddressInputtedValueValidation.Localization;

  /* [ Approach ] Although YDF library can suggest the minimal characters count for the email address,
  *    in the applications with good architecture this value must be taken from the business rules and
  *    passed via constructor. */
  public readonly MINIMAL_CHARACTERS_COUNT: number;

  public constructor(
    compoundParameter:
        Readonly<{
          isInputRequired: boolean;
          minimalCharactersCount: number;
        }> &
        Pick<
          InputtedValueValidation.ConstructorCompoundParameter,
          "contextDependentRules" |
          "asynchronousRules" |
          "asynchronousValidationsCallback"
        >
  ) {

    super({
      isInputRequired: compoundParameter.isInputRequired,
      omittedValueChecker: isEmptyString,
      requiredInputIsMissingValidationErrorMessage: EmailAddressInputtedValueValidation.localization.
          requiredInputIsMissingValidationErrorMessage,
      staticRules: [
        new EmailAddressInputtedValueValidationRule({
          errorMessageBuilder: EmailAddressInputtedValueValidation.localization.
              invalidEmailAddressErrorMessageBuilder
        }),
        new MinimalCharactersCountInputtedValueValidationRule({
          minimalCharactersCount: compoundParameter.minimalCharactersCount,
          errorMessageBuilder: EmailAddressInputtedValueValidation.localization.
              minimalCharactersCountValidationErrorMessageBuilder
        })
      ],
      contextDependentRules: compoundParameter.contextDependentRules,
      asynchronousRules: compoundParameter.asynchronousRules,
      asynchronousValidationsCallback: compoundParameter.asynchronousValidationsCallback
    });

    this.MINIMAL_CHARACTERS_COUNT = compoundParameter.minimalCharactersCount;

  }

}


namespace EmailAddressInputtedValueValidation {

  export type Localization =
      InputtedValueValidation.Localization &
      Readonly<{
        invalidEmailAddressErrorMessageBuilder:
            EmailAddressInputtedValueValidationRule.ErrorMessage.Builder;
        minimalCharactersCountValidationErrorMessageBuilder:
            MinimalCharactersCountInputtedValueValidationRule.ErrorMessage.Builder;
      }>;

}


export default EmailAddressInputtedValueValidation;
