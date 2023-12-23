import { Snackbar } from "../../../../index";
import { addLeftClickEventHandler } from "@yamato-daiwa/es-extensions-browserjs";


addLeftClickEventHandler({
  targetElement: { selector: "#SNACKBAR_DISPLAYING_BUTTON" },
  mustExpectExactlyOneMatchingWithSelector: true,
  handler(): void {
    Snackbar.mountAndDisplayForAWhile({
      messageTextOrHTML: "Working fine!",
      decorativeVariation: Snackbar.DecorativeVariations.success,
      position: Snackbar.Positions.topMiddle
    });
  }
});
