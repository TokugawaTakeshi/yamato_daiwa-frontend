/* --- Assets ------------------------------------------------------------------------------------------------------- */
import componentTemplate from "./Button-LoadingPlaceholder-BasicImplementation.vue.pug";
import ButtonLoadingPlaceholder from
    "@Components/Controls/Buttons/Plain/LoadingPlaceholder/Button-LoadingPlaceholder-BasicLogic.vue";

/* --- Framework ---------------------------------------------------------------------------------------------------- */
import { Options as VueComponentConfiguration } from "vue-property-decorator";


@VueComponentConfiguration({
  name: "Button--YDF-LoadingPlaceholder",
  template: componentTemplate
})
export default class ButtonLoadingPlaceholderBasicImplementation extends ButtonLoadingPlaceholder {}
