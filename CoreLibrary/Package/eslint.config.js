const YamatoDaiwaStyleGuides = require("@yamato-daiwa/style_guides/ECMAScript");


module.exports = [
  {
    ignores: [
      "LogicDistributable/",
      "Tests/Build/",
      "Markup/InlineECMAScript/Temporary/"
    ]
  },
  ...YamatoDaiwaStyleGuides
];
