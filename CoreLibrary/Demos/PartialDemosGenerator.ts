import Path from "path";
import FileSystem from "fs";
import {
  ImprovedPath,
  ImprovedGlob,
  ConsoleApplicationLogger,
  FileNotFoundError
} from "@yamato-daiwa/es-extensions-nodejs";
import type {
  ReplacingOfMatchesWithRegularExpressionToDynamicValue
} from "@yamato-daiwa/es-extensions";
import {
  toUpperCamelCase,
  explodeCasedPhraseToWords,
  replaceDoubleBackslashesWithForwardSlashes,
  extractFileNameWithoutAnyExtensions,
  Logger,
  getMatchingWithFirstRegularExpressionCapturingGroup,
  replaceMatchesWithRegularExpressionToDynamicValue
} from "@yamato-daiwa/es-extensions";
import Handlebars from "handlebars";


Logger.setImplementation(ConsoleApplicationLogger);

const PROJECT_ROOT_DIRECTORY_ABSOLUTE_PATH: string = Path.dirname(process.argv[1]);
const TARGET_DIRECTORY_ABSOLUTE_PATH: string = Path.join(PROJECT_ROOT_DIRECTORY_ABSOLUTE_PATH, process.argv[2]);

const searchResultsForGalleryOptionsClassFile: ReadonlyArray<string> =
    ImprovedGlob.getFilesAbsolutePathsSynchronously([
      replaceDoubleBackslashesWithForwardSlashes(`${ TARGET_DIRECTORY_ABSOLUTE_PATH }/*Options.pug`)
    ]);

if (searchResultsForGalleryOptionsClassFile.length !== 1) {
  Logger.throwErrorAndLog({
    errorInstance: new FileNotFoundError({
      customMessage:
        `In the directory "${ TARGET_DIRECTORY_ABSOLUTE_PATH }" there must be exactly one "*.Options.pug" file, while ` +
        `${ searchResultsForGalleryOptionsClassFile.length } found.`
    }),
    title: FileNotFoundError.localization.defaultTitle,
    occurrenceLocation: "PartialDemosGenerator.ts"
  });
}

const galleryClassFileAbsolutePath: string = searchResultsForGalleryOptionsClassFile[0];
const galleryOptionsClassFileContent: string = FileSystem.readFileSync(galleryClassFileAbsolutePath).toString();

const partialEnumerationValue__rawJavaScriptCode: string = getMatchingWithFirstRegularExpressionCapturingGroup({
  targetString: galleryOptionsClassFileContent,
  regularExpression: /static Partials\s+=\s+(?<enumerationValue>\{[\w\r\n\s:"',]+?\})/gmu,
  mustThrowErrorIfZeroOrMoreThanOneMatchings: true
}).replace("'", "\"");

const partialEnumerationValue__normalizedJSON: string = replaceMatchesWithRegularExpressionToDynamicValue({
  targetString: partialEnumerationValue__rawJavaScriptCode,
  regularExpressionWithCapturingGroups: /^[ \t]*(?<partialKey>\w+):/gmu,
  replacer: (
    { namedCapturingGroups }: ReplacingOfMatchesWithRegularExpressionToDynamicValue.Matching<{ partialKey: string; }>
  ): string => `"${ namedCapturingGroups.partialKey }":`
});

const partialEnumerationValue: Readonly<{ [partialKey: string]: string; }> = JSON.parse(partialEnumerationValue__normalizedJSON);
const componentName__upperCamelCase: string =
    extractFileNameWithoutAnyExtensions({
      targetPath: galleryClassFileAbsolutePath,
      mustThrowErrorIfLastPathSegmentHasNoDots: true
    }).replace("Options", "");
const outputFilesNamesConstantPart: string = `${ componentName__upperCamelCase }Page`;

const commonRelativePath: string = Path.relative(
  Path.join(PROJECT_ROOT_DIRECTORY_ABSOLUTE_PATH, "Source", "Galleries"),
  TARGET_DIRECTORY_ABSOLUTE_PATH
);

const outputDirectoryAbsolutePath: string = Path.join(
  PROJECT_ROOT_DIRECTORY_ABSOLUTE_PATH,
  "Source",
  "PartialDemos",
  commonRelativePath
);

const getOutputPugCode: Handlebars.TemplateDelegate = Handlebars.compile(
  FileSystem.readFileSync(
    Path.join(PROJECT_ROOT_DIRECTORY_ABSOLUTE_PATH, "PartialDemoPageTemplate.hbs")
  ).toString()
);

const relativePathToPagePugTemplate: string = ImprovedPath.computeRelativePath({
  basePath: outputDirectoryAbsolutePath,
  comparedPath: Path.join(
    PROJECT_ROOT_DIRECTORY_ABSOLUTE_PATH,
    "Source",
    "CompletePages",
    commonRelativePath,
    `_${ componentName__upperCamelCase }Page.template.pug`

  ),
  alwaysForwardSlashSeparators: true
});


for (const partialKey of Object.keys(partialEnumerationValue)) {

  const partialKey__upperCamelCase: string = toUpperCamelCase(partialKey);

  const outputFileNameWithExtension: string = `${ outputFilesNamesConstantPart }-${ partialKey__upperCamelCase }.pug`;
  const fileOutputPath: string = Path.join(outputDirectoryAbsolutePath, outputFileNameWithExtension);

  FileSystem.writeFileSync(
    Path.join(fileOutputPath),
    getOutputPugCode({
      relativePathToPathTemplate: relativePathToPagePugTemplate,
      pageTitleSpecificPart: explodeCasedPhraseToWords(partialKey__upperCamelCase).join(" "),
      componentName__upperCamelCase,
      partialKey
    })
  );

}
