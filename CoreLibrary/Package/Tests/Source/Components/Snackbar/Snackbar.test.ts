import Snackbar from "../../../../Components/Snackbar/Snackbar";
import getExpectedToBeSingleElement from "../../../../Utils/getExpectedToBeSingleElement";
import addClickEventHandler from "../../../../Utils/addClickEventHandler";


addClickEventHandler({
  targetElement: getExpectedToBeSingleElement({ selector: "#DisplaySnackbarButton" }),
  handler(): void {
    Snackbar.mountAndDisplayForAWhile({
      messageTextOrHTML: "Working fine!",
      decorativeVariation: Snackbar.DecorativeVariations.success
    });
  },
  handleParentElementFirst: false
});
