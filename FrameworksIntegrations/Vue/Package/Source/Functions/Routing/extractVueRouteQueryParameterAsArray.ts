import type { _RouteLocationBase as VueRouterLocation } from "vue-router";
import {
  isString,
  isUndefined,
  isNotUndefined
} from "@yamato-daiwa/es-extensions";


export default function extractVueRouteQueryParameterValueAsArrayOfStrings(
  {
    targetRoute,
    targetQueryParameterKey,
    arrayElementAdditionalValidator
  }: Readonly<{
    targetRoute: VueRouterLocation;
    targetQueryParameterKey: string;
    arrayElementAdditionalValidator?: (rawValue: string) => boolean;
  }>
): Array<string> {

  const queryParameterPotentialValue: unknown = targetRoute.query[targetQueryParameterKey];

  if (isUndefined(queryParameterPotentialValue)) {
    return [];
  }


  if (isString(queryParameterPotentialValue)) {

    if (isNotUndefined(arrayElementAdditionalValidator)) {
      return arrayElementAdditionalValidator(queryParameterPotentialValue) ? [ queryParameterPotentialValue ] : [];
    }


    return [ queryParameterPotentialValue ];

  }


  const queryParameterAccumulatingArrayedValue: Array<string> = [];

  for (const oneElementOfArrayedValue of queryParameterPotentialValue) {

    if (!isString(oneElementOfArrayedValue)) {
      continue;
    }


    if (isUndefined(arrayElementAdditionalValidator)) {
      queryParameterAccumulatingArrayedValue.push(oneElementOfArrayedValue);
      continue;
    }


    if (arrayElementAdditionalValidator(oneElementOfArrayedValue)) {
      queryParameterAccumulatingArrayedValue.push(oneElementOfArrayedValue);
    }

  }

  return queryParameterAccumulatingArrayedValue;

}
