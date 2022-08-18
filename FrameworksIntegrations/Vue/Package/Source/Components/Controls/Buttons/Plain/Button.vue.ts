/* --- Framework ---------------------------------------------------------------------------------------------------- */
import {
  Options as VueComponentConfiguration,
  Vue as VueComponent,
  Prop as VueProperty
} from "vue-property-decorator";
import type { RouteLocationRaw as VueRouterRawLocation } from "vue-router";

/* --- Utils -------------------------------------------------------------------------------------------------------- */
import {
  isUndefined,
  isNotUndefined,
  isString,
  isElementOfEnumeration,
  isNull,
  toLowerCamelCase,
  toUpperCamelCase,
  toScreamingSnakeCase
} from "@yamato-daiwa/es-extensions";


namespace Button {

  export enum HTML_Types {
    regular = "BUTTON",
    submit = "SUBMIT",
    inputButton = "INPUT_BUTTON",
    inputSubmit = "INPUT_SUBMIT",
    inputReset = "INPUT_RESET"
  }


  export type Themes = {
    readonly regular: "REGULAR";
    [themeName: string]: string;
  };

  export const Themes: Themes = { regular: "REGULAR" };


  export type GeometricVariations = {
    readonly regular: "REGULAR";
    readonly small: "SMALL";
    readonly linkLike: "LINK_LIKE";
    [variationName: string]: string;
  };

  export const GeometricVariations: GeometricVariations = {
    regular: "REGULAR",
    small: "SMALL",
    linkLike: "LINK_LIKE"
  };


  export type DecorativeVariations = {
    readonly regular: "REGULAR";
    readonly accented: "ACCENTED";
    readonly linkLike: "LINK_LIKE";
    [variationName: string]: string;
  };

  export const DecorativeVariations: DecorativeVariations = {
    regular: "REGULAR",
    accented: "ACCENTED",
    linkLike: "LINK_LIKE"
  };


  @VueComponentConfiguration({})
  export class BasicLogic extends VueComponent {

    /* === Constants & enumerations ================================================================================= */
    protected HTML_Types!: typeof HTML_Types;


    /* === Properties =============================================================================================== */
    @VueProperty({
      type: String,
      default: HTML_Types.regular,
      validator: (rawValue: unknown): boolean => isString(rawValue) && isElementOfEnumeration(rawValue, HTML_Types)
    })
    protected readonly HTML_Type!: string;

    @VueProperty({ type: String })
    protected readonly label?: string;

    @VueProperty({ type: String })
    protected readonly accessibilityGuidance?: string;

    @VueProperty({ type: [ String, Object ] })
    protected readonly route?: VueRouterRawLocation;

    @VueProperty({ type: String })
    protected readonly externalLinkURI?: string;

    @VueProperty({ type: Boolean, default: false })
    protected readonly mustOpenExternalLinkInCurrentTab!: string;

    @VueProperty({ type: Boolean, default: false })
    protected readonly disabled!: boolean;

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


    /* === Lifecycle hooks ========================================================================================== */
    public created(): void {
      this.initializeNonReactiveClassFields();
    }


    /* === Computing of tag name of root element ==================================================================== */
    protected get isButtonTheTagNameOfRootElement(): boolean {
      return (isUndefined(this.route) && isUndefined(this.externalLinkURI)) &&
          (this.HTML_Type === HTML_Types.regular || this.HTML_Type === HTML_Types.submit);
    }

    protected get isInputTheTagNameOfRootElement(): boolean {
      return isUndefined(this.route) && (
        this.HTML_Type === HTML_Types.inputButton ||
        this.HTML_Type === HTML_Types.inputSubmit ||
        this.HTML_Type === HTML_Types.inputReset
      );
    }

    private get isRouterLinkTheRootElement(): boolean {
      return isNotUndefined(this.route);
    }

    private get isAnchorTheTagNameOfRootElement(): boolean {
      return isNotUndefined(this.externalLinkURI);
    }


    /* === Computing of the attributes ============================================================================== */
    protected get typeAttributeValueOfInputOrButtonElement(): string | null {

      if (isNotUndefined(this.route)) {
        return null;
      }


      switch (this.HTML_Type) {
        case HTML_Types.regular: return "button";
        case HTML_Types.submit: return "submit";
        case HTML_Types.inputButton: return "button";
        case HTML_Types.inputSubmit: return "submit";
        case HTML_Types.inputReset: return "reset";
        default: return null;
      }
    }


