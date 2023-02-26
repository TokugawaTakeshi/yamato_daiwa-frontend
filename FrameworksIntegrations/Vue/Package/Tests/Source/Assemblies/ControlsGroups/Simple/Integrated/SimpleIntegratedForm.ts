import { createApp as createVueApplication } from "vue";

import {
  CompoundControlShell,
  CompoundControlShellBasicImplementation,
  TextBox,
  TextBoxBasicImplementation,
  Button,
  ButtonBasicImplementation
} from "@Source/index";

import SimpleIntegratedForm from "./SimpleIntegratedForm.vue";


CompoundControlShell.setImplementation(CompoundControlShellBasicImplementation);
TextBox.setImplementation(TextBoxBasicImplementation);
Button.setImplementation(ButtonBasicImplementation);


createVueApplication(SimpleIntegratedForm).mount("#APPLICATION");
