<template lang="pug">

h1.Heading1(
  v-if="headings"
) Badge component testing


//- ━━━ Values only ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
template(
  v-if="valuesOnly"
)

  h2.Heading2(
    v-if="headings"
  ) Value only

  ThemesShowcase(
    :themes="Badge.Themes"
    :themeKeyLabelPrefix="THEME_KEY_LABEL_PREFIX"
    :geometricVariations="Badge.GeometricVariations"
    :geometricVariationLabelPrefix="GEOMETRIC_VARIATION_KEY_LABEL_PREFIX"
    :decorativeVariations="Badge.DecorativeVariations"
    :decorativeVariationLabelPrefix="DECORATIVE_VARIATION_KEY_LABEL_PREFIX"
    decorativeVariationsWrapperTag="dl"
    :decorativeVariationsWrapperAdditionalCSS_Classes="[ 'BadgeDemo-BadgesTwoColumnsTable' ]"
  )
    template(
      v-slot="{ theme, geometricVariation, decorativeVariation }"
    )
      dt Badge__YDF.DecorativeVariations.{{ decorativeVariation.key }}
      dd
        Badge(
          valueLabel="Value"
          :theme="theme.value"
          :geometry="geometricVariation.value"
          :decoration="decorativeVariation.value"
        )


//- ━━━ Keys and values ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
template(
  v-if="keysAndValues"
)

  h2.Heading2(
    v-if="headings"
  ) Keys and values

  ThemesShowcase(
    :themes="Badge.Themes"
    :themeKeyLabelPrefix="THEME_KEY_LABEL_PREFIX"
    :geometricVariations="Badge.GeometricVariations"
    :geometricVariationLabelPrefix="GEOMETRIC_VARIATION_KEY_LABEL_PREFIX"
    :decorativeVariations="Badge.DecorativeVariations"
    :decorativeVariationLabelPrefix="DECORATIVE_VARIATION_KEY_LABEL_PREFIX"
    decorativeVariationsWrapperTag="dl"
    :decorativeVariationsWrapperAdditionalCSS_Classes="[ 'BadgeDemo-BadgesTwoColumnsTable' ]"
  )
    template(
      v-slot="{ theme, geometricVariation, decorativeVariation }"
    )
      dt Badge__YDF.DecorativeVariations.{{ decorativeVariation.key }}
      dd
        Badge(
          keyLabel="Key"
          valueLabel="Value"
          :theme="theme.value"
          :geometry="geometricVariation.value"
          :decoration="decorativeVariation.value"
        )


//- ━━━ Long labels ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
template(
  v-if="longLabels"
)

  h2.Heading2(
    v-if="headings"
  ) Long labels

  .BadgeDemo-BadgesFlow
    Badge(
      :keyLabel="textOverflowSafetyTest"
      :valueLabel="textOverflowSafetyTest"
      :decoration="Badge.DecorativeVariations.achromaticPastel"
    )


//- ━━━ Icons, keys and values ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
template(
  v-if="iconsAndKeysAndValues"
)

  h2.Heading2(
    v-if="headings"
  ) Icons, keys and values

  ThemesShowcase(
    :themes="Badge.Themes"
    :themeKeyLabelPrefix="THEME_KEY_LABEL_PREFIX"
    :geometricVariations="Badge.GeometricVariations"
    :geometricVariationLabelPrefix="GEOMETRIC_VARIATION_KEY_LABEL_PREFIX"
    :decorativeVariations="Badge.DecorativeVariations"
    :decorativeVariationLabelPrefix="DECORATIVE_VARIATION_KEY_LABEL_PREFIX"
    decorativeVariationsWrapperTag="dl"
    :decorativeVariationsWrapperAdditionalCSS_Classes="[ 'BadgeDemo-BadgesTwoColumnsTable' ]"
  )
    template(
      v-slot="{ theme, geometricVariation, decorativeVariation }"
    )
      dt Badge__YDF.DecorativeVariations.{{ decorativeVariation.key }}
      dd
        Badge(
          keyLabel="Date"
          :valueLabel="todayDate__localized__stringified"
          :theme="theme.value"
          :geometry="geometricVariation.value"
          :decoration="decorativeVariation.value"
        ): template(v-slot:SVG_Icon): CalendarIcon.Badge--YDF-SVG_Icon


//- ━━━ Icons and values ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
template(
  v-if="iconsAndValues"
)

  h2.Heading2(
    v-if="headings"
  ) Icons and values

  ThemesShowcase(
    :themes="Badge.Themes"
    :themeKeyLabelPrefix="THEME_KEY_LABEL_PREFIX"
    :geometricVariations="Badge.GeometricVariations"
    :geometricVariationLabelPrefix="GEOMETRIC_VARIATION_KEY_LABEL_PREFIX"
    :decorativeVariations="Badge.DecorativeVariations"
    :decorativeVariationLabelPrefix="DECORATIVE_VARIATION_KEY_LABEL_PREFIX"
    decorativeVariationsWrapperTag="dl"
    :decorativeVariationsWrapperAdditionalCSS_Classes="[ 'BadgeDemo-BadgesTwoColumnsTable' ]"
  )
    template(
      v-slot="{ theme, geometricVariation, decorativeVariation }"
    )
      dt Badge__YDF.DecorativeVariations.{{ decorativeVariation.key }}
      dd
        Badge(
          :valueLabel="todayDate__localized__stringified"
          :theme="theme.value"
          :geometry="geometricVariation.value"
          :decoration="decorativeVariation.value"
        ): template(v-slot:SVG_Icon): CalendarIcon.Badge--YDF-SVG_Icon


