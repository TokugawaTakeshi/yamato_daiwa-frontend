import InputtedValueValidationRule from "@Controls/_Validation/InputtedValueValidationRule";
import { isNumber, Logger, InvalidParameterValueError } from "@yamato-daiwa/es-extensions";


export default class NonNegativeIntegerOfRegularNotationInputtedValueValidationRule extends InputtedValueValidationRule {

  public constructor(
    compoundParameter: InputtedValueValidationRule.ConstructorParameter & Readonly<{ minimalNumericValue: number; }>
  ) {
    super(compoundParameter);
  }


  /* eslint-disable-next-line class-methods-use-this -- This method could not be made static because it implements
  *   the abstract method of superclass. */
  public isValid(rawValue: unknown): boolean {

    if (!isNumber(rawValue)) {

      Logger.logError({
        errorType: InvalidParameterValueError.NAME,
        title: InvalidParameterValueError.localization.defaultTitle,
        description: `Unable to execute this validation because raw value has type '${ typeof rawValue }'.`,
        occurrenceLocation: "NonNegativeIntegerOfRegularNotationInputtedValueValidationRule.isValid(rawValue)"
      });

      return true;

    }


    return /^\d+$/u.test(String(rawValue));

  }

}
