import { createApp as createVueApplication } from "vue";
import {
  CompoundControlShellBasicImplementation,
  TextBoxBasicImplementation
} from "../../../../Source";
import TextBoxComponentTestSite from "./TextBoxComponentTestSite.vue";


createVueApplication(TextBoxComponentTestSite).
    component("CompoundControlShell", CompoundControlShellBasicImplementation).
    component("TextBox", TextBoxBasicImplementation).
    mount("#APPLICATION");
