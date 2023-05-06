import {
  addLeftClickEventHandler,
  getExpectedToBeSingleDOM_Element,
  cloneDOM_Element
} from "@yamato-daiwa/es-extensions-browserjs";
import addOnLeftClickOutOfElementEventHandler from "./addOnLeftClickOutOfElementEventHandler";


/* [ Convention ] The field's names begins from "$" intended to be changed via setter for the reactivity. */
export default class LanguageDropDownList {

  /* === Fields ===================================================================================================== */
  /* --- Static constants ------------------------------------------------------------------------------------------- */
  protected static CURRENTLY_SELECTED_OPTION_CSS_CLASS_SELECTOR: string =
      ".LanguageDropDownList--YDF_DK-CurrentlySelectedOption";
  protected static LIST_BOX_ELEMENT_CSS_CLASS_SELECTOR: string =
      ".LanguageDropDownList--YDF_DK-ListBox";
  protected static FLAGS_IMAGE_HOLDING_TEMPLATE_ELEMENT_CSS_CLASS_SELECTOR: string =
      ".LanguageDropDownList--YDF_DK-FlagsImagesHolder";
  protected static readonly COUNTRY_FLAG_PLACEHOLDER_CSS_CLASS_SELECTOR: string =
      ".LanguageDropDownList--YDF_DK-CountryFlagPlaceholder";

  protected static readonly COUNTRY_FLAG_CSS_CLASS: string = "LanguageDropDownList--YDF_DK-CountryFlag";

  protected static readonly FLAG_IMAGE_ID_DATA_ATTRIBUTE_KEY: string = "data-target_image_id";


  /* --- DOM elements ----------------------------------------------------------------------------------------------- */
  protected readonly rootElement: Element;
  protected readonly currentlySelectedOptionElement: Element;
  protected readonly listBoxElement: Element;

  /* --- Pseudo reactive -------------------------------------------------------------------------------------------- */
  protected $isListBoxDisplaying: boolean = false;


  /* === Public static methods ====================================================================================== */
  public static pickBySelector(targetLanguageDropDownListSelector: string): LanguageDropDownList {
    return new LanguageDropDownList(targetLanguageDropDownListSelector);
  }


  /* === Constructor ================================================================================================ */
  protected constructor(targetLanguageDropDownListSelector: string) {

    this.rootElement = getExpectedToBeSingleDOM_Element({ selector: targetLanguageDropDownListSelector });

    addOnLeftClickOutOfElementEventHandler({
      targetElement: this.rootElement,
      handler: this.onClickOutOfSelf.bind(this)
    });

    this.currentlySelectedOptionElement = getExpectedToBeSingleDOM_Element({
      selector: LanguageDropDownList.CURRENTLY_SELECTED_OPTION_CSS_CLASS_SELECTOR,
      context: this.rootElement
    });

    addLeftClickEventHandler({
      targetElement: this.currentlySelectedOptionElement,
      handler: this.onClickCurrentlySelectedView.bind(this),
      mustExpectExactlyOneMatchingWithSelector: true
    });

    this.listBoxElement = getExpectedToBeSingleDOM_Element({
      selector: LanguageDropDownList.LIST_BOX_ELEMENT_CSS_CLASS_SELECTOR,
      context: this.rootElement
    });

    this.prepareFlagsImages();

  }


  /* === Non-static protected methods =============================================================================== */
  /* --- Initialization --------------------------------------------------------------------------------------------- */
  protected prepareFlagsImages(): void {

    const flagsImagesHoldingTemplateElement: HTMLTemplateElement = getExpectedToBeSingleDOM_Element({
      selector: LanguageDropDownList.FLAGS_IMAGE_HOLDING_TEMPLATE_ELEMENT_CSS_CLASS_SELECTOR,
      context: this.rootElement,
      expectedDOM_ElementSubtype: HTMLTemplateElement
    });

    const flagsSVG_ImageElements: ReadonlyArray<SVGElement> =
        Array.from(flagsImagesHoldingTemplateElement.content.children).
        filter<SVGElement>((childElement: Element): childElement is SVGElement => childElement instanceof SVGElement);

    for (const flagSVG_ImageElement of flagsSVG_ImageElements) {

      flagSVG_ImageElement.classList.add(LanguageDropDownList.COUNTRY_FLAG_CSS_CLASS);

      const flagSVG_ImageHTML_ID: string = flagSVG_ImageElement.id;

      for (
        const [ index, flagPlaceholderElement ] of
            this.rootElement.querySelectorAll(
              `${ LanguageDropDownList.COUNTRY_FLAG_PLACEHOLDER_CSS_CLASS_SELECTOR }` +
                  `[${ LanguageDropDownList.FLAG_IMAGE_ID_DATA_ATTRIBUTE_KEY }=${ flagSVG_ImageHTML_ID }]`
            ).entries()
      ) {
        flagPlaceholderElement.replaceWith(
          index === 1 ?
              flagSVG_ImageElement :
              cloneDOM_Element({ targetElement: flagSVG_ImageElement, mustCopyAllChildren: true })
        );
      }

    }

    flagsImagesHoldingTemplateElement.remove();

  }


  /* --- Events handlers -------------------------------------------------------------------------------------------- */
  protected onClickCurrentlySelectedView(): void {
    this.isSelectedViewDisplaying = true;
  }

  protected onClickOutOfSelf(): void {
    this.isSelectedViewDisplaying = false;
  }


  /* --- Pseudo reactive -------------------------------------------------------------------------------------------- */
  protected get isSelectedViewDisplaying(): boolean {
    return this.$isListBoxDisplaying;
  }

  protected set isSelectedViewDisplaying(value: boolean) {

    if (value === this.$isListBoxDisplaying) {
      return;
    }


    this.$isListBoxDisplaying = value;
    this.listBoxElement.setAttribute("aria-expanded", String(value));
    this.listBoxElement.classList.toggle("LanguageDropDownList--YDF_DK-ListBox__Hidden");

  }

}
