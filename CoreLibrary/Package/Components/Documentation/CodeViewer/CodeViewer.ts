import CodeSyntaxHighlighter from "prismjs";
import ClipboardAccess from "clipboard";
import {
  RawObjectDataProcessor,
  Logger,
  InvalidExternalDataError,
  DOM_ElementRetrievingFailedError,
  insertSubstringIf,
  isNotUndefined,
  isEmptyString,
  isNonEmptyString
} from "@yamato-daiwa/es-extensions";
import {
  createElement
} from "@yamato-daiwa/es-extensions-browserjs";
import delegateClickEventHandling from "../../../Utils/delegateClickEventHandling";
import getExpectedToBeSingleElement from "../../../Utils/getExpectedToBeSingleElement";
import Snackbar from "../../Snackbar/Snackbar";

/* --- Temporary ---------------------------------------------------------------------------------------------------- */
import "prismjs/components/prism-typescript.js";
import "prismjs/components/prism-pug.js";
// ---------------------------------------------------------------------------------------------------------------------

import componentHTML_Workpiece from "./CodeViewer.template.pug";


export class CodeViewer {

  protected static readonly workpiece: Element = createElement(componentHTML_Workpiece);

  protected readonly rootElement: Element;
  protected readonly tabsFlow: Element;
  protected readonly tabs: Array<Element> = [];
  protected readonly tabsContent: NodeListOf<HTMLElement>;

  protected activeTabContent!: HTMLElement;


  public static initializeAllInstances(): Array<CodeViewer> {
    return Array.from(document.querySelectorAll("[data-element-root]")).
        map((componentRootElement: Element): CodeViewer => CodeViewer.initializeSingleInstance(componentRootElement));
  }

  public static initializeSingleInstance(componentRootElement: Element): CodeViewer {

    const selfInstance: CodeViewer = new CodeViewer(componentRootElement).
        initializeTabsAndIts_Content().
        initializeActionBar();

    CodeSyntaxHighlighter.highlightAllUnder(componentRootElement);

    return selfInstance;
  }


  protected constructor(componentRootElement: Element) {

    this.rootElement = componentRootElement;

    this.tabsFlow = getExpectedToBeSingleElement({
      selector: "[data-element-tabs_flow]", context: componentRootElement
    });

    this.tabsContent = componentRootElement.querySelectorAll<HTMLElement>("[data-element-tab_content]");
  }


  protected initializeTabsAndIts_Content(): this {

    if (this.tabsContent.length === 0) {
      Logger.logError({
        errorType: DOM_ElementRetrievingFailedError.NAME,
        title: DOM_ElementRetrievingFailedError.DEFAULT_TITLE,
        description: "The tabs content is empty. The initialization of CodeViewer component instance has been terminated. " +
            "Add '+CodeViewer-Listing' and/or '+CodeViewer-PartialListingsWithExplanations' as block content of '+CodeViewer'.",
        occurrenceLocation: "CodeViewer.initializeSingleInstance(parametersObject) -> initializeTabsAndIts_Content()"
      });
      return this;
    }


    if (this.tabsContent.length === 1) {

      this.activeTabContent = this.tabsContent[0];

      console.log(this.tabsContent[0].getAttribute("hidden"));
      this.tabsContent[0].removeAttribute("hidden");
      this.tabsFlow.remove();

      return this;
    }


    const emptyTab: Element = getExpectedToBeSingleElement({
      selector: "[data-element-tab]", context: CodeViewer.workpiece
    });

    /* [ Theory ] The programmer could set the content of multiple tabs to active without understanding what he is doing. */
    let hasAtLeastOneTabContentBeenSetToActive: boolean = false;

    for (const [ tabContentNumber, tabContent ] of this.tabsContent.entries()) {

      const currentTabDataProcessingResult: RawObjectDataProcessor.ProcessingResult<CodeViewer.TabData> =
          RawObjectDataProcessor.process(tabContent.dataset, {
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
                preValidationModifications: (rawValue: unknown): unknown => (isEmptyString(rawValue) ? true : rawValue),
                type: Boolean,
                defaultValue: false
              }
            }
          });

