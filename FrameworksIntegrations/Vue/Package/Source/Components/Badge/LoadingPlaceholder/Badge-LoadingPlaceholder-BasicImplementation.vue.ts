/* --- Assets ------------------------------------------------------------------------------------------------------- */
import componentTemplate from "./Badge-LoadingPlaceholder-BasicImplementation.vue.pug";
import BadgeLoadingPlaceholder from "./Badge-LoadingPlaceholder-BasicLogic.vue";

/* --- Framework ---------------------------------------------------------------------------------------------------- */
import { Component as VueComponentOptions } from "vue-facing-decorator";


@VueComponentOptions({
  name: "Badge--YDF-LoadingPlaceholder",
  template: componentTemplate
})
export default class BadgeLoadingPlaceholderBasicImplementation extends BadgeLoadingPlaceholder {}
