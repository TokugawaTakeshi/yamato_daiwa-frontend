/* ━━━ ESLint ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
/* eslint-disable @typescript-eslint/member-ordering ---
 * The ordering by access modifiers basically is not suited with GUI components classes */

/* ━━━ Imports ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
/* ─── Related components ──────────────────────────────────────────────────────────────────────────────────────────────────── */
import type BadgeLoadingPlaceholder from "./LoadingPlaceholder/Badge-LoadingPlaceholder-BasicLogic";

/* ─── Constants and enumerations ──────────────────────────────────────────────────────────────────────────────────────────── */
import YDF_ComponentsCoordinator from "../YDF_ComponentsCoordinator";

/* ─── Framework ───────────────────────────────────────────────────────────────────────────────────────────────────────────── */
import React from "react";
import type { ReactNode } from "react";
import ReactPropertiesValidation from "prop-types";

/* ─── Utils ───────────────────────────────────────────────────────────────────────────────────────────────────────────────── */
import { toLowerCamelCase, toUpperCamelCase, toScreamingSnakeCase, isNotUndefined } from "@yamato-daiwa/es-extensions";


namespace Badge {

  /* ━━━ Properties ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  export type Properties = Readonly<{
    keyLabel?: string;
    valueLabel: string;
    theme?: string;
    areThemesCSS_ClassesCommon?: boolean;
    SVG_Icon?: React.ElementType<{ className: string; }>;
    geometry?: string;
    geometricModifiers?: Array<GeometricModifiers>;
    decoration: string;
    decorativeModifiers?: Array<DecorativeModifiers>;
    className?: string;
  }>;


  /* ━━━ Theming ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  export type Themes = {
    readonly regular: "REGULAR";
    [themeName: string]: string;
  };

  export const Themes: Themes = { regular: "REGULAR" };

  export let ARE_THEMES_CSS_CLASSES_COMMON: boolean = YDF_ComponentsCoordinator.areThemesCSS_ClassesCommon;

  export function considerThemesAsCommon(): void {
    ARE_THEMES_CSS_CLASSES_COMMON = true;
  }


  /* ─── Geometry ──────────────────────────────────────────────────────────────────────────────────────────────────────────── */
  export type GeometricVariations = {
    readonly regular: "REGULAR";
    [variationName: string]: string;
  };

  export const GeometricVariations: GeometricVariations = {
    regular: "REGULAR"
  };

  export enum GeometricModifiers {
    pillShape = "PILL_SHAPE",
    singleLine = "SINGLE_LINE"
  }


  /* ─── Decoration ────────────────────────────────────────────────────────────────────────────────────────────────────────── */
  export type DecorativeVariations = {
    readonly veryCatchyBright: "VERY_CATCHY_BRIGHT";
    readonly catchyBright: "CATCHY_BRIGHT";
    readonly modestlyCatchyBright: "MODESTLY_CATCHY_BRIGHT";
    readonly neutralBright: "NEUTRAL_BRIGHT";
    readonly modestlyCalmingBright: "MODESTLY_CALMING_BRIGHT";
    readonly calmingBright: "CALMING_BRIGHT";
    readonly achromaticBright: "ACHROMATIC_BRIGHT";
    readonly veryCatchyPastel: "VERY_CATCHY_PASTEL";
    readonly catchyPastel: "CATCHY_PASTEL";
    readonly modestlyCatchyPastel: "MODESTLY_CATCHY_PASTEL";
    readonly neutralPastel: "NEUTRAL_PASTEL";
    readonly modestlyCalmingPastel: "MODESTLY_CALMING_PASTEL";
    readonly calmingPastel: "CALMING_PASTEL";
    readonly achromaticPastel: "ACHROMATIC_PASTEL";
    [variationName: string]: string;
  };

  export const DecorativeVariations: DecorativeVariations = {
    veryCatchyBright: "VERY_CATCHY_BRIGHT",
    catchyBright: "CATCHY_BRIGHT",
    modestlyCatchyBright: "MODESTLY_CATCHY_BRIGHT",
    neutralBright: "NEUTRAL_BRIGHT",
    modestlyCalmingBright: "MODESTLY_CALMING_BRIGHT",
    calmingBright: "CALMING_BRIGHT",
    achromaticBright: "ACHROMATIC_BRIGHT",
    veryCatchyPastel: "VERY_CATCHY_PASTEL",
    catchyPastel: "CATCHY_PASTEL",
    modestlyCatchyPastel: "MODESTLY_CATCHY_PASTEL",
    neutralPastel: "NEUTRAL_PASTEL",
    modestlyCalmingPastel: "MODESTLY_CALMING_PASTEL",
    calmingPastel: "CALMING_PASTEL",
    achromaticPastel: "ACHROMATIC_PASTEL"
  };

