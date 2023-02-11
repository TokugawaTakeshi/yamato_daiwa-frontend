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
  convertPotentialStringToIntegerIfPossible,
  isNotNull
} from "@yamato-daiwa/es-extensions";

import {
  getExpectedToBeSingleDOM_Element,
  delegateClickEventHandling,
  cloneDOM_Element
} from "@yamato-daiwa/es-extensions-browserjs";

/* --- Temporary ---------------------------------------------------------------------------------------------------- */
import "prismjs/components/prism-typescript.js";
import "prismjs/components/prism-pug.js";
import {
  getExpectedToBeSingleChildOfTemplateElement
} from "../../../../../../YamatoDaiwaES_Extensions/BrowserJS/Package";
// ---------------------------------------------------------------------------------------------------------------------


export class CodeViewer {

  protected static readonly ROOT_ELEMENT_SELECTOR: string = ".CodeViewer--YDF";
  protected static readonly TABS_FLOW_SELECTOR: string = ".CodeViewer--YDF-TabsFlow";
  protected static readonly TAB_TEMPLATE_ELEMENT_SELECTOR: string = ".CodeViewer--YDF-TabTemplate";
  protected static readonly TAB_SELECTOR: string = ".CodeViewer--YDF-Tab";
  protected static readonly TAB_PANEL_SELECTOR: string = ".CodeViewer--YDF-TabPanel";
  protected static readonly TAB_FILE_LABEL_SELECTOR: string = ".CodeViewer--YDF-Tab-FileLabel";
  protected static readonly TAB_FILE_LANGUAGE_KEY_LABEL_SELECTOR: string = ".CodeViewer--YDF-Tab-LanguageKeyLabel";
  protected static readonly TAB_FILE_LANGUAGE_VALUE_LABEL_SELECTOR: string = ".CodeViewer--YDF-Tab-LanguageValueLabel";
  protected static readonly ACTION_BAR_SELECTOR: string = ".CodeViewer--YDF-ActionBar";
  protected static readonly CODE_COPYING_BUTTON_SELECTOR: string = ".CodeViewer--YDF-ActionBar-Button__CodeCopying";

  protected static readonly CODE_CONTAINER_SELECTOR: string = ".CodeViewer--YDF-CodeListing-CodeContainer";
  protected static readonly PARTIAL_LISTING_CODE_CONTAINER_SELECTOR: string = ".CodeViewer--YDF-PartialListing-CodeContainer";

  protected static readonly TAB_SELECTED_STATE_CSS_CLASS: string = "CodeViewer--YDF-Tab__SelectedState";


  protected readonly ID: string = CodeViewer.generateSelfID();
  protected readonly rootElement: Element;
  protected readonly tabsFlow: Element;
  protected readonly tabs: Array<Element> = [];
  protected readonly tabsPanels: NodeListOf<HTMLElement>;

  protected activeTabPanel!: HTMLElement;


  public static initializeAllInstances(): Array<CodeViewer> {
    return Array.from(document.querySelectorAll(CodeViewer.ROOT_ELEMENT_SELECTOR)).
        map((componentRootElement: Element): CodeViewer => CodeViewer.initializeSingleInstance(componentRootElement));
  }

  public static initializeSingleInstance(componentRootElement: Element): CodeViewer {
    return new CodeViewer(componentRootElement).
        initializeTabsAndIts_Content().
        initializeActionBar().
        highlightSyntax();
  }


  protected constructor(componentRootElement: Element) {
    this.rootElement = componentRootElement;
    this.tabsFlow = getExpectedToBeSingleDOM_Element({ selector: CodeViewer.TABS_FLOW_SELECTOR, context: componentRootElement });
    this.tabsPanels = componentRootElement.querySelectorAll<HTMLElement>(CodeViewer.TAB_PANEL_SELECTOR);
  }


