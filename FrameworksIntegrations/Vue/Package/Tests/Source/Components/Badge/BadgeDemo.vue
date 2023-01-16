<template lang="pug">

h1.Heading1(
  v-if="headings"
) Badge component testing


//- === Values only ====================================================================================================
template(
  v-if="valuesOnly"
)

  h2.Heading2(
    v-if="headings"
  ) Value only

  .BadgeDemo-BadgesFlow(
    v-for="geometricVariation of Object.values(Badge.GeometricVariations)"
    :key="`BADGES_FLOW-VALUE_ONLY-${ geometricVariation }`"
  )
    Badge(
      v-for="decorativeVariation of Object.values(Badge.DecorativeVariations)"
      :key="`BADGE-VALUE_ONLY-${ geometricVariation }-${ decorativeVariation }`"
      valueLabel="Sample"
      :geometry="geometricVariation"
      :decoration="decorativeVariation"
    )


//- === Keys and values ================================================================================================
template(
  v-if="keysAndValues"
)

  h2.Heading2(
    v-if="headings"
  ) Keys and values

  .BadgeDemo-BadgesFlow(
    v-for="geometricVariation of Object.values(Badge.GeometricVariations)"
    :key="`BADGES_FLOW-KEY_AND_VALUE-${ geometricVariation }`"
  )
    Badge(
      v-for="decorativeVariation of Object.values(Badge.DecorativeVariations)"
      :key="`BADGE-KEY_AND_VALUE-${ geometricVariation }-${ decorativeVariation }`"
      keyLabel="Key"
      valueLabel="Sample"
      :geometry="geometricVariation"
      :decoration="decorativeVariation"
    )


//- === Icons, keys and values =========================================================================================
template(
  v-if="iconsAndKeysAndValues"
)

  h2.Heading2(
    v-if="headings"
  ) Icons, keys and values

  .BadgeDemo-BadgesFlow(
    v-for="geometricVariation of Object.values(Badge.GeometricVariations)"
    :key="`BADGES_FLOW-ICON_KEY_VALUE-${ geometricVariation }`"
  )
    Badge(
      v-for="decorativeVariation of Object.values(Badge.DecorativeVariations)"
      :key="`BADGE-ICON_KEY_VALUE-${ geometricVariation }-${ decorativeVariation }`"
      keyLabel="Key"
      valueLabel="Sample"
      :geometry="geometricVariation"
      :decoration="decorativeVariation"
    ): template(v-slot:SVG_Icon): CalendarIcon.Badge--YDF-SVG_Icon


//- === Icons and values ===============================================================================================
template(
  v-if="iconsAndValues"
)

  h2.Heading2(
    v-if="headings"
  ) Icons and values

  .BadgeDemo-BadgesFlow(
    v-for="geometricVariation of Object.values(Badge.GeometricVariations)"
    :key="`BADGES_FLOW-ICON_AND_VALUE-${ geometricVariation }`"
  )
    Badge(
      v-for="decorativeVariation of Object.values(Badge.DecorativeVariations)"
      :key="`BADGE-ICON_AND_VALUE-${ geometricVariation }-${ decorativeVariation }`"
      valueLabel="Sample"
      :geometry="geometricVariation"
      :decoration="decorativeVariation"
    ): template(v-slot:SVG_Icon): CalendarIcon.Badge--YDF-SVG_Icon


//- === Geometric modifiers ============================================================================================
template(
  v-if="geometricModifiers.pillShape"
)

  template(
    v-if="headings"
  )

    h2.Heading2 Geometric modifiers

    h3.Heading3 Pill shape

  .BadgeDemo-BadgesFlow(
    v-for="geometricVariation of Object.values(Badge.GeometricVariations)"
    :key="`BADGES_FLOW-PILL_SHAPE-${ geometricVariation }`"
  )
    Badge(
      v-for="decorativeVariation of Object.values(Badge.DecorativeVariations)"
      :key="`BADGE-PILL_SHAPE-${ geometricVariation }-${ decorativeVariation }`"
      valueLabel="Sample"
      :geometry="geometricVariation"
      :geometricModifiers="[ Badge.GeometricModifiers.pillShape ]"
      :decoration="decorativeVariation"
    )


