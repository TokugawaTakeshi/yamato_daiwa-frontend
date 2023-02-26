<template lang="pug">

.TestSite

  TextBox(
    v-model:payload="samplePayload"
    label="Test"
    :minimalCharactersCount="samplePayload.validation.MINIMAL_CHARACTERS_COUNT"
  )

</template>


<script lang="ts">

  /* eslint-disable max-classes-per-file -- For the testing purposes */

  /* --- Other components ------------------------------------------------------------------------------------------- */
  import { TextBox, TextBoxBasicImplementation } from "@Source/index";

  /* --- Validations ------------------------------------------------------------------------------------------------ */
  import ValidatableControl from "@Components/Controls/_Validation/ValidatableControl";
  import ValueValidation from "@Components/Controls/_Validation/ValueValidation";

  /* --- Framework -------------------------------------------------------------------------------------------------- */
  import { Options as VueComponentConfiguration, Vue as VueComponent } from "vue-property-decorator";

  /* --- Utils ------------------------------------------------------------------------------------------------------ */
  import { isEmptyString } from "@yamato-daiwa/es-extensions";
  import {
    minimalCharactersCountValidationRule,
    maximalCharactersCountValidationRule
  } from "@yamato-daiwa/frontend";


  /* eslint-disable max-classes-per-file */
  export class TestValidation extends ValueValidation {

    public readonly MINIMAL_CHARACTERS_COUNT: number;
    public readonly MAXIMAL_CHARACTERS_COUNT: number;

    public constructor() {

      const MINIMAL_CHARACTERS_COUNT: number = 2;
      const MAXIMAL_CHARACTERS_COUNT: number = 5;

      super({
        inputIsRequired: true,
        omittedValueChecker: isEmptyString,
        contextIndependentValidationRules: {
          ...minimalCharactersCountValidationRule({
            minimalCharactersCount: MINIMAL_CHARACTERS_COUNT,
            errorMessage: `This value must have minimum ${ MINIMAL_CHARACTERS_COUNT } characters.`,
            finishValidationIfInvalid: true
          }),
          ...maximalCharactersCountValidationRule({
            maximalCharactersCount: MAXIMAL_CHARACTERS_COUNT,
            errorMessage: `This value must have maximum ${ MAXIMAL_CHARACTERS_COUNT } characters.`
          })
        }
      });

      this.MINIMAL_CHARACTERS_COUNT = MINIMAL_CHARACTERS_COUNT;
      this.MAXIMAL_CHARACTERS_COUNT = MAXIMAL_CHARACTERS_COUNT;

    }
  }


  @VueComponentConfiguration({
    components: {
      TextBox: TextBoxBasicImplementation
    }
  })
  export default class TextBoxComponentTestSite extends VueComponent {

    public created(): void {
      this.initializeNonReactiveClassFields();
    }


    protected samplePayload: ValidatableControl.Payload<string, string, TestValidation> = ValidatableControl.Payload.
        createInitialInstance({
          initialValue: "",
          validation: new TestValidation()
        });


    /* --- Non-reactive class fields -------------------------------------------------------------------------------- */
    protected TextBox!: typeof TextBox;

    private initializeNonReactiveClassFields(): void {
      this.TextBox = TextBox;
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
