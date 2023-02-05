import Snackbar from "../../../Components/Snackbar/Snackbar";
import {
  getExpectedToBeSingleDOM_Element,
  addLeftClickEventHandler
} from "@yamato-daiwa/es-extensions-browserjs";


addLeftClickEventHandler({
  targetElement: getExpectedToBeSingleDOM_Element({ selector: "#DisplaySnackbarButton" }),
  handler(): void {
    Snackbar.mountAndDisplayForAWhile({
      messageTextOrHTML: "Working fine!",
      decorativeVariation: Snackbar.DecorativeVariations.success
    });
  }
});
