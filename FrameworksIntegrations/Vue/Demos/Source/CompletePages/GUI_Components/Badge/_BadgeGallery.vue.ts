/* ─── Assets ─────────────────────────────────────────────────────────────────────────────────────────────────────── */
import componentVueTemplate from "./_BadgeGallery.vue.pug";

/* ─── GUI Components ─────────────────────────────────────────────────────────────────────────────────────────────── */
import { Badge, BadgeLoadingPlaceholder, CalendarIcon } from "@yamato-daiwa/frontend-vue";
import ThemesShowcase from "../../../ThemesShowcase.vue";

/* ─── Framework ──────────────────────────────────────────────────────────────────────────────────────────────────── */
import {
  Component as VueComponentOptions,
  Vue as VueComponent,
  Prop as VueProperty
} from "vue-facing-decorator";

/* ─── Utils ──────────────────────────────────────────────────────────────────────────────────────────────────────── */
import { getRandomString } from "@yamato-daiwa/es-extensions";


@VueComponentOptions({
  name: "BadgeGallery",
  template: componentVueTemplate,
  components: {
    Badge,
    BadgeLoadingPlaceholder,
    CalendarIcon,
    ThemesShowcase
  }
})
class BadgeGallery extends VueComponent {

  /* ━━━ Properties ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  @VueProperty({ type: Boolean, default: false })
  protected readonly mustVisuallyHideTopHeading!: boolean;

  @VueProperty({ type: Boolean, default: false })
  protected readonly mustVisuallyHideAllHeadings!: boolean;

  @VueProperty({ type: Object, default: (): BadgeGallery.PartialsFlags => ({}) })
  protected readonly partialsFlags!: BadgeGallery.PartialsFlags;

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


  /* ━━━ Fields ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── Non-reactive ─────────────────────────────────────────────────────────────────────────────────────────────── */
  protected Badge!: typeof Badge;

  protected THEME_KEY_LABEL_PREFIX!: string;
  protected GEOMETRIC_VARIATION_KEY_LABEL_PREFIX!: string;
  protected DECORATIVE_VARIATION_KEY_LABEL_PREFIX!: string;

  protected todayDate__localized__stringified!: string;

  protected textOverflowSafetyTest!: string;


  /* ━━━ Lifecycle hooks ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public created(): void {
    this.initializeNonReactiveClassFields();
  }


  /* ━━━ Routines ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  private initializeNonReactiveClassFields(): void {

    this.Badge = Badge;

    this.THEME_KEY_LABEL_PREFIX = "Badge__YDF.Themes.";
    this.GEOMETRIC_VARIATION_KEY_LABEL_PREFIX = "Badge__YDF.GeometricVariations.";
    this.DECORATIVE_VARIATION_KEY_LABEL_PREFIX = "Badge__YDF.DecorativeVariations.";

    this.todayDate__localized__stringified = new Date().toLocaleDateString();

    this.textOverflowSafetyTest = `OVERFLOW_TEST-gh${ getRandomString({ minimalCharactersCount: 100 }) }`;

  }

}


namespace BadgeGallery {

  export type PartialsFlags = Readonly<{
    minimal?: boolean;
    keysAndValues?: boolean;
    longLabels?: boolean;
    iconsAndKeysAndValues?: boolean;
    iconsAndValues?: boolean;
    pillShapeGeometricModifier?: boolean;
    singleLineGeometricModifier?: boolean;
    bordersDisguisingDecorativeModifier?: boolean;
    noBackgroundDecorativeModifier?: boolean;
    loadingPlaceholder?: boolean;
  }>;

}


export default BadgeGallery;
