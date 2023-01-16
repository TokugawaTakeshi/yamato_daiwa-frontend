import { createApp as createVueApplication } from "vue";
import { Badge, BadgeBasicImplementation } from "@Source/index";
import BadgeDemo from "./BadgeDemo.vue";


Badge.setImplementation(BadgeBasicImplementation);


createVueApplication(BadgeDemo).mount("#APPLICATION");
