import { createApp as createVueApplication } from "vue";
import {
  CompoundControlShell,
  CompoundControlShellBasicImplementation,
  TextBox,
  TextBoxBasicImplementation
} from "@Source/index";
import TextBoxComponentTestSite from "./TextBoxComponentTestSite.vue";


CompoundControlShell.setImplementation(CompoundControlShellBasicImplementation);
TextBox.setImplementation(TextBoxBasicImplementation);


createVueApplication(TextBoxComponentTestSite).mount("#APPLICATION");
