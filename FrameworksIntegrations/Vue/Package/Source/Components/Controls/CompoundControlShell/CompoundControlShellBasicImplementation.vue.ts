/* --- Assets ------------------------------------------------------------------------------------------------------- */
import componentTemplate from "./CompoundControlShellBasicImplementation.vue.pug";
import CompoundControlShell from "./CompoundControlShell.vue";

/* --- Framework ---------------------------------------------------------------------------------------------------- */
import { Options as VueComponentConfiguration } from "vue-property-decorator";


@VueComponentConfiguration({
  template: componentTemplate
})
export default class CompoundControlShellBasicImplementation extends CompoundControlShell.BasicLogic {}
