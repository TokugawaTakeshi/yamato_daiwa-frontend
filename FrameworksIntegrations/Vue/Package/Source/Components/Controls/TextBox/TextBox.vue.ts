/* --- Constants and enumerations ----------------------------------------------------------------------------------- */
import YDF_ComponentsCoordinator from "@Components/YDF_ComponentsCoordinator";

/* --- Other components --------------------------------------------------------------------------------------------- */
import InputtableControl from "../InputtableControl";

/* --- Validations -------------------------------------------------------------------------------------------------- */
import ValidatableControl from "../_Validation/ValidatableControl";
import type ValueValidation from "../_Validation/ValueValidation";

/* --- Framework ---------------------------------------------------------------------------------------------------- */
import {
  Options as VueComponentConfiguration,
  Model as VModel,
  Prop as VueProperty,
  Emit as emitEvent
} from "vue-property-decorator";
import type { Vue as VueComponent } from "vue-property-decorator";

/* --- Utils -------------------------------------------------------------------------------------------------------- */
import {
  isString,
  isNumber,
  isNull,
  isElementOfEnumeration,
  toLowerCamelCase,
  toScreamingSnakeCase,
  toUpperCamelCase
} from "@yamato-daiwa/es-extensions";
import getExpectedToBeMountedElementByVueReferenceID from "@Source/Functions/getExpectedToBeMountedElementByVueReferenceID";


namespace TextBox {

  export type SupportedValidatablePayloadValuesTypes = string | number | null;


  export enum HTML_Types {
    text = "text",
    number = "number",
    email = "email",
    password = "password",
    phoneNumber = "tel",
    hidden = "hidden",
    URL = "url"
  }

  export enum Events {
    input = "update:payload",
    blur = "BLUR"
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
    [geometricVariationName: string]: string;
  };

  export const GeometricVariations: GeometricVariations = {
    regular: "REGULAR",
    small: "SMALL"
  };


  export type DecorativeVariations = {
    readonly regular: "REGULAR";
    [decorativeVariationID: string]: string;
  };

  export const DecorativeVariations: DecorativeVariations = {
    regular: "REGULAR",
    accented: "ACCENTED"
  };


  @VueComponentConfiguration({})
  export class BasicLogic extends InputtableControl implements ValidatableControl {

    @VModel("payload", {
      required: true,
      validator: (rawVModel: unknown): boolean =>
          ValidatableControl.VModelChecker(
              rawVModel, (rawValue: unknown): boolean => isString(rawValue) || isNumber(rawValue) || isNull(rawValue)
          )
    })
    private readonly validatablePayload!: ValidatableControl.Payload<
      SupportedValidatablePayloadValuesTypes,
      SupportedValidatablePayloadValuesTypes,
      ValueValidation
    >;


    /* === Properties =============================================================================================== */
    @VueProperty({
      type: String,
      default: HTML_Types.text,
      validator: (rawValue: unknown): boolean => isString(rawValue) && isElementOfEnumeration(rawValue, HTML_Types)
    })
    protected readonly HTML_Type!: string;


    /* --- Textings ------------------------------------------------------------------------------------------------- */
    @VueProperty({ type: String })
    protected readonly placeholder?: string | null;


    /* --- Invalid value inputting preventing ----------------------------------------------------------------------- */
    @VueProperty({ type: Number, validator: Number.isInteger })
    protected readonly minimalCharactersCount?: number | null;

    @VueProperty({ type: Number, validator: Number.isInteger })
    protected readonly maximalCharactersCount?: number | null;

    @VueProperty({ type: Number, validator: Number.isInteger })
    protected readonly minimalNumericValue?: number | null;

    @VueProperty({ type: Number, validator: Number.isInteger })
    protected readonly maximalNumericValue?: number | null;

    @VueProperty({ type: Boolean, default: false })
    protected readonly valueMustBeTheNonNegativeIntegerOfRegularNotation!: boolean;

    @VueProperty({ type: Boolean, default: false })
    protected readonly valueMustBeTheDigitsSequence!: boolean;


    /* --- Value converters ----------------------------------------------------------------------------------------- */
    @VueProperty({ type: Boolean, default: false })
    protected readonly convertEmptyValueToZero!: boolean;

