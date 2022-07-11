/* --- Other components --------------------------------------------------------------------------------------------- */
import Control from "../Control";

/* --- Validations -------------------------------------------------------------------------------------------------- */
import ValidatableControl from "../_Validation/ValidatableControl";
import ValueValidation from "../_Validation/ValueValidation";

/* --- Framework ---------------------------------------------------------------------------------------------------- */
import {
  Options as VueComponentConfiguration,
  Vue as VueComponent,
  Model as VModel,
  Prop as VueProperty
} from "vue-property-decorator";

/* --- Utils -------------------------------------------------------------------------------------------------------- */
import {
  isString,
  isNumber,
  isNull,
  isNotNull,
  ArbitraryObject,
  isArbitraryObject,
  isNotUndefined,
  removeArrayElementsByIndexes,
  isNeitherUndefinedNorNull
} from "@yamato-daiwa/es-extensions";
import toLowerCamelCase from "../../../UtilsIncubator/toLowerCamelCase";
import toScreamingSnakeCase from "../../../UtilsIncubator/toScreamingSnakeCase";
import toUpperCamelCase from "../../../UtilsIncubator/toUpperCamelCase";
import addElementsToArray from "@yamato-daiwa/es-extensions/Distributable/esm/Arrays/addElementsToArray";


namespace DropDownList {

  export type SupportedValidatablePayloadValuesTypes =
      string |
      number |
      ArbitraryObject |
      Array<string> |
      Array<number> |
      Array<ArbitraryObject> |
      null;


  export type SelectionOption = SelectionOptionIdentifiedByKey | SelectionOptionIdentifiedByEntity;

  export namespace SelectionOption {
    export type CommonProperties = {
      readonly label: string;
    };
  }

  export type SelectionOptionIdentifiedByKey =
      SelectionOption.CommonProperties &
      {
        readonly key: string | number;
      };

  export type SelectionOptionIdentifiedByEntity<Entity = ArbitraryObject> =
      SelectionOption.CommonProperties &
      {
        readonly entity: Entity;
      };


  export enum Events {
    input = "update:payload"
  }


  export type Themes = {
    readonly regular: "REGULAR";
    [themeID: string]: string;
  };

  export const Themes: Themes = { regular: "REGULAR" };

  export type CustomThemeDefinition = {
    key: string;
    ID?: string;
    correspondingCompoundControlBaseThemeID: string;
    CSS_ModifierName: string;
  };


  export type GeometricVariations = {
    readonly regular: "REGULAR";
    readonly small: "SMALL";
    [geometricVariationID: string]: string;
  };

  export const GeometricVariations: GeometricVariations = {
    regular: "REGULAR",
    small: "SMALL"
  };

  export type CustomGeometricVariationDefinition = {
    key: string;
    ID?: string;
    correspondingCompoundControlGeometricVariationID: string;
    CSS_ModifierName: string;
  };


  export type DecorativeVariations = {
    readonly regular: "REGULAR";
    [decorativeVariationID: string]: string;
  };

  export const DecorativeVariations: DecorativeVariations = {
    regular: "REGULAR",
    accented: "ACCENTED"
  };

  export type CustomDecorativeVariationDefinition = {
    key: string;
    ID?: string;
    correspondingCompoundControlDecorativeVariationID: string;
    CSS_ModifierName: string;
  };


  @VueComponentConfiguration({
    name: "DropDownList"
  })
  export class BasicLogic extends Control implements ValidatableControl {

    @VModel("payload", {
      required: false,
      validator(rawVModel: unknown): boolean {
        return ValidatableControl.VModelChecker(
            rawVModel, (rawValue: unknown): boolean =>
              isString(rawValue) || isNumber(rawValue) || isArbitraryObject(rawValue) || Array.isArray(rawValue) || isNull(rawValue)
        );
      }
    })
    private readonly validatablePayload?: ValidatableControl.Payload<
      SupportedValidatablePayloadValuesTypes,
      SupportedValidatablePayloadValuesTypes,
      ValueValidation
    >;


    /* === Properties =============================================================================================== */
    @VueProperty({ type: Array, required: true })
    private readonly selectOptions!: Array<DropDownList.SelectionOption>;

    @VueProperty({ type: Boolean, default: false })
    protected readonly allowSelectionClearing!: boolean;

    @VueProperty({ type: Boolean, default: false })
    protected readonly multipleSelectableOptions!: boolean;

