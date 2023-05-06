/* --- Assets ------------------------------------------------------------------------------------------------------- */
import Badge from "../Badge.vue";

/* --- Framework ---------------------------------------------------------------------------------------------------- */
import { ComponentBase as VueComponentConfiguration, Vue as VueComponent, Prop as VueProperty } from "vue-facing-decorator";

/* --- Utils -------------------------------------------------------------------------------------------------------- */
import { isString, toUpperCamelCase } from "@yamato-daiwa/es-extensions";
import YDF_ComponentsCoordinator from "../../YDF_ComponentsCoordinator";


@VueComponentConfiguration({})
export default class BadgeLoadingPlaceholder extends VueComponent {

  @VueProperty({
    type: String,
    default: Badge.Themes.regular,
    validator: (rawValue: unknown): boolean => isString(rawValue) && Object.values(Badge.Themes).includes(rawValue)
  })
  protected readonly theme!: string;

  @VueProperty({
    type: Boolean,
    default: YDF_ComponentsCoordinator.areThemesCSS_ClassesCommon || Badge.areThemesCSS_ClassesCommon
  })
  private readonly areThemesCSS_ClassesCommon!: boolean;


  @VueProperty({
    type: String,
    default: Badge.GeometricVariations.regular,
    validator: (rawValue: unknown): boolean =>
        isString(rawValue) && Object.values(Badge.GeometricVariations).includes(rawValue)
  })
  protected readonly geometry!: string;

  @VueProperty({ type: Array, default: (): Array<Badge.GeometricModifiers> => [] })
  private readonly geometricModifiers!: Array<Badge.GeometricModifiers>;


  protected get rootElementModifierCSS_Classes(): ReadonlyArray<string> {
    return [
      ...Object.entries(Badge.Themes).length > 1 && !this.areThemesCSS_ClassesCommon ?
          [ `Badge--YDF__${ toUpperCamelCase(this.theme) }Theme` ] : [],
      ...Object.entries(Badge.GeometricVariations).length > 1 ?
          [ `Badge--YDF__${ toUpperCamelCase(this.geometry) }Geometry` ] : [],
      ...this.geometricModifiers.includes(Badge.GeometricModifiers.pillShape) ?
          [ "Badge--YDF__PillShapeGeometricModifier" ] : []
    ];
  }

}
