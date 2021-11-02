import CodeHighlighter from "prismjs";
import ClipboardAccess from "clipboard";
import {
  RawObjectDataProcessor,
  Logger,
  InvalidExternalDataError,
  DOM_ElementRetrievingFailedError,
  isNotUndefined,
  isEmptyString
} from "@yamato-daiwa/es-extensions";
import {
  createElement,
  getElementWhichMustExist,
  delegateClickEventHandling
} from "@yamato-daiwa/es-extensions-browserjs";

/* --- Temporary ---------------------------------------------------------------------------------------------------- */
import "prismjs/components/prism-typescript.js";
import "prismjs/components/prism-pug.js";
// ---------------------------------------------------------------------------------------------------------------------

import componentTemplate from "./CodeViewer.template.pug";


export class CodeViewer {

  private static readonly componentImage: Element = createElement(componentTemplate);

  private readonly rootElement: HTMLElement;
  private readonly codeListings: NodeListOf<HTMLElement>;
  private readonly tabsFlow: HTMLElement;
  private readonly tabs: Array<HTMLElement> = [];


  public static initializeAllInstances(): Array<CodeViewer> {
    return Array.from(document.querySelectorAll<HTMLElement>(".CodeViewer")).
        map((componentRootElement: HTMLElement): CodeViewer => CodeViewer.initializeSingleInstance(componentRootElement));
  }

  public static initializeSingleInstance(componentRootElement: HTMLElement): CodeViewer {

    const selfInstance: CodeViewer = new CodeViewer(componentRootElement);

    selfInstance.initializeTabsAndCodeListings();
    selfInstance.initializeActionBar();

    CodeHighlighter.highlightAllUnder(componentRootElement);

    return selfInstance;
  }


  private constructor(componentRootElement: HTMLElement) {

    this.rootElement = componentRootElement;

    this.codeListings = componentRootElement.querySelectorAll<HTMLElement>(".CodeViewer-CodeListing");

    this.tabsFlow = getElementWhichMustExist<HTMLElement>({
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

    for (const codeListing of this.codeListings) {

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

    // TODO Wrong Selector
    delegateClickEventHandling(
      { container: this.tabsFlow, clickTargetSelector: ".CodeViewer-Tab" }, (event: MouseEvent): void => {
        console.log(event);
        console.log(event.currentTarget);
        console.log(event.target);
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
