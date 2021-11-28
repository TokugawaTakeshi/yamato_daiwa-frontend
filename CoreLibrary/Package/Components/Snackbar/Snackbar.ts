import componentHTML_Workpiece from "./Snackbar.template.pug";
// import {
//   isNull,
//   Logger,
//   ClassRequiredInitializationHasNotBeenExecutedError,
//   InheritEnumerationKeys
// } from "@yamato-daiwa/es-extensions";
import getExpectedToBeSingleElement from "../../Utils/getExpectedToBeSingleElement";
import createElement from "../../Utils/createElement";
import addClickEventHandler from "../../Utils/addClickEventHandler";


abstract class Snackbar {

  private static readonly constructionSite: HTMLElement = createElement({
    HTML_Code: componentHTML_Workpiece,
    rootElementTypeChecker: (rootElement: Element): rootElement is HTMLElement => rootElement instanceof HTMLElement
  });

  private static readonly iconPlaceholder: Element = getExpectedToBeSingleElement({
    selector: ".Snackbar-IconPlaceholder", context: Snackbar.constructionSite
  });

  private static readonly successIcon: Element;
  private static readonly guidanceIcon: Element;
  private static readonly warningIcon: Element;
  private static readonly errorIcon: Element;

  private static readonly textElement: Element = getExpectedToBeSingleElement({
    selector: ".Snackbar-Text", context: Snackbar.constructionSite
  });

  private static readonly dismissButton: Element = getExpectedToBeSingleElement({
    selector: ".Snackbar-DismissButton", context: Snackbar.constructionSite
  });

  // TODO Static block の対応が出来次第、アイコン初期化。
  // TODO Static block の対応が出来次第、閉じるボタンを初期化

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
        Snackbar.iconPlaceholder.replaceWith(Snackbar.successIcon);
        break;
      }
      case Snackbar.DecorativeVariations.guidance: {
        rootElementDecorativeVariationModifierCSS_Class = "Snackbar__InfoDecoration";
        Snackbar.iconPlaceholder.replaceWith(Snackbar.guidanceIcon);
        break;
      }
      case Snackbar.DecorativeVariations.warning: {
        rootElementDecorativeVariationModifierCSS_Class = "Snackbar__WarningDecoration";
        Snackbar.iconPlaceholder.replaceWith(Snackbar.warningIcon);
        break;
      }
      case Snackbar.DecorativeVariations.error: {
        rootElementDecorativeVariationModifierCSS_Class = "Snackbar__ErrorDecoration";
        Snackbar.iconPlaceholder.replaceWith(Snackbar.errorIcon);
      }
    }

    Snackbar.constructionSite.classList.add(rootElementDecorativeVariationModifierCSS_Class);
    Snackbar.textElement.innerHTML = textOrHTML;

    Snackbar.initializeCloseButton(); // TODO static block 追加後彼方に移動する

    parentElement.appendChild(Snackbar.constructionSite);

    Snackbar.constructionSite.animate([
      {
        opacity: 0,
        transform: "translateY(-100%)"
      },
      {
        opacity: 1,
        transform: "none"
      }
    ], {
      duration: 500,
      easing: "ease-out"
    });
  }


  public static hideAndUnmount(): void {

    Snackbar.constructionSite.animate([
      {
        opacity: 1,
        transform: "none"
      },
      {
        opacity: 0,
        transform: "translateY(-100%)"
      }
    ], {
      duration: 250,
      easing: "ease-in"
    }).
        addEventListener("finish", () => {
          Snackbar.constructionSite.remove();
        });
  }


  private static initializeCloseButton(): void {
    addClickEventHandler({
      targetElement: Snackbar.dismissButton,
      handler: Snackbar.hideAndUnmount,
      handleParentElementFirst: false
    });
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
