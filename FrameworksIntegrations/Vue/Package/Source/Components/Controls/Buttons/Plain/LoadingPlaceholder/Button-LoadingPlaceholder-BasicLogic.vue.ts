/* --- Assets ------------------------------------------------------------------------------------------------------- */
import Button from "@Components/Controls/Buttons/Plain/Button.vue";

/* --- Framework ---------------------------------------------------------------------------------------------------- */
import { Options as VueComponentConfiguration, Vue as VueComponent, Prop as VueProperty } from "vue-property-decorator";

/* --- Utils -------------------------------------------------------------------------------------------------------- */
import { isString, toUpperCamelCase } from "@yamato-daiwa/es-extensions";


@VueComponentConfiguration({})
export default class ButtonLoadingPlaceholder extends VueComponent {

  @VueProperty({
    type: String,
    default: Button.Themes.regular,
    validator: (rawValue: unknown): boolean => isString(rawValue) && Object.values(Button.Themes).includes(rawValue)
  })
  protected readonly theme!: string;

  @VueProperty({ type: Boolean, default: Button.areThemesExternal })
  private readonly areThemesExternal!: boolean;

  @VueProperty({
    type: String,
    default: Button.GeometricVariations.regular,
    validator: (rawValue: unknown): boolean =>
        isString(rawValue) && Object.values(Button.GeometricVariations).includes(rawValue)
  })
  protected readonly geometry!: string;

  @VueProperty({ type: Array, default: (): Array<Button.GeometricModifiers> => [] })
  private readonly geometricModifiers!: Array<Button.GeometricModifiers>;

  protected get rootElementModifierCSS_Classes(): Array<string> {
    return [
      ...Object.entries(Button.Themes).length > 1 && !this.areThemesExternal ?
          [ `Badge--YDF__${ toUpperCamelCase(this.theme) }Theme` ] : [],
      ...Object.entries(Button.GeometricVariations).length > 1 ?
          [ `Badge--YDF__${ toUpperCamelCase(this.geometry) }` ] : [],
      ...this.geometricModifiers.includes(Button.GeometricModifiers.pillShape) ?
          [ "Button--YDF__PillShapeGeometricModifier" ] : [],
      ...this.geometricModifiers.includes(Button.GeometricModifiers.squareShape) ?
          [ "Button--YDF__SquareShapeGeometricModifier" ] : []
    ];
  }
}
