<template lang="pug">

dl.ThemesShowcase--YDF

  template(
    v-for="(themeValue, themeKey) of themes"
    :key="themeKey"
  )

    dt.ThemesShowcase--YDF-KeyLabel {{ themeKeyLabelPrefix }}{{ themeKey }}
    dd.ThemesShowcase--YDF-ValueSection

      dl.ThemesShowcase--YDF-ChildList

        template(
          v-for="(geometricVariationValue, geometricVariationKey) of geometricVariations"
          :key="`${ themeKey }-${ geometricVariationKey }`"
        )

          dt.ThemesShowcase--YDF-KeyLabel {{ geometricVariationLabelPrefix }}{{ geometricVariationKey }}
          dd.ThemesShowcase--YDF-ValueSection

            component.ThemesShowcase--YDF-ChildList(
              :is="decorativeVariationsWrapperTag"
              :class="decorativeVariationsWrapperAdditionalCSS_Classes"
            )

              template(
                v-for="(decorativeVariationValue, decorativeVariationKey) of decorativeVariations"
                :key="`${ themeKey }-${ geometricVariationKey }-${ decorativeVariationKey }`"
              )

                template(
                  v-if="decorativeVariationsWrapperTag === 'dl'"
                )

                  dt.ThemesShowcase--YDF-KeyLabel {{ decorativeVariationLabelPrefix }}{{ decorativeVariationKey }}
                  dd.ThemesShowcase--YDF-ValueSection(
                    :class="decorativeVariationsListItemAdditionalCSS_Classes"
                  )

                    slot(
                      :theme="{ key: themeKey, value: themeValue }"
                      :geometricVariation="{ key: geometricVariationKey, value: geometricVariationValue }"
                      :decorativeVariation="{ key: decorativeVariationKey, value: decorativeVariationValue }"
                    )

                template(
                  v-else
                )

                  slot(
                    :theme="{ key: themeKey, value: themeValue }"
                    :geometricVariation="{ key: geometricVariationKey, value: geometricVariationValue }"
                    :decorativeVariation="{ key: decorativeVariationKey, value: decorativeVariationValue }"
                  )

</template>


<script lang="ts">

  import { Component as VueComponentOptions, Vue as VueComponent, Prop as VueProperty } from "vue-facing-decorator";


  @VueComponentOptions({
    name: "ThemesShowcase--YDF"
  })
  export default class ThemesShowcase extends VueComponent {

    @VueProperty({
      type: Object,
      required: true
    })
    protected readonly themes!: Readonly<{ [themeKey: string]: string }>;

    @VueProperty({
      type: String,
      required: false
    })
    protected readonly themeKeyLabelPrefix?: string;


    @VueProperty({
      type: Object,
      required: true
    })
    protected readonly geometricVariations!: Readonly<{ [themeKey: string]: string }>;

    @VueProperty({
      type: String,
      required: false
    })
    protected readonly geometricVariationLabelPrefix?: string;


    @VueProperty({
      type: Object,
      required: true
    })
    protected readonly decorativeVariations!: Readonly<{ [themeKey: string]: string }>;

    @VueProperty({
      type: String,
      required: false
    })
    protected readonly decorativeVariationLabelPrefix?: string;

    @VueProperty({
      type: String,
      default: "dl"
    })
    protected readonly decorativeVariationsWrapperTag!: string;

    @VueProperty({
      type: [ Array, String ],
      required: false
    })
    protected readonly decorativeVariationsWrapperAdditionalCSS_Classes?: ReadonlyArray<string> | string;

    @VueProperty({
      type: [ Array, String ],
      required: false
    })
    protected readonly decorativeVariationsListItemAdditionalCSS_Classes?: ReadonlyArray<string> | string;

  }

</script>
