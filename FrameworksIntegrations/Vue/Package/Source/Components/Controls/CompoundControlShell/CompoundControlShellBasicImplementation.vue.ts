/* --- Assets ------------------------------------------------------------------------------------------------------- */
import componentTemplate from "./CompoundControlShellBasicImplementation.vue.pug";
import CompoundControlShell from "./CompoundControlShell.vue";

/* --- Related components ------------------------------------------------------------------------------------------- */
import HorizontallySlidingContainer from "@Components/Utilitary/HorizontallySlidingContainer.vue";

/* --- Framework ---------------------------------------------------------------------------------------------------- */
import { Options as VueComponentConfiguration } from "vue-property-decorator";


@VueComponentConfiguration({
  template: componentTemplate,
  components: {
    HorizontallySlidingContainer
  }
})
export default class CompoundControlShellBasicImplementation extends CompoundControlShell.BasicLogic {}
