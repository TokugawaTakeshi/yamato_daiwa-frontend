/* ─── Assets ─────────────────────────────────────────────────────────────────────────────────────────────────────── */
import componentVueTemplate from "./AdmonitionBlock.vue.pug";
import PencilIcon__Circled__Filled from "../../SVG_Icons/Pencil/PencilIcon__Circled__Filled.vue";
import ExclamationMarkIcon__Circled__Filled from "./../../SVG_Icons/ExclamationMark/ExclamationMarkIcon__Circled__Filled.vue";
import ExclamationMarkIcon__Triangled__Filled from "./../../SVG_Icons/ExclamationMark/ExclamationMarkIcon__Triangled__Filled.vue";
import CheckmarkIcon__Circled__Filled from "../../SVG_Icons/Checkmark/CheckmarkIcon__Circled__Filled.vue";
import InfoSignIcon__Circled__Filled from "../../SVG_Icons/InfoSign/InfoSignIcon__Circled__Filled.vue";
import QuestionMarkIcon__Circled__Filled from "../../SVG_Icons/QuestionMark/QuestionMarkIcon__Circled__Filled.vue";
import MultiplicationSignIcon__Boxed__Filled from
    "../../SVG_Icons/MultiplicationSign/MultiplicationSignIcon__Boxed__Filled.vue";
import type { AdmonitionBlockLocalization } from "@yamato-daiwa/frontend";
import { admonitionBlockYDF_ComponentLocalization__english } from "@yamato-daiwa/frontend";

/* ─── Related GUI_Components ─────────────────────────────────────────────────────────────────────────────────────── */
import { Vue3SlideUpDown as VerticallySlidingAlwaysMountedContainer } from "vue3-slide-up-down";

/* ─── Framework ──────────────────────────────────────────────────────────────────────────────────────────────────── */
import {
  ComponentBase as VueComponentConfiguration,
  Vue as VueComponent,
  Prop as VueProperty
} from "vue-facing-decorator";

/* ─── Utils ──────────────────────────────────────────────────────────────────────────────────────────────────────── */
import { isStringOfLength, isElementOfEnumeration } from "@yamato-daiwa/es-extensions";
import ComponentsAuxiliaries from "../ComponentsAuxiliaries";


@VueComponentConfiguration({
  name: AdmonitionBlock.CSS_NAMESPACE,
  template: componentVueTemplate,
  components: {
    VerticallySlidingAlwaysMountedContainer,
    PencilIcon__Circled__Filled,
    ExclamationMarkIcon__Circled__Filled,
    ExclamationMarkIcon__Triangled__Filled,
    CheckmarkIcon__Circled__Filled,
    InfoSignIcon__Circled__Filled,
    QuestionMarkIcon__Circled__Filled,
    MultiplicationSignIcon__Boxed__Filled
  }
})
class AdmonitionBlock extends VueComponent {

  public static CSS_NAMESPACE: string = "AdmonitionBlock--YDF";


  @VueProperty({
    type: String,
    required: false,
    validator: (rawValue: unknown): boolean => isStringOfLength(rawValue, { minimalCharactersCount: 1 })
  })
  protected readonly title!: string;


  /* ━━━ Dismissing ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  @VueProperty({ type: Boolean, default: false })
  protected readonly dismissible!: boolean;

  protected isDisplaying: boolean = true;

  protected onClickDismissingButton(): void {
    this.isDisplaying = false;
  }


  /* ━━━ Theming ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public static readonly Themes: AdmonitionBlock.Themes = { regular: "REGULAR" };

  @VueProperty({
    type: String,
    default: AdmonitionBlock.Themes.regular,
    validator: (rawValue: string): boolean => isElementOfEnumeration(rawValue, AdmonitionBlock.Themes)
  })
  protected readonly theme!: string;

  public static defineThemes(themesNames: ReadonlyArray<string>): typeof AdmonitionBlock {
    return ComponentsAuxiliaries.defineThemes(themesNames, AdmonitionBlock);
  }

  protected static areThemesCSS_ClassesCommon: boolean = ComponentsAuxiliaries.areThemesCSS_ClassesCommon;

  public static considerThemesAsCommon(): void {
    AdmonitionBlock.areThemesCSS_ClassesCommon = true;
  }

  @VueProperty({ type: Boolean, default: AdmonitionBlock.areThemesCSS_ClassesCommon })
  protected readonly areThemesCSS_ClassesCommon!: boolean;


  /* ─── Geometry ─────────────────────────────────────────────────────────────────────────────────────────────────── */
  public static readonly GeometricVariations: AdmonitionBlock.GeometricVariations = {
    regular: "REGULAR",
    stickyNoteLike: "STICKY_NOTE_LIKE"
  };

  @VueProperty({
    type: String,
    default: AdmonitionBlock.GeometricVariations.regular,
    validator: (rawValue: string): boolean => isElementOfEnumeration(rawValue, AdmonitionBlock.GeometricVariations)
  })
  protected readonly geometricVariation!: string;

