import {
  ParsedJSON_Object,
  isUndefined,
  isNonEmptyObject,
  isEmptyObject,
  RawObjectDataProcessor,
  Logger, InvalidParameterValueError, InvalidExternalDataError
} from "@yamato-daiwa/es-extensions";


export default abstract class MixinParametersValidator {

  public static getValidatedParameters(
    rawParametersObject: unknown,
    mixinParametersSpecification: RawObjectDataProcessor.FixedKeyAndValuesTypeObjectDataSpecification,
    mixinNameForLogging: string
  ): ParsedJSON_Object {

    const requiredParametersNames: Array<string> = MixinParametersValidator.
        getRequiredParameters_Names(mixinParametersSpecification);

    if (isUndefined(rawParametersObject) || isEmptyObject(rawParametersObject)) {

      if (requiredParametersNames.length > 0) {
        Logger.throwErrorAndLog({
          errorInstance: new InvalidParameterValueError({
            parameterName: "parametersObject",
            messageSpecificPart: `Below required for mixin '${mixinNameForLogging}' parameters has not been specified:\n` +
                `${JSON.stringify(requiredParametersNames, null, 2)}`
          }),
          title: InvalidParameterValueError.DEFAULT_TITLE,
          occurrenceLocation: "MixinParametersValidator.getValidatedParameters(parametersObject)"
        });
      }

      const parametersObject: ParsedJSON_Object = {};
      MixinParametersValidator.substituteDefaultValues(parametersObject, mixinParametersSpecification);

      return parametersObject;

    }


    if (!isNonEmptyObject(rawParametersObject)) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: "parametersObject",
          messageSpecificPart: `First and only parameter of mixin '${mixinNameForLogging}' must be an object.`
        }),
        title: InvalidParameterValueError.DEFAULT_TITLE,
        occurrenceLocation: "MixinParametersValidator.getValidatedParameters(parametersObject)"
      });
    }

    const validationResults: RawObjectDataProcessor.ProcessingResult<ParsedJSON_Object> =
        RawObjectDataProcessor.process(rawParametersObject, mixinParametersSpecification);

    if (validationResults.rawDataIsInvalid) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidExternalDataError({
          mentionToExpectedData: `${mixinNameForLogging}MixinParametersObject`,
          messageSpecificPart: RawObjectDataProcessor.formatValidationErrorsList(validationResults.validationErrorsMessages)
        }),
        title: InvalidExternalDataError.DEFAULT_TITLE,
        occurrenceLocation: "MixinParametersValidator.getValidatedParameters(parametersObject)"
      });
    }

    return validationResults.processedData;
  }


  private static getRequiredParameters_Names(
    mixinParametersSpecification: RawObjectDataProcessor.FixedKeyAndValuesTypeObjectDataSpecification
  ): Array<string> {

    const requiredParameters_Names: Array<string> = [];

    for (const [ parameterName, parameterSpecification ] of Object.entries(mixinParametersSpecification.properties)) {
      if (parameterSpecification.required === true) {
        requiredParameters_Names.push(parameterName);
      }
    }

    return requiredParameters_Names;
  }


  private static substituteDefaultValues(
      parametersObject: ParsedJSON_Object,
      mixinParametersSpecification: RawObjectDataProcessor.FixedKeyAndValuesTypeObjectDataSpecification
  ): void {
    for (const [ propertyName, propertySpecification ] of Object.entries(mixinParametersSpecification.properties)) {
      if (!isUndefined(propertySpecification.defaultValue) && isUndefined(parametersObject[propertyName])) {
        parametersObject[propertyName] = propertySpecification.defaultValue;
      }
    }
  }
}
