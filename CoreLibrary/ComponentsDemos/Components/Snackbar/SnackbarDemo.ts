import { Snackbar } from "../../../Package/index";
import {
  getExpectedToBeSingleDOM_Element,
  addLeftClickEventHandler
} from "@yamato-daiwa/es-extensions-browserjs";


export default abstract class SnackbarDemo {

  public static initialize(): void {

    addLeftClickEventHandler({
      targetElement: getExpectedToBeSingleDOM_Element({ selector: "#DisplaySnackbarButton" }),
      handler(): void {
        Snackbar.mountAndDisplayForAWhile({
          messageTextOrHTML: "Working fine!",
          decorativeVariation: Snackbar.DecorativeVariations.success
        });
      }
    });

  }

}
