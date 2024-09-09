/* eslint-disable no-underscore-dangle -- [ CONVENTION ]
* The instance fields begins from the underscore MUST be changed only via setters. */

/* ─── Assets ─────────────────────────────────────────────────────────────────────────────────────────────────────── */
import componentDynamicPartsHTML from "./CompoundControlShell.parts.pug";
import ExpandingAnimation from "../../../Animations/ExpandingAnimation";
import CollapsingAnimation from "../../../Animations/CollapsingAnimation";

/* ─── Validation ─────────────────────────────────────────────────────────────────────────────────────────────────── */
import type InputtedValueValidation from "../_Validation/InputtedValueValidation";

/* ─── Utils ──────────────────────────────────────────────────────────────────────────────────────────────────────── */
import {
  getExpectedToBeSingleDOM_Element,
  cloneDOM_Element,
  createDOM_ElementFromHTML_Code
} from "@yamato-daiwa/es-extensions-browserjs";
import {
  Logger,
  InvalidParameterValueError,
  isNull,
  isUndefined
} from "@yamato-daiwa/es-extensions";


export default class CompoundControlShell {

  /* ━━━ Static fields ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── Accessing to DOM ─────────────────────────────────────────────────────────────────────────────────────────── */
  protected static readonly ROOT_ELEMENT_CLASS: string = "CompoundControlShell--YDF";

  /* [ Theory ] Nested components wrapped by `CompoundControlShell` is completely normal scenario which mut be
   *   respected during picking of DOM elements. */
  protected static readonly VALIDATION_ERRORS_MESSAGES_LIST_MOUNTING_POINT_SELECTOR: string =
      ":scope > .CompoundControlShell--YDF-ValidationErrorsMessagesListMountingPoint";
  protected static readonly VALIDATION_ERRORS_MESSAGES_LIST_SELECTOR: string =
      ".CompoundControlShell--YDF-ValidationErrorsMessagesList";
  protected static readonly VALIDATION_ERRORS_MESSAGES_LIST_ITEM_SELECTOR: string =
      ".CompoundControlShell--YDF-ValidationErrorMessage";

  protected static readonly ASYNCHRONOUS_VALIDATIONS_STATUSES_LIST_MOUNTING_POINT_SELECTOR: string =
      ":scope > .CompoundControlShell--YDF-AsynchronousValidationsStatusesListMountingPoint";
  protected static readonly ASYNCHRONOUS_VALIDATIONS_STATUSES_LIST_SELECTOR: string =
      ".CompoundControlShell--YDF-AsynchronousValidationsStatusesList";
  protected static readonly ASYNCHRONOUS_VALIDATIONS_STATUSES_LIST_ITEM_SELECTOR: string =
      ".CompoundControlShell--YDF-AsynchronousValidationsStatusesList-Item-Text";
  protected static readonly ASYNCHRONOUS_VALIDATIONS_STATUSES_LIST_IN_PROGRESS_STATE_ITEM_TEMPLATE_SELECTOR: string =
      ".CompoundControlShell--YDF-AsynchronousValidationsStatusesList-Item__InProgressState";
  protected static readonly ASYNCHRONOUS_VALIDATIONS_STATUSES_LIST_SUCCEEDED_AND_VALID_STATE_ITEM_TEMPLATE_SELECTOR: string =
      ".CompoundControlShell--YDF-AsynchronousValidationsStatusesList-Item__SucceededAndValidState";
  protected static readonly ASYNCHRONOUS_VALIDATIONS_STATUSES_LIST_MALFUNCTION_STATE_ITEM_TEMPLATE_SELECTOR: string =
      ".CompoundControlShell--YDF-AsynchronousValidationsStatusesList-Item__MalfunctionState";


  /* ─── Others constants ─────────────────────────────────────────────────────────────────────────────────────────── */
  protected static readonly ERRORS_LIST_EXPANDING_ANIMATION_DURATION_PER_ONE_ERROR_MESSAGE__SECONDS: number = 0.2;
  protected static readonly ERRORS_LIST_COLLAPSING_ANIMATION_DURATION__SECONDS: number = 0.2;
  protected static readonly ASYNCHRONOUS_VALIDATIONS_STATUSES_LIST_ANIMATION_DURATION_PER_ONE_ITEM__SECONDS: number = 0.2;


  /* ─── Initialization on demand ─────────────────────────────────────────────────────────────────────────────────── */
  protected static dynamicParts: DocumentFragment | null = null;

  protected static validationErrorsMessagesCollapsableList: HTMLElement;
  protected static validationErrorsMessagesCollapsableListEmptyItem: Element;

