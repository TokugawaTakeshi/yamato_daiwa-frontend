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
    Prop as VueComponentProperty
  } from "vue-property-decorator";


  @VueComponentConfiguration({})
  export default class OverflowSafeSingleLineLabel extends VueComponent {

    @VueComponentProperty({ type: String, default: "div" })
    protected readonly rootElementTag!: string;
  }

</script>
