/* --- Assets ------------------------------------------------------------------------------------------------------- */
import ExclamationMarkIcon__Circled__Filled from "./../../SVG_Icons/ExclamationMark/ExclamationMarkIcon__Circled__Filled.vue";
import ExclamationMarkIcon__Triangled__Filled from "./../../SVG_Icons/ExclamationMark/ExclamationMarkIcon__Triangled__Filled.vue";

/* --- Framework ---------------------------------------------------------------------------------------------------- */
import {
  Options as VueComponentConfiguration,
  Vue as VueComponent,
  Prop as VueProperty
} from "vue-property-decorator";

/* --- Utils -------------------------------------------------------------------------------------------------------- */
import {
  toLowerCamelCase,
  toUpperCamelCase,
  toScreamingSnakeCase,
  isString,
  isNull
} from "@yamato-daiwa/es-extensions";
import VueComponentImplementationHasNotBeenSetError from
    "@Components/_Errors/VueComponentImplementationHasNotBeenSet/VueComponentImplementationHasNotBeenSet";


namespace AttentionBox {

  export type Themes = {
    readonly regular: "REGULAR";
    [themeName: string]: string;
  };

  export const Themes: Themes = { regular: "REGULAR" };


  export type GeometricVariations = {
    readonly regular: "REGULAR";
    [variationName: string]: string;
  };

  export const GeometricVariations: GeometricVariations = {
    regular: "REGULAR"
  };


  export type DecorativeVariations = {
    readonly importantInfo: "IMPORTANT_INFO";
    readonly secondaryInfo: "SECONDARY_INFO";
    readonly notice: "NOTICE";
    readonly error: "ERROR";
    readonly warning: "WARNING";
    readonly success: "SUCCESS";
    readonly guidance: "GUIDANCE";
    readonly question: "QUESTION";
    [variationName: string]: string;
  };

  export const DecorativeVariations: DecorativeVariations = {
    importantInfo: "IMPORTANT_INFO",
    secondaryInfo: "SECONDARY_INFO",
    notice: "NOTICE",
    error: "ERROR",
    warning: "WARNING",
    success: "SUCCESS",
    guidance: "GUIDANCE",
    question: "QUESTION"
  };


  @VueComponentConfiguration({
    components: {
      ExclamationMarkIcon__Circled__Filled,
      ExclamationMarkIcon__Triangled__Filled
    }
  })
  export class BasicLogic extends VueComponent {

    @VueProperty({
      type: String,
      default: Themes.regular,
      validator: (rawValue: unknown): boolean => isString(rawValue) && Object.values(Themes).includes(rawValue)
    })
    protected readonly theme!: string;

    @VueProperty({ type: Boolean, default: false })
    private readonly areThemesExternal!: boolean;

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

    @VueProperty({ type: Boolean, default: false })
    protected readonly hasPrependedSVG_Icon!: boolean;

    @VueProperty({ type: Boolean, default: false })
    protected readonly hasDismissingButton!: boolean;


    /* === Themes =================================================================================================== */
    public static readonly Themes: typeof Themes = Themes;

    public static defineNewThemes(themesNames: Array<string>): typeof BasicLogic {

      for (const themeName of themesNames) {
        Themes[toLowerCamelCase(themeName)] = toScreamingSnakeCase(themeName);
      }

      return BasicLogic;

    }


    /* --- Geometric variations ------------------------------------------------------------------------------------- */
    public static readonly GeometricVariations: typeof GeometricVariations = GeometricVariations;

    public static defineNewGeometricVariations(geometricVariationsNames: Array<string>): typeof BasicLogic {

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
        ...Object.entries(Themes).length > 1 && !this.areThemesExternal ?
            [ `AttentionBox--YDF__${ toUpperCamelCase(this.theme) }Theme` ] : [],
        ...Object.entries(GeometricVariations).length > 1 ?
            [ `AttentionBox--YDF__${ toUpperCamelCase(this.geometry) }Geometry` ] : [],
        ...Object.entries(DecorativeVariations).length > 1 ?
            [ `AttentionBox--YDF__${ toUpperCamelCase(this.decoration) }Decoration` ] : []
      ];
    }

    // TODO 仕上げる
    protected get SVG_IconComponentName(): string {

      switch (this.decoration) {

        case DecorativeVariations.importantInfo: return "";
        case DecorativeVariations.secondaryInfo: return "";
        case DecorativeVariations.notice: return "NOTICE";
        case DecorativeVariations.error: return "ERROR";
        case DecorativeVariations.warning: return "WARNING";
        case DecorativeVariations.success: return "SUCCESS";
        case DecorativeVariations.guidance: return "GUIDANCE";
        case DecorativeVariations.question: return "QUESTION";

        default: return "";
        /*
         when AttentionBox__YDF.DecorativeVariations.importantInfo
         +ExclamationMark__Circled__Filled--YDF_Icon.AttentionBox--YDF-SVG_Icon

         when AttentionBox__YDF.DecorativeVariations.secondaryInfo
         +ExclamationMark__Triangled__Filled--YDF_Icon.AttentionBox--YDF-SVG_Icon

         when AttentionBox__YDF.DecorativeVariations.notice
         +Pencil__Circled__Filled--YDF_Icon.AttentionBox--YDF-SVG_Icon

         when AttentionBox__YDF.DecorativeVariations.error
         +ExclamationMark__Circled__Filled--YDF_Icon.AttentionBox--YDF-SVG_Icon

         when AttentionBox__YDF.DecorativeVariations.warning
         +ExclamationMark__Triangled__Filled--YDF_Icon.AttentionBox--YDF-SVG_Icon

         when AttentionBox__YDF.DecorativeVariations.success
         +Checkmark__Circled__Filled--YDF_Icon.AttentionBox--YDF-SVG_Icon

         when AttentionBox__YDF.DecorativeVariations.guidance
         +InfoSign__Circled__Filled--YDF_Icon.AttentionBox--YDF-SVG_Icon

         when AttentionBox__YDF.DecorativeVariations.question
         +QuestionMark__Circled__Filled--YDF_Icon.AttentionBox--YDF-SVG_Icon
         */

      }

    }

  }


  /* === Providing ================================================================================================== */
  let Implementation: typeof VueComponent | null;

  export function setImplementation(_Implementation: typeof VueComponent): void {
    Implementation = _Implementation;
  }

  export function getImplementation(): typeof VueComponent | null {

    if (isNull(Implementation)) {
      throw new VueComponentImplementationHasNotBeenSetError({ vueComponentName: "Badge" });
    }


    return Implementation;

  }

}


export default AttentionBox;