//- ━━━ Geometric modifiers ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
h2.Heading2(
  v-if="headings && Array.from(Object.values(geometricModifiers)).some(isRequired => isRequired)"
) Geometric modifiers


//- ─── Pill shape ─────────────────────────────────────────────────────────────────────────────────────────────────────
template(
  v-if="geometricModifiers.pillShape"
)

  h3.Heading3(
    v-if="headings"
  ) Pill shape

  ThemesShowcase(
    :themes="Badge.Themes"
    :themeKeyLabelPrefix="THEME_KEY_LABEL_PREFIX"
    :geometricVariations="Badge.GeometricVariations"
    :geometricVariationLabelPrefix="GEOMETRIC_VARIATION_KEY_LABEL_PREFIX"
    :decorativeVariations="Badge.DecorativeVariations"
    :decorativeVariationLabelPrefix="DECORATIVE_VARIATION_KEY_LABEL_PREFIX"
    decorativeVariationsWrapperTag="dl"
    :decorativeVariationsWrapperAdditionalCSS_Classes="[ 'BadgeDemo-BadgesTwoColumnsTable' ]"
  )
    template(
      v-slot="{ theme, geometricVariation, decorativeVariation }"
    )
      dt Badge__YDF.DecorativeVariations.{{ decorativeVariation.key }}
      dd
        Badge(
          valueLabel="Sample"
          :theme="theme.value"
          :geometry="geometricVariation.value"
          :geometricModifiers="[ Badge.GeometricModifiers.pillShape ]"
          :decoration="decorativeVariation.value"
        )


//- ─── Single line ────────────────────────────────────────────────────────────────────────────────────────────────────
template(
  v-if="geometricModifiers.singleLine"
)

  h3.Heading3(
    v-if="headings"
  ) Single line

  .BadgeDemo-BadgesFlow.BadgeDemo-BadgesFlow__LimitedChildrenMaximalWidth
    Badge(
      :key="textOverflowSafetyTest"
      :valueLabel="textOverflowSafetyTest"
      :geometricModifiers="[ Badge.GeometricModifiers.singleLine ]"
      :decoration="Badge.DecorativeVariations.achromaticPastel"
    )


//- ━━━ Decorative modifiers ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
h2.Heading2(
  v-if="headings && Array.from(Object.values(decorativeModifiers)).some(isRequired => isRequired)"
) Decorative modifiers


//- ─── Borders disguising ─────────────────────────────────────────────────────────────────────────────────────────────
template(
  v-if="decorativeModifiers.bordersDisguising"
)

  h3.Heading3(
    v-if="headings"
  ) Borders disguising

  ThemesShowcase(
    :themes="Badge.Themes"
    :themeKeyLabelPrefix="THEME_KEY_LABEL_PREFIX"
    :geometricVariations="Badge.GeometricVariations"
    :geometricVariationLabelPrefix="GEOMETRIC_VARIATION_KEY_LABEL_PREFIX"
    :decorativeVariations="Badge.DecorativeVariations"
    :decorativeVariationLabelPrefix="DECORATIVE_VARIATION_KEY_LABEL_PREFIX"
    decorativeVariationsWrapperTag="dl"
    :decorativeVariationsWrapperAdditionalCSS_Classes="[ 'BadgeDemo-BadgesTwoColumnsTable' ]"
  )
    template(
      v-slot="{ theme, geometricVariation, decorativeVariation }"
    )
      dt Badge__YDF.DecorativeVariations.{{ decorativeVariation.key }}
      dd
        Badge(
          valueLabel="Sample"
          :theme="theme.value"
          :geometry="geometricVariation.value"
          :decoration="decorativeVariation.value"
          :decorativeModifiers="[ Badge.DecorativeModifiers.bordersDisguising ]"
        )


  //- ─── Borders disguising ─────────────────────────────────────────────────────────────────────────────────────────────
  template(
    v-if="decorativeModifiers.noBackground"
  )

    h3.Heading3(
      v-if="headings"
    ) No background

    ThemesShowcase(
      :themes="Badge.Themes"
      :themeKeyLabelPrefix="THEME_KEY_LABEL_PREFIX"
      :geometricVariations="Badge.GeometricVariations"
      :geometricVariationLabelPrefix="GEOMETRIC_VARIATION_KEY_LABEL_PREFIX"
      :decorativeVariations="Badge.DecorativeVariations"
      :decorativeVariationLabelPrefix="DECORATIVE_VARIATION_KEY_LABEL_PREFIX"
      decorativeVariationsWrapperTag="dl"
      :decorativeVariationsWrapperAdditionalCSS_Classes="[ 'BadgeDemo-BadgesTwoColumnsTable' ]"
    )
      template(
        v-slot="{ theme, geometricVariation, decorativeVariation }"
      )
        dt Badge__YDF.DecorativeVariations.{{ decorativeVariation.key }}
        dd
          Badge(
            valueLabel="Sample"
            :theme="theme.value"
            :geometry="geometricVariation.value"
            :decoration="decorativeVariation.value"
            :decorativeModifiers="[ Badge.DecorativeModifiers.noBackground ]"
          )


