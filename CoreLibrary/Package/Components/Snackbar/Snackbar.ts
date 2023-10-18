import componentHTML_Workpiece from "./Snackbar.template.pug";

import {
  PromisesQueue,
  toScreamingSnakeCase,
  isUndefined,
  isNull
} from "@yamato-daiwa/es-extensions";
import {
  createDOM_ElementFromHTML_Code,
  getExpectedToBeSingleDOM_Element,
  addLeftClickEventHandler,
  BrowserJS_Timer
} from "@yamato-daiwa/es-extensions-browserjs";


abstract class Snackbar {

  public static DecorativeVariations: Snackbar.DecorativeVariations = {
    error: "ERROR",
    warning: "WARNING",
    guidance: "GUIDANCE",
    success: "SUCCESS"
  };


  /* ━━━ Fields ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  protected static readonly sessionsQueue: PromisesQueue = new PromisesQueue();


  /* ─── Accessing to DOM ─────────────────────────────────────────────────────────────────────────────────────────── */
  protected static readonly SVG_ICON_MOUNTING_POINT_ELEMENT_SELECTOR: string = ".Snackbar--YDF-IconPlaceholder";
  protected static readonly SVG_ICON_SELECTOR: string = ".Snackbar--YDF-Icon";

  protected static readonly MESSAGE_ELEMENT_SELECTOR: string = ".Snackbar--YDF-Message";
  protected static readonly DISMISSING_BUTTON_ELEMENT_SELECTOR: string = ".Snackbar--YDF-DismissingButton";


  /* ─── Initialization on demand ─────────────────────────────────────────────────────────────────────────────────── */
  protected static DOM_Workpiece: HTMLElement | null = null;

  protected static SVG_IconMountingPointElement: Element;
  protected static decorativeVariationsDependents: { [ decoration: string ]: Snackbar.DecorativeVariationDependents; };

  protected static messageElement: Element;
  protected static dismissingButtonElement: Element;


  /* ─── Others constants ─────────────────────────────────────────────────────────────────────────────────────────── */
  protected static readonly DEFAULT_DISPLAYING_DURATION__SECONDS: number = 3;


  /* ━━━ Public methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public static mountAndDisplayForAWhile(compoundParameter: Snackbar.CompoundParameter): void {

    Snackbar.sessionsQueue.addFunctionAndStartExecutionIfHasNotStartedYet({
      newAsynchronousFunction: async (): Promise<void> => Snackbar.mountAndDisplayForAWhileSingleInstance({
        ...compoundParameter,
        initializedDOM_Workpiece: Snackbar.DOM_Workpiece ?? Snackbar.initializeDOM_Workpiece()
      }),
      behaviourOnSomePromiseFailed: PromisesQueue.BEHAVIOUR_ON_SOME_PROMISE_FAILED.loggingAndProceedingToNextPromise
    }).
        catch(PromisesQueue.errorHandler);

  }

  public static async hideAndUnmount(): Promise<void> {
    return new Promise<void>((resolve: () => void): void => {

      /* [ Theory ] It is possible when this method has been called before `mountAndDisplayForAWhile`. */
      if (isNull(Snackbar.DOM_Workpiece)) {
        return;
      }


      const DOM_Workpiece: HTMLElement = Snackbar.DOM_Workpiece;

      Snackbar.DOM_Workpiece.

          animate(
            [
              {
                opacity: 1,
                transform: "none"
              },
              {
                opacity: 0,
                transform: "translateY(-100%)"
              }
            ],
            {
              duration: 250,
              easing: "ease-in"
            }
          ).

