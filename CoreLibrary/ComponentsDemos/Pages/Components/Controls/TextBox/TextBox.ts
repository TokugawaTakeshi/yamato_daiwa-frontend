import TextBox from "../../../../../Package/Components/Controls/TextBox/TextBox";
import {
  AllowedCharactersInputtedValueValidationRule,
  InputtedValueValidation,
  MaximalCharactersCountInputtedValueValidationRule,
  MinimalCharactersCountInputtedValueValidationRule
} from "../../../../../Package";
import { isEmptyString } from "@yamato-daiwa/es-extensions";


export class SampleValidation extends InputtedValueValidation {
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
      ]
    });
  }
}

TextBox.pickOneBySelector({
  selector: "#SAMPLE",
  validation: new SampleValidation(),
  validityHighlightingActivationMode: TextBox.ValidityHighlightingActivationModes.onFirstInputtedCharacter
});
