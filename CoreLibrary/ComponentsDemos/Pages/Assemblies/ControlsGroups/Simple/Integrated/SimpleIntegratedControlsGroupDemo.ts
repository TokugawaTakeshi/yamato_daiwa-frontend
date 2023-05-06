/* ─── Services ───────────────────────────────────────────────────────────────────────────────────────────────────── */
import AccessControlService from "./_Partials/AccessControlService";

/* ─── Validations ────────────────────────────────────────────────────────────────────────────────────────────────── */
import InputtedSignInDataValidations from "./_Partials/InputtedSignInDataValidations";

/* ─── Framework ──────────────────────────────────────────────────────────────────────────────────────────────────── */
import {
  ValidatableControlsGroup,
  TextBox,
  Button,
  CollapsingAnimation,
  ExpandingAnimation
} from "../../../../../../Package/index";

/* ─── Utils ──────────────────────────────────────────────────────────────────────────────────────────────────────── */
import { Logger, DataSubmittingFailedError } from "@yamato-daiwa/es-extensions";
import { getExpectedToBeSingleChildOfTemplateElement, BasicFrontEndLogger } from "@yamato-daiwa/es-extensions-browserjs";


let hasUserTriedToSubmitDataAtLeastOnce: boolean = false;

const invalidOrOmittedDataLeftErrorMessageMountingPoint: Comment = document.createComment("ERROR_MESSAGE_MOUNTING_POINT");
const invalidOrOmittedDataLeftErrorMessage: HTMLElement = getExpectedToBeSingleChildOfTemplateElement({
  templateElementSelector: "#ERROR_MESSAGE_TEMPLATE",
  mustReplaceTemplateElementOnceDoneWith: invalidOrOmittedDataLeftErrorMessageMountingPoint,
  expectedChildElementSubtype: HTMLElement
});


const controlsGroup: ValidatableControlsGroup<AccessControlService.SigningIn.Payload> = new ValidatableControlsGroup({

  controlsPayload: {
    userName: TextBox.pickOneBySelector<InputtedSignInDataValidations.UserName>({
      selector: "#USER_NAME--TEXT_BOX",
      validation: new InputtedSignInDataValidations.UserName(),
      validityHighlightingActivationMode: TextBox.ValidityHighlightingActivationModes.onFocusOut
    }).payload,
    password: TextBox.pickOneBySelector<InputtedSignInDataValidations.Password>({
      selector: "#PASSWORD--TEXT_BOX",
      validation: new InputtedSignInDataValidations.Password(),
      validityHighlightingActivationMode: TextBox.ValidityHighlightingActivationModes.onFocusOut
    }).payload
  },

  onHasBecomeValid(): void {
    CollapsingAnimation.animate({
      replaceWithOnComplete: invalidOrOmittedDataLeftErrorMessageMountingPoint,
      animatedElement: invalidOrOmittedDataLeftErrorMessage,
      duration__seconds: 0.2
    });
  },

  onHasBecomeInvalid(): void {
    if (hasUserTriedToSubmitDataAtLeastOnce) {
      ExpandingAnimation.replaceNodeAndAnimate({
        animatedElement: invalidOrOmittedDataLeftErrorMessage,
        replacedNode: invalidOrOmittedDataLeftErrorMessageMountingPoint,
        duration__seconds: 0.2
      });
    }
  },

  scrollingContainerHTML_ID: "SCROLLABLE_CONTAINER"

});


Button.pickOneBySelector({

  selector: "#SIGNING_IN--BUTTON",

  async onClick(): Promise<void> {

    hasUserTriedToSubmitDataAtLeastOnce = true;

    if (controlsGroup.isInvalid) {

      controlsGroup.pointOutValidationErrors();

      ExpandingAnimation.replaceNodeAndAnimate({
        animatedElement: invalidOrOmittedDataLeftErrorMessage,
        replacedNode: invalidOrOmittedDataLeftErrorMessageMountingPoint,
        duration__seconds: 0.2
      });

      return;

    }


    try {

      const inputtedData: AccessControlService.SigningIn.Payload = controlsGroup.getExpectedToBeValidData();

      await AccessControlService.signIn(inputtedData);

      Logger.logSuccess({
        title: "Signing in success",
        description: "The simulation of signing is complete."
      });

    } catch (error: unknown) {

      Logger.logError({
        errorType: DataSubmittingFailedError.NAME,
        title: DataSubmittingFailedError.localization.defaultTitle,
        description: "The error has occurred during signing in",
        occurrenceLocation: "Signing up button event handler",
        caughtError: error
      });

    }
  }

});


Logger.setImplementation(BasicFrontEndLogger);
