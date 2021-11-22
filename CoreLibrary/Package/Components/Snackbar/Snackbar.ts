import componentHTML_Workpiece from "./Snackbar.template.pug";
// import {
//   isNull,
//   Logger,
//   ClassRequiredInitializationHasNotBeenExecutedError,
//   InheritEnumerationKeys
// } from "@yamato-daiwa/es-extensions";
import getExpectedToBeSingleElement from "../../Utils/getExpectedToBeSingleElement";
import createElement from "../../Utils/createElement";


class Snackbar {

  private static readonly constructionSite: HTMLElement = createElement({
    HTML_Code: componentHTML_Workpiece,
    rootElementTypeChecker: (rootElement: Element): rootElement is HTMLElement => rootElement instanceof HTMLElement
  });


  public static mountAndDisplayForAWhile(
    {
      textOrHTML,
      decorativeVariation,
      parentElementSelector = "body"
    }: {
      textOrHTML: string;
      decorativeVariation: Snackbar.DecorativeVariations;
      parentElementSelector?: string;
    }
  ): void {

    const parentElement: Element = getExpectedToBeSingleElement({ selector: parentElementSelector });

    let rootElementDecorativeVariationModifierCSS_Class: string;

    switch (decorativeVariation) {
      case Snackbar.DecorativeVariations.success: {
        rootElementDecorativeVariationModifierCSS_Class = "Snackbar__SuccessDecoration";
        break;
      }
      case Snackbar.DecorativeVariations.guidance: {
        rootElementDecorativeVariationModifierCSS_Class = "Snackbar__InfoDecoration";
        break;
      }
      case Snackbar.DecorativeVariations.warning: {
        rootElementDecorativeVariationModifierCSS_Class = "Snackbar__WarningDecoration";
        break;
      }
      case Snackbar.DecorativeVariations.error: {
        rootElementDecorativeVariationModifierCSS_Class = "Snackbar__ErrorDecoration";
      }
    }

    Snackbar.constructionSite.classList.add(rootElementDecorativeVariationModifierCSS_Class);

    parentElement.appendChild(Snackbar.constructionSite);
  }


  public static hideAndUnmount(): void {
    document.removeChild(Snackbar.constructionSite);
  }
}


namespace Snackbar {
  export enum DecorativeVariations {
    error = "ERROR",
    warning = "WARNING",
    guidance = "GUIDANCE",
    success = "SUCCESS"
  }
}


export default Snackbar;
