import {
  Options as VueComponentConfiguration,
  Vue as VueComponent,
  Prop as VueProperty
} from "vue-property-decorator";
import {
  isEitherUndefinedOrNull,
  Logger
} from "@yamato-daiwa/es-extensions";
import InvalidVuePropertiesCombinationError from
    "../_Errors/InvalidVuePropertiesCombination/InvalidVuePropertiesCombinationError";


@VueComponentConfiguration({})
export default class Control extends VueComponent {

  /* === Properties ================================================================================================= */
  @VueProperty({ type: String })
  protected readonly label?: string;

  @VueProperty({ type: String })
  protected readonly ARIA_Label?: string;

  @VueProperty({ type: String })
  protected readonly externalLabelHTML_ID?: string;

  @VueProperty({ type: String })
  protected readonly guidance?: string;


  @VueProperty({ type: Boolean, default: false })
  protected readonly required!: boolean;

  @VueProperty({ type: Boolean, default: false })
  protected readonly displayAppropriateBadgeIfInputIsRequired!: boolean;

  @VueProperty({ type: Boolean, default: false })
  protected readonly displayAppropriateBadgeIfInputIsOptional!: boolean;


  @VueProperty({ type: String })
  protected readonly coreElementHTML_ID?: string;


  @VueProperty({ type: Boolean, default: false })
  protected readonly disabled!: boolean;


  /* === State ====================================================================================================== */
  protected mustActivateAppropriateHighlightIfAnyErrorsMessages: boolean = false;


  /* === Methods ==================================================================================================== */
  public highlightInvalidInput(): this {
    this.mustActivateAppropriateHighlightIfAnyErrorsMessages = true;
    return this;
  }

  public getRootElementForScrollingProviding(): Element {
    return this.$el;
  }


  /* === Livecycle hooks ========================================================================================== */
  public beforeCreate(): void {

    const inheritedComponentNameForLogging: string = this.$options.name ?? "(Unnamed component)";

    if (
      isEitherUndefinedOrNull(this.label) &&
      isEitherUndefinedOrNull(this.ARIA_Label) &&
      isEitherUndefinedOrNull(this.externalLabelHTML_ID)
    ) {
      Logger.logError({
        errorType: InvalidVuePropertiesCombinationError.NAME,
        title: InvalidVuePropertiesCombinationError.localization.defaultTitle,
        description: InvalidVuePropertiesCombinationError.localization.generateMessage({
          vueComponentName: inheritedComponentNameForLogging,
          messageSpecificPart: "From the accessibility requirements, one of next properties must be specified:\n" +
              "● label\n● ARIA_Label\n● externalLabelHTML_ID"

        }),
        occurrenceLocation: `${ inheritedComponentNameForLogging }.beforeCreate()`
      });
    }
  }
}
