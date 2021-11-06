import CodeHighlighter from "prismjs";
import ClipboardAccess from "clipboard";
import {
  RawObjectDataProcessor,
  Logger,
  InvalidExternalDataError,
  DOM_ElementRetrievingFailedError,
  isNotUndefined,
  isEmptyString, isNonEmptyString
} from "@yamato-daiwa/es-extensions";
import {
  createElement,
  getElementWhichMustExist
} from "@yamato-daiwa/es-extensions-browserjs";
import delegateClickEventHandling from "../../../Utils/delegateClickEventHandling";

/* --- Temporary ---------------------------------------------------------------------------------------------------- */
import "prismjs/components/prism-typescript.js";
import "prismjs/components/prism-pug.js";
// ---------------------------------------------------------------------------------------------------------------------

import componentTemplate from "./CodeViewer.template.pug";


export class CodeViewer {

  private static readonly componentImage: Element = createElement(componentTemplate);

  private readonly rootElement: HTMLDivElement;
  private readonly codeListings: NodeListOf<HTMLDivElement>;
  private readonly tabsFlow: HTMLDivElement;
  private readonly tabs: Array<HTMLDivElement> = [];


  public static initializeAllInstances(): Array<CodeViewer> {
    return Array.from(document.querySelectorAll<HTMLDivElement>(".CodeViewer")).
        map((componentRootElement: HTMLDivElement): CodeViewer => CodeViewer.initializeSingleInstance(componentRootElement));
  }

  public static initializeSingleInstance(componentRootElement: HTMLDivElement): CodeViewer {

    const selfInstance: CodeViewer = new CodeViewer(componentRootElement);

    selfInstance.initializeTabsAndCodeListings();
    selfInstance.initializeActionBar();

    CodeHighlighter.highlightAllUnder(componentRootElement);

    return selfInstance;
  }


  private constructor(componentRootElement: HTMLDivElement) {

    this.rootElement = componentRootElement;

    this.codeListings = componentRootElement.querySelectorAll<HTMLDivElement>(".CodeViewer-CodeListing");

    this.tabsFlow = getElementWhichMustExist<HTMLDivElement>({
      selector: ".CodeViewer-TabsFlow", context: componentRootElement
    });
  }


  private initializeTabsAndCodeListings(): void {

    if (this.codeListings.length === 0) {
      Logger.logError({
        errorType: DOM_ElementRetrievingFailedError.NAME,
        title: DOM_ElementRetrievingFailedError.DEFAULT_TITLE,
        description: "No code listings ('.CodeViewer-CodeListing') found. The initialization has been terminated.",
        occurrenceLocation: "CodeViewer.initializeSingleInstance(parametersObject) -> initializeTabsAndCodeListings()"
      });
      return;
    }


    if (this.codeListings.length === 1) {
      this.codeListings[0].removeAttribute("hidden");
      this.tabsFlow.remove();
      return;
    }


    const emptyTab: Element = getElementWhichMustExist({ selector: ".CodeViewer-Tab", context: CodeViewer.componentImage });
    let hasAtLeastOneCodeListingBeenSetToActive: boolean = false;

    for (const [ listingNumber, codeListing ] of this.codeListings.entries()) {

      const currentTabDataProcessingResult: RawObjectDataProcessor.ProcessingResult<CodeViewer.TabData> = RawObjectDataProcessor.
          process(codeListing.dataset, {
            subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
            nameForLogging: "TabData",
            properties: {
              language: {
                type: String,
                required: true
              },
              file_label: {
                newName: "fileLabel",
                type: String,
                required: false
              },
              is_active: {
                newName: "isActive",
                preValidationModifications: (rawValue: unknown): unknown => isEmptyString(rawValue) ? true : rawValue,
                type: Boolean,
                defaultValue: false
              }
            }
          });

      if (currentTabDataProcessingResult.rawDataIsInvalid) {
        Logger.logError({
          errorType: InvalidExternalDataError.NAME,
          title: InvalidExternalDataError.DEFAULT_TITLE,
          description: "Invalid dataset on 'CodeListing' element of 'CodeViewerListing' mixin.\n" +
              `${RawObjectDataProcessor.formatValidationErrorsList(currentTabDataProcessingResult.validationErrorsMessages)}`,
          occurrenceLocation: "className.methodName(parametersObject)"
        });
        continue;
      }


      const currentTabData: CodeViewer.TabData = currentTabDataProcessingResult.processedData;
      /* It is the issue: https://github.com/microsoft/TypeScript/issues/283 */
      const currentTab: HTMLElement = emptyTab.cloneNode(true) as HTMLElement;
      currentTab.dataset.listingNumber = listingNumber.toString();

      if (currentTabData.isActive && !hasAtLeastOneCodeListingBeenSetToActive) {

        codeListing.removeAttribute("hidden");
        currentTab.classList.add("CodeViewer-Tab__SelectedState");

        hasAtLeastOneCodeListingBeenSetToActive = true;
      }

      getElementWhichMustExist({
        selector: ".CodeViewer-Tab-LanguageValue",
        context: currentTab
      }).textContent = currentTabData.language;

      if (isNotUndefined(currentTabData.fileLabel)) {
        getElementWhichMustExist({ selector: ".CodeViewer-Tab-FileLabel", context: currentTab }).
            textContent = currentTabData.fileLabel;
      } else {
        getElementWhichMustExist({ selector: ".CodeViewer-Tab-FileLabel", context: currentTab }).remove();
      }

      this.tabs.push(currentTab);
    }

    this.tabsFlow.append(...this.tabs);

    if (!hasAtLeastOneCodeListingBeenSetToActive) {
      this.tabs[0].classList.add("CodeViewer-Tab__SelectedState");
      this.codeListings[0].removeAttribute("hidden");
    }

    delegateClickEventHandling(
      {
        container: this.tabsFlow,
        clickTargetSelector: ".CodeViewer-Tab",
        clickTargetTypeChecker: (element: Element): element is HTMLDivElement => element instanceof HTMLDivElement
      }, (clickedTab: HTMLDivElement): void => {

        if (!isNonEmptyString(clickedTab.dataset.listingNumber)) {
          return;
        }

        const targetCodeListingNumber: number = Number.parseInt(clickedTab.dataset.listingNumber, 10);
        const targetCodeListing: HTMLElement = this.codeListings[targetCodeListingNumber];

        for (const [ tabNumber, tab ] of this.tabs.entries()) {
          tab.classList.remove("CodeViewer-Tab__SelectedState");
          this.codeListings[tabNumber].setAttribute("hidden", "hidden");
        }

        targetCodeListing.removeAttribute("hidden");
        clickedTab.classList.add("CodeViewer-Tab__SelectedState");
      }
    );
  }

  private initializeActionBar(): void {

    const actionBar: HTMLElement = getElementWhichMustExist({
      selector: ".CodeViewer-ActionBar", context: this.rootElement
    });

    const copyCodeButton: HTMLElement = getElementWhichMustExist({
      selector: ".CodeViewer-ActionBar__CopyCode", context: actionBar
    });

    const clipboard: ClipboardAccess = new ClipboardAccess(copyCodeButton, {
      target: (): Element => getElementWhichMustExist({
          selector: ".CodeViewer-CodeListing-CodeContainer",
          context: this.codeListings[0]
        })
    });

    clipboard.on("success", (): void => {
      // TODO Snackbar
    });
  }
}


export namespace CodeViewer {
  export type TabData = {
    language: string;
    fileLabel?: string;
    isActive: boolean;
  };
}


export default CodeViewer;
