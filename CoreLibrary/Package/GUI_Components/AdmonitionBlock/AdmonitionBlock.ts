import CollapsingAnimation from "../../Animations/CollapsingAnimation";

import { isNull } from "@yamato-daiwa/es-extensions";
import { LeftClickEventListener } from "@yamato-daiwa/es-extensions-browserjs";


export default abstract class AdmonitionBlock {

  protected static readonly ROOT_ELEMENT_SELECTOR: string = ".AdmonitionBlock--YDF";
  protected static readonly DISMISSING_BUTTON_ELEMENT_SELECTOR: string = ".AdmonitionBlock--YDF-DismissingButton";


  public static initializeAll(): void {

    for (const rootElement of document.querySelectorAll<HTMLElement>(AdmonitionBlock.ROOT_ELEMENT_SELECTOR)) {

      const dismissingButton: Element | null = rootElement.querySelector(AdmonitionBlock.DISMISSING_BUTTON_ELEMENT_SELECTOR);

      if (isNull(dismissingButton)) {
        continue;
      }


      LeftClickEventListener.createAndAssign({
        targetElement: dismissingButton,
        handler(): void {
          CollapsingAnimation.animate({
            animatedElement: rootElement,
            removeOnComplete: true,
            duration__seconds: 0.25
          });
        }
      });

    }

  }

}
