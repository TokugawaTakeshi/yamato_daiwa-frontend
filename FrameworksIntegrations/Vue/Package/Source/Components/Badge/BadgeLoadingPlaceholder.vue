<template lang="pug">

span.Badge--YDF.Badge--LoadingPlaceholder(
  :class="rootElementModifierCSS_Classes"
)

</template>


<script lang="ts">

  /* --- Assets ----------------------------------------------------------------------------------------------------- */
  import Badge from "@Components/Badge/Badge.vue";

  /* --- Framework -------------------------------------------------------------------------------------------------- */
  import { Options as VueComponentConfiguration, Vue as VueComponent, Prop as VueProperty } from "vue-property-decorator";

  /* --- Utils ------------------------------------------------------------------------------------------------------ */
  import { isString, toUpperCamelCase } from "@yamato-daiwa/es-extensions";


  @VueComponentConfiguration({})
  export default class BadgeLoadingPlaceholder extends VueComponent {

    @VueProperty({
      type: String,
      default: Badge.GeometricVariations.regular,
      validator: (rawValue: unknown): boolean =>
          isString(rawValue) && Object.values(Badge.GeometricVariations).includes(rawValue)
    })
    protected readonly geometry!: string;

    @VueProperty({ type: Array, default: (): Array<Badge.GeometricModifiers> => [] })
    private readonly geometricModifiers!: Array<Badge.GeometricModifiers>;

    protected get rootElementModifierCSS_Classes(): Array<string> {
      return [
        ...Object.entries(Badge.GeometricVariations).length > 1 ? [ `Badge--YDF__${ toUpperCamelCase(this.geometry) }` ] : [],
        ...this.geometricModifiers.includes(Badge.GeometricModifiers.pillShape) ?
          [ "Badge--YDF__PillShapeGeometricModifier" ] : []
      ];
    }

  }

</script>
