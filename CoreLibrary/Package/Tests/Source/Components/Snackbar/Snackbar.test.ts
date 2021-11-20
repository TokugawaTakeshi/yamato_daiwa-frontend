import Snackbar from "../../../../Components/Snackbar/Snackbar";


Snackbar.mount({ parentElementSelector: "body" });

document.querySelector("#DisplaySnackbarButton").addEventListener("click", (): void => {
  Snackbar.displayForAWhile({
    message: "",
    semantic: "",
    displayingDuration: "11"
  });
});