          addEventListener("finish", (): void => {

            DOM_Workpiece.remove();

            DOM_Workpiece.classList.remove(
              ...Object.values(Snackbar.decorativeVariationsDependents).map(
                (decorativeVariationDependents: Snackbar.DecorativeVariationDependents): string =>
                    decorativeVariationDependents.CSS_Class
              )
            );

            getExpectedToBeSingleDOM_Element({ selector: Snackbar.SVG_ICON_SELECTOR, context: DOM_Workpiece }).
                replaceWith(Snackbar.SVG_IconMountingPointElement);

            Snackbar.messageElement.innerHTML = "";

            Snackbar.dismissingButtonElement.removeEventListener("click", Snackbar.hideAndUnmount);

            resolve();

          });

    });

  }

  public static addCustomDecorativeVariations(
    decorativeVariationsData: ReadonlyArray<Readonly<{ key: string; } & Snackbar.DecorativeVariationDependents>>
  ): void {

    for (const { key, CSS_Class, SVG_Icon } of decorativeVariationsData) {
      Snackbar.decorativeVariationsDependents[key] = { CSS_Class, SVG_Icon };
      Snackbar.DecorativeVariations[key] = toScreamingSnakeCase(key);
    }

  }


  /* ━━━ Private methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  protected static async mountAndDisplayForAWhileSingleInstance(
    {
      messageTextOrHTML,
      decorativeVariation,
      parentElementSelector = "body",
      mountingPointElementSelector,
      displayingDuration__seconds = Snackbar.DEFAULT_DISPLAYING_DURATION__SECONDS,
      initializedDOM_Workpiece
    }: Snackbar.CompoundParameter & Readonly<{ initializedDOM_Workpiece: Element; }>
  ): Promise<void> {

    const decorativeVariationsDependent: Snackbar.DecorativeVariationDependents =
        Snackbar.decorativeVariationsDependents[decorativeVariation];

    initializedDOM_Workpiece.classList.add(decorativeVariationsDependent.CSS_Class);

    Snackbar.SVG_IconMountingPointElement.replaceWith(decorativeVariationsDependent.SVG_Icon);
    Snackbar.messageElement.innerHTML = messageTextOrHTML;

    addLeftClickEventHandler({
      targetElement: Snackbar.dismissingButtonElement,
      handler: Snackbar.hideAndUnmount
    });

    if (isUndefined(mountingPointElementSelector)) {
      getExpectedToBeSingleDOM_Element({ selector: parentElementSelector }).appendChild(initializedDOM_Workpiece);
    } else {
      getExpectedToBeSingleDOM_Element({ selector: mountingPointElementSelector }).replaceWith(initializedDOM_Workpiece);
    }

    initializedDOM_Workpiece.animate(
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


  protected static initializeDOM_Workpiece(): HTMLElement {

    Snackbar.DOM_Workpiece = createDOM_ElementFromHTML_Code({
      HTML_Code: componentHTML_Workpiece,
      rootDOM_ElementSubtype: HTMLElement
    });

    Snackbar.SVG_IconMountingPointElement = getExpectedToBeSingleDOM_Element({
      selector: Snackbar.SVG_ICON_MOUNTING_POINT_ELEMENT_SELECTOR,
      context: Snackbar.DOM_Workpiece
    });

    Snackbar.decorativeVariationsDependents = {

      [Snackbar.DecorativeVariations.error]: {
        CSS_Class: "Snackbar--YDF__ErrorDecoration",
        SVG_Icon: getExpectedToBeSingleDOM_Element({
          selector: "[data-icon='ERROR']", context: Snackbar.DOM_Workpiece, expectedDOM_ElementSubtype: SVGElement
        })
      },

      [Snackbar.DecorativeVariations.warning]: {
        CSS_Class: "Snackbar--YDF__WarningDecoration",
        SVG_Icon: getExpectedToBeSingleDOM_Element({
          selector: "[data-icon='WARNING']", context: Snackbar.DOM_Workpiece, expectedDOM_ElementSubtype: SVGElement
        })
      },

      [Snackbar.DecorativeVariations.guidance]: {
        CSS_Class: "Snackbar--YDF__GuidanceDecoration",
        SVG_Icon: getExpectedToBeSingleDOM_Element({
          selector: "[data-icon='GUIDANCE']", context: Snackbar.DOM_Workpiece, expectedDOM_ElementSubtype: SVGElement
        })
      },

      [Snackbar.DecorativeVariations.success]: {
        CSS_Class: "Snackbar--YDF__SuccessDecoration",
        SVG_Icon: getExpectedToBeSingleDOM_Element({
          selector: "[data-icon='SUCCESS']", context: Snackbar.DOM_Workpiece, expectedDOM_ElementSubtype: SVGElement
        })
      }

    };

    for (const decorativeVariationDependents of Object.values(Snackbar.decorativeVariationsDependents)) {
      delete decorativeVariationDependents.SVG_Icon.dataset.icon;
      decorativeVariationDependents.SVG_Icon.remove();
    }

    Snackbar.messageElement = getExpectedToBeSingleDOM_Element({
      selector: Snackbar.MESSAGE_ELEMENT_SELECTOR, context: Snackbar.DOM_Workpiece
    });

    Snackbar.dismissingButtonElement = getExpectedToBeSingleDOM_Element({
      selector: Snackbar.DISMISSING_BUTTON_ELEMENT_SELECTOR, context: Snackbar.DOM_Workpiece
    });

    return Snackbar.DOM_Workpiece;

  }

}


namespace Snackbar {

  export type CompoundParameter = Readonly<{
    messageTextOrHTML: string;
    decorativeVariation: string;
    parentElementSelector?: string;
    mountingPointElementSelector?: string;
    displayingDuration__seconds?: number;
  }>;

  export type DecorativeVariationDependents = Readonly<{
    CSS_Class: string;
    SVG_Icon: SVGElement;
  }>;

  export type DecorativeVariations = {
    readonly error: "ERROR";
    readonly warning: "WARNING";
    readonly guidance: "GUIDANCE";
    readonly success: "SUCCESS";
    [custom: string]: string;
  };

}


export default Snackbar;
