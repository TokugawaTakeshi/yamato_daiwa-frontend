/* ─── GUI components ────────────────────────────────────────────────────────────────────────────────────────────── */
import { Badge, ThemesShowcase, CalendarIcon } from "@yamato-daiwa/frontend-react";
import type { BadgeLoadingPlaceholder } from "@yamato-daiwa/frontend-react";

/* ─── Framework ─────────────────────────────────────────────────────────────────────────────────────────────────── */
import type { ReactElement } from "react";
import React from "react";
import ReactPropertiesValidation from "prop-types";

/* ─── Utils ─────────────────────────────────────────────────────────────────────────────────────────────────────── */
import { getRandomString } from "@yamato-daiwa/es-extensions";


const BadgeDemo: React.FC<BadgeDemo.Properties> = (
  {
    headings = true,
    valuesOnly = true,
    keysAndValues = true,
    longLabels = true,
    geometricModifiers = { pillShape: true, singleLine: true },
    decorativeModifiers = { bordersDisguising: true },
    loadingPlaceholder = true
  }: BadgeDemo.Properties
): ReactElement => {

  const THEME_KEY_LABEL_PREFIX: string = "Badge__YDF.Themes.";
  const GEOMETRIC_VARIATION_KEY_LABEL_PREFIX: string = "Badge__YDF.GeometricVariations.";
  const DECORATIVE_VARIATION_KEY_LABEL_PREFIX: string = "Badge__YDF.DecorativeVariations.";

  const textOverflowSafetyTest: string = `OVERFLOW_TEST-gh${ getRandomString({ minimalCharactersCount: 100 }) }`;

  const mustDisplayGeometricVariationsHeading: boolean = headings &&
      Array.from(Object.values(geometricModifiers)).some((isRequired: boolean): boolean => isRequired);

  const mustDisplayDecorativeVariationsHeading: boolean = headings &&
      Array.from(Object.values(decorativeModifiers)).some((isRequired: boolean): boolean => isRequired);


  return <React.Fragment>

    { headings && <h1 className="Heading1">Badge component testing</h1> }

    { /* ━━━ Values only ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */ }
    {
      valuesOnly && <>

        { headings && <h2 className="Heading2">Value only</h2> }

        <ThemesShowcase
          themes={ Badge.Themes }
          themeKeyLabelPrefix={ THEME_KEY_LABEL_PREFIX }
          geometricVariations={ Badge.GeometricVariations }
          geometricVariationLabelPrefix={ GEOMETRIC_VARIATION_KEY_LABEL_PREFIX }
          decorativeVariations={ Badge.DecorativeVariations }
          decorativeVariationLabelPrefix={ DECORATIVE_VARIATION_KEY_LABEL_PREFIX }
          decorativeVariationsWrapperTag="dl"
          decorativeVariationsWrapperAdditionalCSS_Classes={ [ "BadgeDemo-BadgesTwoColumnsTable" ] }
        >
          {
            ({
               theme,
               geometricVariation,
               decorativeVariation,
               iterationKey
            }: ThemesShowcase.ChildrenProperties): ReactElement =>
                <>
                  <dt key={ `${ iterationKey }-KEY` }>
                    { `Badge__YDF.DecorativeVariations.${ decorativeVariation.key }` }
                  </dt>
                  <dd key={ `${ iterationKey }-VALUE` }>
                    <Badge.Implementation
                      valueLabel="Value"
                      theme={ theme.value }
                      geometry={ geometricVariation.value }
                      decoration={ decorativeVariation.value }
                    />
                  </dd>
                </>
          }

        </ThemesShowcase>

      </>
    }


    { /* ━━━ Keys and values ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */ }
    {

      keysAndValues && <>

        { headings && <h2 className="Heading2">Value only</h2> }

        <ThemesShowcase
          themes={ Badge.Themes }
          themeKeyLabelPrefix={ THEME_KEY_LABEL_PREFIX }
          geometricVariations={ Badge.GeometricVariations }
          geometricVariationLabelPrefix={ GEOMETRIC_VARIATION_KEY_LABEL_PREFIX }
          decorativeVariations={ Badge.DecorativeVariations }
          decorativeVariationLabelPrefix={ DECORATIVE_VARIATION_KEY_LABEL_PREFIX }
          decorativeVariationsWrapperTag="dl"
          decorativeVariationsWrapperAdditionalCSS_Classes={ [ "BadgeDemo-BadgesTwoColumnsTable" ] }
        >
          {
            ({
               theme,
               geometricVariation,
               decorativeVariation,
               iterationKey
            }: ThemesShowcase.ChildrenProperties): ReactElement =>
                <>
                  <dt key={ `${ iterationKey }-KEY` }>
                    { `Badge__YDF.DecorativeVariations.${ decorativeVariation.key }` }
                  </dt>
                  <dd key={ `${ iterationKey }-VALUE` }>
                    <Badge.Implementation
                      keyLabel="Key"
                      valueLabel="Value"
                      theme={ theme.value }
                      geometry={ geometricVariation.value }
                      decoration={ decorativeVariation.value }
                    />
                  </dd>
                </>
          }

        </ThemesShowcase>

      </>

    }


    { /* ━━━ Long labels ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */ }
    {

      longLabels && <div className="BadgeDemo-BadgesFlow">

        { headings && <h2 className="Heading2">Long labels</h2> }

        <Badge.Implementation
          keyLabel={ textOverflowSafetyTest }
          valueLabel={ textOverflowSafetyTest }
          decoration={ Badge.DecorativeVariations.achromaticPastel }
        />

      </div>

    }


    { /* ━━━ Icons, keys and values ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */ }
    {

      keysAndValues && <>

        { headings && <h2 className="Heading2">Icons, keys and values</h2> }

        <ThemesShowcase
          themes={ Badge.Themes }
          themeKeyLabelPrefix={ THEME_KEY_LABEL_PREFIX }
          geometricVariations={ Badge.GeometricVariations }
          geometricVariationLabelPrefix={ GEOMETRIC_VARIATION_KEY_LABEL_PREFIX }
          decorativeVariations={ Badge.DecorativeVariations }
          decorativeVariationLabelPrefix={ DECORATIVE_VARIATION_KEY_LABEL_PREFIX }
          decorativeVariationsWrapperTag="dl"
          decorativeVariationsWrapperAdditionalCSS_Classes={ [ "BadgeDemo-BadgesTwoColumnsTable" ] }
        >
          {
            ({
               theme,
               geometricVariation,
               decorativeVariation,
               iterationKey
             }: ThemesShowcase.ChildrenProperties): ReactElement =>
                <>
                  <dt key={ `${ iterationKey }-KEY` }>
                    { `Badge__YDF.DecorativeVariations.${ decorativeVariation.key }` }
                  </dt>
                  <dd key={ `${ iterationKey }-VALUE` }>
                    <Badge.Implementation
                      keyLabel="Key"
                      valueLabel="Value"
                      SVG_Icon={ CalendarIcon }
                      theme={ theme.value }
                      geometry={ geometricVariation.value }
                      decoration={ decorativeVariation.value }
                    />
                  </dd>
                </>
          }

        </ThemesShowcase>

      </>

    }


    { /* ━━━ Icons and values ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */ }
    {

      keysAndValues && <>

        { headings && <h2 className="Heading2">Icons and values</h2> }

        <ThemesShowcase
          themes={ Badge.Themes }
          themeKeyLabelPrefix={ THEME_KEY_LABEL_PREFIX }
          geometricVariations={ Badge.GeometricVariations }
          geometricVariationLabelPrefix={ GEOMETRIC_VARIATION_KEY_LABEL_PREFIX }
          decorativeVariations={ Badge.DecorativeVariations }
          decorativeVariationLabelPrefix={ DECORATIVE_VARIATION_KEY_LABEL_PREFIX }
          decorativeVariationsWrapperTag="dl"
          decorativeVariationsWrapperAdditionalCSS_Classes={ [ "BadgeDemo-BadgesTwoColumnsTable" ] }
        >
          {
            ({
               theme,
               geometricVariation,
               decorativeVariation,
               iterationKey
            }: ThemesShowcase.ChildrenProperties): ReactElement =>
                <>
                  <dt key={ `${ iterationKey }-KEY` }>
                    { `Badge__YDF.DecorativeVariations.${ decorativeVariation.key }` }
                  </dt>
                  <dd key={ `${ iterationKey }-VALUE` }>
                    <Badge.Implementation
                      valueLabel="Value"
                      SVG_Icon={ CalendarIcon }
                      theme={ theme.value }
                      geometry={ geometricVariation.value }
                      decoration={ decorativeVariation.value }
                    />
                  </dd>
                </>
          }

        </ThemesShowcase>

      </>

    }


    { /* ━━━ Geometric modifiers ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */ }
    { mustDisplayGeometricVariationsHeading && <h2 className="Heading2">Geometric modifiers</h2> }

    { /* ─── Pill shape ─────────────────────────────────────────────────────────────────────────────────────────── */ }
    {

        geometricModifiers.pillShape && <>

          { headings && <h3 className="Heading3">Pill shape</h3> }

          <ThemesShowcase
              themes={ Badge.Themes }
              themeKeyLabelPrefix={ THEME_KEY_LABEL_PREFIX }
              geometricVariations={ Badge.GeometricVariations }
              geometricVariationLabelPrefix={ GEOMETRIC_VARIATION_KEY_LABEL_PREFIX }
              decorativeVariations={ Badge.DecorativeVariations }
              decorativeVariationLabelPrefix={ DECORATIVE_VARIATION_KEY_LABEL_PREFIX }
              decorativeVariationsWrapperTag="dl"
              decorativeVariationsWrapperAdditionalCSS_Classes={ [ "BadgeDemo-BadgesTwoColumnsTable" ] }
          >
            {
              ({
                 theme,
                 geometricVariation,
                 decorativeVariation,
                 iterationKey
              }: ThemesShowcase.ChildrenProperties): ReactElement =>
                  <>
                    <dt key={ `${ iterationKey }-KEY` }>
                      { `Badge__YDF.DecorativeVariations.${ decorativeVariation.key }` }
                    </dt>
                    <dd key={ `${ iterationKey }-VALUE` }>
                      <Badge.Implementation
                        keyLabel="Key"
                        valueLabel="Value"
                        theme={ theme.value }
                        geometry={ geometricVariation.value }
                        geometricModifiers={ [ Badge.GeometricModifiers.pillShape ] }
                        decoration={ decorativeVariation.value }
                      />
                    </dd>
                  </>
            }

          </ThemesShowcase>

        </>

    }

    { /* ─── Single line ────────────────────────────────────────────────────────────────────────────────────────── */ }
    {

      geometricModifiers.singleLine && <>

        { headings && <h2 className="Heading2">Single line</h2> }

        <div className="BadgeDemo-BadgesFlow BadgeDemo-BadgesFlow__LimitedChildrenMaximalWidth">
          <Badge.Implementation
            keyLabel={ textOverflowSafetyTest }
            valueLabel={ textOverflowSafetyTest }
            geometricModifiers={ [ Badge.GeometricModifiers.singleLine ] }
            decoration={ Badge.DecorativeVariations.achromaticPastel }
          />
        </div>

      </>

    }


    { /* ━━━ Decorative modifiers ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */ }
    { mustDisplayDecorativeVariationsHeading && <h2 className="Heading2">Decorative modifiers</h2> }

    { /* ─── Borders disguising ─────────────────────────────────────────────────────────────────────────────────── */ }
    {

      decorativeModifiers.bordersDisguising && <>

        { headings && <h3 className="Heading3">Borders disguising</h3> }

        <ThemesShowcase
            themes={ Badge.Themes }
            themeKeyLabelPrefix={ THEME_KEY_LABEL_PREFIX }
            geometricVariations={ Badge.GeometricVariations }
            geometricVariationLabelPrefix={ GEOMETRIC_VARIATION_KEY_LABEL_PREFIX }
            decorativeVariations={ Badge.DecorativeVariations }
            decorativeVariationLabelPrefix={ DECORATIVE_VARIATION_KEY_LABEL_PREFIX }
            decorativeVariationsWrapperTag="dl"
            decorativeVariationsWrapperAdditionalCSS_Classes={ [ "BadgeDemo-BadgesTwoColumnsTable" ] }
        >
          {
            ({
               theme,
               geometricVariation,
               decorativeVariation,
               iterationKey
             }: ThemesShowcase.ChildrenProperties): ReactElement =>
                <>
                  <dt key={ `${ iterationKey }-KEY` }>
                    { `Badge__YDF.DecorativeVariations.${ decorativeVariation.key }` }
                  </dt>
                  <dd key={ `${ iterationKey }-VALUE` }>
                    <Badge.Implementation
                      keyLabel="Key"
                      valueLabel="Value"
                      theme={ theme.value }
                      geometry={ geometricVariation.value }
                      geometricModifiers={ [ Badge.GeometricModifiers.pillShape ] }
                      decoration={ decorativeVariation.value }
                      decorativeModifiers={ [ Badge.DecorativeModifiers.bordersDisguising ] }
                    />
                  </dd>
                </>
          }

        </ThemesShowcase>

      </>

    }


    { /* ━━━ Loading placeholder ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */ }
    {

      loadingPlaceholder && <>

        { headings && <h2 className="Heading2">Loading placeholder</h2> }

        <div className="BadgeDemo-BadgesFlow">
          <>

            {

              Object.values(Badge.GeometricVariations).map(
                  (geometricVariation: string): BadgeLoadingPlaceholder =>
                      <Badge.LoadingPlaceholderImplementation
                        key={ `BADGE-LOADING_PLACEHOLDER-${ geometricVariation }` }
                        geometry={ geometricVariation }
                      />
              )

            }

            {

              Object.values(Badge.GeometricVariations).map(
                  (geometricVariation: string): BadgeLoadingPlaceholder =>
                      <Badge.LoadingPlaceholderImplementation
                        key={ `BADGE-LOADING_PLACEHOLDER-${ geometricVariation }` }
                        geometry={ geometricVariation }
                        geometricModifiers={ Badge.GeometricModifiers.pillShape }
                      />
              )

            }

          </>
        </div>

      </>

    }

  </React.Fragment>;

};


namespace BadgeDemo {

  export type Properties = {
    headings?: boolean;
    valuesOnly?: boolean;
    keysAndValues?: boolean;
    iconsAndValues?: boolean;
    longLabels?: boolean;
    geometricModifiers?: Readonly<{ pillShape: boolean; singleLine: boolean; }>;
    decorativeModifiers?: Readonly<{ bordersDisguising: boolean; }>;
    loadingPlaceholder?: boolean;
  };

}


BadgeDemo.propTypes = {
  headings: ReactPropertiesValidation.bool
};


BadgeDemo.defaultProps = {
  headings: true
};


export default BadgeDemo;
