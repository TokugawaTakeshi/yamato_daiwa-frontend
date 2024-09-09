<template lang="pug">

</template>


<script lang="ts">

  /* ─── GUI Components ───────────────────────────────────────────────────────────────────────────────────────────── */
  import { AdmonitionBlock } from "../../../../Source";

  /* ─── Framework ────────────────────────────────────────────────────────────────────────────────────────────────── */
  import { Component as VueComponentOptions, Vue as VueComponent } from "vue-facing-decorator";


  @VueComponentOptions({
    components: {
      AdmonitionBlock
    }
  })
  export default class AdmonitionBlockComponentTestSite extends VueComponent {}

</script>
