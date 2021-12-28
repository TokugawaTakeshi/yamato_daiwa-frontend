import SnackbarService from "./SnackbarService";

import componentTemplate from "./Snackbar.vue.pug"

import SuccessIcon from "@SVG_Icons/Checkmark/CheckmarkIcon__Circled__Filled.vue";
import InfoIcon from "@SVG_Icons/InfoSign/InfoSignIcon__Circled__Filled.vue";
import WarningIcon from "@SVG_Icons/ExclamationMark/ExclamationMarkIcon__Triangled__Filled.vue";
import ErrorIcon from "@SVG_Icons/ExclamationMark/ExclamationMarkIcon__Circled__Filled.vue";
import CloseActionIcon from "@SVG_Icons/MultiplicationSign/MultiplicationSignIcon__Octagoned__Filled.vue";

import {
  Options as VueComponentConfiguration,
  Vue as VueComponent
} from "vue-property-decorator";


@VueComponentConfiguration({
  template: componentTemplate,
  components: {
    SuccessIcon,
    InfoIcon,
    WarningIcon,
    ErrorIcon,
    CloseActionIcon
  }
})
class Snackbar extends VueComponent {

  public static Variations: Snackbar.Variations = {
    error: "ERROR",
    warning: "WARNING",
    info: "INFO",
    success: "SUCCESS"
  };

  protected readonly Variations: Snackbar.Variations = Snackbar.Variations;

  protected readonly snackbarService: SnackbarService = SnackbarService.getInstance();

  protected get variationModifierCSS_Class(): string | null {
    switch (this.snackbarService.variation) {
      case Snackbar.Variations.error: return "FloatingNotificationBar__ErrorVariation";
      case Snackbar.Variations.warning: return "FloatingNotificationBar__WarningVariation";
      case Snackbar.Variations.info: return "FloatingNotificationBar__InfoVariation";
      case Snackbar.Variations.success: return "FloatingNotificationBar__SuccessVariation";
      default: return null;
    }
  }
}


namespace Snackbar {
  export type Variations = {
    readonly error: "ERROR";
    readonly warning: "WARNING";
    readonly info: "INFO";
    readonly success: "SUCCESS";
  };
}


export default Snackbar;
