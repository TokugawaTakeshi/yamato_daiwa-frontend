import { down as animateExpanding } from "slide-element";
import {
  Logger,
  InvalidParameterValueError,
  UnexpectedEventError,
  isNumber,
  secondsToMilliseconds
} from "@yamato-daiwa/es-extensions";


class ExpandingAnimation {

  public static replaceNodeAndAnimate(compoundParameter: ExpandingAnimation.CompoundParameter): void {

    const {
      replacedNode,
      animatedElement
    }: ExpandingAnimation.CompoundParameter = compoundParameter;

    let animationDurations__milliseconds: number;

    if (isNumber(compoundParameter.duration__milliseconds)) {
      animationDurations__milliseconds = compoundParameter.duration__milliseconds;
    } else if (isNumber(compoundParameter.duration__seconds)) {
      animationDurations__milliseconds = secondsToMilliseconds(compoundParameter.duration__seconds);
    } else {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: "compoundParameter",
          parameterNumber: 1,
          messageSpecificPart: "'Either 'duration__seconds' or 'duration__milliseconds' must be specified with number."
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "ExpandingAnimation.replaceNodeAndAnimate(compoundParameter)"
      });
    }


    animatedElement.style.display = "none";

    replacedNode.replaceWith(animatedElement);

    animateExpanding(animatedElement, { duration: animationDurations__milliseconds }).
        then((): void => { compoundParameter.callback?.(); }).
        catch((error: Error): void => {
          Logger.logError({
            errorType: UnexpectedEventError.NAME,
            title: UnexpectedEventError.localization.defaultTitle,
            description: "Unexpected error occurred during animation.",
            occurrenceLocation: "ExpandingAnimation.replaceNodeAndAnimate(  compoundParameter)",
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
  }>;

}


export default ExpandingAnimation;
