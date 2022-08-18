import { createApp as createVueApplication } from "vue";
import { Badge, BadgeBasicImplementation } from "@Source/index";
import ButtonTestSite from "./BadgeTestSite.vue";


Badge.setImplementation(BadgeBasicImplementation);


createVueApplication(ButtonTestSite).mount("#APPLICATION");
