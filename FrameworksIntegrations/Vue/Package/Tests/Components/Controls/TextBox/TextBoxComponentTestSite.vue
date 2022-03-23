<template lang="pug">

.TestSite

  TextBox(
    v-model:payload="samplePayload"
    label="Test"
  )

</template>


<script lang="ts">

  /* --- Other components ------------------------------------------------------------------------------------------- */
  import { TextBox } from "../../../../Source";

  /* --- Validations ------------------------------------------------------------------------------------------------ */
  import ValidatableControl from "../../../../Source/Components/Controls/_Validation/ValidatableControl";
  import ValueValidation from "../../../../Source/Components/Controls/_Validation/ValueValidation";

  /* --- Framework -------------------------------------------------------------------------------------------------- */
  import { Options as VueComponentConfiguration, Vue as VueComponent } from "vue-property-decorator";

  /* --- Utils ------------------------------------------------------------------------------------------------------ */
  import { isEmptyString } from "@yamato-daiwa/es-extensions";


  export class TestValidation extends ValueValidation {
    public constructor() {
      super({ omittedValueChecker: isEmptyString, inputIsRequired: true });
    }
  }

  @VueComponentConfiguration({})
  export default class TextBoxComponentTestSite extends VueComponent {

    public created(): void {
      this.initializeNonReactiveClassFields();
    }


    protected samplePayload: ValidatableControl.Payload<string, string, TestValidation> = ValidatableControl.Payload.
        createInitialInstance({
          initialValue: "",
          validation: new TestValidation()
        })


    /* --- Non-reactive class fields -------------------------------------------------------------------------------- */
    protected TextBox!: typeof TextBox;

    private initializeNonReactiveClassFields(): void {
      this.TextBox = TextBox;
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
