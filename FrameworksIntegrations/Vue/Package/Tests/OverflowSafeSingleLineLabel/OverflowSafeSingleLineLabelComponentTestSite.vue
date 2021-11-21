<template lang="pug">

.OverflowSafeSingleLineLabelComponentTestSite

  OverflowSafeSingleLineLabel Test

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
