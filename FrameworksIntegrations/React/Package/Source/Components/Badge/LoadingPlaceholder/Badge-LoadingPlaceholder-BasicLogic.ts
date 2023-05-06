import Badge from "../Badge";

/* ─── Constants and enumerations ──────────────────────────────────────────────────────────────────────────────────────────── */
import YDF_ComponentsCoordinator from "../../YDF_ComponentsCoordinator";

/* ─── Framework ───────────────────────────────────────────────────────────────────────────────────────────────────────────── */
import React from "react";

/* ─── Utils ───────────────────────────────────────────────────────────────────────────────────────────────────────────────── */
import { toUpperCamelCase } from "@yamato-daiwa/es-extensions";


class BadgeLoadingPlaceholder extends React.Component<BadgeLoadingPlaceholder.Properties> {

  protected get rootElementModifierSpaceSeparatedCSS_Classes(): string {

    const {
      theme = Badge.Themes.regular,
      areThemesCSS_ClassesCommon = YDF_ComponentsCoordinator.areThemesCSS_ClassesCommon || Badge.ARE_THEMES_CSS_CLASSES_COMMON,
      geometry = Badge.GeometricVariations.regular
    }: BadgeLoadingPlaceholder.Properties = this.props;

    return [
      ...Object.entries(Badge.Themes).length > 1 && !areThemesCSS_ClassesCommon ?
          [ `Badge--YDF__${ toUpperCamelCase(theme) }Theme` ] : [],
      ...Object.entries(Badge.GeometricVariations).length > 1 ?
          [ `Badge--YDF__${ toUpperCamelCase(geometry) }Geometry` ] : [],
      ...this.props.geometricModifiers?.includes(Badge.GeometricModifiers.pillShape) === true ?
          [ "Badge--YDF__PillShapeGeometricModifier" ] : []
    ].join(" ");
  }

}


namespace BadgeLoadingPlaceholder {

  export type Properties = Readonly<{
    theme?: string;
    areThemesCSS_ClassesCommon?: boolean;
    geometry?: string;
    geometricModifiers?: Array<Badge.GeometricModifiers>;
  }>;

}


export default BadgeLoadingPlaceholder;
