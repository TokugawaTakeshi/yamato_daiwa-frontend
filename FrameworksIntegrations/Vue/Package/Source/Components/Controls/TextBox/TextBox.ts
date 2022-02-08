import {
  Options as VueComponentConfiguration,
  Vue as VueComponent,
  Prop as VueProperty
} from "vue-property-decorator";

import {
  isString,
  isElementOfEnumeration, isEitherUndefinedOrNull
} from "@yamato-daiwa/es-extensions";


namespace TextBox {

  export type SupportedValidatablePayloadValuesTypes = string | number | null;

  export enum HTML_Types {
    text = "text",
    number = "number",
    email = "email",
    password = "password",
    phoneNumber = "tel",
    hidden = "hidden",
    URL = "url",
  }

  export enum Events {
    input = "input",
    blur = "blur"
  }


  export type Themes = {
    readonly basic: "BASIC";
    [themeID: string]: string;
  };

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

  export type CustomDecorativeVariationDefinition = {
    key: string;
    ID?: string;
    correspondingCompoundControlDecorativeVariationID: string;
    CSS_ModifierName: string;
  };


  @VueComponentConfiguration({})
  export class BasicLogic extends VueComponent {

    /* === Properties =============================================================================================== */
    @VueProperty({
      type: String,
      default: TextBox.HTML_Types.text,
      validator: (rawValue: unknown): boolean => isString(rawValue) && isElementOfEnumeration(rawValue, TextBox.HTML_Types)
    })
    protected readonly HTML_Type!: string;

    @VueProperty({ type: Boolean, default: false })
    protected readonly required!: boolean;

    @VueProperty({ type: Boolean, default: false })
    protected readonly displayAppropriateBadgeWhenInputIsRequired!: boolean;

    @VueProperty({ type: Boolean, default: false })
    protected readonly multiline!: boolean;

    @VueProperty({ type: Boolean, default: false })
    protected readonly readonly!: boolean;

    @VueProperty({ type: Boolean, default: false })
    protected readonly disabled!: boolean;


    @VueProperty({ type: Boolean, default: false })
    protected readonly valueMustBeNonNegativeIntegerOfRegularNotation!: boolean;

    @VueProperty({ type: Boolean, default: false })
    protected readonly valueMustBeDigitsSequence!: boolean;

    @VueProperty({ type: Boolean, default: false })
    protected readonly convertEmptyValueToZero!: boolean;
    @VueProperty({ type: Boolean, default: false })
    protected readonly convertEmptyValueToNull!: boolean;


    @VueProperty({ type: String })
    protected readonly label?: string;

    @VueProperty({ type: String })
    protected readonly ARIA_Label?: string;

    @VueProperty({ type: String })
    protected readonly externalLabelHTML_ID?: string;

    @VueProperty({ type: String })
    protected readonly guidance?: string;

    @VueProperty({ type: String })
    protected readonly placeholder?: string;



    /* === Livecycle hooks ========================================================================================== */
    public beforeCreate(): void {

      if (
        isEitherUndefinedOrNull(this.label) &&
        isEitherUndefinedOrNull(this.ARIA_Label) &&
        isEitherUndefinedOrNull(this.externalLabelHTML_ID)
      ) {

      }
    }

  }


  export let Implementation: typeof VueComponent | null;

  export function setImplementation(_Implementation: typeof VueComponent): void {
    Implementation = _Implementation
  }
}


export default TextBox;
