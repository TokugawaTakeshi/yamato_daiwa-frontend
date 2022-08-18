<template lang="pug">

.BadgeComponentTesting

  h1.Heading1 Badge component testing

  h2.Heading2 Value only

  .BadgeComponentTesting-BadgesFlow(
    v-for="geometricVariation of Object.values(Badge.GeometricVariations)"
    :key="`BADGE-VALUE_ONLY-${ geometricVariation }`"
  )
    Badge(
      v-for="decorativeVariation of Object.values(Badge.DecorativeVariations)"
      :key="`BADGE-VALUE_ONLY-${ geometricVariation }-${ decorativeVariation }`"
      valueLabel="Sample"
      :geometry="geometricVariation"
      :decoration="decorativeVariation"
    )

</template>


<script lang="ts">

  /* --- Other components ------------------------------------------------------------------------------------------- */
  import { Badge } from "@Source/index";

  /* --- Framework -------------------------------------------------------------------------------------------------- */
  import { Options as VueComponentConfiguration, Vue as VueComponent } from "vue-property-decorator";


  @VueComponentConfiguration({
    components: {
      Badge: Badge.getImplementation()
    }
  })
  export default class ButtonTestSite extends VueComponent {

    public created(): void {

      this.initializeNonReactiveClassFields();
      Badge.registerImplementationLocally(this);

    }


    /* === 非リアクティブクラスフィールド ======================================================================================= */
    protected Badge!: typeof Badge;

    private initializeNonReactiveClassFields(): void {
      this.Badge = Badge;
    }

  }

</script>
