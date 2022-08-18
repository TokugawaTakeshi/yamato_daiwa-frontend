/* --- Assets ------------------------------------------------------------------------------------------------------- */
import componentTemplate from "./BadgeBasicImplementation.vue.pug";
import AttentionBox from "@Components/AttentionBox/AttentionBox.vue";

/* --- Utils -------------------------------------------------------------------------------------------------------- */
import { Options as VueComponentConfiguration } from "vue-property-decorator";


@VueComponentConfiguration({
  template: componentTemplate
})
export default class AttentionBoxBasicImplementation extends AttentionBox.BasicLogic {}
