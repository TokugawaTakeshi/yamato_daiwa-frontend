import {
  RawObjectDataProcessor,
  Logger,
  InvalidParameterValueError,
  InvalidExternalDataError,
  isArbitraryObject,
  isUndefined,
  isEitherUndefinedOrNull,
  stringifyAndFormatArbitraryValue
} from "@yamato-daiwa/es-extensions";
import type { ParsedJSON_Object } from "@yamato-daiwa/es-extensions";


export default abstract class PugMixinsObjectTypeParametersProcessor {

  public static processParameter(
    {
      rawParameter: rawMixinParameter,
      parameterNumber: mixinParameterNumber,
      parameterName: mixinParameterName,
      parameterPropertiesSpecification: mixinParametersPropertiesSpecification,
      mixinName
    }: {
      rawParameter: unknown;
      parameterNumber: number;
      parameterName: string;
      parameterPropertiesSpecification: RawObjectDataProcessor.PropertiesSpecification;
      mixinName: string;
    }
  ): ParsedJSON_Object {

    const mixinParameterRequiredPropertiesNames: Array<string> = PugMixinsObjectTypeParametersProcessor.
        getMixinParameterRequiredPropertiesNames(mixinParametersPropertiesSpecification);

    if (isEitherUndefinedOrNull(rawMixinParameter)) {

      if (mixinParameterRequiredPropertiesNames.length > 0) {
        Logger.throwErrorAndLog({
          errorInstance: new InvalidParameterValueError({
            parameterName: mixinName,
            parameterNumber: 1,
            messageSpecificPart: `Object type parameter No. ${ mixinParameterNumber } (named as '${ mixinParameterName }') ` +
                `of mixin '${ mixinName }' has been omitted while it has required properties: ` +
                `\n ${ stringifyAndFormatArbitraryValue(mixinParameterRequiredPropertiesNames) }`
          }),
          title: InvalidParameterValueError.localization.defaultTitle,
          occurrenceLocation: "PugMixinsObjectTypeParametersProcessor.processParameter(namedParameters)"
        });
      }

      const processedObjectTypeParameter: ParsedJSON_Object = {};

      PugMixinsObjectTypeParametersProcessor.
          substituteDefaultValues(processedObjectTypeParameter, mixinParametersPropertiesSpecification);

      return processedObjectTypeParameter;
    }


    if (!isArbitraryObject(rawMixinParameter)) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: mixinParameterName,
          parameterNumber: 1,
          messageSpecificPart: `The parameter No. ${ mixinParameterNumber } (named as '${ mixinParameterName }') ` +
              `of mixin '${ mixinName }' must be an object.`
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "PugMixinsObjectTypeParametersProcessor.processParameter(namedParameters)"
      });
    }


    const validationResults: RawObjectDataProcessor.ProcessingResult<ParsedJSON_Object> =
        RawObjectDataProcessor.process(rawMixinParameter, {
          nameForLogging: "MixinParameterProperties",
          subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
          properties: mixinParametersPropertiesSpecification
        });

    if (validationResults.rawDataIsInvalid) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidExternalDataError({
          mentionToExpectedData: `Parameter No. ${ mixinParameterNumber } of mixin '${ mixinName }'`,
          messageSpecificPart: RawObjectDataProcessor.formatValidationErrorsList(validationResults.validationErrorsMessages)
        }),
        title: InvalidExternalDataError.localization.defaultTitle,
        occurrenceLocation: "PugMixinsObjectTypeParametersProcessor.processParameter(namedParameters)"
      });
    }

    return validationResults.processedData;
  }


  private static getMixinParameterRequiredPropertiesNames(
    mixinParametersPropertiesSpecification: RawObjectDataProcessor.PropertiesSpecification
  ): Array<string> {

    const mixinParameterRequiredPropertiesNames: Array<string> = [];

    for (const [ propertyName, propertySpecification ] of Object.entries(mixinParametersPropertiesSpecification)) {
      if (propertySpecification.required === true) {
        mixinParameterRequiredPropertiesNames.push(propertyName);
      }
    }

    return mixinParameterRequiredPropertiesNames;
  }


  private static substituteDefaultValues(
    parametersObject: ParsedJSON_Object,
    mixinParametersPropertiesSpecification: RawObjectDataProcessor.PropertiesSpecification
  ): void {
    for (const [ propertyName, propertySpecification ] of Object.entries(mixinParametersPropertiesSpecification)) {
      if (!isUndefined(propertySpecification.defaultValue) && isUndefined(parametersObject[propertyName])) {
        parametersObject[propertyName] = propertySpecification.defaultValue;
      }
    }
  }
}
