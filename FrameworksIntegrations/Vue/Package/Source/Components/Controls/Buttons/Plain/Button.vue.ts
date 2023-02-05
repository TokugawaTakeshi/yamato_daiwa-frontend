/* --- Constants and enumerations ----------------------------------------------------------------------------------- */
import YDF_ComponentsCoordinator from "@Components/YDF_ComponentsCoordinator";

/* --- Framework ---------------------------------------------------------------------------------------------------- */
import {
  Options as VueComponentConfiguration,
  Vue as VueComponent,
  Prop as VueProperty
} from "vue-property-decorator";
import type { RouteLocationRaw as VueRouterRawLocation } from "vue-router";

/* --- Utils -------------------------------------------------------------------------------------------------------- */
import {
  toLowerCamelCase,
  toUpperCamelCase,
  toScreamingSnakeCase,
  isString,
  isUndefined,
  isNull,
  isEitherUndefinedOrNull,
  isNeitherUndefinedNorNull,
  isElementOfEnumeration
} from "@yamato-daiwa/es-extensions";
import VueComponentImplementationHasNotBeenSetError from
    "@Components/_Errors/VueComponentImplementationHasNotBeenSet/VueComponentImplementationHasNotBeenSet";


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

  export let areThemesExternal: boolean = YDF_ComponentsCoordinator.areThemesExternalByDefault;

  export function considerThemesAsExternal(): void {
    areThemesExternal = true;
  }


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

  export enum GeometricModifiers {
    squareShape = "SQUARE_SHAPE",
    pillShape = "PILL_SHAPE"
  }


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

    protected IS_NUXT!: boolean;


    /* === Properties =============================================================================================== */
    @VueProperty({
      type: String,
      default: HTML_Types.regular,
      validator: (rawValue: unknown): boolean => isString(rawValue) && isElementOfEnumeration(rawValue, HTML_Types)
    })
    protected readonly HTML_Type!: string;

    @VueProperty({ type: String })
    protected readonly label?: string | null;

    @VueProperty({ type: String })
    protected readonly accessibilityGuidance?: string | null;

    @VueProperty({ type: [ String, Object ] })
    protected readonly route?: VueRouterRawLocation | null;

    @VueProperty({ type: String })
    protected readonly externalURI?: string | null;

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

    @VueProperty({ type: Boolean, default: areThemesExternal })
    private readonly areThemesExternal!: boolean;

    @VueProperty({
      type: String,
      default: GeometricVariations.regular,
      validator: (rawValue: unknown): boolean => isString(rawValue) && Object.values(GeometricVariations).includes(rawValue)
    })
    protected readonly geometry!: string;

    @VueProperty({ type: Array, default: (): Array<GeometricModifiers> => [] })
    private readonly geometricModifiers!: Array<GeometricModifiers>;

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
      return isEitherUndefinedOrNull(this.route) &&
          isEitherUndefinedOrNull(this.externalURI) &&
          (this.HTML_Type === HTML_Types.regular || this.HTML_Type === HTML_Types.submit);
    }

    protected get isInputTheTagNameOfRootElement(): boolean {
      return isEitherUndefinedOrNull(this.route) &&
          isEitherUndefinedOrNull(this.externalURI) &&
          (
            this.HTML_Type === HTML_Types.inputButton ||
            this.HTML_Type === HTML_Types.inputSubmit ||
            this.HTML_Type === HTML_Types.inputReset
          );
    }

    private get isRouterLinkTheRootElement(): boolean {
      return isNeitherUndefinedNorNull(this.route);
    }

    private get isAnchorTheTagNameOfRootElement(): boolean {
      return isNeitherUndefinedNorNull(this.externalURI);
    }


    /* === Computing of the attributes ============================================================================== */
    protected get typeAttributeValueOfButtonOrInputElement(): string | null {

      if (!this.isButtonTheTagNameOfRootElement && !this.isInputTheTagNameOfRootElement) {
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
        ...(this.isAnchorTheTagNameOfRootElement || this.isRouterLinkTheRootElement) && this.disabled ?
            [ "Button--YDF__DisabledState" ] : [],
        ...Object.entries(Themes).length > 1 && !this.areThemesExternal ?
            [ `Button--YDF__${ toUpperCamelCase(this.theme) }Theme` ] : [],
        ...Object.entries(GeometricVariations).length > 1 ?
            [ `Button--YDF__${ toUpperCamelCase(this.geometry) }Geometry` ] : [],
        ...this.geometricModifiers.includes(GeometricModifiers.pillShape) ?
            [ "Button--YDF__PillShapeGeometricModifier" ] : [],
        ...this.geometricModifiers.includes(GeometricModifiers.squareShape) ?
            [ "Button--YDF__SquareShapeGeometricModifier" ] : [],
        ...Object.entries(DecorativeVariations).length > 1 ?
            [ `Badge--YDF__${ toUpperCamelCase(this.decoration) }Decoration` ] : []
      ];
    }

    private initializeNonReactiveClassFields(): void {

      this.HTML_Types = HTML_Types;

      /* eslint-disable-next-line @typescript-eslint/no-extra-parens --
       * Parens are actually unnecessary but some IDEs could complain. */
      this.IS_NUXT = ("$nuxt" in window);

    }

  }


  /* === Providing ================================================================================================== */
  let Implementation: typeof VueComponent | null;

  export function setImplementation(_Implementation: typeof VueComponent): void {
    Implementation = _Implementation;
  }

  export function getImplementation(): typeof VueComponent {

    if (isNull(Implementation)) {
      throw new VueComponentImplementationHasNotBeenSetError({ vueComponentName: "Button" });
    }


    return Implementation;

  }

  export function registerImplementationLocally(parentComponent: VueComponent, withName: string = "Button"): void {

    if (isUndefined(parentComponent.$options.components)) {
      parentComponent.$options.components = {};
    }


    parentComponent.$options.components[withName] = getImplementation();

  }

}


export default Button;
