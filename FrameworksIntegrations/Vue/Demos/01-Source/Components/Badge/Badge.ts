import { createApp as createVueApplication } from "vue";
import { Badge, BadgeBasicImplementation } from "@yamato-daiwa/frontend-vue";
import BadgeDemo from "./BadgeDemo.vue";


Badge.setImplementation(BadgeBasicImplementation);


createVueApplication(BadgeDemo).mount("#APPLICATION");
