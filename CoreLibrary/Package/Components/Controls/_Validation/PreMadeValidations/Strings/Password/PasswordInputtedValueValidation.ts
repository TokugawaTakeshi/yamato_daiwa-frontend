import InputtedValueValidation from "../../../InputtedValueValidation";

import MinimalCharactersCountInputtedValueValidationRule from
    "../../../PreMadeRules/Strings/MinimalCharactersCountInputtedValueValidationRule";
import MaximalCharactersCountInputtedValueValidationRule from
    "../../../PreMadeRules/Strings/MaximalCharactersCountInputtedValueValidationRule";
import AllowedCharactersInputtedValueValidationRule from
    "../../../PreMadeRules/Strings/AllowedCharactersInputtedValueValidationRule";

import { isEmptyString } from "@yamato-daiwa/es-extensions";


abstract class PasswordInputtedValueValidation extends InputtedValueValidation {

  public static localization: PasswordInputtedValueValidation.Localization;

  public readonly MINIMAL_CHARACTERS_COUNT: number;
  public readonly MAXIMAL_CHARACTERS_COUNT: number;


  protected constructor(
    compoundParameter:
        Readonly<{
          isInputRequired: boolean;
          minimalCharactersCount: number;
          maximalCharactersCount: number;
          allowedNonWordCharacters: ReadonlyArray<string>;
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
      requiredInputIsMissingValidationErrorMessage: PasswordInputtedValueValidation.localization.
          requiredInputIsMissingValidationErrorMessage,
      staticRules: [
        new AllowedCharactersInputtedValueValidationRule({
          allowedCharacters: {
            latinLowercase: true,
            latinUppercase: true,
            digits: true,
            other: compoundParameter.allowedNonWordCharacters
          },
          errorMessageBuilder: PasswordInputtedValueValidation.localization.
              disallowedCharactersFoundValidationErrorMessageBuilder
        }),
        new MinimalCharactersCountInputtedValueValidationRule({
          minimalCharactersCount: compoundParameter.minimalCharactersCount,
          errorMessageBuilder: PasswordInputtedValueValidation.localization.
              minimalCharactersCountValidationErrorMessageBuilder,
          mustFinishValidationIfValueIsInvalid: true
        }),
        new MaximalCharactersCountInputtedValueValidationRule({
          maximalCharactersCount: compoundParameter.maximalCharactersCount,
          errorMessageBuilder: PasswordInputtedValueValidation.localization.
              tooManyCharactersValidationErrorMessageBuilder
        })
      ]
    });

    this.MINIMAL_CHARACTERS_COUNT = compoundParameter.minimalCharactersCount;
    this.MAXIMAL_CHARACTERS_COUNT = compoundParameter.maximalCharactersCount;

  }

}


namespace PasswordInputtedValueValidation {

  export type Localization =
      InputtedValueValidation.Localization &
      Readonly<{
        disallowedCharactersFoundValidationErrorMessageBuilder:
            AllowedCharactersInputtedValueValidationRule.ErrorMessage.Builder;
        minimalCharactersCountValidationErrorMessageBuilder:
            MinimalCharactersCountInputtedValueValidationRule.ErrorMessage.Builder;
        tooManyCharactersValidationErrorMessageBuilder:
            MaximalCharactersCountInputtedValueValidationRule.ErrorMessage.Builder;
      }>;

}


export default PasswordInputtedValueValidation;
