/* --- Assets ------------------------------------------------------------------------------------------------------- */
import componentTemplate from "./ButtonBasicImplementation.vue.pug";
import Button from "./Button.vue";

/* --- Utils -------------------------------------------------------------------------------------------------------- */
import { Options as VueComponentConfiguration } from "vue-property-decorator";


@VueComponentConfiguration({
  template: componentTemplate
})
export default class ButtonBasicImplementation extends Button.BasicLogic {}
