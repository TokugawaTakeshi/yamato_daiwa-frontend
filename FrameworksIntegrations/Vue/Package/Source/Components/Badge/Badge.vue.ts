/* --- Constants and enumerations ----------------------------------------------------------------------------------- */
import YDF_ComponentsCoordinator from "@Components/YDF_ComponentsCoordinator";

/* --- Framework ---------------------------------------------------------------------------------------------------- */
import { Options as VueComponentConfiguration, Vue as VueComponent, Prop as VueProperty } from "vue-property-decorator";

/* --- Utils -------------------------------------------------------------------------------------------------------- */
import {
  toLowerCamelCase,
  toUpperCamelCase,
  toScreamingSnakeCase,
  isString,
  isUndefined,
  isNull
} from "@yamato-daiwa/es-extensions";
import VueComponentImplementationHasNotBeenSetError from
    "@Components/_Errors/VueComponentImplementationHasNotBeenSet/VueComponentImplementationHasNotBeenSet";


namespace Badge {

  export type Themes = {
    readonly regular: "REGULAR";
    [themeName: string]: string;
  };

  export const Themes: Themes = { regular: "REGULAR" };

  export let areThemesExternal: boolean = YDF_ComponentsCoordinator.areThemesExternalByDefault;

  export function considerThemesAsExternal(): void {
    areThemesExternal = true;
  }


  export type GeometricVariations = {
    readonly regular: "REGULAR";
    [variationName: string]: string;
  };

  export const GeometricVariations: GeometricVariations = {
    regular: "REGULAR"
  };

  export enum GeometricModifiers {
    pillShape = "PILL_SHAPE"
  }


  export type DecorativeVariations = {
    readonly veryCatchyBright: "VERY_CATCHY_BRIGHT";
    readonly catchyBright: "CATCHY_BRIGHT";
    readonly modestlyCatchyBright: "MODESTLY_CATCHY_BRIGHT";
    readonly neutralBright: "NEUTRAL_BRIGHT";
    readonly modestlyCalmingBright: "MODESTLY_CALMING_BRIGHT";
    readonly calmingBright: "CALMING_BRIGHT";
    readonly achromaticBright: "ACHROMATIC_BRIGHT";
    readonly veryCatchyPastel: "VERY_CATCHY_PASTEL";
    readonly catchyPastel: "CATCHY_PASTEL";
    readonly modestlyCatchyPastel: "MODESTLY_CATCHY_PASTEL";
    readonly neutralPastel: "NEUTRAL_PASTEL";
    readonly modestlyCalmingPastel: "MODESTLY_CALMING_PASTEL";
    readonly calmingPastel: "CALMING_PASTEL";
    readonly achromaticPastel: "ACHROMATIC_PASTEL";
    [variationName: string]: string;
  };

  export const DecorativeVariations: DecorativeVariations = {
    veryCatchyBright: "VERY_CATCHY_BRIGHT",
    catchyBright: "CATCHY_BRIGHT",
    modestlyCatchyBright: "MODESTLY_CATCHY_BRIGHT",
    neutralBright: "NEUTRAL_BRIGHT",
    modestlyCalmingBright: "MODESTLY_CALMING_BRIGHT",
    calmingBright: "CALMING_BRIGHT",
    achromaticBright: "ACHROMATIC_BRIGHT",
    veryCatchyPastel: "VERY_CATCHY_PASTEL",
    catchyPastel: "CATCHY_PASTEL",
    modestlyCatchyPastel: "MODESTLY_CATCHY_PASTEL",
    neutralPastel: "NEUTRAL_PASTEL",
    modestlyCalmingPastel: "MODESTLY_CALMING_PASTEL",
    calmingPastel: "CALMING_PASTEL",
    achromaticPastel: "ACHROMATIC_PASTEL"
  };

  export enum DecorativeModifiers {
    bordersDisguising = "BORDERS_DISGUISING"
  }


  @VueComponentConfiguration({})
  export class BasicLogic extends VueComponent {

    /* === Properties =============================================================================================== */
    @VueProperty({ type: String })
    protected readonly keyLabel?: string | null;

    @VueProperty({ type: String, required: true })
    protected readonly valueLabel!: string;

    @VueProperty({ type: Boolean, default: false })
    protected readonly mustForceSingleLine!: boolean;


