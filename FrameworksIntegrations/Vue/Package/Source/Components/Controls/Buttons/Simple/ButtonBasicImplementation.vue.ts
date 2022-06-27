/* --- Assets ------------------------------------------------------------------------------------------------------- */
import componentTemplate from "./ButtonBasicImplementation.pug";

/* --- Children components ------------------------------------------------------------------------------------------ */
import Button from "./Button";

/* --- Utils -------------------------------------------------------------------------------------------------------- */
import { Options as VueComponentConfiguration } from "vue-property-decorator";


@VueComponentConfiguration({
  template: componentTemplate
})
export default class ButtonBasicImplementation extends Button.BasicLogic {}
