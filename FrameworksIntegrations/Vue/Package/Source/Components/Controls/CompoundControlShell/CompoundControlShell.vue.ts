import {
  Options as VueComponentConfiguration,
  Vue as VueComponent,
  Prop as VueProperty
} from "vue-property-decorator";
import { isString } from "@yamato-daiwa/es-extensions";


namespace CompoundControlShell {

  export type Themes = {
    readonly regular: "REGULAR";
    [themeName: string]: string;
  };

  export const Themes: Themes = { regular: "REGULAR" };


  export type GeometricVariations = {
    readonly regular: "REGULAR";
    [themeName: string]: string;
  };

  export const GeometricVariations: GeometricVariations = {
    regular: "REGULAR"
  };


  export type DecorativeVariations = {
    readonly regular: "REGULAR";
    [themeName: string]: string;
  };

  export const DecorativeVariations: DecorativeVariations = {
    regular: "REGULAR"
  };


  @VueComponentConfiguration({})
  export class BasicLogic extends VueComponent {

    @VueProperty({ type: String })
    protected readonly label?: string;

    @VueProperty({ type: String })
    protected readonly guidance?: string;


    @VueProperty({ type: Boolean, default: false })
    protected readonly required!: boolean;

    @VueProperty({ type: Boolean, default: false })
    protected readonly displayAppropriateBadgeIfInputIsRequired!: boolean;

    @VueProperty({ type: Boolean, default: false })
    protected readonly displayAppropriateBadgeIfInputIsOptional!: boolean;


    @VueProperty({ type: String })
    protected readonly coreElementHTML_ID?: string;

    @VueProperty({ type: String })
    protected readonly labelElementHTML_ID?: string;


    @VueProperty({ type: [ String, Array ] })
    protected readonly mainSlotWrapperAdditionalCSS_Classes?: Array<string> | string;

    @VueProperty({ type: Boolean, default: false })
    protected readonly mustActivateAppropriateHighlightIfAnyErrorsMessages!: boolean;

    @VueProperty({ type: Array, default: (): Array<string> => [] })
    protected readonly errorsMessages!: Array<string>;


    @VueProperty({
      type: String,
      default: Themes.regular,
      validator: (rawValue: unknown): boolean => isString(rawValue) && Object.values(Themes).includes(rawValue)
    })
    protected readonly theme!: string;

    @VueProperty({
      type: String,
      default: GeometricVariations.regular,
      validator: (rawValue: unknown): boolean => isString(rawValue) && Object.values(GeometricVariations).includes(rawValue)
    })
    protected readonly geometry!: string;

    @VueProperty({
      type: String,
      default: DecorativeVariations.regular,
      validator: (rawValue: unknown): boolean => isString(rawValue) && Object.values(DecorativeVariations).includes(rawValue)
    })
    protected readonly decoration!: string;
  }
}


export default CompoundControlShell;
