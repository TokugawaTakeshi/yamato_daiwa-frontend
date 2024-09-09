/* ─── Assets ─────────────────────────────────────────────────────────────────────────────────────────────────────── */
import componentVueTemplate from "./_ButtonGallery.vue.pug";

/* ─── GUI Components ─────────────────────────────────────────────────────────────────────────────────────────────── */
import {
  Button,
  ButtonLoadingPlaceholder,
  HeartIcon__Filled,
  MenuIcon__ThreeDots__Horizontal
} from "@yamato-daiwa/frontend-vue";
import ThemesShowcase from "../../../../../ThemesShowcase.vue";

/* ─── Framework ──────────────────────────────────────────────────────────────────────────────────────────────────── */
import {
  Component as VueComponentOptions,
  Vue as VueComponent,
  Prop as VueProperty
} from "vue-facing-decorator";

/* ─── Utils ──────────────────────────────────────────────────────────────────────────────────────────────────────── */
import { getRandomString } from "@yamato-daiwa/es-extensions";


@VueComponentOptions({
  name: "ButtonGallery",
  template: componentVueTemplate,
  components: {
    Button,
    ButtonLoadingPlaceholder,
    ThemesShowcase,
    HeartIcon: HeartIcon__Filled,
    MenuIcon__ThreeDots__Horizontal
  }
})
class ButtonGallery extends VueComponent {

  /* ━━━ Properties ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  @VueProperty({ type: Boolean, default: false })
  protected readonly mustVisuallyHideTopHeading!: boolean;

  @VueProperty({ type: Boolean, default: false })
  protected readonly mustVisuallyHideAllHeadings!: boolean;

  @VueProperty({ type: Object, default: (): ButtonGallery.PartialsFlags => ({}) })
  protected readonly partialsFlags!: ButtonGallery.PartialsFlags;

  protected get mustRenderAllPartials(): boolean {
    return !Object.values(this.partialsFlags).some((value: boolean): boolean => !value);
  }

  protected get mustRenderAtLeansOnePartialRelatedWithGeometricModifier(): boolean {
    return Object.entries(this.partialsFlags).some(
      ([ key, isRequired ]: [ string, boolean | undefined ]): boolean =>
          key.endsWith("GeometricModifier") && isRequired === true
    );
  }

  protected get mustRenderAtLeansOnePartialRelatedWithDecorativeModifier(): boolean {
    return Object.entries(this.partialsFlags).some(
      ([ key, isRequired ]: [ string, boolean | undefined ]): boolean =>
          key.endsWith("DecorativeModifier") && isRequired === true
    );
  }


  /* ━━━ Fields ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── Non-reactive ──────────────────────────────────────────────────────────────────────────────────────────── */
  protected Button!: typeof Button;

  protected THEME_KEY_LABEL_PREFIX!: string;
  protected GEOMETRIC_VARIATION_KEY_LABEL_PREFIX!: string;
  protected DECORATIVE_VARIATION_KEY_LABEL_PREFIX!: string;

  protected textOverflowSafetyTest!: string;


  /* ━━━ Lifecycle hooks ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public created(): void {
    this.initializeNonReactiveClassFields();
  }


  /* ━━━ Routines ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  private initializeNonReactiveClassFields(): void {

    this.Button = Button;

    this.THEME_KEY_LABEL_PREFIX = "Button__YDF.Themes.";
    this.GEOMETRIC_VARIATION_KEY_LABEL_PREFIX = "Button__YDF.GeometricVariations.";
    this.DECORATIVE_VARIATION_KEY_LABEL_PREFIX = "Button__YDF.DecorativeVariations.";

    this.textOverflowSafetyTest = `OVERFLOW_TEST-gh${ getRandomString({ minimalCharactersCount: 100 }) }`;

  }
}


namespace ButtonGallery {

  export type PartialsFlags = Readonly<{
    minimal?: boolean;
    longLabels?: boolean;
    prependedSVG_Icons?: boolean;
    appendedSVG_Icons?: boolean;
    loneSVG_Icons?: boolean;
    customIcons?: boolean;
    pillShapeGeometricModifier?: boolean;
    squareShapeGeometricModifier?: boolean;
    squareShapeUnlessOverflowedGeometricModifier?: boolean;
    singleLineGeometricModifier?: boolean;
    noLeftBorderAndRoundingsGeometricModifier?: boolean;
    noRightBorderAndRoundingsGeometricModifier?: boolean;
    bordersDisguisingDecorativeModifier?: boolean;
    noBackgroundDecorativeModifier?: boolean;
    loadingPlaceholder?: boolean;
  }>;

}


export default ButtonGallery;
