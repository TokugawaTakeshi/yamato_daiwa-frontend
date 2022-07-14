<template lang="pug">

.TestSite

  Button(
    :HTML_Type="Button.HTML_Types.regular"
    label="test"
    @click="onClickButton"
  )

</template>


<script lang="ts">

  /* --- Other components ------------------------------------------------------------------------------------------- */
  import { Button } from "@Source/index";

  /* --- Framework -------------------------------------------------------------------------------------------------- */
  import { Options as VueComponentConfiguration, Vue as VueComponent } from "vue-property-decorator";

  /* --- Utils ------------------------------------------------------------------------------------------------------ */
  import { Logger } from "@yamato-daiwa/es-extensions";


  @VueComponentConfiguration({
    components: {}
  })
  export default class ButtonTestSite extends VueComponent {

    public created(): void {
      this.initializeNonReactiveClassFields();
    }


    public onClickButton(): void {
      Logger.logInfo({
        title: "Normal operationing",
        description: "Button click event handler is operationing."
      });
    }


    /* === 非リアクティブクラスフィールド ======================================================================================= */
    protected Button!: typeof Button;

    private initializeNonReactiveClassFields(): void {
      this.Button = Button;
    }
  }

</script>


<style lang="stylus" scoped>

  @require "../../../../../../node_modules/@yamato-daiwa/frontend/Functionality.styl"
  @require "../../../../../../node_modules/@yamato-daiwa/frontend/Components.styl"

  CrossBrowserStylesReset()
  InitialGlobalCSS_Rules()


  .TestSite

    padding 16px

</style>
