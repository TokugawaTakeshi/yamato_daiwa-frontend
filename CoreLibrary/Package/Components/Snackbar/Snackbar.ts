import componentTemplate from "./Snackbar.template.pug";
import { createElement } from "@yamato-daiwa/es-extensions-browserjs";
// import {
//   isNull,
//   Logger,
//   ClassRequiredInitializationHasNotBeenExecutedError,
//   InheritEnumerationKeys
// } from "@yamato-daiwa/es-extensions";
import { getExpectedToBeSingleElement } from "../../Utils/getExpectedToBeSingleElement";


class Snackbar {

  // TODO HTMLElement
  private static readonly equipment: Element = createElement(componentTemplate);


  public static mountAndDisplayForAWhile(
    {
      decorativeVariation,
      parentElementSelector = "body"
    }: {
      decorativeVariation: Snackbar.DecorativeVariations;
      parentElementSelector?: string;
    }
  ): void {

    const parentElement: Element = getExpectedToBeSingleElement({
      selector: parentElementSelector
    });

    let rootElementDecorativeVariationModifierCSS_Class: string;

    switch (decorativeVariation) {
      case Snackbar.DecorativeVariations.success: {
        rootElementDecorativeVariationModifierCSS_Class = ".Snackbar__SuccessDecoration";
        break;
      }
      case Snackbar.DecorativeVariations.guidance: {
        rootElementDecorativeVariationModifierCSS_Class = ".Snackbar__InfoDecoration";
        break;
      }
      case Snackbar.DecorativeVariations.warning: {
        rootElementDecorativeVariationModifierCSS_Class = ".Snackbar__WarningDecoration";
        break;
      }
      case Snackbar.DecorativeVariations.error: {
        rootElementDecorativeVariationModifierCSS_Class = ".Snackbar__ErrorDecoration";
      }
    }

    Snackbar.equipment.classList.add(rootElementDecorativeVariationModifierCSS_Class);
    // Snackbar.equipment.style

    parentElement.appendChild(Snackbar.equipment);
  }

  // public static mount(
  //   parametersObject: { parentElementSelector: string; }
  // ): typeof Snackbar {
  //
  //   document.querySelector(parametersObject.parentElementSelector).appendChild(selfSoleInstance.rootElement);
  //   selfSoleInstance.rootElement.style.display = "none";
  //   Snackbar.selfSoleInstance = selfSoleInstance;
  //   return Snackbar;
  // }
  //
  //
  // public static displayForAWhile(
  //   parametersObject: {
  //     message: string;
  //     semantic: string;
  //     displayingDuration: string;
  //   }
  // ): void {
  //   console.log("確認点1");
  //   console.log(Snackbar.getSelfSoleInstanceWhichExpectedToBeCreated());
  //   Snackbar.getSelfSoleInstanceWhichExpectedToBeCreated().displayForAWhile(parametersObject);
  // }
  //
  // public static dismiss(): void {
  //   console.log("");
  // }
  //
  //
  // private static getSelfSoleInstanceWhichExpectedToBeCreated(): Snackbar {
  //
  //   if (isNull(Snackbar.selfSoleInstance)) {
  //     Logger.throwErrorAndLog({
  //       errorInstance: new ClassRequiredInitializationHasNotBeenExecutedError({
  //         className: "ClassRequiredInitializationHasNotBeenExecutedError",
  //         initializingMethodName: "mount"
  //       }),
  //       title: ClassRequiredInitializationHasNotBeenExecutedError.DEFAULT_TITLE,
  //       occurrenceLocation: "Snackbar.getSelfSoleInstanceWhichExpectedToBeCreated()"
  //     });
  //   }
  //
  //   console.log("確認点2");
  //   return Snackbar.selfSoleInstance;
  // }
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
