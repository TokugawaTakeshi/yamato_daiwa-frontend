/* --- Assets ------------------------------------------------------------------------------------------------------- */
import CompoundControlShell from "./CompoundControlShell";

/* --- Children components ------------------------------------------------------------------------------------------ */
import componentTemplate from "./CompoundControlShellBasicImplementation.pug";

/* --- Framework ---------------------------------------------------------------------------------------------------- */
import { Options as VueComponentConfiguration } from "vue-property-decorator";


@VueComponentConfiguration({
  template: componentTemplate
})
export default class CompoundControlShellBasicImplementation extends CompoundControlShell.BasicLogic {}
