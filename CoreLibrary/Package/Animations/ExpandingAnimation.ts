import { down as animateExpanding } from "slide-element";
import {
  Logger,
  InvalidParameterValueError,
  UnexpectedEventError,
  isNumber,
  secondsToMilliseconds
} from "@yamato-daiwa/es-extensions";


class ExpandingAnimation {

  public static replaceNodeAndAnimate(
    {
      duration__milliseconds,
      duration__seconds,
      callback,
      animatedElement,
      replacedNode
    }: ExpandingAnimation.CompoundParameter
  ): Promise<void> | void {

    let animationDurations__milliseconds: number;

    if (isNumber(duration__milliseconds)) {
      animationDurations__milliseconds = duration__milliseconds;
    } else if (isNumber(duration__seconds)) {
      animationDurations__milliseconds = secondsToMilliseconds(duration__seconds);
    } else {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: "compoundParameter",
          parameterNumber: 1,
          messageSpecificPart: "Either \"duration__seconds\" or \"duration__milliseconds\" must be specified with number."
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "ExpandingAnimation.replaceNodeAndAnimate(compoundParameter)"
      });
    }


    animatedElement.style.display = "none";
    animatedElement.removeAttribute("hidden");

    replacedNode.replaceWith(animatedElement);

    animateExpanding(animatedElement, { duration: animationDurations__milliseconds }).

        then((): void => { callback?.(); }).

        catch((error: unknown): void => {
          Logger.logError({
            errorType: UnexpectedEventError.NAME,
            title: UnexpectedEventError.localization.defaultTitle,
            description: "Unexpected error occurred during animation.",
            occurrenceLocation: "ExpandingAnimation.replaceNodeAndAnimate(compoundParameter)",
            caughtError: error
          });
        });

  }

}


namespace ExpandingAnimation {

  export type CompoundParameter = Readonly<{
    replacedNode: ChildNode;
    animatedElement: HTMLElement;
    duration__seconds?: number;
    duration__milliseconds?: number;
    callback?: () => unknown;
    mustReturnPromise?: boolean;
  }>;

}


export default ExpandingAnimation;
