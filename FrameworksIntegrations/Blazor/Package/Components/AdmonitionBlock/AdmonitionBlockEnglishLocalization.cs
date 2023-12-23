namespace YamatoDaiwa.Frontend.Components.AdmonitionBlock;


public class AdmonitionBlockEnglishLocalization : AdmonitionBlock.Localization
{
  
  public override DismissingButton dismissingButton { get; } = new()
  {
    accessibilityGuidance = "Hide this message"
  }; 
  
}