import React from "react";
import Gallery from "../../../Gallery";
import { AdmonitionBlock, ThemesShowcase } from "@yamato-daiwa/frontend-react";


class AdmonitionBlockGallery extends Gallery<AdmonitionBlockGallery.PartialsFlags> {

  private static readonly THEME_KEY_LABEL_PREFIX: string = "AdmonitionBlock__YDF.Themes.";
  private static readonly GEOMETRIC_VARIATION_KEY_LABEL_PREFIX: string = "AdmonitionBlock__YDF.GeometricVariations.";
  private static readonly DECORATIVE_VARIATION_KEY_LABEL_PREFIX: string = "AdmonitionBlock__YDF.DecorativeVariations.";

  public render(): React.ReactNode {
    return (
      <>

        <h1
          className={
            [ "Heading1", ...this.props.mustVisuallyHideTopHeading ? [ "YDF_Gallery-InvisibleHeading" ] : [] ].join(" ")
          }
        >
          AdmonitionBlock Component Demos
        </h1>


        { /* ━━━ Minimal ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */ }
        {
          (this.mustRenderAllPartials || this.props.partialsFlags.minimal) && <>

              <h2
                className={
                  [
                    "Heading2",
                    ...this.props.mustVisuallyHideAllHeadings ? [ "YDF_Gallery-InvisibleHeading" ] : []
                  ].join(" ")
                }
              >
                Minimal
              </h2>

              <ThemesShowcase
                themes={ AdmonitionBlock.Themes }
                themeKeyLabelPrefix={ AdmonitionBlockGallery.THEME_KEY_LABEL_PREFIX }
                geometricVariations={ AdmonitionBlock.GeometricVariations }
                geometricVariationLabelPrefix={ AdmonitionBlockGallery.GEOMETRIC_VARIATION_KEY_LABEL_PREFIX }
                decorativeVariations={ AdmonitionBlock.DecorativeVariations }
                decorativeVariationLabelPrefix={ AdmonitionBlockGallery.DECORATIVE_VARIATION_KEY_LABEL_PREFIX }
                decorativeVariationsListItemAdditionalCSS_Classes={ [ "AdmonitionBlockGallery-ListItem" ] }
                renderChild={

                  ({ theme, geometricVariation, decorativeVariation }: ThemesShowcase.DataForChildren): React.ReactElement =>

                      <AdmonitionBlock
                        theme={ theme.value }
                        geometricVariation={ geometricVariation.value }
                        decorativeVariation={ decorativeVariation.value }
                        className="AdmonitionBlockGallery-AdmonitionBlock"
                        rootElementAttributes={ { lang: "la" } }
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                          labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                          commodo consequat.
                      </AdmonitionBlock>

                }
              />

            </>
        }


        { /* ━━━ Titles ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */ }
        {
          (this.mustRenderAllPartials || this.props.partialsFlags.titles) && <>

            <h2
              className={
                [
                  "Heading2",
                  ...this.props.mustVisuallyHideAllHeadings ? [ "YDF_Gallery-InvisibleHeading" ] : []
                ].join(" ")
              }
            >
              Titles
            </h2>

            <ThemesShowcase
              themes={ AdmonitionBlock.Themes }
              themeKeyLabelPrefix={ AdmonitionBlockGallery.THEME_KEY_LABEL_PREFIX }
              geometricVariations={ AdmonitionBlock.GeometricVariations }
              geometricVariationLabelPrefix={ AdmonitionBlockGallery.GEOMETRIC_VARIATION_KEY_LABEL_PREFIX }
              decorativeVariations={ AdmonitionBlock.DecorativeVariations }
              decorativeVariationLabelPrefix={ AdmonitionBlockGallery.DECORATIVE_VARIATION_KEY_LABEL_PREFIX }
              decorativeVariationsListItemAdditionalCSS_Classes={ [ "AdmonitionBlockGallery-ListItem" ] }
              renderChild={

                ({ theme, geometricVariation, decorativeVariation }: ThemesShowcase.DataForChildren): React.ReactElement =>

                    <AdmonitionBlock
                      title="Titulo"
                      theme={ theme.value }
                      geometricVariation={ geometricVariation.value }
                      decorativeVariation={ decorativeVariation.value }
                      className="AdmonitionBlockGallery-AdmonitionBlock"
                      rootElementAttributes={ { lang: "la" } }
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                    </AdmonitionBlock>

              }
            />

          </>
        }

      </>
    );
  }

}


namespace AdmonitionBlockGallery {

  export type PartialsFlags = Readonly<{
    minimal: boolean;
    titles: boolean;
    defaultSVG_Icons: boolean;
    customSVG_Icons: boolean;
    titlesAndSVG_Icons: boolean;
    dismissingButton: boolean;
    centeredButton: boolean;
    actionBar: boolean;
  }>;

}


export default AdmonitionBlockGallery;