//- === Decorative modifiers ===========================================================================================
template(
  v-if="decorativeModifiers.bordersDisguising"
)

  template(
    v-if="headings"
  )

    h2.Heading2 Decorative modifiers

    h3.Heading3 Borders disguising

  .BadgeDemo-BadgesFlow(
    v-for="geometricVariation of Object.values(Badge.GeometricVariations)"
    :key="`BADGES_FLOW-BORDERS_DISGUISING-${ geometricVariation }`"
  )
    Badge(
      v-for="decorativeVariation of Object.values(Badge.DecorativeVariations)"
      :key="`BADGE-BORDERS_DISGUISING-${ geometricVariation }-${ decorativeVariation }`"
      valueLabel="Sample"
      :geometry="geometricVariation"
      :decorativeModifiers="[ Badge.DecorativeModifiers.bordersDisguising ]"
      :decoration="decorativeVariation"
    )


//- === Overflow testing ===============================================================================================
template(
  v-if="overflowTesting.singleLine || overflowTesting.multiline"
)

  h2.Heading2(
    v-if="headings"
  ) Overflow testing

  template(
    v-if="overflowTesting.multiline"
  )

    h3.Heading3(
      v-if="headings"
    ) Multiline

    .BadgeDemo-BadgesFlow

      Badge(
        :keyLabel="textOverflowSafetyTest"
        :valueLabel="textOverflowSafetyTest"
        :decoration="Badge.DecorativeVariations.achromaticPastel"
      )

  template(
    v-if="overflowTesting.singleLine"
  )

    h3.Heading3(
      v-if="headings"
    ) Single line

    .BadgeDemo-BadgesFlow.BadgeDemo-BadgesFlow__LimitedChildrenMaximalWidth

      Badge(
        :keyLabel="textOverflowSafetyTest"
        :valueLabel="textOverflowSafetyTest"
        :mustForceSingleLine="true"
        :decoration="Badge.DecorativeVariations.achromaticPastel"
      )


//- === Loading placeholder ============================================================================================
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

  /* --- Other components ------------------------------------------------------------------------------------------- */
  import {
    Badge,
    BadgeLoadingPlaceholderBasicImplementation as BadgeLoadingPlaceholder,
    CalendarIcon
  } from "@Source/index";

  /* --- Framework -------------------------------------------------------------------------------------------------- */
  import { Options as VueComponentConfiguration, Vue as VueComponent, Prop as VueProperty } from "vue-property-decorator";

  /* --- Utils ------------------------------------------------------------------------------------------------------ */
  import { getRandomString } from "@yamato-daiwa/es-extensions";


  @VueComponentConfiguration({
    components: {
      BadgeLoadingPlaceholder,
      CalendarIcon
    }
  })
  export default class BadgeDemo extends VueComponent {

    /* === Properties =============================================================================================== */
    @VueProperty({ type: Boolean, default: true })
    protected readonly headings!: boolean;

    @VueProperty({ type: Boolean, default: true })
    protected readonly valuesOnly!: boolean;

    @VueProperty({ type: Boolean, default: true })
    protected readonly keysAndValues!: boolean;

    @VueProperty({ type: Boolean, default: true })
    protected readonly iconsAndKeysAndValues!: boolean;

    @VueProperty({ type: Boolean, default: true })
    protected readonly iconsAndValues!: boolean;

    @VueProperty({ type: Object, default: { pillShape: true } })
    protected readonly geometricModifiers!: Readonly<{ pillShape: boolean; }>;

    @VueProperty({ type: Object, default: { bordersDisguising: true } })
    protected readonly decorativeModifiers!: Readonly<{ bordersDisguising: boolean; }>;

    @VueProperty({ type: Object, default: { multiline: true, singleLine: true } })
    protected readonly overflowTesting!: Readonly<{ multiline: boolean; singleLine: boolean; }>;

    @VueProperty({ type: Boolean, default: true })
    protected readonly loadingPlaceholder!: boolean;


    /* === Fields =================================================================================================== */
    /* --- Reactive ------------------------------------------------------------------------------------------------- */
    protected textOverflowSafetyTest: string = `OVERFLOW_TEST-gh${ getRandomString({ minimalCharactersCount: 100 }) }`;


    /* --- Non-reactive --------------------------------------------------------------------------------------------- */
    protected Badge!: typeof Badge;


    /* === Lifecycle hooks ========================================================================================== */
    public created(): void {

      this.initializeNonReactiveClassFields();
      Badge.registerImplementationLocally(this);

    }


    /* === Routines ================================================================================================= */
    private initializeNonReactiveClassFields(): void {
      this.Badge = Badge;
    }

  }

</script>
