/* ─── Assets ─────────────────────────────────────────────────────────────────────────────────────────────────────── */
import type { AdmonitionBlockLocalization } from "@yamato-daiwa/frontend";
import { admonitionBlockYDF_ComponentLocalization__english } from "@yamato-daiwa/frontend";
import MultiplicationSignIcon__Boxed__Filled from "../SVG_Icons/MultiplicationSign/MultiplicationSignIcon__Boxed__Filled";

/* ─── Framework ──────────────────────────────────────────────────────────────────────────────────────────────────── */
import React from "react";
import ReactPropertiesValidation from "prop-types";

/* ─── Utils ──────────────────────────────────────────────────────────────────────────────────────────────────────── */
import ComponentsAuxiliaries from "./ComponentsAuxiliaries";
import { isNotUndefined } from "@yamato-daiwa/es-extensions";


class AdmonitionBlock extends React.Component<AdmonitionBlock.Properties, AdmonitionBlock.State> {

  public static CSS_NAMESPACE: string = "AdmonitionBlock--YDF";


  protected static get propTypes(): Readonly<{ [ propertyKey in keyof AdmonitionBlock.Properties ]: unknown }> {
    return {
      title: ReactPropertiesValidation.string,
      hasDefaultSVG_Icon: ReactPropertiesValidation.bool,
      dismissible: ReactPropertiesValidation.bool,
      theme: ReactPropertiesValidation.oneOf(Object.values(AdmonitionBlock.Themes)),
      areThemesCSS_ClassesCommon: ReactPropertiesValidation.bool,
      geometricVariation: ReactPropertiesValidation.oneOf(Object.values(AdmonitionBlock.GeometricVariations)),
      decorativeVariation: ReactPropertiesValidation.oneOf(Object.values(AdmonitionBlock.DecorativeVariations)),
      className: ReactPropertiesValidation.string,
      children: ReactPropertiesValidation.oneOfType([
        ReactPropertiesValidation.arrayOf(ReactPropertiesValidation.node),
        ReactPropertiesValidation.node
      ])
    };
  }

  public static get defaultProps(): Required<
    Pick<
      AdmonitionBlock.Properties,
      "hasDefaultSVG_Icon" |
      "dismissible" |
      "theme" |
      "areThemesCSS_ClassesCommon" |
      "geometricVariation"
    >
  > {
    return {
      hasDefaultSVG_Icon: false,
      dismissible: false,
      theme: AdmonitionBlock.Themes.regular,
      areThemesCSS_ClassesCommon: AdmonitionBlock.areThemesCSS_ClassesCommon,
      geometricVariation: AdmonitionBlock.GeometricVariations.regular
    };
  }

  public readonly state: AdmonitionBlock.State = {
    isDisplaying: true
  };

  public static localization: AdmonitionBlockLocalization = admonitionBlockYDF_ComponentLocalization__english;


  protected onClickDismissingButton(): void {
    this.setState({ isDisplaying: false });
  }


  /* ━━━ Theming ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public static readonly Themes: AdmonitionBlock.Themes = { regular: "REGULAR" };

  public static defineThemes(themesNames: ReadonlyArray<string>): typeof AdmonitionBlock {
    return ComponentsAuxiliaries.defineThemes(themesNames, AdmonitionBlock);
  }

  public static areThemesCSS_ClassesCommon: boolean = ComponentsAuxiliaries.areThemesCSS_ClassesCommon;

  public static considerThemesAsCommon(): void {
    AdmonitionBlock.areThemesCSS_ClassesCommon = true;
  }


  /* ─── Geometry ─────────────────────────────────────────────────────────────────────────────────────────────────── */
  public static readonly GeometricVariations: AdmonitionBlock.GeometricVariations = {
    regular: "REGULAR",
    stickyNoteLike: "STICKY_NOTE_LIKE"
  };

  public static defineGeometricVariations(geometricVariationsNames: ReadonlyArray<string>): typeof AdmonitionBlock {
    return ComponentsAuxiliaries.defineGeometricVariations(geometricVariationsNames, AdmonitionBlock);
  }


  /* ─── Decoration ───────────────────────────────────────────────────────────────────────────────────────────────── */
  public static readonly DecorativeVariations: AdmonitionBlock.DecorativeVariations = {
    notice: "NOTICE",
    error: "ERROR",
    warning: "WARNING",
    success: "SUCCESS",
    guidance: "GUIDANCE",
    question: "QUESTION"
  };

