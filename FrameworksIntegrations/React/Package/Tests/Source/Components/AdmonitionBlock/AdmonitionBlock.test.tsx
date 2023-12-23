/* ─── GUI Components ─────────────────────────────────────────────────────────────────────────────────────────────── */
import { AdmonitionBlock } from "../../../../Source";

/* ─── Framework ──────────────────────────────────────────────────────────────────────────────────────────────────── */
import React from "react";
import { createRoot } from "react-dom/client";

/* ─── Utils ──────────────────────────────────────────────────────────────────────────────────────────────────────── */
import { getExpectedToBeSingleDOM_Element } from "@yamato-daiwa/es-extensions-browserjs";


createRoot(getExpectedToBeSingleDOM_Element({ selector: "#APPLICATION" })).
    render(
      <AdmonitionBlock
        title="Test"
        decorativeVariation={ AdmonitionBlock.DecorativeVariations.success }
        dismissible={ true }
      >
        Looks like has been successfully rendered!
      </AdmonitionBlock>
    );
