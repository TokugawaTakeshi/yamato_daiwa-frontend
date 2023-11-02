/* ━━━ Imports ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
/* ─── Framework ─────────────────────────────────────────────────────────────────────────────────────────────────── */
import { ComponentBase as VueComponentConfiguration, Vue as VueComponent, Prop as VueProperty } from "vue-facing-decorator";
import type { ComponentPublicInstance as VueComponentPublicInstance } from "vue";

/* ─── Framework ─────────────────────────────────────────────────────────────────────────────────────────────────── */
import {
  toLowerCamelCase,
  toUpperCamelCase,
  toScreamingSnakeCase,
  isString,
  isUndefined,
  isNotUndefined,
  isNull,
  isNotNull
} from "@yamato-daiwa/es-extensions";
import VueComponentImplementationHasNotBeenSetError from
    "../_Errors/VueComponentImplementationHasNotBeenSet/VueComponentImplementationHasNotBeenSet";
import YDF_ComponentsCoordinator from "../YDF_ComponentsCoordinator";


namespace Badge {

  /* ━━━ Theming ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  export type Themes = {
    readonly regular: "REGULAR";
    [themeName: string]: string;
  };

  export const Themes: Themes = { regular: "REGULAR" };

  export let areThemesCSS_ClassesCommon: boolean = YDF_ComponentsCoordinator.areThemesCSS_ClassesCommon;

  export function considerThemesAsCommon(): void {
    areThemesCSS_ClassesCommon = true;
  }


  /* ─── Geometry ────────────────────────────────────────────────────────────────────────────────────────────────── */
  export type GeometricVariations = {
    readonly regular: "REGULAR";
    [variationName: string]: string;
  };

  export const GeometricVariations: GeometricVariations = {
    regular: "REGULAR"
  };

  export enum GeometricModifiers {
    pillShape = "PILL_SHAPE",
    singleLine = "SINGLE_LINE"
  }


  /* ─── Decoration ──────────────────────────────────────────────────────────────────────────────────────────────── */
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
    bordersDisguising = "BORDERS_DISGUISING",
    noBackground = "NO_BACKGROUND"
  }


  @VueComponentConfiguration({})
  export class BasicLogic extends VueComponent {

    /* ━━━ Properties ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    @VueProperty({ type: String })
    protected readonly keyLabel?: string | null;

    @VueProperty({ type: String, required: true })
    protected readonly valueLabel!: string;


    @VueProperty({
      type: String,
      default: Themes.regular,
      validator: (rawValue: unknown): boolean => isString(rawValue) && Object.values(Themes).includes(rawValue)
    })
    protected readonly theme!: string;

    @VueProperty({ type: Boolean, default: YDF_ComponentsCoordinator.areThemesCSS_ClassesCommon || areThemesCSS_ClassesCommon })
    protected readonly areThemesCSS_ClassesCommon!: boolean;


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


    /* ━━━ Themes ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    public static readonly Themes: typeof Themes = Themes;

    public static defineCustomThemes(themesNames: ReadonlyArray<string>): typeof BasicLogic {

      for (const themeName of themesNames) {
        Themes[toLowerCamelCase(themeName)] = toScreamingSnakeCase(themeName);
      }

      return BasicLogic;

    }


    /* ─── Geometric variations ──────────────────────────────────────────────────────────────────────────────────── */
    public static readonly GeometricVariations: typeof GeometricVariations = GeometricVariations;

    public static defineCustomGeometricVariations(geometricVariationsNames: ReadonlyArray<string>): typeof BasicLogic {

      for (const geometricVariationsName of geometricVariationsNames) {
        GeometricVariations[toLowerCamelCase(geometricVariationsName)] = toScreamingSnakeCase(geometricVariationsName);
      }

      return BasicLogic;

    }


    /* ───  Decorative variations ────────────────────────────────────────────────────────────────────────────────── */
    public static readonly DecorativeVariations: typeof DecorativeVariations = DecorativeVariations;

    public static defineCustomDecorativeVariations(decorativeVariationsNames: ReadonlyArray<string>): typeof BasicLogic {

      for (const decorativeVariationsName of decorativeVariationsNames) {
        DecorativeVariations[toLowerCamelCase(decorativeVariationsName)] = toScreamingSnakeCase(decorativeVariationsName);
      }

      return BasicLogic;

    }


    /* ━━━ Auxiliaries ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    protected get rootElementModifierCSS_Classes(): ReadonlyArray<string> {
      return [

        ...Object.entries(Themes).length > 1 && !this.areThemesCSS_ClassesCommon ?
            [ `Badge--YDF__${ toUpperCamelCase(this.theme) }Theme` ] : [],

        ...Object.entries(GeometricVariations).length > 1 ?
            [ `Badge--YDF__${ toUpperCamelCase(this.geometry) }Geometry` ] : [],
        ...this.geometricModifiers.includes(GeometricModifiers.pillShape) ?
            [ "Badge--YDF__PillShapeGeometricModifier" ] : [],
        ...this.geometricModifiers.includes(GeometricModifiers.singleLine) ?
            [ "Badge--YDF__SingleLineGeometricModifier" ] : [],

        ...Object.entries(DecorativeVariations).length > 1 ?
            [ `Badge--YDF__${ toUpperCamelCase(this.decoration) }Decoration` ] : [],
        ...this.decorativeModifiers.includes(DecorativeModifiers.bordersDisguising) ?
            [ "Badge--YDF__BordersDisguisingDecorativeModifier" ] : [],
        ...this.decorativeModifiers.includes(DecorativeModifiers.noBackground) ?
            [ "Badge--YDF__NoBackgroundDecorativeModifier" ] : []

      ];
    }

  }


  /* ━━━ Providing ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  let Implementation: typeof VueComponent | null = null;
  let LoadingPlaceholderImplementation: typeof VueComponent | null = null;

  export function setImplementation(
    _Implementation: typeof VueComponent, _LoadingPlaceholderImplementation?: typeof VueComponent
  ): void {

    Implementation = _Implementation;

    if (isNotUndefined(_LoadingPlaceholderImplementation)) {
      LoadingPlaceholderImplementation = _LoadingPlaceholderImplementation;
    }

  }

  export function getImplementation(): typeof VueComponent {

    if (isNull(Implementation)) {
      throw new VueComponentImplementationHasNotBeenSetError({ vueComponentName: "Badge" });
    }


    return Implementation;

  }

  export function registerImplementationLocally(
    parentComponent: VueComponentPublicInstance,
    names: Readonly<{ main: string; loadingPlaceholder: string; }> =
        { main: "Badge", loadingPlaceholder: "BadgeLoadingPlaceholder" }
  ): void {

    if (isUndefined(parentComponent.$options.components)) {
      parentComponent.$options.components = {};
    }


    parentComponent.$options.components[names.main] = getImplementation();

    if (isNotNull(LoadingPlaceholderImplementation)) {
      parentComponent.$options.components[names.loadingPlaceholder] = LoadingPlaceholderImplementation;
    }

  }

}


export default Badge;
