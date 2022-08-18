import { CollapsingAnimation } from "../../Components";

import { isNull } from "@yamato-daiwa/es-extensions";
import { addLeftClickEventHandler } from "@yamato-daiwa/es-extensions-browserjs";


export default abstract class AttentionBox {

  protected static readonly ROOT_ELEMENT_SELECTOR: string = ".AttentionBox--YDF";
  protected static readonly DISMISSING_BUTTON_ELEMENT_SELECTOR: string = ".AttentionBox--YDF-DismissingButton";


  public static initializeAll(): void {

    for (const rootElement of document.querySelectorAll<HTMLElement>(AttentionBox.ROOT_ELEMENT_SELECTOR)) {

      const dismissingButton: Element | null = rootElement.querySelector(AttentionBox.DISMISSING_BUTTON_ELEMENT_SELECTOR);

      if (isNull(dismissingButton)) {
        continue;
      }


      addLeftClickEventHandler({
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
