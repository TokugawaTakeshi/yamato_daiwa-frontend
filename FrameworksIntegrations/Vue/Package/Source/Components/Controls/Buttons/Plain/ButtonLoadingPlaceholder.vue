<template lang="pug">

.Button--LoadingPlaceholder(
  :class="rootElementModifierCSS_Classes"
)

</template>


<script lang="ts">

  /* --- Assets ----------------------------------------------------------------------------------------------------- */
  import Button from "@Components/Controls/Buttons/Plain/Button.vue";

  /* --- Framework -------------------------------------------------------------------------------------------------- */
  import { Options as VueComponentConfiguration, Vue as VueComponent, Prop as VueProperty } from "vue-property-decorator";

  /* --- Utils ------------------------------------------------------------------------------------------------------ */
  import { isString } from "@yamato-daiwa/es-extensions";


  @VueComponentConfiguration({})
  export default class ButtonLoadingPlaceholder extends VueComponent {

    @VueProperty({
      type: String,
      default: Button.Themes.regular,
      validator: (rawValue: unknown): boolean => isString(rawValue) && Object.values(Button.Themes).includes(rawValue)
    })
    protected readonly theme!: string;

    @VueProperty({
      type: String,
      default: Button.GeometricVariations.regular,
      validator: (rawValue: unknown): boolean =>
          isString(rawValue) && Object.values(Button.GeometricVariations).includes(rawValue)
    })
    protected readonly geometry!: string;

    @VueProperty({
      type: String,
      default: Button.DecorativeVariations.regular,
      validator: (rawValue: unknown): boolean =>
          isString(rawValue) && Object.values(Button.DecorativeVariations).includes(rawValue)
    })
    protected readonly decoration!: string;

    protected get rootElementModifierCSS_Classes(): Array<string> {
      return [
        ...Object.entries(Button.Themes).length > 1 ?
            [ `Button__${ Button.BasicLogic.ThemesCSS_ModifiersNames[this.theme] }` ] : [],
        ...Object.entries(Button.GeometricVariations).length > 1 ? [
          `Button__${ Button.BasicLogic.GeometricVariationsCSS_ModifiersNames[this.geometry] }`
        ] : [],
        ...Object.entries(Button.DecorativeVariations).length > 1 ? [
          `Button__${ Button.BasicLogic.DecorativeVariationsCSS_ModifiersNames[this.decoration] }`
        ] : []
      ];
    }
  }

</script>
