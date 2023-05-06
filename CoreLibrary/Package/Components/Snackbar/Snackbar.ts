import componentHTML_Workpiece from "./Snackbar.template.pug";

import { PromisesQueue } from "@yamato-daiwa/es-extensions";
import {
  createDOM_ElementFromHTML_Code,
  getExpectedToBeSingleDOM_Element,
  addLeftClickEventHandler,
  BrowserJS_Timer
} from "@yamato-daiwa/es-extensions-browserjs";


abstract class Snackbar {

  protected static readonly sessionsQueue: PromisesQueue = new PromisesQueue();

  protected static readonly DOM_Workpiece: HTMLElement = createDOM_ElementFromHTML_Code({
    HTML_Code: componentHTML_Workpiece,
    rootDOM_ElementSubtype: HTMLElement
  });

  protected static ICON_SELECTOR: string = ".Snackbar--YDF-Icon";

  protected static readonly ERROR_DECORATIVE_VARIATION_MODIFIER_CSS_CLASS: string = "Snackbar--YDF__ErrorDecoration";
  protected static readonly WARNING_DECORATIVE_VARIATION_MODIFIER_CSS_CLASS: string = "Snackbar--YDF__WarningDecoration";
  protected static readonly INFO_DECORATIVE_VARIATION_MODIFIER_CSS_CLASS: string = "Snackbar--YDF__InfoDecoration";
  protected static readonly SUCCESS_DECORATIVE_VARIATION_MODIFIER_CSS_CLASS: string = "Snackbar--YDF__SuccessDecoration";

  protected static readonly iconPlaceholderElement: Element = getExpectedToBeSingleDOM_Element({
    selector: ".Snackbar--YDF-IconPlaceholder", context: Snackbar.DOM_Workpiece
  });

  protected static readonly successIconElement: Element = getExpectedToBeSingleDOM_Element({
    selector: "[data-icon='SUCCESS']", context: Snackbar.DOM_Workpiece
  });
  protected static readonly guidanceIconElement: Element = getExpectedToBeSingleDOM_Element({
    selector: "[data-icon='GUIDANCE']", context: Snackbar.DOM_Workpiece
  });
  protected static readonly warningIconElement: Element = getExpectedToBeSingleDOM_Element({
    selector: "[data-icon='WARNING']", context: Snackbar.DOM_Workpiece
  });
  protected static readonly errorIconElement: Element = getExpectedToBeSingleDOM_Element({
    selector: "[data-icon='ERROR']", context: Snackbar.DOM_Workpiece
  });

  protected static readonly messageElement: Element = getExpectedToBeSingleDOM_Element({
    selector: ".Snackbar--YDF-Message", context: Snackbar.DOM_Workpiece
  });

  protected static readonly dismissingButton: Element = getExpectedToBeSingleDOM_Element({
    selector: ".Snackbar--YDF-DismissingButton", context: Snackbar.DOM_Workpiece
  });

  protected static readonly DEFAULT_DISPLAYING_DURATION__SECONDS: number = 3;

  static {

    Snackbar.successIconElement.remove();
    Snackbar.guidanceIconElement.remove();
    Snackbar.warningIconElement.remove();
    Snackbar.errorIconElement.remove();

    addLeftClickEventHandler({
      targetElement: Snackbar.dismissingButton,
      handler: Snackbar.hideAndUnmount
    });

  }


  public static mountAndDisplayForAWhile(namedParameters: Snackbar.NamedParameters): void {
    Snackbar.sessionsQueue.addFunctionAndStartExecutionIfHasNotStartedYet({
      newAsynchronousFunction: async (): Promise<void> => Snackbar.mountAndDisplayForAWhileSingleInstance(namedParameters),
      behaviourOnSomePromiseFailed: PromisesQueue.BEHAVIOUR_ON_SOME_PROMISE_FAILED.loggingAndProceedingToNextPromise
    }).catch(PromisesQueue.errorHandler);
  }