    @VueProperty({
      type: String,
      default: Themes.regular,
      validator: (rawValue: unknown): boolean => isString(rawValue) && Object.values(Themes).includes(rawValue)
    })
    protected readonly theme!: string;

    @VueProperty({ type: Boolean, default: areThemesExternal })
    protected readonly areThemesExternal!: boolean;


    @VueProperty({
      type: String,
      default: GeometricVariations.regular,
      validator: (rawValue: unknown): boolean => isString(rawValue) && Object.values(GeometricVariations).includes(rawValue)
    })
    protected readonly geometry!: string;

    @VueProperty({ type: Array, default: (): Array<GeometricModifiers> => [] })
    protected readonly geometricModifiers!: Array<GeometricModifiers>;


    @VueProperty({
      type: String,
      default: DecorativeVariations.regular,
      validator: (rawValue: unknown): boolean => isString(rawValue) && Object.values(DecorativeVariations).includes(rawValue)
    })
    protected readonly decoration!: string;

    @VueProperty({ type: Array, default: (): Array<DecorativeModifiers> => [] })
    protected readonly decorativeModifiers!: Array<DecorativeModifiers>;


    /* === Themes =================================================================================================== */
    public static readonly Themes: typeof Themes = Themes;

    public static defineNewThemes(themesNames: ReadonlyArray<string>): typeof BasicLogic {

      for (const themeName of themesNames) {
        Themes[toLowerCamelCase(themeName)] = toScreamingSnakeCase(themeName);
      }

      return BasicLogic;

    }


    /* --- Geometric variations ------------------------------------------------------------------------------------- */
    public static readonly GeometricVariations: typeof GeometricVariations = GeometricVariations;

    public static defineNewGeometricVariations(geometricVariationsNames: ReadonlyArray<string>): typeof BasicLogic {

      for (const geometricVariationsName of geometricVariationsNames) {
        GeometricVariations[toLowerCamelCase(geometricVariationsName)] = toScreamingSnakeCase(geometricVariationsName);
      }

      return BasicLogic;

    }


    /* --- Decorative variations ------------------------------------------------------------------------------------- */
    public static readonly DecorativeVariations: typeof DecorativeVariations = DecorativeVariations;

    public static defineNewDecorativeVariations(decorativeVariationsNames: ReadonlyArray<string>): typeof BasicLogic {

      for (const decorativeVariationsName of decorativeVariationsNames) {
        DecorativeVariations[toLowerCamelCase(decorativeVariationsName)] = toScreamingSnakeCase(decorativeVariationsName);
      }

      return BasicLogic;

    }


    /* === Auxiliaries ============================================================================================== */
    protected get rootElementModifierCSS_Classes(): Array<string> {
      return [
        ...this.mustForceSingleLine ? [ "Badge--YDF__SingleLineMode" ] : [],
        ...Object.entries(Themes).length > 1 && !this.areThemesExternal ?
            [ `Badge--YDF__${ toUpperCamelCase(this.theme) }Theme` ] : [],
        ...Object.entries(GeometricVariations).length > 1 ?
            [ `Badge--YDF__${ toUpperCamelCase(this.geometry) }Geometry` ] : [],
        ...this.geometricModifiers.includes(GeometricModifiers.pillShape) ?
            [ "Badge--YDF__PillShapeGeometricModifier" ] : [],
        ...Object.entries(DecorativeVariations).length > 1 ?
            [ `Badge--YDF__${ toUpperCamelCase(this.decoration) }Decoration` ] : [],
        ...this.decorativeModifiers.includes(DecorativeModifiers.bordersDisguising) ?
            [ "Badge--YDF__BordersDisguisingDecorativeModifier" ] : []
      ];
    }

  }


  /* === Providing ================================================================================================== */
  let Implementation: typeof VueComponent | null = null;

  export function setImplementation(_Implementation: typeof VueComponent): void {
    Implementation = _Implementation;
  }

  export function getImplementation(): typeof VueComponent {

    if (isNull(Implementation)) {
      throw new VueComponentImplementationHasNotBeenSetError({ vueComponentName: "Badge" });
    }


    return Implementation;

  }

  export function registerImplementationLocally(parentComponent: VueComponent, withName: string = "Badge"): void {

    if (isUndefined(parentComponent.$options.components)) {
      parentComponent.$options.components = {};
    }


    parentComponent.$options.components[withName] = getImplementation();

  }

}


export default Badge;
