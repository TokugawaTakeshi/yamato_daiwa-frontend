import { ValueValidation } from "@Source/index";
import { EmailAddress, isEmptyString } from "@yamato-daiwa/es-extensions";


export default class InputtedEmailValidation extends ValueValidation {

  private static readonly REQUIRED_VALUE_IS_MISSING_DEFAULT_VALIDATION_ERROR_MESSAGE: string =
      "Email is missing. Please input the email address.";

  public constructor(
    compoundParameter: Readonly<{
      isInputRequired: boolean;
      requiredValueIsMissingCustomValidationErrorMessage?: string;
    }>
  ) {

    super({
      inputIsRequired: compoundParameter.isInputRequired,
      omittedValueChecker: isEmptyString,
      requiredValueIsMissingCustomValidationErrorMessage:
          compoundParameter.requiredValueIsMissingCustomValidationErrorMessage ??
          InputtedEmailValidation.REQUIRED_VALUE_IS_MISSING_DEFAULT_VALIDATION_ERROR_MESSAGE,
      contextIndependentValidationRules: {
        validEmail: {
          checker: (rawValue: unknown): boolean => EmailAddress.isValid(String(rawValue)),
          errorMessage: "The inputted email is invalid. Please check the inputted email address."
        }
      }
    });

  }

}