  protected initializeTabsAndIts_Content(): this {

    const CURRENT_METHOD_CALLING_NOTATION: string = "CodeViewer.[initializingMethod](namedParameters) -> " +
        "initializeTabsAndIts_Content()";

    if (this.tabsPanels.length === 0) {

      Logger.logError({
        errorType: DOM_ElementRetrievingFailedError.NAME,
        title: DOM_ElementRetrievingFailedError.localization.defaultTitle,
        description: "No tabs panel has been specified; nothing to display. The initialization of the 'CodeViewer' component " +
            "instance has been terminated. Add '+CodeViewer-Listing--YDF' and/or '+CodeViewer-TabPanel--YDF' as block " +
            "content of the '+CodeViewer--YDF'.",
        occurrenceLocation: CURRENT_METHOD_CALLING_NOTATION
      });

      return this;
    }


    if (this.tabsPanels.length === 1) {

      this.activeTabPanel = this.tabsPanels[0];
      this.tabsPanels[0].removeAttribute("hidden");
      this.tabsFlow.remove();

      return this;
    }


    const emptyTab: HTMLElement = getExpectedToBeSingleChildOfTemplateElement({
      templateElementSelector: CodeViewer.TAB_TEMPLATE_ELEMENT_SELECTOR,
      expectedChildElementSubtype: HTMLElement,
      context: this.rootElement,
      mustRemoveTemplateElementOnceDone: true
    });

    /* [ Theory ] The programmer could set the content of multiple to active by mistake. */
    let hasAtLeastOneTabPanelBeenSetToActive: boolean = false;

    for (const [ currentTabPanelIndex, currentTabPanel ] of this.tabsPanels.entries()) {

      const currentTabPanelDataProcessingResult: RawObjectDataProcessor.ProcessingResult<CodeViewer.TabPanelData> =
          RawObjectDataProcessor.process(currentTabPanel.dataset, {
            subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
            nameForLogging: "CodeViewerTabData",
            properties: {
              code_language_label: {
                newName: "codeLanguageLabel",
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

      if (currentTabPanelDataProcessingResult.rawDataIsInvalid) {

        Logger.logError({
          errorType: InvalidExternalDataError.NAME,
          title: InvalidExternalDataError.localization.defaultTitle,
          description: `Invalid dataset on tab panel with index '${ currentTabPanelIndex }':\n ${ 
            RawObjectDataProcessor.formatValidationErrorsList(currentTabPanelDataProcessingResult.validationErrorsMessages) 
          }`,
          occurrenceLocation: CURRENT_METHOD_CALLING_NOTATION
        });

        continue;
      }


      const tabPanelData: CodeViewer.TabPanelData = currentTabPanelDataProcessingResult.processedData;
      const currentTab: HTMLElement = cloneDOM_Element({ targetElement: emptyTab, mustCopyAllChildren: true });

      const tabID: string = `${ this.ID }-TAB-${ currentTabPanelIndex }`;
      const tabPanelID: string = `${ this.ID }-TAB_PANEL-${ currentTabPanelIndex }`;

      if (isNotNull(document.querySelector(tabID))) {
        Logger.throwErrorAndLog({
          errorType: "HTML_ID_DuplicatingError",
          description: `The element with HTML ID '${ tabID }' which has been generated for the tab of one instance of the ` +
              "'CodeViewer' component is already presents in document. It will break both HTML validity and the accessibility.",
          title: "HTML ID duplicating",
          occurrenceLocation: CURRENT_METHOD_CALLING_NOTATION
        });
      }


      if (isNotNull(document.querySelector(tabPanelID))) {
        Logger.throwErrorAndLog({
          errorType: "HTML_ID_DuplicatingError",
          description: `The element with HTML ID '${ tabPanelID }' which has been generated for the tab panel of one ` +
              "instance of the 'CodeViewer' component is already presents in document. It will break both HTML validity " +
              "and accessibility.",
          title: "HTML ID duplicating",
          occurrenceLocation: CURRENT_METHOD_CALLING_NOTATION
        });
      }

      currentTab.setAttribute("aria-controls", tabPanelID);
      currentTab.id = tabID;
      currentTab.dataset.listingIndex = currentTabPanelIndex.toString();

      currentTabPanel.id = tabPanelID;
      currentTabPanel.setAttribute("aria-labelledby", tabID);

      if (tabPanelData.isActive) {

        if (hasAtLeastOneTabPanelBeenSetToActive) {

          Logger.logError({
            errorType: "MultipleActiveTabPanelsError",
            title: "Multiple active tab panels",
            description: `The tab panel with index ${ currentTabPanelIndex } has been set to active, however there is another ` +
                "active tap panel already.",
            occurrenceLocation: CURRENT_METHOD_CALLING_NOTATION
          });

          currentTab.classList.remove(CodeViewer.TAB_SELECTED_STATE_CSS_CLASS);
          currentTab.setAttribute("aria-selected", "false");
          currentTab.setAttribute("tabindex", "0");

          currentTabPanel.setAttribute("hidden", "hidden");

        } else {

          currentTab.classList.add(CodeViewer.TAB_SELECTED_STATE_CSS_CLASS);
          currentTab.setAttribute("aria-selected", "true");
          currentTab.setAttribute("tabindex", "-1");

          currentTabPanel.removeAttribute("hidden");

          this.activeTabPanel = currentTabPanel;

          hasAtLeastOneTabPanelBeenSetToActive = true;
        }

      }

      getExpectedToBeSingleDOM_Element({
        selector: CodeViewer.TAB_FILE_LANGUAGE_VALUE_LABEL_SELECTOR,
        context: currentTab
      }).textContent = tabPanelData.codeLanguageLabel;

      if (isNotUndefined(tabPanelData.fileLabel)) {
        getExpectedToBeSingleDOM_Element({ selector: CodeViewer.TAB_FILE_LABEL_SELECTOR, context: currentTab }).
            textContent = tabPanelData.fileLabel;
      } else {
        getExpectedToBeSingleDOM_Element({ selector: CodeViewer.TAB_FILE_LABEL_SELECTOR, context: currentTab }).remove();
      }

      this.tabs.push(currentTab);
    }

    this.tabsFlow.append(...this.tabs);

    if (!hasAtLeastOneTabPanelBeenSetToActive) {
      this.tabs[0].classList.add(CodeViewer.TAB_SELECTED_STATE_CSS_CLASS);
      this.tabs[0].setAttribute("aria-selected", "true");
      this.tabs[0].setAttribute("tabindex", "-1");
      this.tabsPanels[0].removeAttribute("hidden");
      this.activeTabPanel = this.tabsPanels[0];
    }

    delegateClickEventHandling(
      {
        delegatingContainerOrItsSelector: this.tabsFlow,
        eventTargetSelector: CodeViewer.TAB_SELECTOR,
        eventTargetElementSubtype: HTMLElement,
        handler: (clickedTab: HTMLElement): void => { this.onClickTab(clickedTab); }
      }
    );

    return this;

  }

  protected onClickTab(clickedTab: HTMLElement): void {

    const clickedTabDataProcessingResult: RawObjectDataProcessor.ProcessingResult<{ listingIndex: number; }> =
        RawObjectDataProcessor.process(clickedTab.dataset, {
          subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
          nameForLogging: "CodeViewerTabData",
          properties: {
            listingIndex: {
              preValidationModifications: convertPotentialStringToIntegerIfPossible,
              type: Number,
              required: true,
              numbersSet: RawObjectDataProcessor.NumbersSets.nonNegativeInteger
            }
          }
        });

    if (clickedTabDataProcessingResult.rawDataIsInvalid) {
      Logger.logError({
        errorType: InvalidExternalDataError.NAME,
        title: InvalidExternalDataError.localization.defaultTitle,
        description: "Invalid dataset on clicked tab:\n" +
            `${ RawObjectDataProcessor.formatValidationErrorsList(clickedTabDataProcessingResult.validationErrorsMessages) }`,
        occurrenceLocation: "codeViewer.onClickTab()"
      });
      return;
    }


    const targetTabPanelIndex: number = clickedTabDataProcessingResult.processedData.listingIndex;
    const targetTabPanel: HTMLElement = this.tabsPanels[targetTabPanelIndex];

    clickedTab.classList.add(CodeViewer.TAB_SELECTED_STATE_CSS_CLASS);
    clickedTab.setAttribute("aria-selected", "true");
    clickedTab.setAttribute("tabindex", "-1");
    targetTabPanel.removeAttribute("hidden");


    for (const [ tabIndex, tabElement ] of this.tabs.entries()) {

      if (tabIndex === targetTabPanelIndex) {
        continue;
      }

      tabElement.classList.remove(CodeViewer.TAB_SELECTED_STATE_CSS_CLASS);
      tabElement.setAttribute("aria-selected", "false");
      tabElement.setAttribute("tabindex", "0");

      this.tabsPanels[tabIndex].setAttribute("hidden", "hidden");
    }

    this.activeTabPanel = this.tabsPanels[targetTabPanelIndex];
  }

  private initializeActionBar(): this {

    const actionBar: Element = getExpectedToBeSingleDOM_Element({
      selector: CodeViewer.ACTION_BAR_SELECTOR, context: this.rootElement
    });

    const codeCopyingButton: Element = getExpectedToBeSingleDOM_Element({
      selector: CodeViewer.CODE_COPYING_BUTTON_SELECTOR, context: actionBar
    });

    const clipboard: ClipboardAccess = new ClipboardAccess(codeCopyingButton, {
      text: (): string => {

        const singleCodeListing: Element | null = this.activeTabPanel.querySelector(CodeViewer.CODE_CONTAINER_SELECTOR);

        if (isNotNull(singleCodeListing)) {
          return String(singleCodeListing.textContent);
        }


        const codeListings: NodeListOf<Element> = this.activeTabPanel.querySelectorAll(
          CodeViewer.PARTIAL_LISTING_CODE_CONTAINER_SELECTOR
        );

        if (codeListings.length === 1) {
          return codeListings[0].textContent ?? "";
        }


        let accumulatingValue: string = "";

        codeListings.forEach((codeListing: Element): void => {
          accumulatingValue = `${ accumulatingValue }` +
            `${ insertSubstringIf("\n", codeListing.textContent?.endsWith("\n") !== true) }` +
            `${ codeListing.textContent }`;
        });

        return accumulatingValue;
      }
    });

    clipboard.on("success", (): void => {

      Logger.logSuccess({
        title: "Sign in success",
        description: "Copied!"
      });

    });

    return this;
  }

  private highlightSyntax(): this {

    for (const tabPanel of this.tabsPanels) {

      const currentTabPanelDataProcessingResult: RawObjectDataProcessor.ProcessingResult<{ codeLanguage: string; }> =
          RawObjectDataProcessor.process(tabPanel.dataset, {
            subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
            nameForLogging: "CodeViewerTabData",
            properties: {
              code_language: {
                newName: "codeLanguage",
                type: String,
                required: true
              }
            }
          });

      if (currentTabPanelDataProcessingResult.rawDataIsInvalid) {
        continue;
      }


      for (const partialListing of tabPanel.querySelectorAll(CodeViewer.PARTIAL_LISTING_CODE_CONTAINER_SELECTOR)) {
        partialListing.classList.add(`language-${ currentTabPanelDataProcessingResult.processedData.codeLanguage }`);
      }

    }

    CodeSyntaxHighlighter.highlightAllUnder(this.rootElement);

    return this;
  }


  /* === Auxiliaries ============================================================================================== */
  /* --- IDs generating ------------------------------------------------------------------------------------------- */
  /* eslint-disable-next-line @typescript-eslint/member-ordering -- This secondary function should be at the end of class. */
  protected static counterForSelfID_Generating: number = 0;

  protected static generateSelfID(): string {
    CodeViewer.counterForSelfID_Generating++;
    return `CODE_VIEWER--YDF-${ CodeViewer.counterForSelfID_Generating }`;
  }

}


export namespace CodeViewer {
  export type TabPanelData = {
    codeLanguageLabel: string;
    fileLabel?: string;
    isActive: boolean;
  };
}


export default CodeViewer;
