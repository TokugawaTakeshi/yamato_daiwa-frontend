import componentTemplate from "./Snackbar.vue.pug"

import {
  Options as VueComponentConfiguration,
  Vue as VueComponent
} from "vue-property-decorator";


@VueComponentConfiguration({
  template: componentTemplate,
  components: {
    ErrorIcon,
    WarningIcon,
    InfoIcon,
    SuccessIcon,
    CloseActionIcon
  }
})
class FloatingNotificationBar extends VueComponent {

  public static Variations: FloatingNotificationBar.Variations = {
    error: "ERROR",
    warning: "WARNING",
    info: "INFO",
    success: "SUCCESS"
  };

  private readonly Variations: FloatingNotificationBar.Variations = FloatingNotificationBar.Variations;

  private readonly ownService: FloatingNotificationBarService = getModule(FloatingNotificationBarService);

  private get variationModifierCSS_Class(): string | null {
    switch (this.ownService.variation) {
      case FloatingNotificationBar.Variations.error: return "FloatingNotificationBar__ErrorVariation";
      case FloatingNotificationBar.Variations.warning: return "FloatingNotificationBar__WarningVariation";
      case FloatingNotificationBar.Variations.info: return "FloatingNotificationBar__InfoVariation";
      case FloatingNotificationBar.Variations.success: return "FloatingNotificationBar__SuccessVariation";
      default: return null;
    }
  }
}


namespace FloatingNotificationBar {
  export type Variations = {
    readonly error: "ERROR";
    readonly warning: "WARNING";
    readonly info: "INFO";
    readonly success: "SUCCESS";
  };
}


export default FloatingNotificationBar;

