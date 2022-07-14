<template lang="pug">

.TestSite

  DropDownList(
    v-model:payload="samplePayload"
    label="Test"
  )

</template>


<script lang="ts">

  /* eslint-disable max-classes-per-file -- For the testing purposes */

  /* --- Other components ------------------------------------------------------------------------------------------- */
  import { DropDownList } from "@Source/index";

  /* --- Validations ------------------------------------------------------------------------------------------------ */
  import ValidatableControl from "@Components/Controls/_Validation/ValidatableControl";
  import ValueValidation from "@Components/Controls/_Validation/ValueValidation";

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
  export default class DropDownListComponentTestSite extends VueComponent {

    public created(): void {
      this.initializeNonReactiveClassFields();
    }


    protected samplePayload: ValidatableControl.Payload<string, string, TestValidation> = ValidatableControl.Payload.
        createInitialInstance({
          initialValue: "",
          validation: new TestValidation()
        });


    /* --- Non-reactive class fields -------------------------------------------------------------------------------- */
    protected DropDownList!: typeof DropDownList;

    private initializeNonReactiveClassFields(): void {
      this.DropDownList = DropDownList;
    }
  }

</script>


<style lang="stylus" scoped>

  @require "../../../../../node_modules/@yamato-daiwa/frontend/Functionality.styl"
  @require "../../../../../node_modules/@yamato-daiwa/frontend/Components.styl"

  CrossBrowserStylesReset()
  InitialGlobalCSS_Rules()


  .TestSite

    padding 16px

</style>
