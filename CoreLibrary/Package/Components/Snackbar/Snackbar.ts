import componentHTML_Workpiece from "./Snackbar.template.pug";
import getExpectedToBeSingleElement from "../../Utils/getExpectedToBeSingleElement";
import createElement from "../../Utils/createElement";
import addClickEventHandler from "../../Utils/addClickEventHandler";
import { secondsToMilliseconds } from "@yamato-daiwa/es-extensions";
import PromisesQueue from "../../Utils/PromisesQueue";


abstract class Snackbar {

  private static sessionsQueue: PromisesQueue = new PromisesQueue();
  
  private static readonly workpiece: HTMLElement = createElement({
    HTML_Code: componentHTML_Workpiece,
    rootElementTypeChecker: (rootElement: Element): rootElement is HTMLElement => rootElement instanceof HTMLElement
  });

  private static readonly iconPlaceholder: Element = getExpectedToBeSingleElement({
    selector: ".Snackbar-IconPlaceholder", context: Snackbar.workpiece
  });

  private static readonly successIcon: Element = getExpectedToBeSingleElement({
    selector: "[data-icon='SUCCESS']", context: Snackbar.workpiece
  });
  private static readonly guidanceIcon: Element = getExpectedToBeSingleElement({
    selector: "[data-icon='GUIDANCE']", context: Snackbar.workpiece
  });
  private static readonly warningIcon: Element = getExpectedToBeSingleElement({
    selector: "[data-icon='WARNING']", context: Snackbar.workpiece
  });
  private static readonly errorIcon: Element = getExpectedToBeSingleElement({
    selector: "[data-icon='ERROR']", context: Snackbar.workpiece
  });

  private static readonly messageElement: Element = getExpectedToBeSingleElement({
    selector: ".Snackbar-Message", context: Snackbar.workpiece
  });

  private static readonly dismissButton: Element = getExpectedToBeSingleElement({
    selector: ".Snackbar-DismissButton", context: Snackbar.workpiece
  });

  private static readonly DEFAULT_DISPLAYING_DURATION__SECONDS: number = 3;

  static {

    Snackbar.successIcon.remove();
    Snackbar.guidanceIcon.remove();
    Snackbar.warningIcon.remove();
    Snackbar.errorIcon.remove();

    addClickEventHandler({
      targetElement: Snackbar.dismissButton,
      handler(): void { Snackbar.hideAndUnmount(); },
      handleParentElementFirst: false
    });
  }


  public static mountAndDisplayForAWhile(parametersObject: Snackbar.ParametersObject): void {
    Snackbar.sessionsQueue.addFunctionToQueueAndStartQueueExecutionIfHasNotStartedYet(
      async (): Promise<void> => Snackbar.mountAndDisplayForAWhileSingleInstance(parametersObject)
    ).catch(PromisesQueue.errorHandler);
  }

  public static hideAndUnmount(): void {

    Snackbar.workpiece.animate([
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
        addEventListener("finish", (): void => {

          console.log(Snackbar.workpiece);

          const actualIcon: Element = getExpectedToBeSingleElement({
            selector: ".Snackbar-Icon", context: Snackbar.workpiece
          });

          actualIcon.replaceWith(Snackbar.iconPlaceholder);
          Snackbar.workpiece.remove();
        });
  }


  private static async mountAndDisplayForAWhileSingleInstance(
    {
      messageTextOrHTML,
      decorativeVariation,
      parentElementSelector = "body",
      displayingDuration__seconds = Snackbar.DEFAULT_DISPLAYING_DURATION__SECONDS
    }: Snackbar.ParametersObject
  ): Promise<void> {

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

    Snackbar.workpiece.classList.add(rootElementDecorativeVariationModifierCSS_Class);
    Snackbar.messageElement.innerHTML = messageTextOrHTML;

    parentElement.appendChild(Snackbar.workpiece);

    Snackbar.workpiece.animate([
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


    // Timer.start
    setTimeout((): void => {
      this.hideAndUnmount();
    }, secondsToMilliseconds(displayingDuration__seconds));
  }
}


namespace Snackbar {
  
  export type ParametersObject = {
    messageTextOrHTML: string;
    decorativeVariation: DecorativeVariations;
    parentElementSelector?: string;
    displayingDuration__seconds?: number;
  };
  
  export enum DecorativeVariations {
    error = "ERROR",
    warning = "WARNING",
    guidance = "GUIDANCE",
    success = "SUCCESS"
  }
}


export default Snackbar;
