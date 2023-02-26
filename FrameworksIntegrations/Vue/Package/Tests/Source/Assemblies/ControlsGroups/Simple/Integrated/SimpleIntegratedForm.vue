<template lang="pug">

form.SimpleForm

  h1.SimpleForm-Heading Sign in

  TextBox.SimpleForm-TextBox(
    :HTML_Type="TextBox.HTML_Types.email"
    label="Email address"
    v-model="controlsPayload.email"
    :required="controlsPayload.email.validation.isInputRequired"
    :ref="controlsPayload.email.VUE_REFERENCE_ID"
  )

  TextBox.SimpleForm-TextBox(
    :HTML_Type="TextBox.HTML_Types.password"
    label="Password"
    v-model="controlsPayload.password"
    :required="controlsPayload.password.validation.isInputRequired"
    :minimalCharactersCount="controlsPayload.password.validation.MINIMAL_CHARACTERS_COUNT"
    :maximalCharactersCount="controlsPayload.password.validation.MAXIMAL_CHARACTERS_COUNT"
    :ref="controlsPayload.password.VUE_REFERENCE_ID"
  )

  HorizontallySlidingContainer.SimpleForm-Message(
    HTML_Tag="p"
    :expanded="hasUserTriedToSubmitDataAtLeastOnce && hasInvalidInputs"
  ) Omitted required fields and/or invalid inputs left. Please check the inputted information.

  Button.SimpleForm-Button(
    label="Sign in"
    @click="attemptSigningIn"
  )

</template>


<script lang="ts">

  /* --- Children components ---------------------------------------------------------------------------------------- */
  import {
    Button,
    TextBox,
    ValidatableControl,
    ValidatableControlsGroup,
    ValueValidation,
    HorizontallySlidingContainer
  } from "@Source/index";

  /* --- Validations ------------------------------------------------------------------------------------------------ */
  import InputtedEmailValidation from "./Validations/InputtedEmailValidation";
  import PasswordValidation from "./Validations/PasswordValidation";

  /* --- Framework -------------------------------------------------------------------------------------------------- */
  import { Options as VueComponentConfiguration, Vue as VueComponent } from "vue-property-decorator";

  /* --- Utils ------------------------------------------------------------------------------------------------------ */
  import { Logger, DataSubmittingFailedError } from "@yamato-daiwa/es-extensions";


  @VueComponentConfiguration({
    name: "SimpleIntegratedForm",
    components: {
      HorizontallySlidingContainer
    }
  })
  export default class SimpleIntegratedForm extends VueComponent {

    /* === Fields =================================================================================================== */
    private controlsPayload: Readonly<{
      email: ValidatableControl.Payload<string, string, ValueValidation>;
      password: ValidatableControl.Payload<string, string, ValueValidation>;
    }> = {
      email: ValidatableControl.Payload.createInitialInstance({
        initialValue: "",
        validation: new InputtedEmailValidation({ isInputRequired: true })
      }),
      password: ValidatableControl.Payload.createInitialInstance({
        initialValue: "",
        validation: new PasswordValidation({ isInputRequired: true })
      })
    };


    /* === Lifecycle hooks ========================================================================================== */
    public beforeCreate(): void {
      TextBox.registerImplementationLocally(this);
      Button.registerImplementationLocally(this);
    }

    public created(): void {
      this.initializeNonReactiveClassFields();
    }


    /* === Actions handling ========================================================================================= */
    protected hasUserTriedToSubmitDataAtLeastOnce: boolean = false;

    protected get hasInvalidInputs(): boolean {
      return ValidatableControlsGroup.hasInvalidInputs(this.controlsPayload);
    }


    protected async attemptSigningIn(): Promise<void> {

      this.hasUserTriedToSubmitDataAtLeastOnce = true;

      if (this.hasInvalidInputs) {

        ValidatableControlsGroup.pointOutValidationErrors({
          controlsPayload: this.controlsPayload,
          parentVueComponentInstance: this
        });

        return;

      }


      try {

        await Promise.resolve({
          email: this.controlsPayload.email.getExpectedToBeValidValue(),
          password: this.controlsPayload.password.getExpectedToBeValidValue()
        });

      } catch (error: unknown) {

        Logger.logError({
          errorType: DataSubmittingFailedError.NAME,
          title: DataSubmittingFailedError.localization.defaultTitle,
          description: "Signing in failed.",
          occurrenceLocation: "simpleIntegratedForm.attemptSigningIn()",
          caughtError: error
        });

        return;

      }


      Logger.logSuccess({
        title: "Sign in success",
        description: "The simulation of singing in is complete."
      });

    }


    /* === Routines ================================================================================================= */
    /* --- Non-reactive class fields -------------------------------------------------------------------------------- */
    protected TextBox!: typeof TextBox;

    private initializeNonReactiveClassFields(): void {
      this.TextBox = TextBox;
    }

  }

</script>
