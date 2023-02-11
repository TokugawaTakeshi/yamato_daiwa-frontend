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
    namedParameters: ExpandingAnimation.NamedParameters
  ): void {

    const {
      replacedNode,
      animatedElement
    }: ExpandingAnimation.NamedParameters = namedParameters;

    let animationDurations__milliseconds: number;

    if (isNumber(namedParameters.duration__milliseconds)) {
      animationDurations__milliseconds = namedParameters.duration__milliseconds;
    } else if (isNumber(namedParameters.duration__seconds)) {
      animationDurations__milliseconds = secondsToMilliseconds(namedParameters.duration__seconds);
    } else {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: "namedParameters",
          parameterNumber: 1,
          messageSpecificPart: "'Either 'duration__seconds' or 'duration__milliseconds' must be specified with number."
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "ExpandingAnimation.replaceNodeAndAnimate(namedParameters)"
      });
    }


    animatedElement.style.display = "none";

    replacedNode.replaceWith(animatedElement);

    animateExpanding(animatedElement, { duration: animationDurations__milliseconds }).
        then((): void => { namedParameters.callback?.(); }).
        catch((error: Error): void => {
          Logger.logError({
            errorType: UnexpectedEventError.NAME,
            title: UnexpectedEventError.localization.defaultTitle,
            description: "Unexpected error occurred during animation.",
            occurrenceLocation: "ExpandingAnimation.replaceNodeAndAnimate(namedParameters)",
            caughtError: error
          });
        });
  }
}


namespace ExpandingAnimation {

  export type NamedParameters = Readonly<{
    replacedNode: ChildNode;
    animatedElement: HTMLElement;
    duration__seconds?: number;
    duration__milliseconds?: number;
    callback?: () => unknown;
  }>;

}


export default ExpandingAnimation;
