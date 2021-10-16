import CodeHighlighter from "prismjs";
// import ClipboardJS from "clipboard";
import {
  RawObjectDataProcessor,
  isNotUndefined,
  isEmptyString,
  InvalidExternalDataError,
  Logger
} from "@yamato-daiwa/es-extensions";
// import {
//   getChildOfTemplateElementThatMustBeSole,
//   getElementWhichMustExist
//   // delegateClickEventHandling
// } from "hikari-es-extensions/BrowserJS";
import {
  getTemplateChildElementThatExpectedToBeSingle,
  getElementWhichMustExist,
  createElement
} from "@yamato-daiwa/es-extensions-browserjs";

/* --- Temporary ---------------------------------------------------------------------------------------------------- */
import "prismjs/components/prism-typescript.js";
// ---------------------------------------------------------------------------------------------------------------------

import componentTemplate from "./CodeViewer.template.pug";


export class CodeViewer {

  private static componentImage: Element = createElement(componentTemplate);

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
    // selfInstance.initializeActionBar();
    //
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

    console.log(CodeViewer.componentImage);

    if (this.codeListings.length === 0) {
      return;
    }


    if (this.codeListings.length === 1) {
      this.codeListings[0].removeAttribute("hidden");
      this.tabsFlow.remove();
      return;
    }



    const emptyTab: Element = getElementWhichMustExist({
      selector: ".CodeViewer-Tab",
      context: CodeViewer.componentImage
    });
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
                // TODO 始末
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
          description: RawObjectDataProcessor.formatValidationErrorsList(currentTabDataProcessingResult.validationErrorsMessages),
          occurrenceLocation: "className.methodName(parametersObject)"
        });
        continue;
      }


      const currentTabData: CodeViewer.TabData = currentTabDataProcessingResult.processedData;
      /* It's the issue: https://github.com/microsoft/TypeScript/issues/283 */
      const currentTab: HTMLElement = emptyTab.cloneNode(true) as HTMLElement;

      if (currentTabData.isActive && !hasAtLeastOneCodeListingBeenSetToActive) {

        codeListing.removeAttribute("hidden");
        currentTab.classList.add("CodeViewer-Tab__SelectedState");

        hasAtLeastOneCodeListingBeenSetToActive = true;
      }

      // TODO 再開点
      // getElementWhichMustExist({ selector: ".CodeViewer-Tab-LanguageValue", context: currentTab }).
      //     textContent = currentTabData.language;
      //
      // if (isNotUndefined(currentTabData.fileLabel)) {
      //   getElementWhichMustExist({ selector: ".CodeViewer-Tab-FileLabel", context: currentTab }).
      //       textContent = currentTabData.fileLabel;
      // } else {
      //   getElementWhichMustExist({ selector: ".CodeViewer-Tab-FileLabel", context: currentTab }).remove();
      // }

      this.tabs.push(currentTab);
    }
    //
    //
    // tabTemplate.replaceWith(...this.tabs);
    //
    // if (!hasAtLeastOneCodeListingBeenSetToActive) {
    //   this.tabs[0].classList.add("CodeViewer-Tab__SelectedState");
    // }
    //
    //
    // delegateClickEventHandling(
    //     { container: this.tabsFlow, clickTargetSelector: ".CodeViewer-Tab" }, (event: MouseEvent): void => {
    //       console.log("~~~~~");
    //       console.log(event);
    //     }
    // );
  }
  //
  //
  // private initializeActionBar(): void {
  //
  //   const actionBar: HTMLElement = getElementWhichMustExist({
  //     selector: ".CodeViewer-ActionBar", context: this.rootElement
  //   });
  //
  //   const copyCodeButton: HTMLElement = getElementWhichMustExist({
  //     selector: ".CodeViewer-ActionBar__CopyCode", context: actionBar
  //   });
  //
  //   const clipboard: ClipboardJS = new ClipboardJS(copyCodeButton, {
  //     target: (): Element => getElementWhichMustExist({
  //         selector: ".CodeViewer-CodeListing-CodeContainer",
  //         context: this.codeListings[0]
  //       })
  //   });
  //
  //   clipboard.on("success", (): void => {
  //     // TODO Snackbar
  //   });
  // }
}


export namespace CodeViewer {
  export type TabData = {
    language: string;
    fileLabel?: string;
    isActive: boolean;
  };
}


export default CodeViewer;
