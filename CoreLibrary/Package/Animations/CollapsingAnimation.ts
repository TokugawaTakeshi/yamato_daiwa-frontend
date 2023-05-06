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

  public static animate(compoundParameter: CollapsingAnimation.CompoundParameter): void {

    const { animatedElement }: CollapsingAnimation.CompoundParameter = compoundParameter;

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
        occurrenceLocation: "CollapsingAnimation.animate(compoundParameter)"
      });
    }


    animateCollapsing(animatedElement, { duration: animationDurations__milliseconds }).
        then((): void => {

          if (isNeitherUndefinedNorNull(compoundParameter.replaceWithOnComplete)) {
            animatedElement.replaceWith(compoundParameter.replaceWithOnComplete);
          } else if (compoundParameter.removeOnComplete === true) {
            animatedElement.remove();
          }

          compoundParameter.callback?.();

        }).
        catch((error: Error): void => {
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
    replaceWithOnComplete?: ChildNode;
    removeOnComplete?: boolean;
    duration__seconds?: number;
    duration__milliseconds?: number;
    callback?: () => unknown;
  }>;

}


export default CollapsingAnimation;
