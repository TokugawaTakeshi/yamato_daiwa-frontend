<template lang="pug">

.TestSite

  OverflowSafeSingleLineLabel.PlainLabelTest
    | YourLayoutDefinitelyWillBrakeHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHa

  dl.DefinitionsListTest
    dt ID
    OverflowSafeSingleLineLabel.DefinitionsListTest-Value(rootElementTag="dd")
      | YourLayoutDefinitelyWillBrakeHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHa
    dt Displaying name
    OverflowSafeSingleLineLabel.DefinitionsListTest-Value(rootElementTag="dd")
      | YourLayoutDefinitelyWillBrakeHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHaHa

</template>


<script lang="ts">

  /* --- Other components ------------------------------------------------------------------------------------------- */
  import { OverflowSafeSingleLineLabel } from "../../Source";

  /* --- Framework -------------------------------------------------------------------------------------------------- */
  import { Options as VueComponentConfiguration, Vue as VueComponent } from "vue-property-decorator";



  @VueComponentConfiguration({
    components: {
      OverflowSafeSingleLineLabel
    }
  })
  export default class OverflowSafeSingleLineLabelComponentTestSite extends VueComponent {}

</script>


<style lang="stylus" scoped>

  @require "node_modules/@yamato-daiwa/frontend/Functionality.styl"
  @require "node_modules/@yamato-daiwa/frontend/Components.styl"


  .TestSite

    with 320px
    padding-top 24px

    margin-left auto
    margin-right auto


  .PlainLabelTest

    OverflowSafeSingleLineLabel({
      fontSize: 14px,
      displayEllipsis: true
    })


  .DefinitionsListTest

    &-Value

      OverflowSafeSingleLineLabel({
        fontSize: 14px,
        displayEllipsis: true
      })

</style>
