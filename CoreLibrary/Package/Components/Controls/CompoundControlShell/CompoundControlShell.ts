import {
  getExpectedToBeSingleDOM_Element,
  getExpectedToBeSingleChildOfTemplateElement,
  cloneDOM_Element
} from "@yamato-daiwa/es-extensions-browserjs";

import ExpandingAnimation from "@Animations/ExpandingAnimation";
import CollapsingAnimation from "@Animations/CollapsingAnimation";


export default class CompoundControlShell {

  protected static readonly VALIDATION_ERRORS_MESSAGES_LIST_TEMPLATE_SELECTOR: string =
      ".CompoundControlShell--YDF-ValidationErrorMessagesListTemplate";
  protected static readonly VALIDATION_ERROR_MESSAGES_LIST_SELECTOR: string =
      ".CompoundControlShell--YDF-ValidationErrorsMessagesList";
  protected static readonly VALIDATION_ERROR_MESSAGE_LIST_ITEM_SELECTOR: string =
      ".CompoundControlShell--YDF-ValidationErrorMessage";


  protected static readonly ERRORS_LIST_EXPANDING_ANIMATION_DURATION_PER_ONE_ERROR_MESSAGE__SECONDS: number = 0.2;
  protected static readonly ERRORS_LIST_COLLAPSING_ANIMATION_DURATION__SECONDS: number = 0.2;


  public readonly rootElement: HTMLElement;


  protected readonly errorsMessagesCollapsableList: HTMLElement;
  protected readonly errorsMessagesCollapsableListMountingPoint: Comment = document.
      createComment("COLLAPSABLE_CONTAINER_MOUNTING_POINT");
  protected readonly emptyErrorMessagesListItem: Element;

  protected errorsMessages: ReadonlyArray<string> = [];
  protected mustDisplayErrorsMessagesIfAny: boolean = false;


  public static pickOneBySelector(selector: string): CompoundControlShell {
    return new CompoundControlShell(selector);
  }


  private constructor(selector: string) {

    this.rootElement = getExpectedToBeSingleDOM_Element<HTMLElement>({
      selector, expectedDOM_ElementSubtype: HTMLElement
    });

    this.errorsMessagesCollapsableList = getExpectedToBeSingleChildOfTemplateElement({
      templateElementSelector: CompoundControlShell.VALIDATION_ERRORS_MESSAGES_LIST_TEMPLATE_SELECTOR,
      expectedChildElementSubtype: HTMLElement,
      context: this.rootElement,
      mustReplaceTemplateElementOnceDoneWith: this.errorsMessagesCollapsableListMountingPoint
    });

    this.emptyErrorMessagesListItem = getExpectedToBeSingleDOM_Element({
      selector: CompoundControlShell.VALIDATION_ERROR_MESSAGE_LIST_ITEM_SELECTOR,
      context: this.errorsMessagesCollapsableList
    });

    this.emptyErrorMessagesListItem.remove();

    /* [ Theory ] There could be pre-mounted errors by state simulations, but they could not correspond to inputted value. */
    this.rootElement.querySelector(CompoundControlShell.VALIDATION_ERROR_MESSAGES_LIST_SELECTOR)?.remove();

  }


  /* === Public methods and getters ================================================================================= */
  public beginDisplayingOfErrorsMessagesIfAny(): void {

    if (this.mustDisplayErrorsMessagesIfAny) {
      return;
    }


    this.mustDisplayErrorsMessagesIfAny = true;
    this.mountAndSlideDownErrorsMessagesIfRequired();

  }

  public stopDisplayingOfErrorsMessages(): void {

    if (!this.mustDisplayErrorsMessagesIfAny) {
      return;
    }


    this.mustDisplayErrorsMessagesIfAny = false;
    this.slideUpAndRemoveErrorMessagesIfRequired();

  }

  public setErrorsMessagesAndDisplayIfMust(newErrorsMessages: ReadonlyArray<string>): void {

    this.errorsMessages = newErrorsMessages;

    if (this.errorsMessages.length > 0) {
      this.mountAndSlideDownErrorsMessagesIfRequired();
    } else {
      this.slideUpAndRemoveErrorMessagesIfRequired();
    }

  }


  /* === Protected methods and getters ============================================================================== */
  protected mountAndSlideDownErrorsMessagesIfRequired(): void {

    /* [ Theory ] Even if the errors count has not changed, the errors messages themselves could change. */
    this.errorsMessagesCollapsableList.replaceChildren(
      ...this.errorsMessages.map((errorMessage: string): Element => {

        const listItem: Element = cloneDOM_Element({
          targetElement: this.emptyErrorMessagesListItem,
          mustCopyAllChildren: false
        });

        listItem.textContent = errorMessage;

        return listItem;

      })
    );

    if (
      this.errorsMessagesCollapsableList.isConnected ||
      this.errorsMessages.length === 0 ||
      !this.mustDisplayErrorsMessagesIfAny
    ) {
      return;
    }


    ExpandingAnimation.replaceNodeAndAnimate({
      replacedNode: this.errorsMessagesCollapsableListMountingPoint,
      animatedElement: this.errorsMessagesCollapsableList,
      duration__seconds: CompoundControlShell.ERRORS_LIST_EXPANDING_ANIMATION_DURATION_PER_ONE_ERROR_MESSAGE__SECONDS *
          this.errorsMessages.length
    });
  }


  protected slideUpAndRemoveErrorMessagesIfRequired(): void {

    if (this.errorsMessages.length > 0 || !this.errorsMessagesCollapsableList.isConnected) {
      return;
    }


    CollapsingAnimation.animate({
      animatedElement: this.errorsMessagesCollapsableList,
      replaceWithOnComplete: this.errorsMessagesCollapsableListMountingPoint,
      duration__seconds: CompoundControlShell.ERRORS_LIST_COLLAPSING_ANIMATION_DURATION__SECONDS
    });
  }

}
