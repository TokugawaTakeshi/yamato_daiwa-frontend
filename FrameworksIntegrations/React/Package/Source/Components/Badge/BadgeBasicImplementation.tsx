import Badge from "./Badge";

/* ─── Framework ───────────────────────────────────────────────────────────────────────────────────────────────────────────── */
import React from "react";
import type { ReactNode } from "react";

/* ─── Utils ───────────────────────────────────────────────────────────────────────────────────────────────────────────────── */
import { isNotUndefined } from "@yamato-daiwa/es-extensions";


export default class BadgeBasicImplementation extends Badge.BasicLogic {

  public render(): ReactNode {

    const SVG_Icon: React.ElementType<{ className: string; }> | undefined = this.props.SVG_Icon;

    return <span className={ `Badge--YDF ${ this.props.className } ${ super.rootElementModifierSpaceSeparatedCSS_Classes }` }>

      { isNotUndefined(SVG_Icon) && <SVG_Icon className="Badge--YDF-SVG_Icon" /> }

      { isNotUndefined(this.props.keyLabel) && <span className="Badge--YDF-Key">{ this.props.keyLabel }</span> }

      <span className="Badge--YDF-Value">{ this.props.valueLabel }</span>

    </span>;
  }

}
