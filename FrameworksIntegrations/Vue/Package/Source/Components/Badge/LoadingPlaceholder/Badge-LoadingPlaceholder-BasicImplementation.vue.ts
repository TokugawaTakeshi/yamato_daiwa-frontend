/* --- Assets ------------------------------------------------------------------------------------------------------- */
import componentTemplate from "./Badge-LoadingPlaceholder-BasicImplementation.vue.pug";
import BadgeLoadingPlaceholder from "@Components/Badge/LoadingPlaceholder/Badge-LoadingPlaceholder-BasicLogic.vue";

/* --- Framework ---------------------------------------------------------------------------------------------------- */
import { Options as VueComponentConfiguration } from "vue-property-decorator";


@VueComponentConfiguration({
  name: "Badge--YDF-LoadingPlaceholder",
  template: componentTemplate
})
export default class BadgeLoadingPlaceholderBasicImplementation extends BadgeLoadingPlaceholder {}
