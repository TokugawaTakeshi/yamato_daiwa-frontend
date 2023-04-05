import {
  BasicFrontEndLogger,
  getExpectedToBeSingleChildOfTemplateElement,
  getExpectedToBeSingleDOM_Element
} from "@yamato-daiwa/es-extensions-browserjs";
import { Logger } from "@yamato-daiwa/es-extensions";


Logger.setImplementation(BasicFrontEndLogger);

if (
  getExpectedToBeSingleChildOfTemplateElement({
    templateElementSelector: "#CardTemplate"
  }).className === "Card"
) {
  Logger.logSuccess({
    title: "Test passed",
    description: "The CSS class of picked child of template element is \"Card\" as expected."
  });
} else {
  Logger.logErrorLikeMessage({
    title: "Test failed",
    description: "The CSS class of picked child of template element is not \"Card\"."
  });
}


const templateElement: HTMLTemplateElement = getExpectedToBeSingleDOM_Element({
  selector: "#CardTemplate",
  expectedDOM_ElementSubtype: HTMLTemplateElement
});

if (getExpectedToBeSingleChildOfTemplateElement({ templateElement }).className === "Card") {
  Logger.logSuccess({
    title: "Test passed",
    description: "The CSS class of picked child of template element is \"Card\" as expected."
  });
} else {
  Logger.logErrorLikeMessage({
    title: "Test failed",
    description: "The CSS class of picked child of template element is not \"Card\"."
  });
}

if (
  getExpectedToBeSingleChildOfTemplateElement({
    templateElementSelector: "#CardTemplate",
    expectedChildElementSubtype: HTMLDivElement
  }) instanceof HTMLDivElement
) {
  Logger.logSuccess({
    title: "Test passed",
    description: "The picked child of template element is the instance of \"HTMLDivElement\" as expected."
  });
} else {
  Logger.logErrorLikeMessage({
    title: "Test failed",
    description: "The picked child of template element is not instance of \"HTMLDivElement\"."
  });
}
