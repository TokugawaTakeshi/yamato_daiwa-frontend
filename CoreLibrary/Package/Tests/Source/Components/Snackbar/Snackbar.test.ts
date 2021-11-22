import Snackbar from "../../../../Components/Snackbar/Snackbar";

document.querySelector("#DisplaySnackbarButton").addEventListener("click", (): void => {
  Snackbar.mountAndDisplayForAWhile({
    textOrHTML: "No problems!",
    decorativeVariation: Snackbar.DecorativeVariations.success
  });
});