      if (currentTabDataProcessingResult.rawDataIsInvalid) {
        Logger.logError({
          errorType: InvalidExternalDataError.NAME,
          title: InvalidExternalDataError.DEFAULT_TITLE,
          description: `Invalid dataset on tab content number ${tabContentNumber}:\n` +
              `${RawObjectDataProcessor.formatValidationErrorsList(currentTabDataProcessingResult.validationErrorsMessages)}`,
          occurrenceLocation: "CodeViewer.initializeSingleInstance(parametersObject) -> initializeTabsAndIts_Content()"
        });
        continue;
      }


      const tacContentData: CodeViewer.TabData = currentTabDataProcessingResult.processedData;

      /* It is the issue: https://github.com/microsoft/TypeScript/issues/283 */
      const currentTab: HTMLElement = emptyTab.cloneNode(true) as HTMLElement;
      currentTab.dataset.listingNumber = tabContentNumber.toString();

      if (tacContentData.isActive && !hasAtLeastOneTabContentBeenSetToActive) {

        currentTab.classList.add("CodeViewer-Tab__SelectedState");

        tabContent.removeAttribute("hidden");
        this.activeTabContent = tabContent;

        hasAtLeastOneTabContentBeenSetToActive = true;
      }

      getExpectedToBeSingleElement({
        selector: ".CodeViewer-Tab-LanguageValue",
        context: currentTab
      }).textContent = tacContentData.language;


      if (isNotUndefined(tacContentData.fileLabel)) {
        getExpectedToBeSingleElement({ selector: ".CodeViewer-Tab-FileLabel", context: currentTab }).
            textContent = tacContentData.fileLabel;
      } else {
        getExpectedToBeSingleElement({ selector: ".CodeViewer-Tab-FileLabel", context: currentTab }).remove();
      }

      this.tabs.push(currentTab);
    }

    this.tabsFlow.append(...this.tabs);

    if (!hasAtLeastOneTabContentBeenSetToActive) {
      this.tabs[0].classList.add("CodeViewer-Tab__SelectedState");
      this.tabsContent[0].removeAttribute("hidden");
      this.activeTabContent = this.tabsContent[0];
    }

    delegateClickEventHandling(
      {
        container: this.tabsFlow,
        clickTargetSelector: ".CodeViewer-Tab",
        clickTargetTypeChecker: (element: Element): element is HTMLDivElement => element instanceof HTMLElement
      }, this.onClickTab.bind(this)
    );


    return this;
  }

  private onClickTab(clickedTab: HTMLElement): void {

    if (!isNonEmptyString(clickedTab.dataset.listingNumber)) {
      return;
    }


    const targetTabContentNumber: number = Number.parseInt(clickedTab.dataset.listingNumber, 10);
    const targetCodeListing: HTMLElement = this.tabsContent[targetTabContentNumber];

    for (const [ tabNumber, tabElement ] of this.tabs.entries()) {
      if (tabNumber === targetTabContentNumber) {
        targetCodeListing.removeAttribute("hidden");
        clickedTab.classList.add("CodeViewer-Tab__SelectedState");
      } else {
        tabElement.classList.remove("CodeViewer-Tab__SelectedState");
        this.tabsContent[tabNumber].setAttribute("hidden", "hidden");
      }
    }

    this.activeTabContent = this.tabsContent[targetTabContentNumber];
  }

  private initializeActionBar(): this {

    const actionBar: Element = getExpectedToBeSingleElement({
      selector: ".CodeViewer-ActionBar", context: this.rootElement
    });

    const copyCodeButton: Element = getExpectedToBeSingleElement({
      selector: ".CodeViewer-ActionBar__CopyCode", context: actionBar
    });

    const clipboard: ClipboardAccess = new ClipboardAccess(copyCodeButton, {
      text: (): string => {

        const codeContainers: NodeListOf<Element> = this.activeTabContent.querySelectorAll(
          ".CodeViewer-CodeListing-CodeContainer"
        );

        if (codeContainers.length === 1) {
          return codeContainers[0].textContent;
        }


        let accumulatingValue: string = "";

        codeContainers.forEach((codeListing: Element): void => {
          accumulatingValue = `${accumulatingValue}${insertSubstringIf("\n", !codeListing.textContent.endsWith("\n"))}${codeListing.textContent}`;
        });

        return accumulatingValue;
      }
    });

    clipboard.on("success", (): void => {
      Snackbar.mountAndDisplayForAWhile({
        decorativeVariation: Snackbar.DecorativeVariations.success,
        messageTextOrHTML: "Code has been copied to clipboard"
      });
    });

    return this;
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
