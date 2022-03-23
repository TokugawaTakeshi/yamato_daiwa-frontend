<template lang="pug">

.TestSite

  Button(
    :HTML_Type="Button.HTML_Types.regular"
    @click="onClickButton"
  ) test

  
</template>


<script lang="ts">

  /* --- 子コンポネント -------------------------------------------------------------------------------------------------- */
  import { Button } from "../../../../../Source";

  /* --- フレームワーク -------------------------------------------------------------------------------------------------- */
  import { Options as VueComponentConfiguration, Vue as VueComponent } from "vue-property-decorator";


  @VueComponentConfiguration({
    components: {}
  })
  export default class ButtonTestSite extends VueComponent {

    public created(): void {
      this.initializeNonReactiveClassFields();
    }


    public onClickButton(): void {
      console.log("ok!");
    }


    /* === 非リアクティブクラスフィールド ======================================================================================= */
    protected Button!: typeof Button;

    private initializeNonReactiveClassFields(): void {
      this.Button = Button;
    }
  }

</script>


<style lang="stylus" scoped>

  @require "@yamato-daiwa/frontend/Functionality.styl"
  @require "@yamato-daiwa/frontend/Components.styl"

  CrossBrowserStylesReset()
  InitialGlobalCSS_Rules()


  .TestSite

    padding 16px

</style>
