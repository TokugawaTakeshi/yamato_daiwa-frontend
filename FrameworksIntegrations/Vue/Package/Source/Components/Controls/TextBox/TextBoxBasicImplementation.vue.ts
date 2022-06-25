import TextBox from "./TextBox";
import componentTemplate from "./TextBox.pug";
import { Options as VueComponentConfiguration } from "vue-property-decorator";


@VueComponentConfiguration({
  template: componentTemplate
})
export default class TextBoxBasicImplementation extends TextBox.BasicLogic {}