  export enum DecorativeModifiers {
    bordersDisguising = "BORDERS_DISGUISING"
  }


  export class BasicLogic extends React.Component<Properties> {

    protected static readonly propTypes: Readonly<{ [ propertyKey in keyof Properties ]: unknown }> = {
      keyLabel: ReactPropertiesValidation.string,
      valueLabel: ReactPropertiesValidation.string.isRequired,
      theme: ReactPropertiesValidation.oneOf(Object.values(Themes)),
      areThemesCSS_ClassesCommon: ReactPropertiesValidation.bool,
      SVG_Icon: ReactPropertiesValidation.elementType,
      geometry: ReactPropertiesValidation.oneOf(Object.values(GeometricVariations)),
      geometricModifiers: ReactPropertiesValidation.arrayOf(ReactPropertiesValidation.oneOf(Object.values(GeometricModifiers))),
      decoration: ReactPropertiesValidation.oneOf(Object.values(DecorativeVariations)),
      decorativeModifiers: ReactPropertiesValidation.arrayOf(ReactPropertiesValidation.oneOf(Object.values(DecorativeModifiers))),
      className: ReactPropertiesValidation.string
    };

    public static SVG_Icon: () => ReactNode = (): ReactNode => null;


    /* ━━━ Themes ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    public static readonly Themes: typeof Themes = Themes;

    public static defineNewThemes(themesNames: ReadonlyArray<string>): typeof BasicLogic {

      for (const themeName of themesNames) {
        Themes[toLowerCamelCase(themeName)] = toScreamingSnakeCase(themeName);
      }

      return BasicLogic;

    }


    /* ─── Geometric variations ────────────────────────────────────────────────────────────────────────────────────────────── */
    public static readonly GeometricVariations: typeof GeometricVariations = GeometricVariations;

    public static defineCustomGeometricVariations(geometricVariationsNames: ReadonlyArray<string>): typeof BasicLogic {

      for (const geometricVariationsName of geometricVariationsNames) {
        GeometricVariations[toLowerCamelCase(geometricVariationsName)] = toScreamingSnakeCase(geometricVariationsName);
      }

      return BasicLogic;

    }


    /* ─── Decorative variations ───────────────────────────────────────────────────────────────────────────────────────────── */
    public static readonly DecorativeVariations: typeof DecorativeVariations = DecorativeVariations;

    public static defineCustomDecorativeVariations(decorativeVariationsNames: ReadonlyArray<string>): typeof BasicLogic {

      for (const decorativeVariationsName of decorativeVariationsNames) {
        DecorativeVariations[toLowerCamelCase(decorativeVariationsName)] = toScreamingSnakeCase(decorativeVariationsName);
      }

      return BasicLogic;

    }


    /* ━━━ Auxiliaries ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    protected get rootElementModifierSpaceSeparatedCSS_Classes(): string {

      const {
        theme = Themes.regular,
        areThemesCSS_ClassesCommon = YDF_ComponentsCoordinator.areThemesCSS_ClassesCommon || ARE_THEMES_CSS_CLASSES_COMMON,
        geometry = GeometricVariations.regular
      }: Properties = this.props;

      return [

        ...Object.entries(Themes).length > 1 && !areThemesCSS_ClassesCommon ?
            [ `Badge--YDF__${ toUpperCamelCase(theme) }Theme` ] : [],

        ...Object.entries(GeometricVariations).length > 1 ?
            [ `Badge--YDF__${ toUpperCamelCase(geometry) }Geometry` ] : [],
        ...this.props.geometricModifiers?.includes(GeometricModifiers.pillShape) === true ?
            [ "Badge--YDF__PillShapeGeometricModifier" ] : [],
        ...this.props.geometricModifiers?.includes(GeometricModifiers.singleLine) === true ?
            [ "Badge--YDF__SingleLineGeometricModifier" ] : [],

        ...Object.entries(DecorativeVariations).length > 1 ?
            [ `Badge--YDF__${ toUpperCamelCase(this.props.decoration) }Decoration` ] : [],
        ...this.props.decorativeModifiers?.includes(DecorativeModifiers.bordersDisguising) === true ?
            [ "Badge--YDF__BordersDisguisingDecorativeModifier" ] : []

      ].join(" ");
    }

  }


  /* ━━━ Providing ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  export let Implementation: new () => BasicLogic;
  export let LoadingPlaceholderImplementation: new () => BadgeLoadingPlaceholder;

  export function setImplementation(
    _Implementation: new () => BasicLogic,
    _LoadingPlaceholderImplementation?: new () => BadgeLoadingPlaceholder
  ): void {

    Implementation = _Implementation;

    if (isNotUndefined(_LoadingPlaceholderImplementation)) {
      LoadingPlaceholderImplementation = _LoadingPlaceholderImplementation;
    }

  }

}


export default Badge;
