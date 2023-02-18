import type { ComponentPublicInstance } from "vue";
import {
  Logger,
  DOM_ElementRetrievingFailedError,
  isUndefined,
  UnexpectedEventError
} from "@yamato-daiwa/es-extensions";


export default function getExpectedToBeMountedDOM_ElementByVueReferenceID(
  {
    vueReferenceID,
    parentVueComponent
  }: Readonly<{
    vueReferenceID: string;
    parentVueComponent: ComponentPublicInstance;
  }>
): Element;

export default function getExpectedToBeMountedDOM_ElementByVueReferenceID<ElementSubtype extends Element>(
  {
    vueReferenceID,
    parentVueComponent,
    TargetElementSubtype
  }: Readonly<{
    vueReferenceID: string;
    parentVueComponent: ComponentPublicInstance;
    TargetElementSubtype?: new () => ElementSubtype;
  }>
): ElementSubtype;


export default function getExpectedToBeMountedDOM_ElementByVueReferenceID<ElementSubtype extends Element>(
  {
    vueReferenceID,
    parentVueComponent,
    TargetElementSubtype
  }: Readonly<{
    vueReferenceID: string;
    parentVueComponent: ComponentPublicInstance;
    TargetElementSubtype?: new () => ElementSubtype;
  }>
): Element | ElementSubtype {

  const potentialDOM_Element: unknown = parentVueComponent.$refs[vueReferenceID];

  if (isUndefined(potentialDOM_Element)) {
    Logger.throwErrorAndLog({
      errorInstance: new DOM_ElementRetrievingFailedError({
        customMessage: `No DOM element corresponding to Vue reference with ID "${ vueReferenceID }" has been mounted.`
      }),
      title: DOM_ElementRetrievingFailedError.localization.defaultTitle,
      occurrenceLocation: "getExpectedToBeMountedDOM_ElementByVueReferenceID(compoundParameter)"
    });
  }


  if (!(potentialDOM_Element instanceof Element)) {
    Logger.throwErrorAndLog({
      errorInstance: new DOM_ElementRetrievingFailedError({
        customMessage: `The value of Vue reference with ID "${ vueReferenceID }" is not the instance of native "Element" class.`
      }),
      title: DOM_ElementRetrievingFailedError.localization.defaultTitle,
      occurrenceLocation: "getExpectedToBeMountedDOM_ElementByVueReferenceID(compoundParameter)"
    });
  }


  if (isUndefined(TargetElementSubtype)) {
    return potentialDOM_Element;
  }


  if (!(potentialDOM_Element instanceof TargetElementSubtype)) {
    Logger.throwErrorAndLog({
      errorInstance: new UnexpectedEventError(
        `Contrary to expectations, the element corresponding to Vue reference with ID "${ vueReferenceID }" is not ` +
        `the instance of "${ TargetElementSubtype.name }".`
      ),
      occurrenceLocation: "getExpectedToBeMountedDOM_ElementByVueReferenceID(compoundParameter)",
      title: DOM_ElementRetrievingFailedError.localization.defaultTitle
    });
  }


  return potentialDOM_Element;

}
