import { up as animateCollapsing } from "slide-element";
import {
  Logger,
  InvalidParameterValueError,
  UnexpectedEventError,
  isNumber,
  secondsToMilliseconds,
  isNeitherUndefinedNorNull
} from "@yamato-daiwa/es-extensions";


class CollapsingAnimation {

  public static animate(
    {
      duration__milliseconds,
      duration__seconds,
      animatedElement,
      mustReplaceWithOnComplete,
      mustRemoveOnComplete,
      callback
    }: CollapsingAnimation.CompoundParameter
  ): void {

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
        occurrenceLocation: "CollapsingAnimation.animate(compoundParameter)"
      });
    }


    animateCollapsing(animatedElement, { duration: animationDurations__milliseconds }).

        then((): void => {

          if (isNeitherUndefinedNorNull(mustReplaceWithOnComplete)) {
            animatedElement.replaceWith(mustReplaceWithOnComplete);
          } else if (mustRemoveOnComplete === true) {
            animatedElement.remove();
          }

          callback?.();

        }).

        catch((error: unknown): void => {
          Logger.logError({
            errorType: UnexpectedEventError.NAME,
            title: UnexpectedEventError.localization.defaultTitle,
            description: "Unexpected error occurred during animation.",
            occurrenceLocation: "CollapsingAnimation.animate(compoundParameter)",
            caughtError: error
          });
        });

  }

}


namespace CollapsingAnimation {

  export type CompoundParameter = Readonly<{
    animatedElement: HTMLElement;
    mustReplaceWithOnComplete?: ChildNode;
    mustRemoveOnComplete?: boolean;
    duration__seconds?: number;
    duration__milliseconds?: number;
    callback?: () => unknown;
  }>;

}


export default CollapsingAnimation;