  public static async hideAndUnmount(): Promise<void> {
    return new Promise<void>((resolve: () => void): void => {

      Snackbar.DOM_Workpiece.animate([
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

            const actualIcon: Element = getExpectedToBeSingleDOM_Element({
              selector: Snackbar.ICON_SELECTOR, context: Snackbar.DOM_Workpiece
            });

            actualIcon.replaceWith(Snackbar.iconPlaceholderElement);
            Snackbar.DOM_Workpiece.classList.remove(
              Snackbar.ERROR_DECORATIVE_VARIATION_MODIFIER_CSS_CLASS,
              Snackbar.WARNING_DECORATIVE_VARIATION_MODIFIER_CSS_CLASS,
              Snackbar.INFO_DECORATIVE_VARIATION_MODIFIER_CSS_CLASS,
                Snackbar.SUCCESS_DECORATIVE_VARIATION_MODIFIER_CSS_CLASS
            );
            Snackbar.DOM_Workpiece.remove();

            resolve();

          });
    });
  }


  private static async mountAndDisplayForAWhileSingleInstance(
    {
      messageTextOrHTML,
      decorativeVariation,
      parentElementSelector = "body",
      displayingDuration__seconds = Snackbar.DEFAULT_DISPLAYING_DURATION__SECONDS
    }: Snackbar.NamedParameters
  ): Promise<void> {

    const parentElement: Element = getExpectedToBeSingleDOM_Element({ selector: parentElementSelector });

    let rootElementDecorativeVariationModifierCSS_Class: string;

    switch (decorativeVariation) {

      case Snackbar.DecorativeVariations.error: {
        rootElementDecorativeVariationModifierCSS_Class = Snackbar.ERROR_DECORATIVE_VARIATION_MODIFIER_CSS_CLASS;
        Snackbar.iconPlaceholderElement.replaceWith(Snackbar.errorIconElement);
        break;
      }

      case Snackbar.DecorativeVariations.warning: {
        rootElementDecorativeVariationModifierCSS_Class = Snackbar.WARNING_DECORATIVE_VARIATION_MODIFIER_CSS_CLASS;
        Snackbar.iconPlaceholderElement.replaceWith(Snackbar.warningIconElement);
        break;
      }

      case Snackbar.DecorativeVariations.guidance: {
        rootElementDecorativeVariationModifierCSS_Class = Snackbar.INFO_DECORATIVE_VARIATION_MODIFIER_CSS_CLASS;
        Snackbar.iconPlaceholderElement.replaceWith(Snackbar.guidanceIconElement);
        break;
      }

      case Snackbar.DecorativeVariations.success: {
        rootElementDecorativeVariationModifierCSS_Class = Snackbar.SUCCESS_DECORATIVE_VARIATION_MODIFIER_CSS_CLASS;
        Snackbar.iconPlaceholderElement.replaceWith(Snackbar.successIconElement);
        break;
      }


    }

    Snackbar.DOM_Workpiece.classList.add(rootElementDecorativeVariationModifierCSS_Class);
    Snackbar.messageElement.innerHTML = messageTextOrHTML;

    parentElement.appendChild(Snackbar.DOM_Workpiece);

    Snackbar.DOM_Workpiece.animate(
      [
        {
          opacity: 0,
          transform: "translateY(-100%)"
        },
        {
          opacity: 1,
          transform: "none"
        }
      ],
      {
        duration: 500,
        easing: "ease-out"
      }
    );


    await new BrowserJS_Timer({ period__seconds: displayingDuration__seconds }).countDown();

    return Snackbar.hideAndUnmount();

  }
}


namespace Snackbar {

  export type NamedParameters = Readonly<{
    messageTextOrHTML: string;
    decorativeVariation: DecorativeVariations;
    parentElementSelector?: string;
    displayingDuration__seconds?: number;
  }>;

  export enum DecorativeVariations {
    error = "ERROR",
    warning = "WARNING",
    guidance = "GUIDANCE",
    success = "SUCCESS"
  }

}


export default Snackbar;
