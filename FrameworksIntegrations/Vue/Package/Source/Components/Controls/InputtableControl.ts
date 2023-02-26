import {
  Options as VueComponentConfiguration,
  Vue as VueComponent,
  Prop as VueProperty
} from "vue-property-decorator";
import {
  isEitherUndefinedOrNull,
  isNonEmptyString,
  Logger
} from "@yamato-daiwa/es-extensions";
import InvalidVuePropertiesCombinationError from
    "../_Errors/InvalidVuePropertiesCombination/InvalidVuePropertiesCombinationError";


@VueComponentConfiguration({})
export default class InputtableControl extends VueComponent {

  /* === Properties ================================================================================================= */
  @VueProperty({
    type: String,
    validator: (rawValue: unknown): boolean => isNonEmptyString(rawValue)
  })
  protected readonly label?: string;

  @VueProperty({
    type: String,
    validator: (rawValue: unknown): boolean => isNonEmptyString(rawValue)
  })
  protected readonly accessibilityGuidance?: string;

  @VueProperty({
    type: String,
    validator: (rawValue: unknown): boolean => isNonEmptyString(rawValue)
  })
  protected readonly externalLabelHTML_ID?: string;

  @VueProperty({
    type: String,
    validator: (rawValue: unknown): boolean => isNonEmptyString(rawValue)
  })
  protected readonly guidance?: string;


  @VueProperty({ type: Boolean, default: false })
  protected readonly required!: boolean;

  @VueProperty({ type: Boolean, default: false })
  protected readonly mustDisplayAppropriateBadgeIfInputIsRequired!: boolean;

  @VueProperty({ type: Boolean, default: false })
  protected readonly mustDisplayAppropriateBadgeIfInputIsOptional!: boolean;


  @VueProperty({
    type: String,
    validator: (rawValue: unknown): boolean => isNonEmptyString(rawValue)
  })
  protected readonly coreElementHTML_ID?: string;


  @VueProperty({ type: Boolean, default: false })
  protected readonly disabled!: boolean;


  /* === State ====================================================================================================== */
  protected invalidInputHighlightingIfAnyValidationErrorsMessages: boolean = false;
  protected validInputHighlightingIfAnyErrorsMessages: boolean = false;


  /* === Methods ==================================================================================================== */
  public highlightInvalidInput(): this {
    this.invalidInputHighlightingIfAnyValidationErrorsMessages = true;
    return this;
  }

  public getRootElement(): Element {
    return this.$el;
  }

  public resetStateToInitial(): void {
    Object.assign(this.$data, this.$options.data?.({}));
  }


  /* === Livecycle hooks ========================================================================================== */
  public beforeCreate(): void {

    const inheritedComponentNameForLogging: string = this.$options.name ?? "(Unnamed component)";

    if (
      isEitherUndefinedOrNull(this.label) &&
      isEitherUndefinedOrNull(this.accessibilityGuidance) &&
      isEitherUndefinedOrNull(this.externalLabelHTML_ID)
    ) {
      Logger.logError({
        errorType: InvalidVuePropertiesCombinationError.NAME,
        title: InvalidVuePropertiesCombinationError.localization.defaultTitle,
        description: InvalidVuePropertiesCombinationError.localization.generateMessage({
          vueComponentName: inheritedComponentNameForLogging,
          messageSpecificPart: "From the accessibility requirements, one of next properties must be specified:\n" +
              "● label\n● accessibilityGuidance\n● externalLabelHTML_ID"

        }),
        occurrenceLocation: `${ inheritedComponentNameForLogging }.beforeCreate()`
      });
    }
  }
}