  public static defineGeometricVariations(geometricVariationsNames: ReadonlyArray<string>): typeof AdmonitionBlock {
    return ComponentsAuxiliaries.defineGeometricVariations(geometricVariationsNames, AdmonitionBlock);
  }


  /* ─── Decoration ───────────────────────────────────────────────────────────────────────────────────────────────── */
  public static readonly DecorativeVariations: AdmonitionBlock.DecorativeVariations = {
    notice: "NOTICE",
    error: "ERROR",
    warning: "WARNING",
    success: "SUCCESS",
    guidance: "GUIDANCE",
    question: "QUESTION"
  };

  @VueProperty({
    type: String,
    required: true,
    validator: (rawValue: string): boolean => isElementOfEnumeration(rawValue, AdmonitionBlock.DecorativeVariations)
  })
  protected readonly decorativeVariation!: string;

  public static defineDecorativeVariations(decorativeVariationsNames: ReadonlyArray<string>): typeof AdmonitionBlock {
    return ComponentsAuxiliaries.defineDecorativeVariations(decorativeVariationsNames, AdmonitionBlock);
  }


  /* ━━━ SVG Icon ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  @VueProperty({ type: Boolean, default: false })
  protected readonly hasDefaultSVG_Icon!: boolean;

  protected get defaultSVG_IconComponentName(): string | null {
    switch (this.decorativeVariation) {
      case AdmonitionBlock.DecorativeVariations.notice: return "PencilIcon__Circled__Filled";
      case AdmonitionBlock.DecorativeVariations.error: return "ExclamationMarkIcon__Circled__Filled";
      case AdmonitionBlock.DecorativeVariations.warning: return "ExclamationMarkIcon__Triangled__Filled";
      case AdmonitionBlock.DecorativeVariations.success: return "CheckmarkIcon__Circled__Filled";
      case AdmonitionBlock.DecorativeVariations.guidance: return "InfoSignIcon__Circled__Filled";
      case AdmonitionBlock.DecorativeVariations.question: return "QuestionMarkIcon__Circled__Filled";
      default: return null;
    }
  }


  /* ━━━ CSS Classes ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  protected get rootElementModifierCSS_Classes(): Array<string> {
    return [

      ...ComponentsAuxiliaries.addThemeCSS_ClassToArrayIfMust({
        themeValue: this.theme,
        allThemes: AdmonitionBlock.Themes,
        areThemesCSS_ClassesCommon: this.areThemesCSS_ClassesCommon,
        CSS_Namespace: AdmonitionBlock.CSS_NAMESPACE
      }),

      ...ComponentsAuxiliaries.addGeometricVariationCSS_ClassToArrayIfMust({
        geometricVariation: this.geometricVariation,
        allGeometricVariations: AdmonitionBlock.GeometricVariations,
        CSS_Namespace: AdmonitionBlock.CSS_NAMESPACE
      }),

      ...ComponentsAuxiliaries.addDecorativeVariationCSS_ClassToArrayIfMust({
        decorativeVariation: this.decorativeVariation,
        allDecorativeVariations: AdmonitionBlock.DecorativeVariations,
        CSS_Namespace: AdmonitionBlock.CSS_NAMESPACE
      })

    ];
  }


  /* ━━━ Localization ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public static localization: AdmonitionBlockLocalization = admonitionBlockYDF_ComponentLocalization__english;


  /* ━━━ ID Generating ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── Instance ID ──────────────────────────────────────────────────────────────────────────────────────────────── */
  protected readonly INSTANCE_ID: string = AdmonitionBlock.generateInstanceID();
  protected static counterForInstanceID_Generating: number = 0;

  public static generateInstanceID(): string {
    AdmonitionBlock.counterForInstanceID_Generating++;
    return `ADMONITION_BLOCK--YDF-${ AdmonitionBlock.counterForInstanceID_Generating }`;
  }


  /* ─── Title HTML ID ────────────────────────────────────────────────────────────────────────────────────────────── */
  protected TITLE_HTML_ID: string = `${ this.INSTANCE_ID }-TITLE`;


  /* ━━━ Non-Reactive Fields ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  protected localization!: AdmonitionBlockLocalization;

  public created(): void {
    this.localization = AdmonitionBlock.localization;
  }

}


namespace AdmonitionBlock {

  export type Themes = {
    readonly regular: "REGULAR";
    [themeName: string]: string;
  };

  export type GeometricVariations = {
    readonly regular: "REGULAR";
    readonly stickyNoteLike: "STICKY_NOTE_LIKE";
    [variationName: string]: string;
  };

  export type DecorativeVariations = {
    readonly notice: "NOTICE";
    readonly error: "ERROR";
    readonly warning: "WARNING";
    readonly success: "SUCCESS";
    readonly guidance: "GUIDANCE";
    readonly question: "QUESTION";
    [variationName: string]: string;
  };

}


export default AdmonitionBlock;
