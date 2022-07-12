<template lang="pug">

.TestSite

  OverflowSafeSingleLineLabel.PlainLabelTest
    | YourLayoutDefinitelyWillBrakeHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHa

  dl.DefinitionsListTest
    dt.DefinitionsListTest-Key ID
    OverflowSafeSingleLineLabel.DefinitionsListTest-Value(rootElementTag="dd")
      | YourLayoutDefinitelyWillBrakeHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHa
    dt.DefinitionsListTest-Key Displaying name
    OverflowSafeSingleLineLabel.DefinitionsListTest-Value(rootElementTag="dd")
      | YourLayoutDefinitelyWillBrakeHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHa

</template>


<script lang="ts">

  /* --- Other components ------------------------------------------------------------------------------------------- */
  import { OverflowSafeSingleLineLabel } from "@Source/index";

  /* --- Framework -------------------------------------------------------------------------------------------------- */
  import { Options as VueComponentConfiguration, Vue as VueComponent } from "vue-property-decorator";



  @VueComponentConfiguration({
    components: {
      OverflowSafeSingleLineLabel
    }
  })
  export default class OverflowSafeSingleLineLabelComponentTestSite extends VueComponent {}

</script>


<style lang="stylus">

  @require "../../../../node_modules/@yamato-daiwa/frontend/Functionality.styl"
  @require "../../../../node_modules/@yamato-daiwa/frontend/Components.styl"


  CrossBrowserStylesReset()
  InitialGlobalCSS_Rules()


  provideOverflowSafeSingleLineLabelComponent()


  .TestSite

    width 320px
    padding-top 24px

    margin-left auto
    margin-right auto

    background tan


  .PlainLabelTest

    OverflowSafeSingleLineLabel({
      fontSize: 14px,
      displayEllipsis: true
    })


  .DefinitionsListTest

    display grid
    grid-template-columns auto minmax(0, 1fr)
    gap 6px 12px

    retireFrom({ targetElementSelector: ".PlainLabelTest", y: 24px })


    &-Key

      font-weight bold

      justify-self end


    &-Value

      OverflowSafeSingleLineLabel({
        fontSize: 14px,
        displayEllipsis: true
      })

</style>