    /* === Themes =================================================================================================== */
    public static readonly ThemesCSS_ModifiersNames: { [themeID: string]: string; } = {
      [Themes.regular]: "RegularTheme"
    };

    public static defineNewThemes(themesNames: Array<string>): typeof BasicLogic {

      for (const themeName of themesNames) {

        const themeName__lowerCamelCase: string = toLowerCamelCase(themeName);

        Themes[themeName__lowerCamelCase] = toScreamingSnakeCase(themeName);
        BasicLogic.ThemesCSS_ModifiersNames[themeName__lowerCamelCase] = `Button--YDF__${ toUpperCamelCase(themeName) }Theme`;
      }

      return BasicLogic;
    }


    /* --- Geometric variations ------------------------------------------------------------------------------------- */
    public static readonly GeometricVariationsCSS_ModifiersNames: { [ geometricVariationID: string ]: string; } = {
      [GeometricVariations.regular]: "RegularGeometry",
      [GeometricVariations.small]: "SmallGeometry"
    };

    public static defineNewGeometricVariations(geometricVariationsNames: Array<string>): typeof BasicLogic {

      for (const geometricVariationsName of geometricVariationsNames) {

        const geometricVariationsName__lowerCamelCase: string = toLowerCamelCase(geometricVariationsName);

        GeometricVariations[geometricVariationsName__lowerCamelCase] = toScreamingSnakeCase(geometricVariationsName);
        BasicLogic.GeometricVariationsCSS_ModifiersNames[geometricVariationsName__lowerCamelCase] =
            `Button--YDF__${ toUpperCamelCase(geometricVariationsName) }Geometry`;
      }

      return BasicLogic;
    }


    /* --- Decorative variations ------------------------------------------------------------------------------------- */
    public static readonly DecorativeVariationsCSS_ModifiersNames: { [ decorativeVariationID: string ]: string; } = {
      [DecorativeVariations.regular]: "RegularDecoration",
      [DecorativeVariations.small]: "AccentedDecoration"
    };

    public static defineNewDecorativeVariations(decorativeVariationsNames: Array<string>): typeof BasicLogic {

      for (const decorativeVariationsName of decorativeVariationsNames) {

        const decorativeVariationsName__lowerCamelCase: string = toLowerCamelCase(decorativeVariationsName);

        DecorativeVariations[decorativeVariationsName__lowerCamelCase] = toScreamingSnakeCase(decorativeVariationsName);
        BasicLogic.DecorativeVariationsCSS_ModifiersNames[decorativeVariationsName__lowerCamelCase] =
            `Button--YDF__${ toUpperCamelCase(decorativeVariationsName) }Decorations`;
      }

      return BasicLogic;
    }


    /* === Auxiliaries ============================================================================================== */
    /* eslint-disable-next-line @typescript-eslint/no-extra-parens --
     * Parens are actually unnecessary but some IDEs could complain. */
    protected IS_NUXT: boolean = ("$nuxt" in window);

    protected get rootElementModifierCSS_Classes(): Array<string> {
      return [
        ...(this.isAnchorTheTagNameOfRootElement || this.isRouterLinkTheRootElement) && this.disabled ?
            [ "Button--YDF__DisabledState" ] : [],
        ...Object.entries(Themes).length > 1 ? [ `Button--YDF__${ BasicLogic.ThemesCSS_ModifiersNames[this.theme] }` ] : [],
        ...Object.entries(GeometricVariations).length > 1 ? [
          `Button--YDF__${ BasicLogic.GeometricVariationsCSS_ModifiersNames[this.geometry] }`
        ] : [],
        ...Object.entries(DecorativeVariations).length > 1 ? [
          `Button--YDF__${ BasicLogic.DecorativeVariationsCSS_ModifiersNames[this.decoration] }`
        ] : []
      ];
    }


    /* === Non-reactive class fields ================================================================================ */
    private initializeNonReactiveClassFields(): void {
      this.HTML_Types = HTML_Types;
    }
  }


  let Implementation: typeof VueComponent | null;

  export function setImplementation(_Implementation: typeof VueComponent): void {
    Implementation = _Implementation;
  }

  export function getImplementation(): typeof VueComponent | null {

    if (isNull(Implementation)) {
      throw new Error("UHE1");
    }


    return Implementation;
  }
}


export default Button;
