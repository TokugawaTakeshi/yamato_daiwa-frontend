import { createApp as createVueApplication } from "vue";

import {
  CompoundControlShell,
  CompoundControlShellBasicImplementation,
  TextBox,
  TextBoxBasicImplementation,
  Button,
  ButtonBasicImplementation
} from "@yamato-daiwa/frontend-vue";

import SimpleIntegratedForm from "./SimpleIntegratedForm.vue";


CompoundControlShell.setImplementation(CompoundControlShellBasicImplementation);
TextBox.setImplementation(TextBoxBasicImplementation);
Button.setImplementation(ButtonBasicImplementation);


createVueApplication(SimpleIntegratedForm).mount("#APPLICATION");
