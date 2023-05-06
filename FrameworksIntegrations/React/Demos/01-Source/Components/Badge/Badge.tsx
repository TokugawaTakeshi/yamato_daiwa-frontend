import { Badge, BadgeBasicImplementation, BadgeLoadingPlaceholderBasicImplementation } from "@yamato-daiwa/frontend-react";
import BadgeDemo from "./BadgeDemo";

import React from "react";
import { createRoot as createReactApplicationRoot } from "react-dom/client";

import { getExpectedToBeSingleDOM_Element } from "@yamato-daiwa/es-extensions-browserjs";


Badge.setImplementation(BadgeBasicImplementation, BadgeLoadingPlaceholderBasicImplementation);


createReactApplicationRoot(getExpectedToBeSingleDOM_Element({ selector: "#APPLICATION" })).render(<BadgeDemo />);
