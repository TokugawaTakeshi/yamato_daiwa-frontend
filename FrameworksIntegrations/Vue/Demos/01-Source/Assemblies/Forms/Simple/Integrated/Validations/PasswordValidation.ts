import {
  minimalCharactersCountValidationRule,
  maximalCharactersCountValidationRule,
  allowedCharactersValidationRule
} from "@yamato-daiwa/frontend";
import { ValueValidation } from "@yamato-daiwa/frontend-vue";
import { isEmptyString } from "@yamato-daiwa/es-extensions";


export default class PasswordValidation extends ValueValidation {

  private static readonly REQUIRED_VALUE_IS_MISSING_DEFAULT_VALIDATION_ERROR_MESSAGE: string =
      "The password is missing. Please input the password.";


  private static readonly MINIMAL_CHARACTERS_COUNT: number = 6;
  private static readonly MAXIMAL_CHARACTERS_COUNT: number = 32;


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
          PasswordValidation.REQUIRED_VALUE_IS_MISSING_DEFAULT_VALIDATION_ERROR_MESSAGE,
      contextIndependentValidationRules: {
        ...minimalCharactersCountValidationRule({
          minimalCharactersCount: PasswordValidation.MINIMAL_CHARACTERS_COUNT,
          errorMessage: `Not enough characters. Please input at least ${ PasswordValidation.MINIMAL_CHARACTERS_COUNT }` +
              "characters"
        }),
        ...maximalCharactersCountValidationRule({
          maximalCharactersCount: PasswordValidation.MAXIMAL_CHARACTERS_COUNT,
          errorMessage: `Too many characters. Please input no more than ${ PasswordValidation.MAXIMAL_CHARACTERS_COUNT }`
        }),
        ...allowedCharactersValidationRule({
          allowedCharacters: {
            latinLowercase: true,
            latinUppercase: true,
            stringifiedDigits: true,
            other: [ "!", "#", "$", "%", "&", "(", ")", "=", "-", "~", "^", "|", "{", "}", "[", "]", "+", ";", ":", "*" ]
          },
          errorMessageTemplate: (foundDisallowedCharacters: ReadonlyArray<string>): string =>
              `Below characters are not allowed: ${ foundDisallowedCharacters.join("、") }`
        })
      }
    });

  }

  /* eslint-disable class-methods-use-this -- The static fields are invisible from the Vue template. */
  public get MINIMAL_CHARACTERS_COUNT(): number { return PasswordValidation.MINIMAL_CHARACTERS_COUNT; }
  public get MAXIMAL_CHARACTERS_COUNT(): number { return PasswordValidation.MAXIMAL_CHARACTERS_COUNT; }
  /* eslint-enable class-methods-use-this */

}
