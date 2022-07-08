/* --- Assets ------------------------------------------------------------------------------------------------------- */
import componentTemplate from "./DropDownList.vue.pug";
import DropDownList from "./DropDownList";

/* --- Utils -------------------------------------------------------------------------------------------------------- */
import { Options as VueComponentConfiguration } from "vue-property-decorator";


@VueComponentConfiguration({
  template: componentTemplate
})
export default class DropDownListBasicImplementation extends DropDownList.BasicLogic {}
