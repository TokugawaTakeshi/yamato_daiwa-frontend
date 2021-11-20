import componentTemplate from "./Snackbar.template.pug";
import { createElement } from "@yamato-daiwa/es-extensions-browserjs";
import {
  isNull,
  Logger,
  ClassRequiredInitializationHasNotBeenExecutedError
} from "@yamato-daiwa/es-extensions";


export default class Snackbar {

  private static selfSoleInstance: Snackbar | null = null;
  private static readonly componentTemplate: Element = createElement(componentTemplate);

  private rootElement: Element;
  // private

  public static mount(
    parametersObject: { parentElementSelector: string; }
  ): typeof Snackbar {
    const selfSoleInstance: Snackbar = new Snackbar();
    document.querySelector(parametersObject.parentElementSelector).appendChild(selfSoleInstance.rootElement);
    selfSoleInstance.rootElement.style.display = "flex";
    Snackbar.selfSoleInstance = selfSoleInstance;
    return Snackbar;
  }


  public static displayForAWhile(
    parametersObject: {
      message: string;
      semantic: string;
      displayingDuration: string;
    }
  ): void {
    console.log("確認点1");
    console.log(Snackbar.getSelfSoleInstanceWhichExpectedToBeCreated());
    Snackbar.getSelfSoleInstanceWhichExpectedToBeCreated().displayForAWhile(parametersObject);
  }

  public static dismiss(): void {
    console.log("");
  }


  private static getSelfSoleInstanceWhichExpectedToBeCreated(): Snackbar {

    if (isNull(Snackbar.selfSoleInstance)) {
      Logger.throwErrorAndLog({
        errorInstance: new ClassRequiredInitializationHasNotBeenExecutedError({
          className: "ClassRequiredInitializationHasNotBeenExecutedError",
          initializingMethodName: "mount"
        }),
        title: ClassRequiredInitializationHasNotBeenExecutedError.DEFAULT_TITLE,
        occurrenceLocation: "Snackbar.getSelfSoleInstanceWhichExpectedToBeCreated()"
      });
    }

    console.log("確認点2");
    return Snackbar.selfSoleInstance;
  }


  private constructor() {
    this.rootElement = Snackbar.componentTemplate;
  }

  private displayForAWhile(
    parametersObject: {
      message: string;
      semantic: string;
      displayingDuration: string;
    }
  ): void {

    console.log("確認点3");
    console.log(parametersObject);

    this.rootElement.style.display = "block";

    console.log(parametersObject);
  }
}
