<template lang="pug">

component.OverflowSafeSingleLineLabel(
  :is="rootElementTag"
)
  span.OverflowSafeSingleLineLabel-TextWithIncreasedLineHeight
    slot

</template>


<script lang="ts">

  import {
    Options as VueComponentConfiguration,
    Vue as VueComponent,
    Prop as VueProperty
  } from "vue-property-decorator";


  @VueComponentConfiguration({})
  export default class OverflowSafeSingleLineLabel extends VueComponent {

    @VueProperty({ type: String, default: "div" })
    protected readonly rootElementTag!: string;
  }

</script>
