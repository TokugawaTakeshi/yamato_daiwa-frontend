import {
  Options as VueComponentConfiguration,
  Vue as VueComponent,
  Prop as VueProperty
} from "vue-property-decorator";
import { RouteLocationRaw as VueRouterRawLocation } from "vue-router";

import {
  isUndefined,
  isNotUndefined,
  isString,
  isElementOfEnumeration,
  isNull
} from "@yamato-daiwa/es-extensions";

import toLowerCamelCase from "../../../../UtilsIncubator/toLowerCamelCase";
import toUpperCamelCase from "../../../../UtilsIncubator/toUpperCamelCase";
import toScreamingSnakeCase from "../../../../UtilsIncubator/toScreamingSnakeCase";


namespace Button {

  export enum HTML_Types {
    regular = "BUTTON",
    submit = "SUBMIT",
    inputButton = "INPUT_BUTTON",
    inputSubmit = "INPUT_SUBMIT",
    inputReset = "INPUT_RESET",
  }


  export type Themes = {
    readonly regular: "REGULAR";
    [themeName: string]: string;
  }

  export const Themes: Themes = { regular: "REGULAR" };


  export type GeometricVariations = {
    readonly regular: "REGULAR";
    readonly small: "SMALL";
    [themeName: string]: string;
  };

  export const GeometricVariations: GeometricVariations = {
    regular: "REGULAR",
    small: "SMALL"
  };


  export type DecorativeVariations = {
    readonly regular: "REGULAR";
    readonly accented: "ACCENTED";
    [themeName: string]: string;
  };

  export const DecorativeVariations: DecorativeVariations = {
    regular: "REGULAR",
    accented: "ACCENTED"
  };


  @VueComponentConfiguration({})
  export class BasicLogic extends VueComponent {

    /* === Constants & enumerations ================================================================================= */
    protected readonly HTML_Types: typeof HTML_Types = HTML_Types;


    /* === Properties =============================================================================================== */
    @VueProperty({
      type: String,
      default: Button.HTML_Types.regular,
      validator: (rawValue: unknown): boolean => isString(rawValue) && isElementOfEnumeration(rawValue, Button.HTML_Types)
    })
    protected readonly HTML_Type!: string;

    @VueProperty({ type: String })
    protected readonly label?: string;

    @VueProperty({ type: [ String, Object ] })
    protected readonly route?: VueRouterRawLocation;

    @VueProperty({ type: String })
    protected readonly externalLinkURI?: string;

    @VueProperty({ type: Boolean, default: false })
    protected readonly disabled!: string;

    @VueProperty({
      type: String,
      default: Button.Themes.regular,
      validator: (rawValue: unknown): boolean => isString(rawValue) && Object.values(Button.Themes).includes(rawValue)
    })
    protected readonly theme!: string;

    @VueProperty({
      type: String,
      default: Button.GeometricVariations.regular,
      validator: (rawValue: unknown): boolean => isString(rawValue) && Object.values(Button.GeometricVariations).includes(rawValue)
    })
    protected readonly geometry!: string;

    @VueProperty({
      type: String,
      default: Button.DecorativeVariations.regular,
      validator: (rawValue: unknown): boolean => isString(rawValue) && Object.values(Button.DecorativeVariations).includes(rawValue)
    })
    protected readonly decoration!: string;


    /* === Root element tag name computing ========================================================================== */
    protected get isRootElementTagNameTheButton(): boolean {
      return (isUndefined(this.route) && isUndefined(this.externalLinkURI)) &&
          (this.HTML_Type === Button.HTML_Types.regular || this.HTML_Type === Button.HTML_Types.submit);
    }

    protected get isRootElementTagNameTheInput(): boolean {
      return isUndefined(this.route) && (
        this.HTML_Type === Button.HTML_Types.inputButton ||
        this.HTML_Type === Button.HTML_Types.inputSubmit ||
        this.HTML_Type === Button.HTML_Types.inputReset
      );
    }

    private get isRootElementTheRouterLink(): boolean {
      return isNotUndefined(this.route);
    }

