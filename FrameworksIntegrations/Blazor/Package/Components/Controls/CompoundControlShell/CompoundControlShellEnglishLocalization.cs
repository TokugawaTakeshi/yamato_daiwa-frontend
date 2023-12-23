namespace YamatoDaiwa.Frontend.Components.Controls.CompoundControlShell;


public class CompoundControlShellEnglishLocalization: CompoundControlShell.Localization
{

  public override RequirementBadges requirementBadges { get; } =
      new()
      {
        required = "Required",
        optional = "Optional"
      };

}