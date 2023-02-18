/* --- Constants and enumerations ----------------------------------------------------------------------------------- */
import YDF_ComponentsCoordinator from "@Components/YDF_ComponentsCoordinator";

/* --- Framework ---------------------------------------------------------------------------------------------------- */
import {
  Options as VueComponentConfiguration,
  Vue as VueComponent,
  Prop as VueProperty,
  Watch as onVueComponentFieldUpdated
} from "vue-property-decorator";

/* --- Utils -------------------------------------------------------------------------------------------------------- */
import {
  secondsToMilliseconds,
  toLowerCamelCase,
  toScreamingSnakeCase,
  isString,
  isNonEmptyString,
  toUpperCamelCase,
  isNull,
  isUndefined,
  isNeitherUndefinedNorNull
} from "@yamato-daiwa/es-extensions";
import VueComponentImplementationHasNotBeenSetError from
    "@Components/_Errors/VueComponentImplementationHasNotBeenSet/VueComponentImplementationHasNotBeenSet";

/* --- Localization ------------------------------------------------------------------------------------------------- */
import CompoundControlShellLocalization__English from
    "@Components/Controls/CompoundControlShell/CompoundControlShellLocalization.english";


namespace CompoundControlShell {

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
    [geometricVariationName: string]: string;
  };

  export const GeometricVariations: GeometricVariations = {
    regular: "REGULAR",
    small: "SMALL"
  };


  export type DecorativeVariations = {
    readonly regular: "REGULAR";
    [decorativeVariationName: string]: string;
  };

  export const DecorativeVariations: DecorativeVariations = {
    regular: "REGULAR"
  };


  export type Localization = Readonly<{
    requirementBadges: Readonly<{
      required: string;
      optional: string;
    }>;
  }>;


  @VueComponentConfiguration({})
  export class BasicLogic extends VueComponent {

    /* === Properties =============================================================================================== */
    /* --- Textings ------------------------------------------------------------------------------------------------- */
    @VueProperty({
      type: String,
      validator: (rawValue: unknown): boolean => isNonEmptyString(rawValue)
    })
    protected readonly label?: string | null;

    @VueProperty({
      type: String,
      validator: (rawValue: unknown): boolean => isNonEmptyString(rawValue)
    })
    protected readonly guidance?: string | null;


    /* --- Inputting requiring -------------------------------------------------------------------------------------- */
    @VueProperty({ type: Boolean, default: false })
    protected readonly required!: boolean;

    @VueProperty({ type: Boolean, default: false })
    protected readonly mustDisplayAppropriateBadgeIfInputIsRequired!: boolean;

    @VueProperty({ type: Boolean, default: false })
    protected readonly mustDisplayAppropriateBadgeIfInputIsOptional!: boolean;

    @VueProperty({ type: Boolean, default: false })
    protected readonly mustAddInvisibleBadgeForHeightEqualizingWhenNoBadge!: boolean;


    /* --- HTML IDs ------------------------------------------------------------------------------------------------- */
    @VueProperty({
      type: String,
      validator: (rawValue: unknown): boolean => isNonEmptyString(rawValue)
    })
    protected readonly coreElementHTML_ID?: string;

    @VueProperty({
      type: String,
      validator: (rawValue: unknown): boolean => isNonEmptyString(rawValue)
    })
    protected readonly labelElementHTML_ID?: string;


    /* --- CSS ------------------------------------------------------------------------------------------------------ */
    @VueProperty({ type: [ String, Array ] })
    protected readonly mainSlotWrapperAdditionalCSS_Classes?: ReadonlyArray<string> | string | null;


    /* --- Inputting validation ------------------------------------------------------------------------------------- */
    @VueProperty({ type: Boolean, default: false })
    protected readonly invalidInputHighlightingIfAnyValidationErrorsMessages!: boolean;

    @VueProperty({ type: Boolean, default: false })
    protected readonly validValueHighlightingIfNoValidationErrorsMessages!: boolean;

    @VueProperty({ type: Array, default: (): ReadonlyArray<string> => [] })
    protected readonly validationErrorsMessages!: ReadonlyArray<string>;


    /* --- Themes --------------------------------------------------------------------------------------------------- */
    @VueProperty({
      type: String,
      default: Themes.regular,
      validator: (rawValue: unknown): boolean => isString(rawValue) && Object.values(Themes).includes(rawValue)
    })
    protected readonly theme!: string;

    @VueProperty({ type: Boolean, default: areThemesExternal })
    protected readonly areThemesExternal!: boolean;


    /* --- Geometry ------------------------------------------------------------------------------------------------- */
    @VueProperty({
      type: String,
      default: GeometricVariations.regular,
      validator: (rawValue: unknown): boolean => isString(rawValue) && Object.values(GeometricVariations).includes(rawValue)
    })
    protected readonly geometry!: string;


    /* --- Decoration ----------------------------------------------------------------------------------------------- */
    @VueProperty({
      type: String,
      default: DecorativeVariations.regular,
      validator: (rawValue: unknown): boolean => isString(rawValue) && Object.values(DecorativeVariations).includes(rawValue)
    })
    protected readonly decoration!: string;


    /* === Validation errors messages animating ===================================================================== */
    /* [ Theory ] Even if `validationErrorsMessages` became to empty array, the validation errors messages are still
    *   require to animate the expanding. */
    protected validationErrorsMessagesCopyForAnimating: ReadonlyArray<string> = [ ...this.validationErrorsMessages ];
    protected readonly VALIDATION_ERRORS_MESSAGES_ANIMATION_DURATION__SECONDS: number = 0.5;

    @onVueComponentFieldUpdated("validationErrorsMessages")
    protected onValidationErrorsMessagesUpdated(newValidationErrorsMessages: ReadonlyArray<string>): void {

      if (newValidationErrorsMessages.length > 0) {
        this.validationErrorsMessagesCopyForAnimating = [ ...newValidationErrorsMessages ];
        return;
      }


      setTimeout(
        (): void => { this.validationErrorsMessagesCopyForAnimating = []; },
        secondsToMilliseconds(this.VALIDATION_ERRORS_MESSAGES_ANIMATION_DURATION__SECONDS)
      );

    }


    /* === Auxiliaries ============================================================================================== */
    /* --- Themes --------------------------------------------------------------------------------------------------- */
    public static defineNewThemes(themesNames: ReadonlyArray<string>): typeof BasicLogic {

      for (const themeName of themesNames) {
        Themes[toLowerCamelCase(themeName)] = toScreamingSnakeCase(themeName);
      }

      return BasicLogic;

    }


    /* --- Geometry ------------------------------------------------------------------------------------------------- */
    public static defineNewGeometricVariations(geometricVariationsNames: ReadonlyArray<string>): typeof BasicLogic {

      for (const geometricVariationsName of geometricVariationsNames) {
        GeometricVariations[toLowerCamelCase(geometricVariationsName)] = toScreamingSnakeCase(geometricVariationsName);
      }

      return BasicLogic;

    }


    /* --- Decoration ----------------------------------------------------------------------------------------------- */
    public static defineNewDecorativeVariations(decorativeVariationsNames: ReadonlyArray<string>): typeof BasicLogic {

      for (const decorativeVariationsName of decorativeVariationsNames) {
        DecorativeVariations[toLowerCamelCase(decorativeVariationsName)] = toScreamingSnakeCase(decorativeVariationsName);
      }

      return BasicLogic;

    }


    /* --- CSS ------------------------------------------------------------------------------------------------------ */
    protected get rootElementModifierCSS_Classes(): ReadonlyArray<string> {
      return [
        ...Object.entries(Themes).length > 1 && !this.areThemesExternal ?
            [ `CompoundControlShell--YDF__${ toUpperCamelCase(this.theme) }Theme` ] : [],
        ...Object.entries(GeometricVariations).length > 1 ?
            [ `CompoundControlShell--YDF__${ toUpperCamelCase(this.geometry) }Geometry` ] : [],
        ...Object.entries(DecorativeVariations).length > 1 ?
            [ `CompoundControlShell--YDF__${ toUpperCamelCase(this.decoration) }Decoration` ] : [],
        ...this.invalidInputHighlightingIfAnyValidationErrorsMessages && this.validationErrorsMessages.length > 0 ?
            [ `CompoundControlShell--YDF__${ toUpperCamelCase(this.decoration) }__InvalidValueState` ] : [],
        ...this.validValueHighlightingIfNoValidationErrorsMessages && this.validationErrorsMessages.length === 0 ?
            [ `CompoundControlShell--YDF__${ toUpperCamelCase(this.decoration) }__ValidValueState` ] : []
      ];
    }


    /* --- Displaying of elements ----------------------------------------------------------------------------------- */
    protected get mustDisplayHeader(): boolean {
      return isNeitherUndefinedNorNull(this.label) ||
          this.mustDisplayAppropriateBadgeIfInputIsRequired ||
          this.mustDisplayAppropriateBadgeIfInputIsOptional ||
          this.mustAddInvisibleBadgeForHeightEqualizingWhenNoBadge;
    }


    /* --- Localization --------------------------------------------------------------------------------------------- */
    public static localization: Localization = CompoundControlShellLocalization__English;
    protected localization: Localization = BasicLogic.localization;

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

  export function registerImplementationLocally(parentComponent: VueComponent, withName: string = "CompoundControlShell"): void {

    if (isUndefined(parentComponent.$options.components)) {
      parentComponent.$options.components = {};
    }


    parentComponent.$options.components[withName] = getImplementation();

  }

}


export default CompoundControlShell;