  protected static asynchronousValidationsStatusesCollapsableList: HTMLElement;
  protected static asynchronousValidationsStatusesCollapsableListInProgressStateEmptyItem: Element;
  protected static asynchronousValidationsStatusesCollapsableListInProgressSucceededAndValidStateEmptyItem: Element;
  protected static asynchronousValidationsStatusesCollapsableListInProgressMalfunctionStateEmptyItem: Element;


  /* ━━━ Instance fields ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public readonly rootElement: HTMLElement;

  protected readonly validationErrorsMessagesCollapsableListMountingPoint: Element;

  protected readonly validationErrorsMessagesCollapsableList: HTMLElement = cloneDOM_Element({
    targetElement: CompoundControlShell.validationErrorsMessagesCollapsableList,
    mustCopyAllChildren: false
  });

  protected readonly emptyValidationErrorMessagesListItem: Element = cloneDOM_Element({
    targetElement: CompoundControlShell.validationErrorsMessagesCollapsableListEmptyItem,
    mustCopyAllChildren: false
  });

  protected readonly asynchronousValidationsStatusesCollapsableListMountingPoint: Element;

  protected readonly asynchronousValidationsStatusesCollapsableList: HTMLElement = cloneDOM_Element({
    targetElement: CompoundControlShell.asynchronousValidationsStatusesCollapsableList,
    mustCopyAllChildren: false
  });


  /* ─── Must be changed only via setter or constructor ───────────────────────────────────────────────────────────── */
  protected _mustDisplayErrorsMessagesIfAny: boolean;
  protected _validationErrorsMessages: ReadonlyArray<string> = [];


  /* ━━━ Public static methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public static pickOne(
    properties: Readonly<
      (
        {
          selector: string;
          contextElement?: ParentNode | Readonly<{ selector: string; }>;
        } |
        { rootElement: Element; }
      ) &
      { mustDisplayErrorsMessagesIfAny: boolean; }
    >
  ): CompoundControlShell {

    if (isNull(CompoundControlShell.dynamicParts)) {
      CompoundControlShell.initializeCommonDOM_Parts();
    }

    let rootElement: HTMLElement;

    if ("rootElement" in properties) {

      if (!(properties.rootElement instanceof HTMLElement)) {

        Logger.throwErrorAndLog({
          errorInstance: new InvalidParameterValueError({
            parameterNumber: 1,
            parameterName: "properties",
            messageSpecificPart:
                "Specified root element is definitely not the root element of \"CompoundControlShell\" component " +
                  "because it even not the instance of \"HTMLElement\"."
          }),
          title: InvalidParameterValueError.localization.defaultTitle,
          occurrenceLocation: "CompoundControlShell.pickOne(properties)"
        });

      }

      rootElement = properties.rootElement;

    } else {

      rootElement = getExpectedToBeSingleDOM_Element({
        selector: properties.selector,
        contextElement: properties.contextElement,
        expectedDOM_ElementSubtype: HTMLElement
      });

    }

    if (!rootElement.classList.contains(CompoundControlShell.ROOT_ELEMENT_CLASS)) {

      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterNumber: 1,
          parameterName: "properties",
          messageSpecificPart:
              "Specified root element is definitely not the root element of \"CompoundControlShell\" component " +
                "because it has not the CSS class which must be."
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "CompoundControlShell.pickOne(properties)"
      });

    }


    return new CompoundControlShell({
      rootElement,
      mustDisplayErrorsMessagesIfAny: properties.mustDisplayErrorsMessagesIfAny
    });

  }


  /* ━━━ Constructor ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  private constructor(
    initializationProperties: Readonly<{
      rootElement: HTMLElement;
      mustDisplayErrorsMessagesIfAny: boolean;
    }>
  ) {

    this.rootElement = initializationProperties.rootElement;

    this._mustDisplayErrorsMessagesIfAny = initializationProperties.mustDisplayErrorsMessagesIfAny;

    this.validationErrorsMessagesCollapsableListMountingPoint = getExpectedToBeSingleDOM_Element({
      selector: CompoundControlShell.VALIDATION_ERRORS_MESSAGES_LIST_MOUNTING_POINT_SELECTOR,
      contextElement: this.rootElement
    });

    this.asynchronousValidationsStatusesCollapsableListMountingPoint = getExpectedToBeSingleDOM_Element({
      selector: CompoundControlShell.ASYNCHRONOUS_VALIDATIONS_STATUSES_LIST_MOUNTING_POINT_SELECTOR,
      contextElement: this.rootElement
    });

  }


  /* ━━━ Reactivity ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public get $mustDisplayErrorsMessagesIfAny(): boolean {
    return this._mustDisplayErrorsMessagesIfAny;
  }

  public set $mustDisplayErrorsMessagesIfAny(value: boolean) {

    if (this._mustDisplayErrorsMessagesIfAny === value) {
      return;
    }


    this._mustDisplayErrorsMessagesIfAny = value;

    if (this._mustDisplayErrorsMessagesIfAny) {

      if (!this.validationErrorsMessagesCollapsableList.isConnected) {

        if (this._validationErrorsMessages.length > 0) {
          this.mountAndSlideDownErrorsMessagesList();
        }

      }

      return;

    }


    if (this.validationErrorsMessagesCollapsableList.isConnected) {
      this.collapseErrorsMessagesListAndUnmount({ mustClearValidationErrorsMessagesCollapsableListOnceAnimated: true });
    }

  }

  public get $validationErrorsMessages(): ReadonlyArray<string> {
    return this._validationErrorsMessages;
  }

  public set $validationErrorsMessages(validationErrorsMessages: ReadonlyArray<string>) {

    this._validationErrorsMessages = validationErrorsMessages;

    if (!this.$mustDisplayErrorsMessagesIfAny) {
      this.updateValidationErrorsMessagesCollapsableList();
      return;
    }


    if (this.validationErrorsMessagesCollapsableList.isConnected) {

      if (this._validationErrorsMessages.length > 0) {
        this.updateValidationErrorsMessagesCollapsableList();
      } else {
        this.collapseErrorsMessagesListAndUnmount({ mustClearValidationErrorsMessagesCollapsableListOnceAnimated: true });
      }

      return;

    }


    if (this._validationErrorsMessages.length > 0) {
      this.updateValidationErrorsMessagesCollapsableList();
      this.mountAndSlideDownErrorsMessagesList();
    }

  }

  public set $asynchronousValidationsStatus(asynchronousValidationsStatus: InputtedValueValidation.AsynchronousChecks.Status) {

    this.asynchronousValidationsStatusesCollapsableList.innerHTML = "";

    for (const asynchronousCheck of Object.values(asynchronousValidationsStatus.checks)) {

      let asynchronousValidationsStatusesCollapsableListItemElement: Element | undefined;

      if (asynchronousCheck.isPending) {

        asynchronousValidationsStatusesCollapsableListItemElement = cloneDOM_Element({
          targetElement: CompoundControlShell.asynchronousValidationsStatusesCollapsableListInProgressStateEmptyItem,
          mustCopyAllChildren: true
        });

      } else if (asynchronousCheck.hasValidValueBeenConfirmed) {

        asynchronousValidationsStatusesCollapsableListItemElement = cloneDOM_Element({
          targetElement: CompoundControlShell.
              asynchronousValidationsStatusesCollapsableListInProgressSucceededAndValidStateEmptyItem,
          mustCopyAllChildren: true
        });

      } else if (asynchronousCheck.hasErrorOccurred) {

        asynchronousValidationsStatusesCollapsableListItemElement = cloneDOM_Element({
          targetElement: CompoundControlShell.
              asynchronousValidationsStatusesCollapsableListInProgressMalfunctionStateEmptyItem,
          mustCopyAllChildren: true
        });

      }

      /* [ Approach ]
       * If invalid value confirmed (omitted `else`-block), the error message will be displayed at
       * `$validationErrorsMessages`, not need to duplicate it here.  */
      if (isUndefined(asynchronousValidationsStatusesCollapsableListItemElement)) {
        continue;
      }


