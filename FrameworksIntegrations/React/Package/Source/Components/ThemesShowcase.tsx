import type { ReactElement, ReactNode } from "react";
import React from "react";


const ThemesShowcase: React.FC<ThemesShowcase.Properties> =

    (
      {
        themes,
        themeKeyLabelPrefix,
        geometricVariations,
        geometricVariationLabelPrefix,
        decorativeVariations,
        decorativeVariationLabelPrefix,
        decorativeVariationsWrapperTag: DecorativeVariationsWrapperTag = "ul",
        decorativeVariationsWrapperAdditionalCSS_Classes = [],
        children
      }: ThemesShowcase.Properties
    ): ReactElement =>

        <ul className="ThemesShowcase--YDF">

          {

            Object.entries(themes).map(
              ([ themeKey, themeValue ]: [ string, string ]): ReactElement =>

                  <li key={ `THEME-${ themeKey }` }>

                    <span className="ThemesShowcase--YDF-Label">{ `${ themeKeyLabelPrefix }${ themeKey }` }</span>

                    <ul className="ThemesShowcase--YDF-ChildList">

                      {

                        Object.entries(geometricVariations).map(
                          ([ geometricVariationKey, geometricVariationValue ]: [ string, string ]): ReactElement =>

                              <li key={ `GEOMETRIC_VARIATION-${ themeKey }-${ geometricVariationKey }` }>

                                <span className="ThemesShowcase--YDF-Label">
                                  { `${ geometricVariationLabelPrefix }${ geometricVariationKey }` }
                                </span>

                                <DecorativeVariationsWrapperTag
                                  className={ decorativeVariationsWrapperAdditionalCSS_Classes.join(" ") }
                                  key={ `DECORATIVE_VARIATIONS-${ themeKey }-${ geometricVariationKey }` }
                                >

                                  {

                                    Object.entries(decorativeVariations).map(

                                        /* eslint-disable-next-line max-nested-callbacks --
                                         * Maybe it will be better to extract this content to other method, but the parameters
                                         *   count will be large. */
                                        (
                                          [ decorativeVariationKey, decorativeVariationValue ]: [ string, string ]
                                        ): ReactElement =>

                                            (
                                              DecorativeVariationsWrapperTag === "ul" ?

                                                  <li key={ `DECORATIVE_VARIATION-${ themeKey }-${ decorativeVariationKey }` } >

                                                    <span className="ThemesShowcase--YDF-Label">
                                                      { `${ decorativeVariationLabelPrefix }${ decorativeVariationKey }` }
                                                    </span>

                                                    {
                                                      children({
                                                        theme: {
                                                          key: themeKey,
                                                          value: themeValue
                                                        },
                                                        geometricVariation: {
                                                          key: geometricVariationKey,
                                                          value: geometricVariationValue
                                                        },
                                                        decorativeVariation: {
                                                          key: decorativeVariationKey,
                                                          value: decorativeVariationValue
                                                        },
                                                        iterationKey:
                                                            `DECORATIVE_VARIATION-${ themeKey }-${ decorativeVariationKey }`
                                                      })
                                                    }

                                                  </li> :

                                                  <>
                                                    {
                                                      children({
                                                        theme: {
                                                          key: themeKey,
                                                          value: themeValue
                                                        },
                                                        geometricVariation: {
                                                          key: geometricVariationKey,
                                                          value: geometricVariationValue
                                                        },
                                                        decorativeVariation: {
                                                          key: decorativeVariationKey,
                                                          value: decorativeVariationValue
                                                        },
                                                        iterationKey:
                                                            `DECORATIVE_VARIATION-${ themeKey }-${ decorativeVariationKey }`
                                                      })
                                                    }
                                                  </>
                                            )
                                    )

                                  }

                                </DecorativeVariationsWrapperTag>

                              </li>
                        )

                      }

                    </ul>

                  </li>
              )

          }

        </ul>;


namespace ThemesShowcase {

  export interface Properties {
    themes: Readonly<{ [themeKey: string]: string; }>;
    themeKeyLabelPrefix?: string;
    geometricVariations: Readonly<{ [themeKey: string]: string; }>;
    geometricVariationLabelPrefix?: string;
    decorativeVariations: Readonly<{ [themeKey: string]: string; }>;
    decorativeVariationLabelPrefix?: string;
    decorativeVariationsWrapperTag?: React.ElementType;
    decorativeVariationsWrapperAdditionalCSS_Classes?: ReadonlyArray<string>;
    children: (properties: ChildrenProperties) => ReactNode;
  }

  export type ChildrenProperties = Readonly<{
    theme: Readonly<{ key: string; value: string; }>;
    geometricVariation: Readonly<{ key: string; value: string; }>;
    decorativeVariation: Readonly<{ key: string; value: string; }>;
    iterationKey: string;
  }>;

}


export default ThemesShowcase;
