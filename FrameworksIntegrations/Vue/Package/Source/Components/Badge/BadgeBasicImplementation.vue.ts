/* --- Assets ------------------------------------------------------------------------------------------------------- */
import componentTemplate from "./BadgeBasicImplementation.vue.pug";
import Badge from "@Components/Badge/Badge.vue";

/* --- Framework ---------------------------------------------------------------------------------------------------- */
import { Options as VueComponentConfiguration } from "vue-property-decorator";


@VueComponentConfiguration({
  name: "Badge--YDF",
  template: componentTemplate
})
export default class BadgeBasicImplementation extends Badge.BasicLogic {}
