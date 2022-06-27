import { createApp as createVueApplication } from "vue";
import {
  CompoundControlShellBasicImplementation,
  DropDownListBasicImplementation
} from "../../../../Source";
import DropDownListComponentTestSite from "./DropDownListComponentTestSite.vue";


createVueApplication(DropDownListComponentTestSite).
    component("CompoundControlShell", CompoundControlShellBasicImplementation).
    component("DropDownList", DropDownListBasicImplementation).
    mount("#APPLICATION");
