// import componentTemplate from "./Snackbar.template.pug";
// import { createElement } from "@yamato-daiwa/es-extensions-browserjs";
// import {
//   isNull,
//   Logger,
//   ClassRequiredInitializationHasNotBeenExecutedError
// } from "@yamato-daiwa/es-extensions";


// export default class Snackbar {
//
//   private static selfSoleInstance: Snackbar | null;
//   private static readonly componentTemplate: string = createElement(componentTemplate);
//   // private
//
//   public static mount(
//     parametersObject: { parentElement: Element; }
//   ): Snackbar {
//     parametersObject.parentElement.append(createElement(componentTemplate));
//     Snackbar.selfSoleInstance = new Snackbar();
//     return Snackbar.selfSoleInstance;
//   }
//
//
//   public static displayForAWhile(
//     parametersObject: {
//       message: string;
//       semantic: string;
//       displayingDuration: string;
//     }
//   ): void {
//     Snackbar.getSelfSoleInstanceWhichExpectedToBeCreated().displayForAWhile(parametersObject);
//   }
//
//   public static dismiss(): void {
//     console.log("");
//   }
//
//
//   private static getSelfSoleInstanceWhichExpectedToBeCreated(): Snackbar {
//
//     if (isNull(Snackbar.selfSoleInstance)) {
//       Logger.throwErrorAndLog({
//         errorInstance: new ClassRequiredInitializationHasNotBeenExecutedError({
//           className: "ClassRequiredInitializationHasNotBeenExecutedError",
//           initializingMethodName: "mount"
//         }),
//         title: ClassRequiredInitializationHasNotBeenExecutedError.DEFAULT_TITLE,
//         occurrenceLocation: "Snackbar.getSelfSoleInstanceWhichExpectedToBeCreated()"
//       });
//     }
//
//
//     return Snackbar.selfSoleInstance;
//   }
//
//
//   private constructor() {
//
//   }
//
//   private displayForAWhile(
//     parametersObject: {
//       message: string;
//       semantic: string;
//       displayingDuration: string;
//     }
//   ): void {
//
//
//
//     console.log(parametersObject);
//   }
// }
