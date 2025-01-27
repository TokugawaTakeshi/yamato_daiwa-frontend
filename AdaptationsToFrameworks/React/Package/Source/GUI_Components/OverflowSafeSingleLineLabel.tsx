import React from "react";


function OverflowSafeSingleLineLabel(
  properties: OverflowSafeSingleLineLabel.Properties
): JSX.Element {

  const RootElementTag: keyof JSX.IntrinsicElements = properties.rootElementTag ?? "div";

  return (
    <RootElementTag className="OverflowSafeSingleLineLabel">
      <span className="OverflowSafeSingleLineLabel-TextWithIncreasedLineHeight">
        { properties.children }
      </span>
    </RootElementTag>
  );
}


namespace OverflowSafeSingleLineLabel {
  export type Properties = Readonly<{
    rootElementTag?: keyof JSX.IntrinsicElements;
    children: React.ReactNode;
    className?: string | Array<string>;
  }>;
}


export default OverflowSafeSingleLineLabel;
