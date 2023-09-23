/* eslint-disable no-underscore-dangle -- [ CONVENTION ]
* The instance files begins from the underscore MUST be changed only via setters. */

/* ─── アセット ───────────────────────────────────────────────────────────────────────────────────────────────────────── */
import componentDynamicPartsHTML from "./CompoundControlShell.parts.pug";

/* ─── フレームワーク ────────────────────────────────────────────────────────────────────────────────────────────────────── */
import type InputtedValueValidation from "../_Validation/InputtedValueValidation";
import ExpandingAnimation from "../../../Animations/ExpandingAnimation";
import CollapsingAnimation from "../../../Animations/CollapsingAnimation";

/* ─── 補助 ─────────────────────────────────────────────────────────────────────────────────────────────────────────── */
import {
  getExpectedToBeSingleDOM_Element,
  cloneDOM_Element,
  createDOM_ElementFromHTML_Code
} from "@yamato-daiwa/es-extensions-browserjs";
import getCommentDOM_Node from "../../../Logic/UtilsIncubator/DOM/getCommentDOM_Node";
import { isNotUndefined, isNull } from "@yamato-daiwa/es-extensions";


export default class CompoundControlShell {

  /* ━━━ Static fields ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── Accessing to DOM ─────────────────────────────────────────────────────────────────────────────────────────── */
  protected static readonly VALIDATION_ERRORS_MESSAGES_LIST_MOUNTING_POINT_PLACEHOLDER_CONTENT: string =
      "COMPOUND_CONTROL_SHELL__YDF-VALIDATION_ERRORS_MESSAGES_LIST_MOUNTING_POINT";
  protected static readonly VALIDATION_ERRORS_MESSAGES_LIST_SELECTOR: string =
      ".CompoundControlShell--YDF-ValidationErrorsMessagesList";
  protected static readonly VALIDATION_ERRORS_MESSAGES_LIST_ITEM_SELECTOR: string =
      ".CompoundControlShell--YDF-ValidationErrorMessage";

  protected static readonly ASYNCHRONOUS_VALIDATIONS_STATUSES_LIST_MOUNTING_POINT_PLACEHOLDER_CONTENT: string =
      "COMPOUND_CONTROL_SHELL__YDF-ASYNCHRONOUS_VALIDATIONS_STATUSES_LIST_MOUNTING_POINT";
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

  protected readonly validationErrorsMessagesCollapsableListMountingPoint: Comment;

  protected readonly validationErrorsMessagesCollapsableList: HTMLElement = cloneDOM_Element({
    targetElement: CompoundControlShell.validationErrorsMessagesCollapsableList,
    mustCopyAllChildren: false
  });

  protected readonly emptyValidationErrorMessagesListItem: Element = cloneDOM_Element({
    targetElement: CompoundControlShell.validationErrorsMessagesCollapsableListEmptyItem,
    mustCopyAllChildren: false
  });

  protected readonly asynchronousValidationsStatusesCollapsableListMountingPoint: Comment;

  protected readonly asynchronousValidationsStatusesCollapsableList: HTMLElement = cloneDOM_Element({
    targetElement: CompoundControlShell.asynchronousValidationsStatusesCollapsableList,
    mustCopyAllChildren: false
  });


  /* ─── Must be changed only via setter or constructor ───────────────────────────────────────────────────────────── */
  protected _mustDisplayErrorsMessagesIfAny: boolean;
  protected _validationErrorsMessages: ReadonlyArray<string> = [];


  /* ━━━ Public static methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public static pickOneBySelector(
    compoundParameter: Readonly<{
      targetCompoundControlShellSelector: string;
      mustDisplayErrorsMessagesIfAny: boolean;
      contextElement?: Element;
      contextElementSelector?: string;
    }>
  ): CompoundControlShell {

    if (isNull(CompoundControlShell.dynamicParts)) {
      CompoundControlShell.initializeCommonDOM_Parts();
    }

    const targetCompoundControlShellSelector: string = compoundParameter.targetCompoundControlShellSelector;
    let contextElement: Element | undefined;

    if (isNotUndefined(compoundParameter.contextElement)) {
      contextElement = compoundParameter.contextElement;
    } else if (isNotUndefined(compoundParameter.contextElementSelector)) {
      contextElement = document.querySelectorAll(compoundParameter.contextElementSelector)[0];
    }

    const rootElement: HTMLElement = getExpectedToBeSingleDOM_Element<HTMLElement>({
      selector: targetCompoundControlShellSelector,
      context: contextElement,
      expectedDOM_ElementSubtype: HTMLElement
    });

    return new CompoundControlShell({
      rootElement,
      mustDisplayErrorsMessagesIfAny: compoundParameter.mustDisplayErrorsMessagesIfAny
    });

  }


  /* ━━━ Constructor ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  private constructor(
    compoundParameter: Readonly<{
      rootElement: HTMLElement;
      mustDisplayErrorsMessagesIfAny: boolean;
    }>
  ) {

    this.rootElement = compoundParameter.rootElement;

    this._mustDisplayErrorsMessagesIfAny = compoundParameter.mustDisplayErrorsMessagesIfAny;

    this.validationErrorsMessagesCollapsableListMountingPoint = getCommentDOM_Node({
      commentContent: CompoundControlShell.VALIDATION_ERRORS_MESSAGES_LIST_MOUNTING_POINT_PLACEHOLDER_CONTENT,
      directParent: this.rootElement,
      mustThrowErrorIfCommentNotFound: true
    });

    this.asynchronousValidationsStatusesCollapsableListMountingPoint = getCommentDOM_Node({
      commentContent: CompoundControlShell.ASYNCHRONOUS_VALIDATIONS_STATUSES_LIST_MOUNTING_POINT_PLACEHOLDER_CONTENT,
      directParent: this.rootElement,
      mustThrowErrorIfCommentNotFound: true
    });

  }


  /* ━━━ Reactivity ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* eslint-disable-next-line @typescript-eslint/member-ordering --
  * From now, the private instance fields and public accessors/mutators are being grouped. */
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

