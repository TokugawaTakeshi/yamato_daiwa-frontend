/* --- Assets ------------------------------------------------------------------------------------------------------- */
import componentTemplate from "./Badge-BasicImplementation.vue.pug";
import Badge from "./Badge.vue";

/* --- Framework ---------------------------------------------------------------------------------------------------- */
import { Component as VueComponentOptions } from "vue-facing-decorator";


@VueComponentOptions({
  name: "Badge--YDF",
  template: componentTemplate
})
export default class BadgeBasicImplementation extends Badge.BasicLogic {}
