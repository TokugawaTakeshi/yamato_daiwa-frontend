import ValidatableControl from "@Components/Controls/_Validation/ValidatableControl";
import type { InputtedValueValidation } from "@yamato-daiwa/frontend";

import type { ComponentPublicInstance as VueComponentPublicInstance } from "vue";

import {
  Logger,
  UnexpectedEventError,
  isNull,
  isNotUndefined,
  DOM_ElementRetrievingFailedError
} from "@yamato-daiwa/es-extensions";
import type { ArbitraryObject } from "@yamato-daiwa/es-extensions";
import { getExpectedToBeSingleDOM_Element } from "@yamato-daiwa/es-extensions-browserjs";


export default class ValidatableControlsGroup<ValidData extends ArbitraryObject | Array<unknown>> {

  public readonly isInvalid: boolean;
  public readonly payload: ValidData | null;
  public readonly scrollingContainerHTML_ID?: string;

  private readonly controlsPayload: ValidatableControlsGroup.GeneralizedControlsPayload;


  /* === Static methods ============================================================================================= */
  public static initialize<ValidData extends ArbitraryObject | Array<unknown>>(
    parametersObject: Readonly<{ scrollingContainerHTML_ID?: string; }>
  ): ValidatableControlsGroup<ValidData> {
    return new ValidatableControlsGroup<ValidData>({
      isInvalid: true,
      payload: null,
      controlsPayload: {},
      scrollingContainerHTML_ID: parametersObject.scrollingContainerHTML_ID
    });
  }


  public static hasInvalidInputs(
    controlsPayload: ValidatableControlsGroup.GeneralizedControlsPayload
  ): boolean {
    return (Array.isArray(controlsPayload) ? controlsPayload : Object.values(controlsPayload)).
        some(
          (validatableControlPayload: ValidatableControl.Payload<unknown, unknown, InputtedValueValidation>): boolean =>
              validatableControlPayload.isInvalid
        );
  }

  public static pointOutValidationErrors(
    compoundParameter: Readonly<{
      controlsPayload: ValidatableControlsGroup.GeneralizedControlsPayload;
      parentVueComponentInstance: VueComponentPublicInstance;
      scrollingContainerHTML_ID?: string;
    }>
  ): void {

    const {
      controlsPayload,
      parentVueComponentInstance,
      scrollingContainerHTML_ID
    }: {
      controlsPayload: ValidatableControlsGroup.GeneralizedControlsPayload;
      parentVueComponentInstance: VueComponentPublicInstance;
      scrollingContainerHTML_ID?: string;
    } = compoundParameter;

    let isCurrentControlTheFirstInvalidOne: boolean = true;

    for (const validatableControlPayload of Array.isArray(controlsPayload) ? controlsPayload : Object.values(controlsPayload)) {

      if (validatableControlPayload.isInvalid) {

        const componentInstance: ValidatableControl | null = ValidatableControl.getValidatableControlInstanceByVueReferenceID({
          parentVueComponentInstance, vueReferenceID: validatableControlPayload.VUE_REFERENCE_ID
        });

        if (isNull(componentInstance)) {

          Logger.logError({
            errorType: DOM_ElementRetrievingFailedError.NAME,
            title: DOM_ElementRetrievingFailedError.localization.defaultTitle,
            description: "Unable to retrieve the validatable control instance with Vue reference ID " +
                `"${ validatableControlPayload.VUE_REFERENCE_ID }". Make sure that dedicated component has been mounted ` +
                "and \"ref\" attribute has been explicitly specified.",
            occurrenceLocation: "ValidatableControlsGroup.pointOutValidationErrors(compoundParameter)"
          });

          continue;

        }


        componentInstance.highlightInvalidInput();

        if (isCurrentControlTheFirstInvalidOne) {

          componentInstance.focus();

          const componentRootElement: Element = componentInstance.getRootElement();

          /* eslint-disable-next-line max-depth -- Here are all conditions are required. */
          if (isNotUndefined(scrollingContainerHTML_ID) && componentRootElement instanceof HTMLElement) {
            getExpectedToBeSingleDOM_Element({ selector: `#${ scrollingContainerHTML_ID }` }).scroll({
              top: componentRootElement.offsetTop,
              behavior: "smooth"
            });
          }

          isCurrentControlTheFirstInvalidOne = false;

        }

      }

    }

  }


  /* === Instancing ================================================================================================= */
  public constructor(
    compoundParameter:
        Readonly<
          (
            {
              isInvalid: false;
              payload: ValidData;
            } | {
              isInvalid: true;
              payload: null;
              controlsPayload: ValidatableControlsGroup.GeneralizedControlsPayload;
            }
          ) & {
            scrollingContainerHTML_ID?: string;
          }
        >
  ) {

    this.isInvalid = compoundParameter.isInvalid;
    this.payload = compoundParameter.payload;

    this.controlsPayload = "controlsPayload" in compoundParameter ? compoundParameter.controlsPayload : {};

    if (isNotUndefined(this.scrollingContainerHTML_ID)) {
      this.scrollingContainerHTML_ID = compoundParameter.scrollingContainerHTML_ID;
    }

  }


  /* === Instance methods ================================================================================================= */
  public getExpectedToBeValidPayload(): ValidData {

    if (isNull(this.payload)) {
      Logger.throwErrorAndLog({
        errorInstance: new UnexpectedEventError("Contrary to expectations the \"payload\" is still \"null\"."),
        title: UnexpectedEventError.localization.defaultTitle,
        occurrenceLocation: "validatableControlsGroup.getExpectedToBeValidPayload()"
      });
    }


    return this.payload;

  }

  public pointOutValidationErrors(parentVueComponentInstance: VueComponentPublicInstance): void {
    ValidatableControlsGroup.pointOutValidationErrors({
      controlsPayload: this.controlsPayload,
      parentVueComponentInstance,
      scrollingContainerHTML_ID: this.scrollingContainerHTML_ID
    });
  }

}


namespace ValidatableControlsGroup {

  export type GeneralizedControlsPayload =
      Readonly<{ [controlKey: string]: ValidatableControl.Payload<unknown, unknown, InputtedValueValidation>; }> |
      Array<ValidatableControl.Payload<unknown, unknown, InputtedValueValidation>>;

}
