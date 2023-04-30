import { addLeftClickEventHandler, getExpectedToBeSingleDOM_Element } from "@yamato-daiwa/es-extensions-browserjs";


const componentTestingPageContentElement: Element = getExpectedToBeSingleDOM_Element({
  selector: ".ExternalThemesSwitchingPage"
});


addLeftClickEventHandler({
  targetElementSelector: "#THEME_CHANGING_BUTTON",
  mustExpectExactlyOneMatchingWithSelector: true,
  handler(): void {
    componentTestingPageContentElement.classList.toggle("RegularTheme--YDF");
    componentTestingPageContentElement.classList.toggle("CupertinoTheme--YDF");
  }
});
