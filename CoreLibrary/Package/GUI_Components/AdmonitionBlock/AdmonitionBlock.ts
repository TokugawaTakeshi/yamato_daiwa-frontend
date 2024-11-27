import CollapsingAnimation from "../../Animations/CollapsingAnimation";

import { isNotNull, isNotUndefined, isNull } from "@yamato-daiwa/es-extensions";
import {
  getExpectedToBeSingleDOM_Element,
  LeftClickEventListener,
  resolveContextDOM_ElementPolymorphicSpecification
} from "@yamato-daiwa/es-extensions-browserjs";


export default abstract class AdmonitionBlock {

  protected static readonly ROOT_ELEMENT_SELECTOR: string = ".AdmonitionBlock--YDF";
  protected static readonly DISMISSING_BUTTON_ELEMENT_SELECTOR: string = ".AdmonitionBlock--YDF-DismissingButton";

  protected static readonly INITIALIZATION_COMPLETE_DATA_ATTRIBUTE_KEY: string = "initialized--ydf";


  public static initializeOne(
    initializationProperties: Readonly<
      { rootElement: Element; } |
      (
        { rootElement: Readonly<{ selector: string; }>; } &
        { contextElement?: ParentNode | Readonly<{ selector: string; }>; }
      )
    >
  ): void {

    const contextElement: Element | ParentNode | null =
        "contextElement" in initializationProperties ?
            resolveContextDOM_ElementPolymorphicSpecification(initializationProperties.contextElement) :
            null;

    const rootElement: Element = initializationProperties.rootElement instanceof Element ?
        initializationProperties.rootElement :
        getExpectedToBeSingleDOM_Element({
          selector: initializationProperties.rootElement.selector,
          ...isNotNull(contextElement) ? { contextElement } : null
        });

    if (!(rootElement instanceof HTMLElement)) {
      return;
    }


    if (isNotUndefined(rootElement.dataset[AdmonitionBlock.INITIALIZATION_COMPLETE_DATA_ATTRIBUTE_KEY])) {
      return;
    }


    const dismissingButton: Element | null = rootElement.querySelector(AdmonitionBlock.DISMISSING_BUTTON_ELEMENT_SELECTOR);

    if (isNull(dismissingButton)) {
      rootElement.dataset[AdmonitionBlock.INITIALIZATION_COMPLETE_DATA_ATTRIBUTE_KEY] = "";
      return;
    }


    const leftClickEventListener: LeftClickEventListener = new LeftClickEventListener({

      targetElement: dismissingButton,

      handler(): void {

        CollapsingAnimation.animate({
          animatedElement: rootElement,
          mustRemoveOnComplete: true,
          duration__seconds: 0.25
        });

        leftClickEventListener.utilize();

      }

    });

  }

  public static initializeMultiple(
    initializationProperties: Readonly<
      {
        selector: string;
        contextElement?: ParentNode | Readonly<{ selector: string; }>;
      } |
      { rootElements: ReadonlyArray<Element>; }
    >
  ): void {

    const rootElements: ReadonlyArray<Element> = "selector" in initializationProperties ?
        Array.from(
          (resolveContextDOM_ElementPolymorphicSpecification(initializationProperties.contextElement) ?? document).
              querySelectorAll(initializationProperties.selector)
        ) :
        initializationProperties.rootElements;

    for (const rootElement of rootElements) {
      AdmonitionBlock.initializeOne({ rootElement });
    }

  }


  /** @deprecated */
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
            mustRemoveOnComplete: true,
            duration__seconds: 0.25
          });
        }
      });

    }

  }

}