//- ━━━ Loading placeholder ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
template(
  v-if="loadingPlaceholder"
)

  h2.Heading2(
    v-if="headings"
  ) Loading placeholder

  .BadgeDemo-BadgesFlow

    BadgeLoadingPlaceholder(
      v-for="geometricVariation of Object.values(Badge.GeometricVariations)"
      :key="`BADGE-LOADING_PLACEHOLDER-${ geometricVariation }`"
      :geometry="geometricVariation"
    )

    BadgeLoadingPlaceholder(
      v-for="geometricVariation of Object.values(Badge.GeometricVariations)"
      :key="`BADGE-LOADING_PLACEHOLDER-${ geometricVariation }-PILL_SHAPE`"
      :geometry="geometricVariation"
      :geometricModifiers="[ Badge.GeometricModifiers.pillShape ]"
    )

</template>


<script lang="ts">

  /* ─── Other components ────────────────────────────────────────────────────────────────────────────────────────── */
  import {
    ThemesShowcase,
    Badge,
    BadgeLoadingPlaceholderBasicImplementation as BadgeLoadingPlaceholder,
    CalendarIcon
  } from "@yamato-daiwa/frontend-vue";

  /* ─── Framework ───────────────────────────────────────────────────────────────────────────────────────────────── */
  import { Component as VueComponentOptions, Vue as VueComponent, Prop as VueProperty } from "vue-facing-decorator";

  /* ─── Utils ───────────────────────────────────────────────────────────────────────────────────────────────────── */
  import { getRandomString } from "@yamato-daiwa/es-extensions";


  @VueComponentOptions({
    components: {
      BadgeLoadingPlaceholder,
      CalendarIcon,
      ThemesShowcase
    }
  })
  export default class BadgeDemo extends VueComponent {

    /* ━━━ Properties ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    @VueProperty({ type: Boolean, default: true })
    protected readonly headings!: boolean;

    @VueProperty({ type: Boolean, default: true })
    protected readonly valuesOnly!: boolean;

    @VueProperty({ type: Boolean, default: true })
    protected readonly longLabels!: boolean;

    @VueProperty({ type: Boolean, default: true })
    protected readonly keysAndValues!: boolean;

    @VueProperty({ type: Boolean, default: true })
    protected readonly iconsAndKeysAndValues!: boolean;

    @VueProperty({ type: Boolean, default: true })
    protected readonly iconsAndValues!: boolean;

    @VueProperty({ type: Object, default: { pillShape: true, singleLine: true } })
    protected readonly geometricModifiers!: Readonly<{ pillShape: boolean; singleLine: boolean; }>;

    @VueProperty({ type: Object, default: { bordersDisguising: true } })
    protected readonly decorativeModifiers!: Readonly<{ bordersDisguising: boolean; noBackground: boolean; }>;

    @VueProperty({ type: Object, default: { multiline: true, singleLine: true } })
    protected readonly overflowTesting!: Readonly<{ multiline: boolean; singleLine: boolean; }>;

    @VueProperty({ type: Boolean, default: true })
    protected readonly loadingPlaceholder!: boolean;


    /* ━━━ Fields ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    /* ─── Non-reactive ──────────────────────────────────────────────────────────────────────────────────────────── */
    protected Badge!: typeof Badge;

    protected THEME_KEY_LABEL_PREFIX!: string;
    protected GEOMETRIC_VARIATION_KEY_LABEL_PREFIX!: string;
    protected DECORATIVE_VARIATION_KEY_LABEL_PREFIX!: string;

    protected todayDate__localized__stringified!: string;

    protected textOverflowSafetyTest!: string;


    /* ━━━ Lifecycle hooks ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    public created(): void {

      this.initializeNonReactiveClassFields();
      Badge.registerImplementationLocally(this);

    }


    /* ━━━ Routines ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    private initializeNonReactiveClassFields(): void {

      this.Badge = Badge;

      this.THEME_KEY_LABEL_PREFIX = "Badge__YDF.Themes.";
      this.GEOMETRIC_VARIATION_KEY_LABEL_PREFIX = "Badge__YDF.GeometricVariations.";
      this.DECORATIVE_VARIATION_KEY_LABEL_PREFIX = "Badge__YDF.DecorativeVariations.";

      this.todayDate__localized__stringified = new Date().toLocaleDateString();

      this.textOverflowSafetyTest = `OVERFLOW_TEST-gh${ getRandomString({ minimalCharactersCount: 100 }) }`;

    }

  }

</script>