      getExpectedToBeSingleDOM_Element({
        selector: CompoundControlShell.ASYNCHRONOUS_VALIDATIONS_STATUSES_LIST_ITEM_SELECTOR,
        contextElement: asynchronousValidationsStatusesCollapsableListItemElement
      }).textContent = asynchronousCheck.message;

      this.asynchronousValidationsStatusesCollapsableList.
          appendChild(asynchronousValidationsStatusesCollapsableListItemElement);

    }

    if (!this.asynchronousValidationsStatusesCollapsableList.isConnected) {

      this.asynchronousValidationsStatusesCollapsableListMountingPoint.
          replaceWith(this.asynchronousValidationsStatusesCollapsableList);

      this.asynchronousValidationsStatusesCollapsableList.style.display = "none";

      ExpandingAnimation.replaceNodeAndAnimate({
        replacedNode: this.asynchronousValidationsStatusesCollapsableListMountingPoint,
        animatedElement: this.asynchronousValidationsStatusesCollapsableList,
        duration__seconds: CompoundControlShell.ASYNCHRONOUS_VALIDATIONS_STATUSES_LIST_ANIMATION_DURATION_PER_ONE_ITEM__SECONDS *
            Object.entries(asynchronousValidationsStatus.checks).length
      });

    }

  }


  /* ━━━ Protected methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  protected updateValidationErrorsMessagesCollapsableList(): void {
    this.validationErrorsMessagesCollapsableList.replaceChildren(
      ...this.$validationErrorsMessages.map(
          (errorMessage: string): Element => {

            const listItem: Element = cloneDOM_Element({
              targetElement: this.emptyValidationErrorMessagesListItem,
              mustCopyAllChildren: false
            });

            listItem.textContent = errorMessage;

            return listItem;

          }
      )
    );
  }

  protected mountAndSlideDownErrorsMessagesList(): void {
    ExpandingAnimation.replaceNodeAndAnimate({
      replacedNode: this.validationErrorsMessagesCollapsableListMountingPoint,
      animatedElement: this.validationErrorsMessagesCollapsableList,
      duration__seconds: CompoundControlShell.ERRORS_LIST_EXPANDING_ANIMATION_DURATION_PER_ONE_ERROR_MESSAGE__SECONDS *
          this.$validationErrorsMessages.length
    });
  }

  protected collapseErrorsMessagesListAndUnmount(
    {
      mustClearValidationErrorsMessagesCollapsableListOnceAnimated
    }: Readonly<{ mustClearValidationErrorsMessagesCollapsableListOnceAnimated: boolean; }>
  ): void {
    CollapsingAnimation.animate({
      animatedElement: this.validationErrorsMessagesCollapsableList,
      replaceWithOnComplete: this.validationErrorsMessagesCollapsableListMountingPoint,
      duration__seconds: CompoundControlShell.ERRORS_LIST_COLLAPSING_ANIMATION_DURATION__SECONDS,
      ...mustClearValidationErrorsMessagesCollapsableListOnceAnimated ? {
        callback: this.updateValidationErrorsMessagesCollapsableList.bind(this)
      } : null
    });
  }

  protected static initializeCommonDOM_Parts(): void {

    CompoundControlShell.dynamicParts = createDOM_ElementFromHTML_Code({
      HTML_Code: componentDynamicPartsHTML,
      rootDOM_ElementSubtype: HTMLTemplateElement
    }).content;


    CompoundControlShell.validationErrorsMessagesCollapsableList = getExpectedToBeSingleDOM_Element({
      selector: CompoundControlShell.VALIDATION_ERRORS_MESSAGES_LIST_SELECTOR,
      contextElement: CompoundControlShell.dynamicParts,
      expectedDOM_ElementSubtype: HTMLElement
    });

    CompoundControlShell.validationErrorsMessagesCollapsableListEmptyItem = getExpectedToBeSingleDOM_Element({
      selector: CompoundControlShell.VALIDATION_ERRORS_MESSAGES_LIST_ITEM_SELECTOR,
      contextElement: CompoundControlShell.validationErrorsMessagesCollapsableList
    });
    CompoundControlShell.validationErrorsMessagesCollapsableListEmptyItem.remove();


    CompoundControlShell.asynchronousValidationsStatusesCollapsableList = getExpectedToBeSingleDOM_Element({
      selector: CompoundControlShell.ASYNCHRONOUS_VALIDATIONS_STATUSES_LIST_SELECTOR,
      contextElement: CompoundControlShell.dynamicParts,
      expectedDOM_ElementSubtype: HTMLElement
    });

    CompoundControlShell.asynchronousValidationsStatusesCollapsableListInProgressStateEmptyItem =
        getExpectedToBeSingleDOM_Element({
          selector: CompoundControlShell.ASYNCHRONOUS_VALIDATIONS_STATUSES_LIST_IN_PROGRESS_STATE_ITEM_TEMPLATE_SELECTOR,
          contextElement: CompoundControlShell.asynchronousValidationsStatusesCollapsableList
        });
    CompoundControlShell.asynchronousValidationsStatusesCollapsableListInProgressStateEmptyItem.remove();

    CompoundControlShell.asynchronousValidationsStatusesCollapsableListInProgressSucceededAndValidStateEmptyItem =
        getExpectedToBeSingleDOM_Element({
          selector: CompoundControlShell.
              ASYNCHRONOUS_VALIDATIONS_STATUSES_LIST_SUCCEEDED_AND_VALID_STATE_ITEM_TEMPLATE_SELECTOR,
          contextElement: CompoundControlShell.asynchronousValidationsStatusesCollapsableList
        });
    CompoundControlShell.asynchronousValidationsStatusesCollapsableListInProgressSucceededAndValidStateEmptyItem.remove();

    CompoundControlShell.asynchronousValidationsStatusesCollapsableListInProgressMalfunctionStateEmptyItem =
        getExpectedToBeSingleDOM_Element({
          selector: CompoundControlShell.
              ASYNCHRONOUS_VALIDATIONS_STATUSES_LIST_MALFUNCTION_STATE_ITEM_TEMPLATE_SELECTOR,
          contextElement: CompoundControlShell.asynchronousValidationsStatusesCollapsableList
        });
    CompoundControlShell.asynchronousValidationsStatusesCollapsableListInProgressMalfunctionStateEmptyItem.remove();

    CompoundControlShell.dynamicParts.replaceChildren();

  }

}
