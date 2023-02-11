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
    namedParameters: CollapsingAnimation.NamedParameters
  ): void {

    const { animatedElement }: CollapsingAnimation.NamedParameters = namedParameters;

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
        occurrenceLocation: "CollapsingAnimation.animate(namedParameters)"
      });
    }


    animateCollapsing(animatedElement, { duration: animationDurations__milliseconds }).
        then((): void => {

          if (isNeitherUndefinedNorNull(namedParameters.replaceWithOnComplete)) {
            animatedElement.replaceWith(namedParameters.replaceWithOnComplete);
          } else if (namedParameters.removeOnComplete === true) {
            animatedElement.remove();
          }

          namedParameters.callback?.();

        }).
        catch((error: Error): void => {
          Logger.logError({
            errorType: UnexpectedEventError.NAME,
            title: UnexpectedEventError.localization.defaultTitle,
            description: "Unexpected error occurred during animation.",
            occurrenceLocation: "CollapsingAnimation.animate(namedParameters)",
            caughtError: error
          });
        });
  }
}


namespace CollapsingAnimation {

  export type NamedParameters = Readonly<{
    animatedElement: HTMLElement;
    replaceWithOnComplete?: ChildNode;
    removeOnComplete?: boolean;
    duration__seconds?: number;
    duration__milliseconds?: number;
    callback?: () => unknown;
  }>;

}


export default CollapsingAnimation;