      let asynchronousValidationsStatusesCollapsableListItemElement: Element;

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

      } else {

        asynchronousValidationsStatusesCollapsableListItemElement = cloneDOM_Element({
          targetElement: CompoundControlShell.
              asynchronousValidationsStatusesCollapsableListInProgressMalfunctionStateEmptyItem,
          mustCopyAllChildren: true
        });

      }

      getExpectedToBeSingleDOM_Element({
        selector: CompoundControlShell.ASYNCHRONOUS_VALIDATIONS_STATUSES_LIST_ITEM_SELECTOR,
        context: asynchronousValidationsStatusesCollapsableListItemElement
      }).textContent = asynchronousCheck.message;

      this.asynchronousValidationsStatusesCollapsableList.
          appendChild(asynchronousValidationsStatusesCollapsableListItemElement);

    }

    if (!this.asynchronousValidationsStatusesCollapsableList.isConnected) {

      this.asynchronousValidationsStatusesCollapsableListMountingPoint.
          replaceWith(this.asynchronousValidationsStatusesCollapsableList);

      this.asynchronousValidationsStatusesCollapsableList.style.display = "none";

      ExpandingAnimation.replaceNodeAndAnimate({
        replacedNode: this.validationErrorsMessagesCollapsableListMountingPoint,
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
      context: CompoundControlShell.dynamicParts,
      expectedDOM_ElementSubtype: HTMLElement
    });

    CompoundControlShell.validationErrorsMessagesCollapsableListEmptyItem = getExpectedToBeSingleDOM_Element({
      selector: CompoundControlShell.VALIDATION_ERRORS_MESSAGES_LIST_ITEM_SELECTOR,
      context: CompoundControlShell.validationErrorsMessagesCollapsableList
    });
    CompoundControlShell.validationErrorsMessagesCollapsableListEmptyItem.remove();


    CompoundControlShell.asynchronousValidationsStatusesCollapsableList = getExpectedToBeSingleDOM_Element({
      selector: CompoundControlShell.ASYNCHRONOUS_VALIDATIONS_STATUSES_LIST_SELECTOR,
      context: CompoundControlShell.dynamicParts,
      expectedDOM_ElementSubtype: HTMLElement
    });

    CompoundControlShell.asynchronousValidationsStatusesCollapsableListInProgressStateEmptyItem =
        getExpectedToBeSingleDOM_Element({
          selector: CompoundControlShell.ASYNCHRONOUS_VALIDATIONS_STATUSES_LIST_IN_PROGRESS_STATE_ITEM_TEMPLATE_SELECTOR,
          context: CompoundControlShell.asynchronousValidationsStatusesCollapsableList
        });
    CompoundControlShell.asynchronousValidationsStatusesCollapsableListInProgressStateEmptyItem.remove();

    CompoundControlShell.asynchronousValidationsStatusesCollapsableListInProgressSucceededAndValidStateEmptyItem =
        getExpectedToBeSingleDOM_Element({
          selector: CompoundControlShell.
              ASYNCHRONOUS_VALIDATIONS_STATUSES_LIST_SUCCEEDED_AND_VALID_STATE_ITEM_TEMPLATE_SELECTOR,
          context: CompoundControlShell.asynchronousValidationsStatusesCollapsableList
        });
    CompoundControlShell.asynchronousValidationsStatusesCollapsableListInProgressSucceededAndValidStateEmptyItem.remove();

    CompoundControlShell.asynchronousValidationsStatusesCollapsableListInProgressMalfunctionStateEmptyItem =
        getExpectedToBeSingleDOM_Element({
          selector: CompoundControlShell.
              ASYNCHRONOUS_VALIDATIONS_STATUSES_LIST_MALFUNCTION_STATE_ITEM_TEMPLATE_SELECTOR,
          context: CompoundControlShell.asynchronousValidationsStatusesCollapsableList
        });
    CompoundControlShell.asynchronousValidationsStatusesCollapsableListInProgressMalfunctionStateEmptyItem.remove();

    CompoundControlShell.dynamicParts.replaceChildren();

  }

}
