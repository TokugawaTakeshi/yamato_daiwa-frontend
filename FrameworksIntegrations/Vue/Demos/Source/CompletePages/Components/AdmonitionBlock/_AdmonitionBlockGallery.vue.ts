/* ─── Assets ─────────────────────────────────────────────────────────────────────────────────────────────────────── */
import componentVueTemplate from "./_AdmonitionBlockGallery.vue.pug";

/* ─── GUI Components ─────────────────────────────────────────────────────────────────────────────────────────────── */
import { AdmonitionBlock, Button } from "@yamato-daiwa/frontend-vue";
import ThemesShowcase from "../../../ThemesShowcase.vue";
import ExclamationMarkIcon__Squared from "./ExclamationMark__Squared--MaterialDesignIcon.vue";

/* ─── Framework ──────────────────────────────────────────────────────────────────────────────────────────────────── */
import {
  Vue as VueComponent,
  Component as VueComponentConfiguration,
  Prop as VueProperty
} from "vue-facing-decorator";


@VueComponentConfiguration({
  name: "AdmonitionBlockGallery",
  template: componentVueTemplate,
  components: {
    AdmonitionBlock,
    Button,
    ThemesShowcase,
    ExclamationMarkIcon__Squared
  }
})
class AdmonitionBlockGallery extends VueComponent {

  /* ━━━ Properties ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  @VueProperty({ type: Boolean, default: false })
  protected readonly mustVisuallyHideTopHeading!: boolean;

  @VueProperty({ type: Boolean, default: false })
  protected readonly mustVisuallyHideAllHeadings!: boolean;

  @VueProperty({ type: Object, default: (): AdmonitionBlockGallery.PartialsFlags => ({}) })
  protected readonly partialsFlags!: AdmonitionBlockGallery.PartialsFlags;

  protected get mustRenderAllPartials(): boolean {
    return !Object.values(this.partialsFlags).some((value: boolean): boolean => !value);
  }


  /* ━━━ Fields ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── Non-reactive ─────────────────────────────────────────────────────────────────────────────────────────────── */
  protected AdmonitionBlock!: typeof AdmonitionBlock;

  protected THEME_KEY_LABEL_PREFIX!: string;
  protected GEOMETRIC_VARIATION_KEY_LABEL_PREFIX!: string;
  protected DECORATIVE_VARIATION_KEY_LABEL_PREFIX!: string;


  /* ━━━ Lifecycle hooks ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public created(): void {
    this.initializeNonReactiveClassFields();
  }


  /* ━━━ Routines ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  private initializeNonReactiveClassFields(): void {

    this.AdmonitionBlock = AdmonitionBlock;

    this.THEME_KEY_LABEL_PREFIX = "AdmonitionBlock__YDF.Themes.";
    this.GEOMETRIC_VARIATION_KEY_LABEL_PREFIX = "AdmonitionBlock__YDF.GeometricVariations.";
    this.DECORATIVE_VARIATION_KEY_LABEL_PREFIX = "AdmonitionBlock__YDF.DecorativeVariations.";

  }

}


namespace AdmonitionBlockGallery {

  export type PartialsFlags = Readonly<{
    minimal?: boolean;
    titles?: boolean;
    defaultSVG_Icons?: boolean;
    customSVG_Icons?: boolean;
    titlesAndSVG_Icons?: boolean;
    dismissingButton?: boolean;
    centeredButton?: boolean;
    actionBar?: boolean;
  }>;

}


export default AdmonitionBlockGallery;
