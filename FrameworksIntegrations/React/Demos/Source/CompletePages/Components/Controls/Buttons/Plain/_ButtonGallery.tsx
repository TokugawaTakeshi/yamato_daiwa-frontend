import React from "react";
import Gallery from "../../../../../Gallery";
import { Button, ThemesShowcase } from "@yamato-daiwa/frontend-react";


class ButtonGallery extends Gallery<ButtonGallery.PartialsFlags> {

  private static readonly THEME_KEY_LABEL_PREFIX: string = "Button__YDF.Themes.";
  private static readonly GEOMETRIC_VARIATION_KEY_LABEL_PREFIX: string = "Button__YDF.GeometricVariations.";
  private static readonly DECORATIVE_VARIATION_KEY_LABEL_PREFIX: string = "Button__YDF.DecorativeVariations.";

  public render(): React.ReactNode {
    return (
      <>

        <h1
          className={
            [ "Heading1", this.props.mustVisuallyHideTopHeading ? [ "YDF_Gallery-InvisibleHeading" ] : [] ].join(" ")
          }
        >
          Button Component Demos
        </h1>


        { /* ━━━ Minimal ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */ }
        {
          (this.mustRenderAllPartials || this.props.partialsFlags.minimal) &&

            <ThemesShowcase
              themes={ Button.Themes }
              themeKeyLabelPrefix={ ButtonGallery.THEME_KEY_LABEL_PREFIX }
              geometricVariations={ Button.GeometricVariations }
              geometricVariationLabelPrefix={ ButtonGallery.GEOMETRIC_VARIATION_KEY_LABEL_PREFIX }
              decorativeVariations={ Button.DecorativeVariations }
              decorativeVariationLabelPrefix={ ButtonGallery.DECORATIVE_VARIATION_KEY_LABEL_PREFIX }
              decorativeVariationsListItemAdditionalCSS_Classes={ [ "ButtonGallery-DecorativeVariationsListItem" ] }
              renderChild={

                ({ theme, geometricVariation, decorativeVariation }: ThemesShowcase.DataForChildren): React.ReactElement =>

                    <dl className="ButtonGallery-PseudoTable">

                      <dt>Button</dt>
                      <dd>
                        <Button
                          label="Click 押下"
                          theme={ theme.key }
                          geometricVariation={ geometricVariation.value }
                          decorativeVariation={ decorativeVariation.value }
                        />
                      </dd>

                      <dt>Link</dt>
                      <dd>
                        <Button
                          label="Click 押下"
                          reactLinkRoute="#"
                          theme={ theme.key }
                          geometricVariation={ geometricVariation.value }
                          decorativeVariation={ decorativeVariation.value }
                        />
                      </dd>

                      <dt>Input</dt>
                      <dd>
                        <Button
                          label="Click 押下"
                          HTML_Type={ Button.HTML_Types.inputButton }
                          theme={ theme.key }
                          geometricVariation={ geometricVariation.value }
                          decorativeVariation={ decorativeVariation.value }
                        />
                      </dd>

                    </dl>

              }
            />
        }

      </>
    );
  }

}


namespace ButtonGallery {

  export type PartialsFlags = Readonly<{
    minimal?: boolean;
    longLabels?: boolean;
    prependedSVG_Icons?: boolean;
    appendedSVG_Icons?: boolean;
    loneSVG_Icons?: boolean;
    customIcons?: boolean;
    pillShapeGeometricModifier?: boolean;
    squareShapeGeometricModifier?: boolean;
    squareShapeUnlessOverflowedGeometricModifier?: boolean;
    singleLineGeometricModifier?: boolean;
    noLeftBorderAndRoundingsGeometricModifier?: boolean;
    noRightBorderAndRoundingsGeometricModifier?: boolean;
    bordersDisguisingDecorativeModifier?: boolean;
    noBackgroundDecorativeModifier?: boolean;
    loadingPlaceholder?: boolean;
  }>;

}


export default ButtonGallery;