    private get isRootElementTagNameTheAnchor(): boolean {
      return isNotUndefined(this.externalLinkURI);
    }

    protected get inputOrButtonElementTypeAttributeValue(): string | null {

      if (isNotUndefined(this.route)) {
        return null;
      }

      switch (this.HTML_Type) {
        case Button.HTML_Types.regular: return "button";
        case Button.HTML_Types.submit: return "submit";
        case Button.HTML_Types.inputButton: return "button";
        case Button.HTML_Types.inputSubmit: return "submit";
        case Button.HTML_Types.inputReset: return "reset";
        default: return null;
      }
    }


    /* === Themes =================================================================================================== */
    protected static ThemesCSS_ModifiersNames: { [themeID: string]: string; } = {
      [Themes.regular]: "RegularTheme"
    }

    public static defineNewThemes(themesNames: Array<string>): typeof BasicLogic {

      for (const themeName of themesNames) {

        const themeName__lowerCamelCase: string = toLowerCamelCase(themeName)

        Themes[themeName__lowerCamelCase] = toScreamingSnakeCase(themeName);
        BasicLogic.ThemesCSS_ModifiersNames[themeName__lowerCamelCase] = `Button__${toUpperCamelCase(themeName)}Theme`;
      }

      return BasicLogic;
    }


    /* --- Geometric variations ------------------------------------------------------------------------------------- */
    protected static GeometricVariationsCSS_ModifiersNames: { [ geometricVariationID: string ]: string; } = {
      [GeometricVariations.regular]: "RegularGeometry",
      [GeometricVariations.small]: "SmallGeometry"
    };

    public static defineNewGeometricVariations(geometricVariationsNames: Array<string>): typeof BasicLogic {

      for (const geometricVariationsName of geometricVariationsNames) {

        const geometricVariationsName__lowerCamelCase: string = toLowerCamelCase(geometricVariationsName)

        GeometricVariations[geometricVariationsName__lowerCamelCase] = toScreamingSnakeCase(geometricVariationsName);
        BasicLogic.GeometricVariationsCSS_ModifiersNames[geometricVariationsName__lowerCamelCase] =
            `Button__${toUpperCamelCase(geometricVariationsName)}Geometry`;
      }

      return BasicLogic;
    }


    /* --- Decorative variations ------------------------------------------------------------------------------------- */
    protected static DecorativeVariationsCSS_ModifiersNames: { [ decorativeVariationID: string ]: string; } = {
      [DecorativeVariations.regular]: "RegularDecoration",
      [DecorativeVariations.small]: "AccentedDecoration"
    };

    public static defineNewDecorativeVariations(decorativeVariationsNames: Array<string>): typeof BasicLogic {

      for (const decorativeVariationsName of decorativeVariationsNames) {

        const decorativeVariationsName__lowerCamelCase: string = toLowerCamelCase(decorativeVariationsName)

        DecorativeVariations[decorativeVariationsName__lowerCamelCase] = toScreamingSnakeCase(decorativeVariationsName);
        BasicLogic.DecorativeVariationsCSS_ModifiersNames[decorativeVariationsName__lowerCamelCase] =
            `Button__${toUpperCamelCase(decorativeVariationsName)}Decorations`;
      }

      return BasicLogic;
    }


    /* === Auxiliaries ============================================================================================== */
    protected get rootElementModifierCSS_Classes(): Array<string> {
      return [
        "Button",
        ...(this.isRootElementTagNameTheAnchor || this.isRootElementTheRouterLink) && this.disabled ? [ "Button__DisabledState" ] : [],
        BasicLogic.ThemesCSS_ModifiersNames[this.theme],
        BasicLogic.GeometricVariationsCSS_ModifiersNames[this.geometry],
        BasicLogic.DecorativeVariationsCSS_ModifiersNames[this.decoration],
      ];
    }
  }

  let Implementation: typeof VueComponent | null;

  export function setImplementation(_Implementation: typeof VueComponent): void {
    Implementation = _Implementation
  }

  export function getImplementation(): typeof VueComponent | null {

    if (isNull(Implementation)) {
      throw new Error("UHE1");
    }


    return Implementation;
  }
}


export default Button;
