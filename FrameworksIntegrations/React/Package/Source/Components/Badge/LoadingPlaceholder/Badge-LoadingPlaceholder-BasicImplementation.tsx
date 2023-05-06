import BadgeLoadingPlaceholder from "./Badge-LoadingPlaceholder-BasicLogic";

/* ─── Framework ───────────────────────────────────────────────────────────────────────────────────────────────────────────── */
import React from "react";
import type { ReactNode } from "react";


export default class BadgeLoadingPlaceholderBasicImplementation extends BadgeLoadingPlaceholder {

  public render(): ReactNode {
    return <span
      className={ `Badge--YDF Badge--YDF__LoadingPlaceholder ${ super.rootElementModifierSpaceSeparatedCSS_Classes }` }
    ></span>;
  }

}
