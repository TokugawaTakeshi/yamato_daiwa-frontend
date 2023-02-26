import InputtedValueValidationRule from "@Controls/_Validation/InputtedValueValidationRule";
import { isNumber, Logger, InvalidParameterValueError } from "@yamato-daiwa/es-extensions";


export default class NumericMaximumInputtedValueValidationRule extends InputtedValueValidationRule {

  private readonly MINIMAL_NUMERIC_VALUE: number;


  public constructor(
    compoundParameter: InputtedValueValidationRule.ConstructorParameter & Readonly<{ minimalNumericValue: number; }>
  ) {
    super(compoundParameter);
    this.MINIMAL_NUMERIC_VALUE = compoundParameter.minimalNumericValue;
  }


  public isValid(rawValue: unknown): boolean {

    if (!isNumber(rawValue)) {

      Logger.logError({
        errorType: InvalidParameterValueError.NAME,
        title: InvalidParameterValueError.localization.defaultTitle,
        description: `Unable to execute this validation because raw value has type '${ typeof rawValue }'.`,
        occurrenceLocation: "NumericMaximumInputtedValueValidationRule.isValid(rawValue)"
      });

      return true;

    }


    return rawValue >= this.MINIMAL_NUMERIC_VALUE;

  }

}

