/* --- Validations -------------------------------------------------------------------------------------------------- */
import InputtedSignInDataValidations from "./_Partials/InputtedSignInDataValidations";

/* --- Framework ---------------------------------------------------------------------------------------------------- */
import {
  ValidatableControlsGroup,
  TextBox,
  Button,
  CollapsingAnimation,
  ExpandingAnimation
} from "@yamato-daiwa/frontend";

/* --- Utils -------------------------------------------------------------------------------------------------------- */
import { Logger, DataSubmittingFailedError } from "@yamato-daiwa/es-extensions";
import { getExpectedToBeSingleChildOfTemplateElement, BasicFrontEndLogger } from "@yamato-daiwa/es-extensions-browserjs";


type InputtedData = Readonly<{
  userName: string;
  password: string;
}>;

let hasUserTriedToSubmitDataAtLeastOnce: boolean = false;

const errorMessageMountingPoint: Comment = document.createComment("ERROR_MESSAGE_MOUNTING_POINT");
const invalidOrOmittedDataLeftErrorMessage: HTMLElement = getExpectedToBeSingleChildOfTemplateElement({
  templateElementSelector: "#ERROR_MESSAGE_TEMPLATE",
  mustReplaceTemplateElementOnceDoneWith: errorMessageMountingPoint,
  expectedChildElementSubtype: HTMLElement
});


const controlsGroup: ValidatableControlsGroup<InputtedData> = new ValidatableControlsGroup({

  controlsPayload: {
    userName: TextBox.pickOneBySelector<string, string, InputtedSignInDataValidations.UserName>({
      selector: "#USER_NAME_TEXTBOX",
      rawInputModifier: TextBox.RawInputModifiers.keepStringValueAsIs,
      validation: new InputtedSignInDataValidations.UserName(),
      mustActivateInvalidHighlightImmediately: false
    }).payload,
    password: TextBox.pickOneBySelector<string, string, InputtedSignInDataValidations.Password>({
      selector: "#PASSWORD_TEXTBOX",
      rawInputModifier: TextBox.RawInputModifiers.keepStringValueAsIs,
      validation: new InputtedSignInDataValidations.Password(),
      mustActivateInvalidHighlightImmediately: false
    }).payload
  },

  onHasBecomeValid(): void {
    CollapsingAnimation.animate({
      replaceWithOnComplete: errorMessageMountingPoint,
      animatedElement: invalidOrOmittedDataLeftErrorMessage,
      duration__seconds: 0.2
    });
  },

  onHasBecomeInvalid(): void {
    if (hasUserTriedToSubmitDataAtLeastOnce) {
      ExpandingAnimation.replaceNodeAndAnimate({
        animatedElement: invalidOrOmittedDataLeftErrorMessage,
        replacedNode: errorMessageMountingPoint,
        duration__seconds: 0.2
      });
    }
  },

  scrollingContainerHTML_ID: "SCROLLABLE_CONTAINER"

});

Button.pickOneBySelector({
  selector: "#SUBMITTING_BUTTON",
  onClick(): void {

    hasUserTriedToSubmitDataAtLeastOnce = true;

    if (controlsGroup.isInvalid) {

      controlsGroup.pointOutValidationErrors();

      ExpandingAnimation.replaceNodeAndAnimate({
        animatedElement: invalidOrOmittedDataLeftErrorMessage,
        replacedNode: errorMessageMountingPoint,
        duration__seconds: 0.2
      });

      return;
    }


    try {

      const inputtedData: InputtedData = controlsGroup.getExpectedToBeValidData();

      Logger.logSuccess({
        title: "Sign in success",
        description: "",
        additionalData: inputtedData
      });

    } catch (error: unknown) {

      Logger.logError({
        errorType: DataSubmittingFailedError.NAME,
        title: DataSubmittingFailedError.localization.defaultTitle,
        description: "",
        occurrenceLocation: "runApplication()",
        caughtError: error
      });

    }
  }
});


Logger.setImplementation(BasicFrontEndLogger);