  public static defineDecorativeVariations(decorativeVariationsNames: ReadonlyArray<string>): typeof AdmonitionBlock {
    return ComponentsAuxiliaries.defineDecorativeVariations(decorativeVariationsNames, AdmonitionBlock);
  }


  /* ━━━ CSS Classes ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  protected get rootElementModifierCSS_Classes(): ReadonlyArray<string> {
    return [

      ...ComponentsAuxiliaries.addThemeCSS_ClassToArrayIfMust({
        themeValue: this.props.theme,
        allThemes: AdmonitionBlock.Themes,
        areThemesCSS_ClassesCommon: this.props.areThemesCSS_ClassesCommon,
        CSS_Namespace: AdmonitionBlock.CSS_NAMESPACE
      }),

      ...ComponentsAuxiliaries.addGeometricVariationCSS_ClassToArrayIfMust({
        geometricVariation: this.props.geometricVariation,
        allGeometricVariations: AdmonitionBlock.GeometricVariations,
        CSS_Namespace: AdmonitionBlock.CSS_NAMESPACE
      }),

      ...ComponentsAuxiliaries.addDecorativeVariationCSS_ClassToArrayIfMust({
        decorativeVariation: this.props.decorativeVariation,
        allDecorativeVariations: AdmonitionBlock.DecorativeVariations,
        CSS_Namespace: AdmonitionBlock.CSS_NAMESPACE
      }),

      ...isNotUndefined(this.props.className) ? [ this.props.className ] : []

    ];
  }


  /* ━━━ ID Generating ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── Instance ID ──────────────────────────────────────────────────────────────────────────────────────────────── */
  protected readonly INSTANCE_ID: string = AdmonitionBlock.generateBasicID();
  protected static counterForInstanceID_Generating: number = 0;

  public static generateBasicID(): string {
    AdmonitionBlock.counterForInstanceID_Generating++;
    return `ADMONITION_BLOCK--YDF-${ AdmonitionBlock.counterForInstanceID_Generating }`;
  }


  /* ─── Title HTML ID ────────────────────────────────────────────────────────────────────────────────────────────── */
  protected TITLE_HTML_ID: string = `${ this.INSTANCE_ID }-TITLE`;


  /* ━━━ Rendering ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public render(): React.ReactNode {

    if (!this.state.isDisplaying) {
      return null;
    }


    return (
      <div
        role="alert"
        className={ [ AdmonitionBlock.CSS_NAMESPACE, ...this.rootElementModifierCSS_Classes ].join(" ") }
      >

        { this.SVG_Icon }

        {
          isNotUndefined(this.props.title) && (
            <div
              className="AdmonitionBlock--YDF-Title"
              id={ this.TITLE_HTML_ID }
            >
              { this.props.title }
            </div>
          )
        }

        <div
          className="AdmonitionBlock--YDF-MainContent"
          aria-labelledby={ isNotUndefined(this.props.title) ? this.TITLE_HTML_ID : null }
        >

          { isNotUndefined(this.props.children) ? this.props.children : null }

        </div>

        {

          this.props.dismissible ? (
            <button
              className="AdmonitionBlock--YDF-DismissingButton"
              type="button"
              aria-label={ AdmonitionBlock.localization.dismissingButton.accessibilityGuidance }
              onClick={ (): void => { this.setState({ isDisplaying: false }); } }
            >
              <MultiplicationSignIcon__Boxed__Filled className="AdmonitionBlock--YDF-DismissingButton-Icon"/>
            </button>
          ) : null

        }

      </div>
    );
  }


}


namespace AdmonitionBlock {

  export type Properties = Readonly<{
    title?: string;
    hasDefaultSVG_Icon: boolean;
    dismissible: boolean;
    theme: string;
    areThemesCSS_ClassesCommon: boolean;
    geometricVariation: string;
    decorativeVariation: string;
    children?: React.ReactNode;
    className?: string;
  }>;

  export type State = Readonly<{
    isDisplaying: boolean;
  }>;

  export type Themes = {
    readonly regular: "REGULAR";
    [themeName: string]: string;
  };

  export type GeometricVariations = {
    readonly regular: "REGULAR";
    readonly stickyNoteLike: "STICKY_NOTE_LIKE";
    [variationName: string]: string;
  };

  export type DecorativeVariations = {
    readonly notice: "NOTICE";
    readonly error: "ERROR";
    readonly warning: "WARNING";
    readonly success: "SUCCESS";
    readonly guidance: "GUIDANCE";
    readonly question: "QUESTION";
    [variationName: string]: string;
  };

}


export default AdmonitionBlock;
