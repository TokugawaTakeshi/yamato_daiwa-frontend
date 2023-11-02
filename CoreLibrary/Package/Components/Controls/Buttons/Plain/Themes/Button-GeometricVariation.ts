type GeometricVariation = Readonly<{

  rootElement: Readonly<{

    minimaWidth?: string;

    borders?: object;

    modifiers: Readonly<{
      pillShape: Readonly<{
        textSizeToBorderRadiusRatio: number;
      }>;
    }>;

    customDeclarations: object;

  }>;

}>;


export default GeometricVariation;
