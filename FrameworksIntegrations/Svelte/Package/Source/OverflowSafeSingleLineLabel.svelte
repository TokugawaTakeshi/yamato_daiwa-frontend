<template lang="pug">

  svelte:component.OverflowSafeSingleLineLabel(this="{rootElementTag}")
    span.OverflowSafeSingleLineLabel-TextWithIncreasedLineHeight
      slot

</template>


<script lang="ts" context="module">

  const rootElementTag: string = "div";

</script>
