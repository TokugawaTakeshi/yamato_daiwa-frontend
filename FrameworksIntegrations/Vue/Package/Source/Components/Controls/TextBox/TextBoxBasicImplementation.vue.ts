/* --- Assets ------------------------------------------------------------------------------------------------------- */
import componentTemplate from "./TextBox.vue.pug";
import TextBox from "./TextBox.vue";

/* --- Framework ---------------------------------------------------------------------------------------------------- */
import { Options as VueComponentConfiguration } from "vue-property-decorator";


@VueComponentConfiguration({
  template: componentTemplate
})
export default class TextBoxBasicImplementation extends TextBox.BasicLogic {}
