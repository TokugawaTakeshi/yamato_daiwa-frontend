﻿using YamatoDaiwa.Frontend.Components.Abstractions;
using YamatoDaiwa.Frontend.Helpers;
using YamatoDaiwa.CSharpExtensions;


namespace YamatoDaiwa.Frontend.Components.AdmonitionBlock;


public partial class AdmonitionBlock : 
    Microsoft.AspNetCore.Components.ComponentBase,
    ISupportsFlexibleExternalCSS_ClassesSpecifyingForRootElement
{
  
  [Microsoft.AspNetCore.Components.Parameter] 
  public string? title { get; set; }
  
  [Microsoft.AspNetCore.Components.Parameter]
  public bool hasPrependedSVG_Icon { get; set; } = false;
  
  
  /* ━━━ Dismissing button ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  [Microsoft.AspNetCore.Components.Parameter]
  public bool hasDismissingButton { get; set; } = false;
  
  [Microsoft.AspNetCore.Components.Inject] 
  protected Microsoft.JSInterop.IJSRuntime JSRuntime { get; set; } = null!;
  
  private void onClickDismissingButton()
  {
    // JSRuntime.InvokeVoidAsync("CollapsingAnimation.animate", this.rootElement);
  }
  
  
  /* ━━━ Theming ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public enum StandardThemes { regular }
  
  protected internal static Type? CustomThemes;
  
  public static void defineCustomThemes(Type CustomThemes) 
  {
    YDF_ComponentsHelper.ValidateCustomTheme(CustomThemes);
    AdmonitionBlock.CustomThemes = CustomThemes;
  }
  
  protected string _theme = AdmonitionBlock.StandardThemes.regular.ToString();
  
  [Microsoft.AspNetCore.Components.Parameter]
  public object theme
  {
    get => this._theme;
    set => YDF_ComponentsHelper.
        AssignThemeIfItIsValid<AdmonitionBlock.StandardThemes>(value, AdmonitionBlock.CustomThemes, ref this._theme);
  }
  
  protected internal static bool mustConsiderThemesCSS_ClassesAsCommon = YDF_ComponentsHelper.areThemesCSS_ClassesCommon;

  public static void considerThemesAsCommon()
  {
    AdmonitionBlock.mustConsiderThemesCSS_ClassesAsCommon = true;
  }

  [Microsoft.AspNetCore.Components.Parameter]
  public bool areThemesCSS_ClassesCommon { get; set; } =
      YDF_ComponentsHelper.areThemesCSS_ClassesCommon || AdmonitionBlock.mustConsiderThemesCSS_ClassesAsCommon;
  
  
  /* ─── Geometry ─────────────────────────────────────────────────────────────────────────────────────────────────── */
  public enum StandardGeometricVariations
  {
    regular,
    stickyNoteLike
  }

  protected internal static Type? CustomGeometricVariations;

  public static void defineCustomGeometricVariations(Type CustomGeometricVariations)
  {
    YDF_ComponentsHelper.ValidateCustomGeometricVariation(CustomGeometricVariations);
    AdmonitionBlock.CustomGeometricVariations = CustomGeometricVariations;

  }
  
  protected string _geometricVariation = AdmonitionBlock.StandardGeometricVariations.regular.ToString();

  [Microsoft.AspNetCore.Components.Parameter]
  public object geometricVariation
  {
    get => this._geometricVariation;
    set => YDF_ComponentsHelper.AssignGeometricVariationIfItIsValid<AdmonitionBlock.StandardGeometricVariations>(
      value, AdmonitionBlock.CustomGeometricVariations, ref this._geometricVariation
    );
  }
  
  
  /* ─── Decoration ───────────────────────────────────────────────────────────────────────────────────────────────── */
  public enum StandardDecorativeVariations
  {
    notice,
    error,
    warning,
    success,
    guidance,
    question
  }

  protected internal static Type? CustomDecorativeVariations;
  
  public static void defineNewDecorativeVariations(Type CustomDecorativeVariations) {
    YDF_ComponentsHelper.ValidateCustomDecorativeVariation(CustomDecorativeVariations);
    AdmonitionBlock.CustomDecorativeVariations = CustomDecorativeVariations;
  }  

  protected string _decorativeVariation = null!;

  [Microsoft.AspNetCore.Components.Parameter]
  [Microsoft.AspNetCore.Components.EditorRequired]
  public required object decorativeVariation
  {
    get => _decorativeVariation;
    set => YDF_ComponentsHelper.AssignDecorativeVariationIfItIsValid<AdmonitionBlock.StandardDecorativeVariations>(
      value, AdmonitionBlock.CustomDecorativeVariations, ref this._decorativeVariation
    );
  }
  
  
  /* ━━━ CSS classes ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  [Microsoft.AspNetCore.Components.Parameter]
  public string? rootElementModifierCSS_Class { get; set; } = null;

  [Microsoft.AspNetCore.Components.Parameter]
  public string[]? rootElementModifierCSS_Classes { get; set; } = null;

  [Microsoft.AspNetCore.Components.Parameter]
  public string? rootElementSpaceSeparatedModifierCSS_Classes { get; set; } = null;

  private string composeClassAttributeValueForRootElement(string namespaceCSS_Class) => new List<string> { namespaceCSS_Class }.

      AddElementToEndIf(
        $"AdmonitionBlock--YDF__{ this._theme.ToUpperCamelCase() }Theme",
        YDF_ComponentsHelper.MustApplyThemeCSS_Class(
          typeof(AdmonitionBlock.StandardThemes), AdmonitionBlock.CustomThemes, this.areThemesCSS_ClassesCommon
        )
      ).

      AddElementToEndIf(
        $"AdmonitionBlock--YDF__{ this._geometricVariation.ToUpperCamelCase() }GeometricVariation",
        YDF_ComponentsHelper.MustApplyGeometricVariationModifierCSS_Class(
          typeof(AdmonitionBlock.StandardGeometricVariations), AdmonitionBlock.CustomGeometricVariations
        )
      ).

      AddElementToEndIf(
        $"AdmonitionBlock--YDF__{ this._decorativeVariation.ToUpperCamelCase() }DecorativeVariation",
        YDF_ComponentsHelper.MustApplyDecorativeVariationModifierCSS_Class(
          typeof(AdmonitionBlock.StandardDecorativeVariations), AdmonitionBlock.CustomDecorativeVariations
        )
      ).

      AddElementToEndIf(
        ((ISupportsFlexibleExternalCSS_ClassesSpecifyingForRootElement)this).rootElementSpaceSeparatedExternalCSS_Classes,
        rootElementSpaceSeparatedExternalCSS_Classes =>
          !String.IsNullOrEmpty(rootElementSpaceSeparatedExternalCSS_Classes)
      ).

      StringifyEachElementAndJoin(" ");
  

  /* ━━━ Child content ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  [Microsoft.AspNetCore.Components.Parameter]
  public Microsoft.AspNetCore.Components.RenderFragment? ChildContent { get; set; }

  [Microsoft.AspNetCore.Components.Parameter]
  public Microsoft.AspNetCore.Components.RenderFragment? customSVG_Icon { get; set; } = null;


  /* ━━━ IDs ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── Basic ID ─────────────────────────────────────────────────────────────────────────────────────────────────── */
  protected readonly string BASIC_ID = AdmonitionBlock.generateBasicID();
  protected static uint counterForBasicID_Generating = 0;
  
  public static string generateBasicID()
  {
    AdmonitionBlock.counterForBasicID_Generating++;
    return $"ADMONITION_BLOCK--YDF-{ AdmonitionBlock.counterForBasicID_Generating }";
  }

  
  /* ─── Root element HTML ID ─────────────────────────────────────────────────────────────────────────────────────── */
  [Microsoft.AspNetCore.Components.Parameter]
  public string? HTML_ID { get; set; } = null;

  /* ─── Title HTML ID ────────────────────────────────────────────────────────────────────────────────────────────── */
  protected string TITLE_HTML_ID => $"{ this.BASIC_ID }-TITLE";
  
  
  /* ━━━ Localization ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public abstract class Localization
  {

    public abstract DismissingButton dismissingButton { get; }
    
    public struct DismissingButton
    {
      public required string accessibilityGuidance { get; init; }
    }
    
  }
  
  public static Localization localization = new AdmonitionBlockEnglishLocalization();

}
