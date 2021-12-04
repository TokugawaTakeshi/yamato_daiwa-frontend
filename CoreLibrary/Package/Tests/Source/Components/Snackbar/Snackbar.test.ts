import Snackbar from "../../../../Components/Snackbar/Snackbar";

document.querySelector("#DisplaySnackbarButton").addEventListener("click", (): void => {
  Snackbar.mountAndDisplayForAWhile({
    messageTextOrHTML: "No problems!",
    decorativeVariation: Snackbar.DecorativeVariations.success
  });
});
