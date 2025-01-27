import type { ReactElement } from "react";
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
        decorativeVariationsWrapperTag: DecorativeVariationsWrapperTag = "dl",
        decorativeVariationsWrapperAdditionalCSS_Classes = [],
        decorativeVariationsListItemAdditionalCSS_Classes = [],
        renderChild
      }: ThemesShowcase.Properties
    ): ReactElement =>

        <dl className="ThemesShowcase--YDF">
          {

            Object.entries(themes).map(
              ([ themeKey, themeValue ]: [ string, string ]): ReactElement =>

                  <React.Fragment key={ themeKey }>

                    <dt className="ThemesShowcase--YDF-KeyLabel" >
                      { `${ themeKeyLabelPrefix }${ themeKey }` }
                    </dt>

                    <dd className="ThemesShowcase--YDF-ValueSection">
                      <dl className="ThemesShowcase--YDF-ChildList">
                        {
                          Object.entries(geometricVariations).map(
                            ([ geometricVariationKey, geometricVariationValue ]: [ string, string ]): ReactElement => (
                              <React.Fragment key={ `${ themeKey }-${ geometricVariationKey }` }>

                                <dt className="ThemesShowcase--YDF-KeyLabel">
                                  { `${ geometricVariationLabelPrefix }${ geometricVariationKey }` }
                                </dt>

                                <dd className="ThemesShowcase--YDF-ValueSection">

                                  <DecorativeVariationsWrapperTag
                                    className={
                                      [
                                        "ThemesShowcase--YDF-ChildList",
                                        decorativeVariationsWrapperAdditionalCSS_Classes
                                      ].join(" ")
                                    }
                                  >

                                    {

                                      Object.entries(decorativeVariations).map(

                                          /* eslint-disable-next-line max-nested-callbacks --
                                           * Maybe it will be better to extract this content to other method, but the
                                           *   parameters count will be large. */
                                          (
                                            [ decorativeVariationKey, decorativeVariationValue ]: [ string, string ]
                                          ): ReactElement =>

                                              (
                                                DecorativeVariationsWrapperTag === "dl" ?

                                                    <React.Fragment
                                                      key={
                                                        `${ themeKey }-${ geometricVariationKey }-${ decorativeVariationKey }`
                                                      }
                                                    >

                                                      <dt className="ThemesShowcase--YDF-KeyLabel">
                                                        { `${ decorativeVariationLabelPrefix }${ decorativeVariationKey }` }
                                                      </dt>

                                                      <dd
                                                        className={
                                                          [
                                                            "ThemesShowcase--YDF-ValueSection",
                                                            decorativeVariationsListItemAdditionalCSS_Classes
                                                          ].join(" ")
                                                        }
                                                      >

                                                        {
                                                          renderChild({
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
                                                            }
                                                          })
                                                        }

                                                      </dd>

                                                    </React.Fragment> :

                                                    renderChild({
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
                                                      }
                                                    })
                                              )
                                          )

                                    }

                                  </DecorativeVariationsWrapperTag>

                                </dd>

                              </React.Fragment>
                            )
                          )
                        }
                      </dl>
                    </dd>
                  </React.Fragment>
              )
          }
        </dl>;


namespace ThemesShowcase {

  export type Properties = Readonly<{
    themes: Readonly<{ [themeKey: string]: string; }>;
    themeKeyLabelPrefix?: string;
    geometricVariations: Readonly<{ [themeKey: string]: string; }>;
    geometricVariationLabelPrefix?: string;
    decorativeVariations: Readonly<{ [themeKey: string]: string; }>;
    decorativeVariationLabelPrefix?: string;
    decorativeVariationsWrapperTag?: React.ElementType;
    decorativeVariationsWrapperAdditionalCSS_Classes?: ReadonlyArray<string>;
    decorativeVariationsListItemAdditionalCSS_Classes?: ReadonlyArray<string>;
    renderChild: (dataForChildren: DataForChildren) => React.ReactElement;
  }>;

  export type DataForChildren = Readonly<{
    theme: Readonly<{ key: string; value: string; }>;
    geometricVariation: Readonly<{ key: string; value: string; }>;
    decorativeVariation: Readonly<{ key: string; value: string; }>;
  }>;

}


export default ThemesShowcase;