    @VueProperty({ type: Boolean, default: false })
    protected readonly convertEmptyValueToNull!: boolean;


    /* --- Validation ----------------------------------------------------------------------------------------------- */
    @VueProperty({ type: Boolean, default: false })
    protected readonly mustHighlightInvalidInputImmediately!: boolean;

    @VueProperty({ type: Boolean, default: false })
    protected readonly mustHighlightValidInputImmediately!: boolean;


    /* --- Other boolean flags -------------------------------------------------------------------------------------- */
    @VueProperty({ type: Boolean, default: false })
    protected readonly multiline!: boolean;

    @VueProperty({ type: Boolean, default: false })
    protected readonly readonly!: boolean;


    /* --- HTML IDs ------------------------------------------------------------------------------------------------- */
    @VueProperty({
      type: String,
      default: BasicLogic.generateInputOrTextareaElementHTML_ID()
    })
    protected readonly inputOrTextareaElementHTML_ID!: string;

    @VueProperty({ type: String, required: false })
    protected readonly labelElementHTML_ID?: string | null;


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


    /* === State ==================================================================================================== */
    private rawInput: string = "";


    /* === Interface ================================================================================================ */
    public focus(): this {

      getExpectedToBeMountedElementByVueReferenceID({
        vueReferenceID: this.INPUT_OR_TEXTAREA_ELEMENT_VUE_REFERENCE_ID,
        parentVueComponent: this,
        TargetElementSubtype: HTMLElement
      }).focus();

      return this;

    }


    /* === Lifecycle hooks ========================================================================================== */
    public beforeCreate(): void {
      this.invalidInputHighlightingIfAnyErrorsMessages = this.mustHighlightInvalidInputImmediately;
    }

    public created(): void {

      if (isString(this.validatablePayload.value)) {
        this.rawInput = this.validatablePayload.value;
      } else if (isNumber(this.validatablePayload.value)) {
        this.rawInput = String(this.validatablePayload.value);
      } else {
        this.rawInput = "";
      }

      // todo minimal chars countのバリデーション

    }


    /* === Processing of user's actions ============================================================================= */
    /* [ Vue theory ] The events sequence is "keydown" → "input" → "keyup". The "keydown" could be used for preventing
     *    of inputting of forbidden characters, but filtering out except allowed character is difficult because it is
     *    required to respect the "Enter", "Backspace", arrow keys etc. */
    protected onKeyDown(event: KeyboardEvent): void {

      /* 〔 理論 〕 妥当数入力処理（valueMustBeTheNonNegativeIntegerOfRegularNotation: true）〔 1 〕
       * 1) 此処では利用者が先に行く不正０の入力を予防する事が出来ない。例えば、利用者は「123」を入力してからカーソルを最初位置に動かして、「0」を入力しても、
       * 此方ではカーソルの位置が判らないので、「onInput」で不正０の入力を遮る。
       * 2) 読める文字と他に、利用者は半角空白やバックスペースや方向ボタンが押せるので、「!/^[0-9]$/u.test(event.key)」の様な正規表現では入力を予防出来ない。
       * 3) 負号はボタンで入力するとは限らなく、ブラウザーに付けられたボタンにより入力も可能である。
       * */
      if (
        (
          this.valueMustBeTheNonNegativeIntegerOfRegularNotation ||
          this.valueMustBeTheDigitsSequence
        ) &&
        /^[+\-e.]$/u.test(event.key)
      ) {
        event.preventDefault();
      }
    }

    /* [ Theory ] Event "input" element has type 'number', the "rawValue" will be the empty string */
    protected onInput(rawValue: string): void {

      if (rawValue.length === 0) {

        if (this.convertEmptyValueToZero) {
          this.$emit(Events.input, this.validatablePayload.updateImmutably({ newValue: 0 }));
          this.rawInput = "0";
          return;
        }


        if (this.convertEmptyValueToNull) {
          this.$emit(Events.input, this.validatablePayload.updateImmutably({ newValue: null }));
          return;
        }
      }


      if (this.HTML_Type === HTML_Types.number && this.convertEmptyValueToZero && this.rawInput.startsWith("0")) {

        const inputtedValueWithoutPrependedZeros: string = this.rawInput.replace(/^0+/u, "");

        if (inputtedValueWithoutPrependedZeros.length === 0) {
          this.$emit(Events.input, this.validatablePayload.updateImmutably({ newValue: 0 }));
          return;
        }


        this.rawInput = inputtedValueWithoutPrependedZeros;
        this.$emit(Events.input, this.validatablePayload.updateImmutably({
          newValue: Number(inputtedValueWithoutPrependedZeros)
        }));
        return;
      }


      if (this.HTML_Type === HTML_Types.number) {
        this.$emit(Events.input, this.validatablePayload.updateImmutably({ newValue: Number(rawValue) }));
        return;
      }


      this.$emit(Events.input, this.validatablePayload.updateImmutably({ newValue: rawValue }));
    }

