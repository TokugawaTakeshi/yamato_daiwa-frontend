import { createApp as createVueApplication } from "vue";
import { ButtonBasicImplementation } from "../../../../../Source";
import ButtonTestSite from "./ButtonTestSite.vue";

// Button.setImplementation(ButtonBasicImplementation);


createVueApplication(ButtonTestSite).
    component("Button", ButtonBasicImplementation).
    mount("#APPLICATION");
