<template lang="pug">

component.OverflowSafeSingleLineLabel(
  :is="rootElementTag"
)
  span.OverflowSafeSingleLineLabel-TextWithIncreasedLineHeight
    slot

</template>


<script lang="ts">

  import { Component as VueComponentOptions, Vue as VueComponent, Prop as VueProperty } from "vue-facing-decorator";


  @VueComponentOptions({ name: "OverflowSafeSingleLineLabel--YDF" })
  export default class OverflowSafeSingleLineLabel extends VueComponent {

    @VueProperty({ type: String, default: "div" })
    protected readonly rootElementTag!: string;

  }

</script>
