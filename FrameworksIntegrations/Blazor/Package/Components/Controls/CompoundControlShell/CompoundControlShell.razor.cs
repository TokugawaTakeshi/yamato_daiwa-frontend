using YamatoDaiwa.Frontend.Components.Abstractions;
using YamatoDaiwa.Frontend.Helpers;
using YamatoDaiwa.CSharpExtensions;
using YamatoDaiwa.Frontend.Components.Controls.Validation;


namespace YamatoDaiwa.Frontend.Components.Controls.CompoundControlShell;


public partial class CompoundControlShell: 
    Microsoft.AspNetCore.Components.ComponentBase,
    ISupportsFlexibleExternalCSS_ClassesSpecifyingForRootElement
{
  
  /* ━━━ Public methods & related fields ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  protected Microsoft.AspNetCore.Components.ElementReference rootElement = default!;
  
  public IValidatableControl.RootElementOffsetCoordinates GetRootElementOffsetCoordinates()
  {
    return new IValidatableControl.RootElementOffsetCoordinates()
    {
      Left = 0,
      Top = 0
    };
  }

  
  /* ━━━ Textings ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  [Microsoft.AspNetCore.Components.Parameter] 
  public string? label { get; set; }
  
  [Microsoft.AspNetCore.Components.Parameter] 
  public string? guidance { get; set; }

  public string? formattedGuidance
  {
    get
    {
    
      if (this.guidance is null)
      {
        return null;
      }
      
      
      string[] guidanceSegments = this.guidance.Split("**");

      if (guidanceSegments.Length == 0)
      {
        return null;
      }
      
      
      for (int segmentIndex = 0; segmentIndex <= guidanceSegments.Length - 1; segmentIndex++)
      {
        string currentSegment = guidanceSegments[segmentIndex];

        if (segmentIndex % 2 != 0)
        {
          guidanceSegments[segmentIndex] =
            $"<span class=\"CompoundControlShell--YDF-Guidance-AccentedFragment\">{ currentSegment }</span>";
        }
      }

      return String.Join("", guidanceSegments);
      
    }
  }
  
  /* ━━━ Inputting requiring ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  [Microsoft.AspNetCore.Components.Parameter] 
  public bool required { get; set; } = false;
  
  [Microsoft.AspNetCore.Components.Parameter] 
  public bool mustDisplayAppropriateBadgeIfInputIsRequired { get; set; } = false;
  
  [Microsoft.AspNetCore.Components.Parameter] 
  public bool mustDisplayAppropriateBadgeIfInputIsOptional { get; set; } = false;
  
  [Microsoft.AspNetCore.Components.Parameter] 
  public bool mustAddInvisibleBadgeForHeightEqualizingWhenNoBadge { get; set; } = false;
  
  
  /* ━━━ Inputting validation ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  [Microsoft.AspNetCore.Components.Parameter] 
  public bool invalidInputHighlightingIfAnyValidationErrorsMessages { get; set; } = false;

  [Microsoft.AspNetCore.Components.Parameter] 
  public bool validValueHighlightingIfNoValidationErrorsMessages { get; set; } = false;

  [Microsoft.AspNetCore.Components.Parameter] 
  public string[] validationErrorsMessages { get; set; } = Array.Empty<string>();

  [Microsoft.AspNetCore.Components.Parameter]
  public InputtedValueValidation.AsynchronousChecks.Status? asynchronousChecksCheckStatus { get; set; } = null;
  
  
  /* ━━━ Theming ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public enum StandardThemes { regular }
  
  protected internal static Type? CustomThemes;
  
  public static void defineCustomThemes(Type CustomThemes) 
  {
    YDF_ComponentsHelper.ValidateCustomTheme(CustomThemes);
    CompoundControlShell.CustomThemes = CustomThemes;
  }
  
  protected string _theme = CompoundControlShell.StandardThemes.regular.ToString();
  
  [Microsoft.AspNetCore.Components.Parameter]
  public object theme
  {
    get => this._theme;
    set => YDF_ComponentsHelper.
        AssignThemeIfItIsValid<CompoundControlShell.StandardThemes>(value, CompoundControlShell.CustomThemes, ref this._theme);
  }
  
  protected internal static bool mustConsiderThemesCSS_ClassesAsCommon = YDF_ComponentsHelper.areThemesCSS_ClassesCommon;

  public static void considerThemesAsCommon()
  {
    CompoundControlShell.mustConsiderThemesCSS_ClassesAsCommon = true;
  }

  [Microsoft.AspNetCore.Components.Parameter]
  public bool areThemesCSS_ClassesCommon { get; set; } =
      YDF_ComponentsHelper.areThemesCSS_ClassesCommon || CompoundControlShell.mustConsiderThemesCSS_ClassesAsCommon;
  
  
  /* ─── Geometry ─────────────────────────────────────────────────────────────────────────────────────────────────── */
  public enum StandardGeometricVariations
  {
    regular,
    small
  }

  protected internal static Type? CustomGeometricVariations;

  public static void defineCustomGeometricVariations(Type CustomGeometricVariations)
  {
    YDF_ComponentsHelper.ValidateCustomGeometricVariation(CustomGeometricVariations);
    CompoundControlShell.CustomGeometricVariations = CustomGeometricVariations;

  }
  
  protected string _geometricVariation = CompoundControlShell.StandardGeometricVariations.regular.ToString();

  [Microsoft.AspNetCore.Components.Parameter]
  public object geometricVariation
  {
    get => this._geometricVariation;
    set => YDF_ComponentsHelper.AssignGeometricVariationIfItIsValid<CompoundControlShell.StandardGeometricVariations>(
      value, CompoundControlShell.CustomGeometricVariations, ref this._geometricVariation
    );
  }
  
  
  /* ─── Decoration ───────────────────────────────────────────────────────────────────────────────────────────────── */
  public enum StandardDecorativeVariations { regular }

  protected internal static Type? CustomDecorativeVariations;
  
  public static void defineNewDecorativeVariations(Type CustomDecorativeVariations) {
    YDF_ComponentsHelper.ValidateCustomDecorativeVariation(CustomDecorativeVariations);
    CompoundControlShell.CustomDecorativeVariations = CustomDecorativeVariations;
  }  

  protected string _decorativeVariation = CompoundControlShell.StandardDecorativeVariations.regular.ToString();

  [Microsoft.AspNetCore.Components.Parameter]
  public required object decorativeVariation
  {
    get => _decorativeVariation;
    set => YDF_ComponentsHelper.AssignDecorativeVariationIfItIsValid<CompoundControlShell.StandardDecorativeVariations>(
      value, CompoundControlShell.CustomDecorativeVariations, ref this._decorativeVariation
    );
  }
  
  
  /* ━━━ Displaying of elements ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  protected bool mustDisplayHeader =>
    this.label is not null ||
    this.mustDisplayRequiredInputBadge ||
    this.mustDisplayOptionalInputBadge ||
    this.mustAddInvisibleBadgeForHeightEqualizingWhenNoBadge;

  protected bool mustDisplayRequiredInputBadge => this.required && this.mustDisplayAppropriateBadgeIfInputIsRequired;
  protected bool mustDisplayOptionalInputBadge => !this.required && this.mustDisplayAppropriateBadgeIfInputIsOptional;
  
  
  /* ━━━ CSS classes ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  [Microsoft.AspNetCore.Components.Parameter]
  public string? rootElementModifierCSS_Class { get; set; } = null;

  [Microsoft.AspNetCore.Components.Parameter]
  public string[]? rootElementModifierCSS_Classes { get; set; } = null;

  [Microsoft.AspNetCore.Components.Parameter]
  public string? rootElementSpaceSeparatedModifierCSS_Classes { get; set; } = null;

  private string composeClassAttributeValueForRootElement(string namespaceCSS_Class) => new List<string> { namespaceCSS_Class }.

      AddElementToEndIf(
        $"CompoundControlShell--YDF__{ this._theme.ToUpperCamelCase() }Theme",
        YDF_ComponentsHelper.MustApplyThemeCSS_Class(
          typeof(CompoundControlShell.StandardThemes), CompoundControlShell.CustomThemes, this.areThemesCSS_ClassesCommon
        )
      ).

      AddElementToEndIf(
        $"CompoundControlShell--YDF__{ this._geometricVariation.ToUpperCamelCase() }GeometricVariation",
        YDF_ComponentsHelper.MustApplyGeometricVariationModifierCSS_Class(
          typeof(CompoundControlShell.StandardGeometricVariations), CompoundControlShell.CustomGeometricVariations
        )
      ).

      AddElementToEndIf(
        $"CompoundControlShell--YDF__{ this._decorativeVariation.ToUpperCamelCase() }DecorativeVariation",
        YDF_ComponentsHelper.MustApplyDecorativeVariationModifierCSS_Class(
          typeof(CompoundControlShell.StandardDecorativeVariations), CompoundControlShell.CustomDecorativeVariations
        )
      ).

      AddElementToEndIf(
        ((ISupportsFlexibleExternalCSS_ClassesSpecifyingForRootElement)this).rootElementSpaceSeparatedExternalCSS_Classes,
        rootElementSpaceSeparatedExternalCSS_Classes =>
          !String.IsNullOrEmpty(rootElementSpaceSeparatedExternalCSS_Classes)
      ).

      StringifyEachElementAndJoin(" ");
  
  
  [Microsoft.AspNetCore.Components.Parameter]
  public string? mainSlotSpaceSeparatedAdditionalCSS_Classes { get; set; }
    
  
  /* ━━━ IDs ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  [Microsoft.AspNetCore.Components.Parameter] 
  public string? coreElementHTML_ID { get; set; }
  
  [Microsoft.AspNetCore.Components.Parameter] 
  public string? labelElementHTML_ID { get; set; }
  
  
  /* ━━━ Child content ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  [Microsoft.AspNetCore.Components.Parameter]
  public Microsoft.AspNetCore.Components.RenderFragment? ChildContent { get; set; }
  
  
  /* ━━━ Localization ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public abstract class Localization
  {

    public abstract RequirementBadges requirementBadges { get; }
    
    public struct RequirementBadges
    {
      public required string required { get; init; }
      public required string optional { get; init; }
    }
    
  }
  
  public static Localization localization = new CompoundControlShellEnglishLocalization();
  
}