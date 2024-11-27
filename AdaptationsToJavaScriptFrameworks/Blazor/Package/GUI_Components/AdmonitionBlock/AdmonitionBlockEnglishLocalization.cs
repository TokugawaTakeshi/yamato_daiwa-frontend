namespace YamatoDaiwa.Frontend.GUI_Components.AdmonitionBlock;


public class AdmonitionBlockEnglishLocalization : GUI_Components.AdmonitionBlock.AdmonitionBlock.Localization
{
  
  public override DismissingButton dismissingButton { get; } = new()
  {
    accessibilityGuidance = "Hide this message"
  }; 
  
}