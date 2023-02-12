/* --- Assets ------------------------------------------------------------------------------------------------------- */
import componentTemplate from "./TextBox.vue.pug";
import TextBox from "./TextBox.vue";

/* --- Related components ------------------------------------------------------------------------------------------- */
import CompoundControlShellBasicImplementation from
    "@Components/Controls/CompoundControlShell/CompoundControlShellBasicImplementation.vue";

/* --- Framework ---------------------------------------------------------------------------------------------------- */
import { Options as VueComponentConfiguration } from "vue-property-decorator";


@VueComponentConfiguration({
  template: componentTemplate,
  components: {
    CompoundControlShell: CompoundControlShellBasicImplementation
  }
})
export default class TextBoxBasicImplementation extends TextBox.BasicLogic {}
