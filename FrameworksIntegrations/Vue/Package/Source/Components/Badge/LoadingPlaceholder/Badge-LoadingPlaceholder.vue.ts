/* ─── Assets ─────────────────────────────────────────────────────────────────────────────────────────────────────── */
import Badge from "../Badge.vue";
import componentVueTemplate from "./Badge-LoadingPlaceholder.vue.pug";

/* ─── Framework ──────────────────────────────────────────────────────────────────────────────────────────────────── */
import {
  ComponentBase as VueComponentConfiguration,
  Vue as VueComponent,
  Prop as VueProperty
} from "vue-facing-decorator";

/* ─── Utils ──────────────────────────────────────────────────────────────────────────────────────────────────────── */
import { isString, isElementOfEnumeration } from "@yamato-daiwa/es-extensions";
import ComponentsAuxiliaries from "../../ComponentsAuxiliaries";


@VueComponentConfiguration({
  name: "Badge--YDF-LoadingPlaceholder",
  template: componentVueTemplate
})
export default class BadgeLoadingPlaceholder extends VueComponent {

  @VueProperty({
    type: String,
    default: Badge.Themes.regular,
    validator: (rawValue: string): boolean => isElementOfEnumeration(rawValue, Badge.Themes)
  })
  protected readonly theme!: string;

  @VueProperty({ type: Boolean, default: Badge.areThemesCSS_ClassesCommon })
  protected readonly areThemesCSS_ClassesCommon!: boolean;


  @VueProperty({
    type: String,
    default: Badge.GeometricVariations.regular,
    validator: (rawValue: string): boolean => isElementOfEnumeration(rawValue, Badge.GeometricVariations)
  })
  protected readonly geometricVariation!: string;

  @VueProperty({
    type: Array,
    default: (): ReadonlyArray<Badge.GeometricModifiers> => [],
    validator: (rawValue: ReadonlyArray<unknown>): boolean =>
        rawValue.every(
          (element: unknown): boolean => isString(element) && isElementOfEnumeration(element, Badge.GeometricModifiers)
        )
  })
  protected readonly geometricModifiers!: ReadonlyArray<Badge.GeometricModifiers>;


  protected get rootElementModifierCSS_Classes(): ReadonlyArray<string> {
    return [

      ...ComponentsAuxiliaries.addThemeCSS_ClassToArrayIfMust({
        themeValue: this.theme,
        allThemes: Badge.Themes,
        areThemesCSS_ClassesCommon: this.areThemesCSS_ClassesCommon,
        CSS_Namespace: Badge.CSS_NAMESPACE
      }),

      ...ComponentsAuxiliaries.addGeometricVariationCSS_ClassToArrayIfMust({
        geometricVariation: this.geometricVariation,
        allGeometricVariations: Badge.GeometricVariations,
        CSS_Namespace: Badge.CSS_NAMESPACE
      }),

      ...ComponentsAuxiliaries.
          generateDemandedGeometricModifiersCSS_Classes(Badge.CSS_NAMESPACE, this.geometricModifiers)

    ];
  }

}
