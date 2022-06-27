/* --- Assets ------------------------------------------------------------------------------------------------------- */
import componentTemplate from "./DummyLogo.vue.pug";

/* --- Framework ---------------------------------------------------------------------------------------------------- */
import { Vue as VueComponent, Options as VueComponentConfiguration, Prop as VueProperty } from "vue-property-decorator";


@VueComponentConfiguration({
  template: componentTemplate
})
export default class DummyLogo extends VueComponent {

  @VueProperty({ type: String, default: "仮名" })
  protected readonly iconTextContent!: string;

  @VueProperty({ type: String, default: "〇〇アプリケーション" })
  protected readonly heading!: string;

  @VueProperty({ type: String, default: "無駄なスローガンは要らない" })
  protected readonly subheading!: string;
}
