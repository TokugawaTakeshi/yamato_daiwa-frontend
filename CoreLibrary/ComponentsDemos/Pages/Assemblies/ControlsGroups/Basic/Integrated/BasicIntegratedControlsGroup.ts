/* ─── Services ───────────────────────────────────────────────────────────────────────────────────────────────────── */
import AccessControlService from "../_CommonPartials/AccessControlService";

/* ─── Validations ────────────────────────────────────────────────────────────────────────────────────────────────── */
import InputtedSigningUpDataValidations from "../_CommonPartials/InputtedSigningUpDataValidations";

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
import { getExpectedToBeSingleDOM_Element, BasicFrontEndLogger } from "@yamato-daiwa/es-extensions-browserjs";


let hasUserTriedToSubmitDataAtLeastOnce: boolean = false;


const summarisingErrorMessageElement: HTMLElement = getExpectedToBeSingleDOM_Element({
  selector: "#SUMMARIZING_ERROR_MESSAGE",
  expectedDOM_ElementSubtype: HTMLElement
});
const summarisingErrorMessageElementMountingPoint: Comment = document.createComment("SUMMARIZING_ERROR_MESSAGE");

summarisingErrorMessageElement.replaceWith(summarisingErrorMessageElementMountingPoint);


const asynchronousValidationsNotFinishedYetMessageElement: HTMLElement = getExpectedToBeSingleDOM_Element({
  selector: "#ASYNCHRONOUS_VALIDATIONS_NOT_FINISHED_YET_MESSAGE",
  expectedDOM_ElementSubtype: HTMLElement
});

const asynchronousValidationsNotFinishedYetMessageElementMountingPoint: Comment =
    document.createComment("ASYNCHRONOUS_VALIDATIONS_NOT_FINISHED_YET_MESSAGE");

asynchronousValidationsNotFinishedYetMessageElement.replaceWith(asynchronousValidationsNotFinishedYetMessageElementMountingPoint);


const controlsGroup: ValidatableControlsGroup<AccessControlService.SigningUp.Payload> = new ValidatableControlsGroup({

  controlsPayload: {

    userName: TextBox.pickOneBySelector({
      selector: "#USER_NAME--TEXT_BOX",
      validation: new InputtedSigningUpDataValidations.UserName(),
      validityHighlightingActivationMode: TextBox.ValidityHighlightingActivationModes.onFocusOut
    }).payload,

    email: TextBox.pickOneBySelector({
      selector: "#EMAIL--TEXT_BOX",
      validation: new InputtedSigningUpDataValidations.Email(),
      validityHighlightingActivationMode: TextBox.ValidityHighlightingActivationModes.onFocusOut
    }).payload,

    phoneNumber: TextBox.pickOneBySelector({
      selector: "#PHONE_NUMBER--TEXT_BOX",
      validation: new InputtedSigningUpDataValidations.PhoneNumber(),
      validityHighlightingActivationMode: TextBox.ValidityHighlightingActivationModes.onFocusOut
    }).payload,

    password: TextBox.pickOneBySelector({
      selector: "#PASSWORD--TEXT_BOX",
      validation: new InputtedSigningUpDataValidations.Password(),
      validityHighlightingActivationMode: TextBox.ValidityHighlightingActivationModes.onFocusOut
    }).payload,

    passwordConfirmation: TextBox.pickOneBySelector({
      selector: "#PASSWORD_CONFIRMATION--TEXT_BOX",
      validation: new InputtedSigningUpDataValidations.Password(),
      validityHighlightingActivationMode: TextBox.ValidityHighlightingActivationModes.onFocusOut
    }).payload

  },

  onHasBecomeInvalidEventHandler(): void {
    if (hasUserTriedToSubmitDataAtLeastOnce) {
      ExpandingAnimation.replaceNodeAndAnimate({
        animatedElement: summarisingErrorMessageElement,
        replacedNode: summarisingErrorMessageElementMountingPoint,
        duration__seconds: 0.2
      });
    }
  },

  onHasBecomeValidEventHandler(): void {
    CollapsingAnimation.animate({
      animatedElement: summarisingErrorMessageElement,
      replaceWithOnComplete: summarisingErrorMessageElementMountingPoint,
      duration__seconds: 0.2
    });
  },

  onAsynchronousValidationsFinishedWithAnyResultEventHandler(): void {
    CollapsingAnimation.animate({
      animatedElement: asynchronousValidationsNotFinishedYetMessageElement,
      replaceWithOnComplete: asynchronousValidationsNotFinishedYetMessageElementMountingPoint,
      duration__seconds: 0.2
    });
  },

  scrollingContainerHTML_ID: "SCROLLABLE_CONTAINER"

});


Button.pickOneBySelector({

  selector: "#SIGNING_UP--BUTTON",

  async onClick(): Promise<void> {

    hasUserTriedToSubmitDataAtLeastOnce = true;

    if (controlsGroup.isInvalid) {

      controlsGroup.pointOutValidationErrors();

      ExpandingAnimation.replaceNodeAndAnimate({
        animatedElement: summarisingErrorMessageElement,
        replacedNode: summarisingErrorMessageElementMountingPoint,
        duration__seconds: 0.2
      });

      return;

    }


    if (controlsGroup.areTherePendingAsynchronousValidation) {

      ExpandingAnimation.replaceNodeAndAnimate({
        animatedElement: asynchronousValidationsNotFinishedYetMessageElement,
        replacedNode: asynchronousValidationsNotFinishedYetMessageElementMountingPoint,
        duration__seconds: 0.2
      });

      return;

    }


    try {

      const inputtedData: AccessControlService.SigningUp.Payload = controlsGroup.getExpectedToBeValidData();

      await AccessControlService.signUp(inputtedData);

    } catch (error: unknown) {

      Logger.logError({
        errorType: DataSubmittingFailedError.NAME,
        title: DataSubmittingFailedError.localization.defaultTitle,
        description: "The error has occurred during signing up",
        occurrenceLocation: "Signing up button event handler",
        caughtError: error
      });

      return;

    }


    Logger.logSuccess({
      title: "Signing up success",
      description: "The simulation of signing up complete."
    });

  }

});


Logger.setImplementation(BasicFrontEndLogger);
