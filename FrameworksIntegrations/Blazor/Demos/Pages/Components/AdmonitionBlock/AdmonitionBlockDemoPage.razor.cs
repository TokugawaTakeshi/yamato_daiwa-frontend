using Microsoft.JSInterop;


namespace Demos.Pages.Components.AdmonitionBlock;


public partial class AdmonitionBlockDemoPage : Microsoft.AspNetCore.Components.ComponentBase
{
  
  [Microsoft.AspNetCore.Components.Inject]
  protected Microsoft.JSInterop.IJSRuntime JavaScriptRuntime { get; init; } = null!;
  
  
  private const string THEME_KEY_LABEL_PREFIX = "AdmonitionBlock__YDF.Themes.";
  private const string GEOMETRIC_VARIATION_KEY_LABEL_PREFIX = "AdmonitionBlock__YDF.GeometricVariations.";
  private const string DECORATIVE_VARIATION_KEY_LABEL_PREFIX = "AdmonitionBlock__YDF.DecorativeVariations.";
  
  
  protected override async Task OnInitializedAsync()
  {
    await base.OnInitializedAsync();
    await JavaScriptRuntime.InvokeVoidAsync("setPageDependentStylesheet", "AdmonitionBlockGalleryPage");
  }
  
}
