/* ─── Assets ─────────────────────────────────────────────────────────────────────────────────────────────────────── */
import componentVueTemplate from "./Badge.vue.pug";

/* ─── Framework ──────────────────────────────────────────────────────────────────────────────────────────────────── */
import {
  ComponentBase as VueComponentConfiguration,
  Vue as VueComponent,
  Prop as VueProperty
} from "vue-facing-decorator";

/* ─── Utils ──────────────────────────────────────────────────────────────────────────────────────────────────────── */
import { isString, isElementOfEnumeration } from "@yamato-daiwa/es-extensions";
import ComponentsAuxiliaries from "../ComponentsAuxiliaries";


@VueComponentConfiguration({
  name: Badge.CSS_NAMESPACE,
  template: componentVueTemplate
})
class Badge extends VueComponent {

  public static CSS_NAMESPACE: string = "Badge--YDF";


  @VueProperty({ type: String })
  protected readonly keyLabel?: string | null;

  @VueProperty({ type: String, required: true })
  protected readonly valueLabel!: string;

  @VueProperty({ type: String, default: "span" })
  protected readonly rootElementTag!: string;


  /* ━━━ Theming ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public static readonly Themes: Badge.Themes = { regular: "REGULAR" };

  @VueProperty({
    type: String,
    default: Badge.Themes.regular,
    validator: (rawValue: string): boolean => isElementOfEnumeration(rawValue, Badge.Themes)
  })
  protected readonly theme!: string;

  public static defineThemes(themesNames: ReadonlyArray<string>): typeof Badge {
    return ComponentsAuxiliaries.defineThemes(themesNames, Badge);
  }

  public static areThemesCSS_ClassesCommon: boolean = ComponentsAuxiliaries.areThemesCSS_ClassesCommon;

  public static considerThemesAsCommon(): void {
    Badge.areThemesCSS_ClassesCommon = true;
  }

  @VueProperty({ type: Boolean, default: Badge.areThemesCSS_ClassesCommon })
  protected readonly areThemesCSS_ClassesCommon!: boolean;


  /* ─── Geometry ─────────────────────────────────────────────────────────────────────────────────────────────────── */
  public static readonly GeometricVariations: Badge.GeometricVariations = { regular: "REGULAR" };

  @VueProperty({
    type: String,
    default: Badge.GeometricVariations.regular,
    validator: (rawValue: string): boolean => isElementOfEnumeration(rawValue, Badge.GeometricVariations)
  })
  protected readonly geometricVariation!: string;

  public static defineGeometricVariations(geometricVariationsNames: ReadonlyArray<string>): typeof Badge {
    return ComponentsAuxiliaries.defineGeometricVariations(geometricVariationsNames, Badge);
  }

  @VueProperty({
    type: Array,
    default: (): ReadonlyArray<Badge.GeometricModifiers> => [],
    validator: (rawValue: ReadonlyArray<unknown>): boolean =>
        rawValue.every(
          (element: unknown): boolean => isString(element) && isElementOfEnumeration(element, Badge.GeometricModifiers)
        )
  })
  protected readonly geometricModifiers!: ReadonlyArray<Badge.GeometricModifiers>;


  /* ─── Decoration ───────────────────────────────────────────────────────────────────────────────────────────────── */
  public static readonly DecorativeVariations: Badge.DecorativeVariations = {
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

  @VueProperty({
    type: String,
    required: true,
    validator: (rawValue: string): boolean => isElementOfEnumeration(rawValue, Badge.DecorativeVariations)
  })
  protected readonly decorativeVariation!: string;

  public static defineDecorativeVariations(decorativeVariationsNames: ReadonlyArray<string>): typeof Badge {
    return ComponentsAuxiliaries.defineDecorativeVariations(decorativeVariationsNames, Badge);
  }

   @VueProperty({
    type: Array,
    default: (): ReadonlyArray<Badge.DecorativeModifiers> => [],
    validator: (rawValue: ReadonlyArray<unknown>): boolean =>
        rawValue.every(
          (element: unknown): boolean => isString(element) && isElementOfEnumeration(element, Badge.DecorativeModifiers)
        )
  })
  protected readonly decorativeModifiers!: ReadonlyArray<Badge.DecorativeModifiers>;


  /* ━━━ CSS Classes ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
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
          generateDemandedGeometricModifiersCSS_Classes(Badge.CSS_NAMESPACE, this.geometricModifiers),

      ...ComponentsAuxiliaries.addDecorativeVariationCSS_ClassToArrayIfMust({
        decorativeVariation: this.decorativeVariation,
        allDecorativeVariations: Badge.DecorativeVariations,
        CSS_Namespace: Badge.CSS_NAMESPACE
      }),

      ...ComponentsAuxiliaries.
          generateDemandedDecorativeModifiersCSS_Classes(Badge.CSS_NAMESPACE, this.decorativeModifiers)

    ];
  }

}


namespace Badge {

  export type Themes = {
    readonly regular: "REGULAR";
    [themeName: string]: string;
  };

  export type GeometricVariations = {
    readonly regular: "REGULAR";
    [variationName: string]: string;
  };

  export enum GeometricModifiers {
    pillShape = "PILL_SHAPE",
    singleLine = "SINGLE_LINE"
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

  export enum DecorativeModifiers {
    bordersDisguising = "BORDERS_DISGUISING",
    noBackground = "NO_BACKGROUND"
  }

}


export default Badge;
