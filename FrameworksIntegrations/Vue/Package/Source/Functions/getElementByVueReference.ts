import type { ComponentPublicInstance } from "vue";
import { Logger, DOM_ElementRetrievingFailedError, isUndefined } from "@yamato-daiwa/es-extensions";


export default function getElementByVueReference(
  vueReferenceID: string,
  parentVueComponent: ComponentPublicInstance
): Element | null {

  const referenceContent: unknown = parentVueComponent.$refs[vueReferenceID];

  if (isUndefined(referenceContent)) {
    return null;
  }


  if (!(referenceContent instanceof Element)) {
    Logger.throwErrorAndLog({
      errorInstance: new DOM_ElementRetrievingFailedError({
        customMessage: `The Vue reference with id "${ vueReferenceID }" in not the instance of native Element.`
      }),
      occurrenceLocation: "getElementByVueReference(vueReferenceID, parentVueComponent)",
      title: DOM_ElementRetrievingFailedError.localization.defaultTitle
    });
  }


  return referenceContent;

}