    @VueProperty({ type: Boolean, default: false })
    protected readonly readonly!: boolean;

    // TODO selectedOptions__nonValidatableControlMode


    /* === State ==================================================================================================== */
    private indexesOfSelectedOptions: Array<number> = [];
    private isExpanded: boolean = false;

    protected readonly COMPONENT_BASIC_ID: string = BasicLogic.generateComponentBasicID();
    protected get LABEL_ELEMENT_HTML_ID(): string { return `${this.COMPONENT_BASIC_ID}-LABEL` }
    protected get OPTIONS_LIST_HTML_ID(): string { return `${this.COMPONENT_BASIC_ID}-OPTIONS_LIST`; }


    /* === Interface ================================================================================================ */
    public focus(): this {
      this.isExpanded = true;
      return this;
    }

    public resetStateToInitial(): void {
      // TODO
    }


    /* === Lifecycle hooks ========================================================================================== */
    public created(): void {

      if (isNotUndefined(this.validatablePayload)) {
        this.validatablePayload.completeInitialization({
          getComponentInstanceMethodImplementation: () => this
        });
      }
    }


    /* === Processing of user's actions ============================================================================= */
    protected onClickPseudoButtonWithCurrentSelection(): void {

      if (this.disabled) {
        return;
      }


      this.isExpanded = !this.isExpanded;
    }


    protected onNewOptionSelected(newOption: DropDownList.SelectionOption | null, indexInArray: number | null): void {

      if (isNotNull(indexInArray)) {

        if (this.multipleSelectableOptions) {

          if (this.indexesOfSelectedOptions.includes(indexInArray)) {
            this.indexesOfSelectedOptions = removeArrayElementsByIndexes({
              targetArray: this.indexesOfSelectedOptions,
              indexes: indexInArray,
              mutably: false
            }).updatedArray;
          } else {
            this.indexesOfSelectedOptions = addElementsToArray({
              targetArray: this.indexesOfSelectedOptions,
              newElements: [ indexInArray ],
              toStart: true,
              mutably: false
            });
          }

        } else {
          if (this.indexesOfSelectedOptions.includes(indexInArray)) {
            this.indexesOfSelectedOptions = [ indexInArray ];
          } else {
            this.indexesOfSelectedOptions = [];
          }
        }
      }

      this.isExpanded = false;


      if (isNotUndefined(this.validatablePayload)) {
        this.mustActivateAppropriateHighlightIfAnyErrorsMessages = true;
        this.$emit("change", this.validatablePayload.updateImmutably({ newValue: newOption }));
        return;
      }


      if (isNull(newOption)) {
        this.$emit("change", null);
      } else if ("key" in newOption) {
        this.$emit("change", newOption.key);
      } else {
        this.$emit("change", newOption.entity);
      }
    }


    /* --- ??? ------------------------------------------------------------------------------------------------------ */
    protected get currentSelectionLabel(): string | null {
      switch (this.indexesOfSelectedOptions.length) {
        case 0: return "Nothing selected";
        case 1: return this.selectOptions[this.indexesOfSelectedOptions[0]].label;
        default: return "(Multiple selected)";
      }
    }

    protected ARIA_LabelledByAttributeValue(): string | null {

      if (isNeitherUndefinedNorNull(this.label)) {
        return this.LABEL_ELEMENT_HTML_ID;
      }


      if (isNeitherUndefinedNorNull(this.externalLabelHTML_ID)) {
        return this.externalLabelHTML_ID;
      }


      return null;
    }


    /* === Auxiliaries ============================================================================================== */
    private static counterForComponentBasicID_Generating: number = 0;
    private static generateComponentBasicID(): string {
      BasicLogic.counterForComponentBasicID_Generating++;
      return `DROP_DOWN_LIST-${BasicLogic.counterForComponentBasicID_Generating}`;
    }

    protected readonly PSEUDO_BUTTON_WITH_CURRENT_SELECTION_VUE_REFERENCE_ID: string = "PSEUDO_BUTTON_WITH_CURRENT_SELECTION";


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
            `DropDownList__${toUpperCamelCase(decorativeVariationsName)}Decorations`;
      }

      return BasicLogic;
    }
  }


  export let Implementation: typeof VueComponent | null;

  export function setImplementation(_Implementation: typeof VueComponent): void {
    Implementation = _Implementation
  }
}


export default DropDownList;