    @emitEvent(Events.blur)
    protected onBlur(): void {
      this.invalidInputHighlightingIfAnyErrorsMessages = true;
    }


    /* === Constants and enumerations =============================================================================== */
    protected readonly INPUT_OR_TEXTAREA_ELEMENT_VUE_REFERENCE_ID: string =
        "INPUT_ELEMENT_OR_AUTORESIZABLE_TEXTAREA_COMPONENT";


    /* === Auxiliaries ============================================================================================== */
    protected get rootElementModifiersCSS_Classes(): Array<string> {
      return [
        ...Object.values(Themes).length > 1 ? [ BasicLogic.ThemesCSS_ModifiersNames[this.theme] ] : [],
        ...Object.values(GeometricVariations).length ? [
          BasicLogic.GeometricVariationsCSS_ModifiersNames[this.geometry]
        ] : [],
        ...Object.values(DecorativeVariations).length ? [
          BasicLogic.DecorativeVariationsCSS_ModifiersNames[this.decoration]
        ] : [],
        ...this.multiline ? [ "TextBox__Multiline" ] : [],
        ...this.invalidInputHighlightingIfAnyErrorsMessages && this.validatablePayload.isInvalid ? [
          "TextBox__InvalidValueState"
        ] : [],
        ...this.disabled ? [ "TextBox__DisabledState" ] : []
      ];
    }

    private static counterForInputOrTextareaElementHTML_ID_Generating: number = 0;
    private static generateInputOrTextareaElementHTML_ID(): string {
      BasicLogic.counterForInputOrTextareaElementHTML_ID_Generating++;
      return `TEXT_BOX-INPUT_OR_TEXTAREA_ELEMENT-${ BasicLogic.counterForInputOrTextareaElementHTML_ID_Generating }`;
    }


    /* === Themes =================================================================================================== */
    protected static ThemesCSS_ModifiersNames: { [themeID: string]: string; } = {
      [Themes.regular]: "RegularTheme"
    };

    public static defineNewThemes(themesNames: Array<string>): typeof BasicLogic {

      for (const themeName of themesNames) {

        const themeName__lowerCamelCase: string = toLowerCamelCase(themeName);

        Themes[themeName__lowerCamelCase] = toScreamingSnakeCase(themeName);
        BasicLogic.ThemesCSS_ModifiersNames[themeName__lowerCamelCase] = `Button__${ toUpperCamelCase(themeName) }Theme`;
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

        const geometricVariationsName__lowerCamelCase: string = toLowerCamelCase(geometricVariationsName);

        GeometricVariations[geometricVariationsName__lowerCamelCase] = toScreamingSnakeCase(geometricVariationsName);
        BasicLogic.GeometricVariationsCSS_ModifiersNames[geometricVariationsName__lowerCamelCase] =
            `Button__${ toUpperCamelCase(geometricVariationsName) }Geometry`;
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

        const decorativeVariationsName__lowerCamelCase: string = toLowerCamelCase(decorativeVariationsName);

        DecorativeVariations[decorativeVariationsName__lowerCamelCase] = toScreamingSnakeCase(decorativeVariationsName);
        BasicLogic.DecorativeVariationsCSS_ModifiersNames[decorativeVariationsName__lowerCamelCase] =
            `TextBox__${ toUpperCamelCase(decorativeVariationsName) }Decorations`;
      }

      return BasicLogic;
    }
  }


  export let Implementation: typeof VueComponent | null;

  export function setImplementation(_Implementation: typeof VueComponent): void {
    Implementation = _Implementation;
  }
}


export default TextBox;
