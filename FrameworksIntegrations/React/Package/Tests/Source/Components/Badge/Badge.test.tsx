/* ─── GUI Components ─────────────────────────────────────────────────────────────────────────────────────────────── */
import { Badge } from "../../../../Source";

/* ─── Framework ──────────────────────────────────────────────────────────────────────────────────────────────────── */
import React from "react";
import { createRoot } from "react-dom/client";

/* ─── Utils ──────────────────────────────────────────────────────────────────────────────────────────────────────── */
import { getExpectedToBeSingleDOM_Element } from "@yamato-daiwa/es-extensions-browserjs";


createRoot(getExpectedToBeSingleDOM_Element({ selector: "#APPLICATION" })).
    render(
      <Badge
        decorativeVariation={ Badge.DecorativeVariations.calmingBright }
        valueLabel="OK3"
      />
    );
