using YamatoDaiwa.CSharpExtensions;
using YamatoDaiwa.Frontend.GUI_Components.Abstractions;
using YamatoDaiwa.Frontend.Helpers;


namespace YamatoDaiwa.Frontend.GUI_Components.Controls.Buttons.Plain;


public partial class Button :
  Microsoft.AspNetCore.Components.ComponentBase,
  ISupportsFlexibleExternalCSS_ClassesSpecifyingForRootElement
{
  
  public static string CSS_NAMESPACE = "Button--YDF";
  
  [Microsoft.AspNetCore.Components.Parameter(CaptureUnmatchedValues = true)]
  public IDictionary<string, object>? rootElementAttributes { get; set; }
  
  
  /* ━━━ HTML Type ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public enum HTML_Types
  {
    regular,
    submit,
    inputButton,
    inputSubmit,
    inputReset
  }
  
  [Microsoft.AspNetCore.Components.Parameter]
  public HTML_Types HTML_Type { get; set; } = HTML_Types.regular;
  
  
  [Microsoft.AspNetCore.Components.Parameter]
  public string? label { get; set; }
  
  [Microsoft.AspNetCore.Components.Parameter]
  public string? accessibilityGuidance { get; set; }
  
  
  /* ━━━ Theming ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public enum StandardThemes { regular }

  protected internal static Type? CustomThemes;

  public static void defineThemes(Type CustomThemes)
  {
    YDF_ComponentsHelper.ValidateCustomTheme(CustomThemes);
    Button.CustomThemes = CustomThemes;
  }

  protected string _theme = Button.StandardThemes.regular.ToString();

  [Microsoft.AspNetCore.Components.Parameter]
  [
    System.Diagnostics.CodeAnalysis.SuppressMessage(
      "Microsoft.Performance", 
      "BL0007", 
      Justification = "Optimized equivalent is too complex: https://stackoverflow.com/a/79302962/4818123"
    )
  ]
  public object theme
  {
    get => this._theme;
    set => YDF_ComponentsHelper.
        AssignThemeIfItIsValid<Button.StandardThemes>(value, Button.CustomThemes, ref this._theme);
  }

  protected internal static bool mustConsiderThemesCSS_ClassesAsCommon = YDF_ComponentsHelper.areThemesCSS_ClassesCommon;

  public static void considerThemesAsCommon()
  {
    Button.mustConsiderThemesCSS_ClassesAsCommon = true;
  }

  [Microsoft.AspNetCore.Components.Parameter]
  public bool areThemesCSS_ClassesCommon { get; set; } =
      YDF_ComponentsHelper.areThemesCSS_ClassesCommon || Button.mustConsiderThemesCSS_ClassesAsCommon;


  /* ─── Geometry ─────────────────────────────────────────────────────────────────────────────────────────────────── */
  public enum StandardGeometricVariations
  {
    regular,
    small,
    linkLike
  }

  protected internal static Type? CustomGeometricVariations;

  public static void defineGeometricVariations(Type CustomGeometricVariations)
  {
    YDF_ComponentsHelper.ValidateCustomGeometricVariation(CustomGeometricVariations);
    Button.CustomGeometricVariations = CustomGeometricVariations;
  }

  protected string _geometricVariation = Button.StandardGeometricVariations.regular.ToString();

  [Microsoft.AspNetCore.Components.Parameter]
  [
    System.Diagnostics.CodeAnalysis.SuppressMessage(
      "Microsoft.Performance", 
      "BL0007", 
      Justification = "Optimized equivalent is too complex: https://stackoverflow.com/a/79302962/4818123"
    )
  ]
  public object geometricVariation
  {
    get => this._geometricVariation;
    set => YDF_ComponentsHelper.AssignGeometricVariationIfItIsValid<Button.StandardGeometricVariations>(
      value, Button.CustomGeometricVariations, ref this._geometricVariation
    );
  }


  /* ─── Decoration ───────────────────────────────────────────────────────────────────────────────────────────────── */
  public enum StandardDecorativeVariations
  {
    regular,
    accented,
    danger,
    linkLike
  }

  protected internal static Type? CustomDecorativeVariations;

  public static void defineDecorativeVariations(Type CustomDecorativeVariations) {
    YDF_ComponentsHelper.ValidateCustomDecorativeVariation(CustomDecorativeVariations);
    Button.CustomDecorativeVariations = CustomDecorativeVariations;
  }

  protected string _decorativeVariation = null!;

  [Microsoft.AspNetCore.Components.Parameter]
  [Microsoft.AspNetCore.Components.EditorRequired]
  [
    System.Diagnostics.CodeAnalysis.SuppressMessage(
      "Microsoft.Performance", 
      "BL0007", 
      Justification = "Optimized equivalent is too complex: https://stackoverflow.com/a/79302962/4818123"
    )
  ]
  public required object decorativeVariation
  {
    get => _decorativeVariation;
    set => YDF_ComponentsHelper.AssignDecorativeVariationIfItIsValid<Button.StandardDecorativeVariations>(
      value, Button.CustomDecorativeVariations, ref this._decorativeVariation
    );
  }
  
  
   /* ━━━ CSS Classes ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  [Microsoft.AspNetCore.Components.Parameter]
  public string? rootElementModifierCSS_Class { get; set; } = null;

  [Microsoft.AspNetCore.Components.Parameter]
  public string[]? rootElementModifierCSS_Classes { get; set; } = null;

  [Microsoft.AspNetCore.Components.Parameter]
  public string? rootElementSpaceSeparatedModifierCSS_Classes { get; set; } = null;

  private string classAttributeValueForRootElement => new List<string> { Button.CSS_NAMESPACE }.

      AddElementToEndIf(
        $"{ Button.CSS_NAMESPACE }__{ this._theme.ToUpperCamelCase() }Theme",
        YDF_ComponentsHelper.MustApplyThemeCSS_Class(
          typeof(Button.StandardThemes), Button.CustomThemes, this.areThemesCSS_ClassesCommon
        )
      ).

      AddElementToEndIf(
        $"{ Button.CSS_NAMESPACE }__{ this._geometricVariation.ToUpperCamelCase() }GeometricVariation",
        YDF_ComponentsHelper.MustApplyGeometricVariationModifierCSS_Class(
          typeof(Button.StandardGeometricVariations), Button.CustomGeometricVariations
        )
      ).

      AddElementToEndIf(
        $"{ Button.CSS_NAMESPACE }__{ this._decorativeVariation.ToUpperCamelCase() }DecorativeVariation",
        YDF_ComponentsHelper.MustApplyDecorativeVariationModifierCSS_Class(
          typeof(Button.StandardDecorativeVariations), Button.CustomDecorativeVariations
        )
      ).

      AddElementToEndIf(
        ((ISupportsFlexibleExternalCSS_ClassesSpecifyingForRootElement)this).rootElementSpaceSeparatedExternalCSS_Classes,
        rootElementSpaceSeparatedExternalCSS_Classes =>
          !String.IsNullOrEmpty(rootElementSpaceSeparatedExternalCSS_Classes)
      ).

      StringifyEachElementAndJoin(" ");
  
  
  
  
  /*
  
  [Parameter] public string? internalURN { get; set; }

  [Parameter] public string? externalURI { get; set; }

  [Parameter] public bool disabled { get; set; } = false;

  [Inject] protected IJSRuntime JSRuntime { get; set; } = null!;

  private ElementReference rootElement;
  
  
  /* === Public methods ============================================================================================= * /
  public async System.Threading.Tasks.Task focus()
  {
    await JSRuntime.InvokeVoidAsync("putFocusOnElement", this.rootElement);
  }
  
  
  /* --- Theme ------------------------------------------------------------------------------------------------------ * /
  public enum StandardThemes { regular }

  protected static object? CustomThemes;
  
  public static void defineCustomThemes(Type CustomThemes) {

    if (!CustomThemes.IsEnum)
    {
      throw new System.ArgumentException("The custom themes must the enumeration.");
    }


    Button.CustomThemes = CustomThemes;

  }
  
  protected string _theme = Button.StandardThemes.regular.ToString();
  
  [Parameter] public object theme
  {
    get => this._theme;
    set
    {

      if (value is Button.StandardThemes standardTheme)
      {
        this._theme = standardTheme.ToString();
        return;
      }
      
      
      // TODO CustomThemes確認 https://github.com/TokugawaTakeshi/ExperimentalCSharpApplication1/issues/34#issuecomment-1500788874
      
      this._theme = value.ToString();

    }
  }
  
  internal static bool mustConsiderThemesAsExternal = false;

  public static void ConsiderThemesAsExternal()
  {
    Button.mustConsiderThemesAsExternal = true;
  }
  
  [Parameter] public bool areThemesExternal { get; set; } = Button.mustConsiderThemesAsExternal;

  
  /* --- Geometry --------------------------------------------------------------------------------------------------- * /
  public enum StandardGeometricVariations
  {
    regular,
    small,
    linkLike
  }

  protected static object? CustomGeometricVariations;
  
  public static void defineCustomGeometricVariations(Type CustomGeometricVariations)
  {

    if (!CustomGeometricVariations.IsEnum)
    {
      throw new System.ArgumentException("The custom geometric variations must the enumeration.");
    }


    Button.CustomGeometricVariations = CustomGeometricVariations;

  }
  
  protected string _geometricVariation = Button.StandardGeometricVariations.regular.ToString();
  
  [Parameter] public object geometricVariation
  {
    get => this._geometricVariation;
    set
    {

      if (value is Button.StandardGeometricVariations standardGeometricVariation)
      {
        this._geometricVariation = standardGeometricVariation.ToString();
        return;
      }
      
      
      // TODO CustomGeometricVariations https://github.com/TokugawaTakeshi/ExperimentalCSharpApplication1/issues/34#issuecomment-1500788874

      this._geometricVariation = value.ToString();

    }
  }
  
  
  /* --- Decorative variations -------------------------------------------------------------------------------------- * /
  public enum StandardDecorativeVariations
  {
    regular,
    accented,
    linkLike
  }
  
  protected static object? CustomDecorativeVariations;
  
  public static void defineNewDecorativeVariations(Type CustomDecorativeVariations) {
    
    if (!CustomDecorativeVariations.IsEnum)
    {
      throw new System.Exception("The custom decorative variations must the enumeration.");
    }
      
        
    Button.CustomDecorativeVariations = CustomDecorativeVariations;
      
  }  
  
  protected string _decorativeVariation = Button.StandardDecorativeVariations.regular.ToString();

  [Parameter] public required object decorativeVariation
  {
    get => _decorativeVariation;
    set
    {

      if (value is Button.StandardDecorativeVariations standardDecorativeVariation)
      {
        this._decorativeVariation = standardDecorativeVariation.ToString();
        return;
      }

      
      // TODO CustomDecorativeVariations確認 https://github.com/TokugawaTakeshi/ExperimentalCSharpApplication1/issues/34#issuecomment-1500788874
      
      this._decorativeVariation = value.ToString();

    }
  }
  
  
  /* --- Computing of tag name of root element ---------------------------------------------------------------------- * /
  private bool isButtonTheTagNameOfRootElement =>
      String.IsNullOrEmpty(this.internalURN) &&
      String.IsNullOrEmpty(this.externalURI) &&
      HTML_Type is HTML_Types.regular or HTML_Types.submit;

  private bool isInputTheTagNameOfRootElement => 
      HTML_Type is HTML_Types.inputButton or HTML_Types.inputSubmit or HTML_Types.inputReset;
  
  private bool isAnchorTheTagNameOfRootElement => !String.IsNullOrEmpty(this.externalURI);
  
  private bool isNavLinkTheRootElement => !String.IsNullOrEmpty(this.internalURN);
  
  
  /* --- Computing of the attributes -------------------------------------------------------------------------------- * /
  private string? typeAttributeValueOfInputOrButtonElement {

    get
    {
      
      if (!this.isButtonTheTagNameOfRootElement && !this.isInputTheTagNameOfRootElement)
      {
        return null;
      }
      

      return this.HTML_Type switch
      {
        HTML_Types.regular => "button",
        HTML_Types.submit => "submit",
        HTML_Types.inputButton => "button",
        HTML_Types.inputSubmit => "submit",
        HTML_Types.inputReset => "reset",
        _ => null
      };
    }

  }
  
  
  /* --- CSS classes ------------------------------------------------------------------------------------------------ * /
  [Parameter] public string? spaceSeparatedAdditionalCSS_Classes { get; set; }
  
  private string rootElementSpaceSeparatedClasses => new List<string>().
      AddElementsToEnd("Button--YDF").
      AddElementToEndIf(
        "Button--YDF__DisabledState",
        _ => (this.isAnchorTheTagNameOfRootElement || this.isNavLinkTheRootElement) && this.disabled
      ).
      AddElementToEndIf(
        $"Button--YDF__{ this._theme.ToUpperCamelCase() }Theme",
        _ => Enum.GetNames(typeof(Button.StandardThemes)).Length > 1 && !this.areThemesExternal
      ).
      AddElementToEndIf(
        $"Button--YDF__{ this._geometricVariation.ToUpperCamelCase() }GeometricVariation",
        _ => Enum.GetNames(typeof(Button.StandardGeometricVariations)).Length > 1
      ).
      AddElementToEndIf(
        $"Button--YDF__{ this._decorativeVariation.ToUpperCamelCase() }DecorativeVariation",
        _ => Enum.GetNames(typeof(Button.StandardDecorativeVariations)).Length > 1
      ).
      StringifyEachElementAndJoin(" ");

  
  /* --- Events handling -------------------------------------------------------------------------------------------- * /
  [Parameter]
  public EventCallback<MouseEventArgs> onClick { get; set; }
  

  /* --- Children elements ------------------------------------------------------------------------------------------ * /
  [Parameter] public RenderFragment? PrependedSVG_Icon { get; set; }
  [Parameter] public RenderFragment? AppendedSVG_Icon { get; set; }
  [Parameter] public RenderFragment? LoneSVG_Icon { get; set; }
    
   */
  
  
}
