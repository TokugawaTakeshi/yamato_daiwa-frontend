/* ─── Services ───────────────────────────────────────────────────────────────────────────────────────────────────── */
import type AccessControlService from "../../../_CommonPartials/AccessControlService";

/* ─── Validations ────────────────────────────────────────────────────────────────────────────────────────────────── */
import InputtedSignInDataValidations from "../../../_CommonPartials/InputtedSignInDataValidations";

/* ─── Framework ──────────────────────────────────────────────────────────────────────────────────────────────────── */
import { ValidatableControlsGroup, TextBox } from "../../../../../../../../Package/index";


export default class SimpleDiscreteControlsGroup extends ValidatableControlsGroup<AccessControlService.SigningIn.Payload> {

  public constructor(
    {
      rootElementUniqueSelector,
      onHasBecomeValidEventHandler,
      onHasBecomeInvalidEventHandler
    }: Readonly<{
      rootElementUniqueSelector: string;
      onHasBecomeValidEventHandler: ValidatableControlsGroup.GeneralizedEventHandler;
      onHasBecomeInvalidEventHandler: ValidatableControlsGroup.GeneralizedEventHandler;
    }>
  ) {

    super({

      controlsPayload: {
        userName: TextBox.pickOneBySelector({
          selector: `${ rootElementUniqueSelector } .SimpleDiscreteControlsGroup-TextBox__UserName`,
          validation: new InputtedSignInDataValidations.UserName(),
          validityHighlightingActivationMode: TextBox.ValidityHighlightingActivationModes.onFocusOut
        }).payload,
        password: TextBox.pickOneBySelector({
          selector: `${ rootElementUniqueSelector } .SimpleDiscreteControlsGroup-TextBox__Password`,
          validation: new InputtedSignInDataValidations.Password(),
          validityHighlightingActivationMode: TextBox.ValidityHighlightingActivationModes.onFocusOut
        }).payload
      },

      onHasBecomeValidEventHandler,

      onHasBecomeInvalidEventHandler,

      scrollingContainerHTML_ID: "SCROLLABLE_CONTAINER"

    });

  }

}
