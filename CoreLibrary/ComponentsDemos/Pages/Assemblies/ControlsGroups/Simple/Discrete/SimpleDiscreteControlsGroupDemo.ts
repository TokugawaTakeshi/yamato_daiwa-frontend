/* ─── Services ───────────────────────────────────────────────────────────────────────────────────────────────────── */
import AccessControlService from "../_CommonPartials/AccessControlService";

/* ─── Framework ──────────────────────────────────────────────────────────────────────────────────────────────────── */
import {
  Button,
  CollapsingAnimation,
  ExpandingAnimation
} from "../../../../../../Package/index";

/* ─── Utils ──────────────────────────────────────────────────────────────────────────────────────────────────────── */
import { Logger, DataSubmittingFailedError } from "@yamato-daiwa/es-extensions";
import { getExpectedToBeSingleChildOfTemplateElement, BasicFrontEndLogger } from "@yamato-daiwa/es-extensions-browserjs";
import SimpleDiscreteControlsGroup from "./Components/SimpleDiscreteControlsGroup/SimpleDiscreteControlsGroup";


let hasUserTriedToSubmitDataAtLeastOnce: boolean = false;

const invalidOrOmittedDataLeftErrorMessageMountingPoint: Comment = document.createComment("ERROR_MESSAGE_MOUNTING_POINT");
const invalidOrOmittedDataLeftErrorMessage: HTMLElement = getExpectedToBeSingleChildOfTemplateElement({
  templateElementSelector: "#ERROR_MESSAGE_TEMPLATE",
  mustReplaceTemplateElementOnceDoneWith: invalidOrOmittedDataLeftErrorMessageMountingPoint,
  expectedChildElementSubtype: HTMLElement
});

const controlsGroup: SimpleDiscreteControlsGroup = new SimpleDiscreteControlsGroup({

  rootElementUniqueSelector: ".SimpleDiscreteControlsGroupDemo-ControlsGroup",

  onHasBecomeValidEventHandler(): void {
    CollapsingAnimation.animate({
      replaceWithOnComplete: invalidOrOmittedDataLeftErrorMessageMountingPoint,
      animatedElement: invalidOrOmittedDataLeftErrorMessage,
      duration__seconds: 0.2
    });
  },

  onHasBecomeInvalidEventHandler(): void {
    if (hasUserTriedToSubmitDataAtLeastOnce) {
      ExpandingAnimation.replaceNodeAndAnimate({
        animatedElement: invalidOrOmittedDataLeftErrorMessage,
        replacedNode: invalidOrOmittedDataLeftErrorMessageMountingPoint,
        duration__seconds: 0.2
      });
    }
  }

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
