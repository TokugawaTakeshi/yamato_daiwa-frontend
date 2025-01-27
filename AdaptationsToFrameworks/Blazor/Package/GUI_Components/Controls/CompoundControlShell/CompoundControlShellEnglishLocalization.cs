namespace YamatoDaiwa.Frontend.GUI_Components.Controls.CompoundControlShell;


public class CompoundControlShellEnglishLocalization: GUI_Components.Controls.CompoundControlShell.CompoundControlShell.Localization
{

  public override RequirementBadges requirementBadges { get; } =
      new()
      {
        required = "Required",
        optional = "Optional"
      };

}