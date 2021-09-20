import LineWiseReader from "readline";
import Path from "path";
import FileSystem from "fs";


(function executeApplication(): void {

  const PUG_EXTENSIONS_INTERIM_JAVA_SCRIPT_FILE_ABSOLUTE_PATH: string =
      Path.resolve(__dirname, "PugExtensions.js");
  const OUTPUT_PUG_FILE_ABSOLUTE_PATH: string = Path.resolve(__dirname, "PugExtensions.pug");

  let outputPugFileAccumulatingContentWithJavaScript: string = "-\n";

  LineWiseReader.createInterface({
    input: FileSystem.createReadStream(PUG_EXTENSIONS_INTERIM_JAVA_SCRIPT_FILE_ABSOLUTE_PATH)
  }).

  on("line", (line: string): void => {
    outputPugFileAccumulatingContentWithJavaScript = `${outputPugFileAccumulatingContentWithJavaScript}  ${line}\n`;
  }).

  on("close", (): void => {

    FileSystem.writeFileSync(OUTPUT_PUG_FILE_ABSOLUTE_PATH, outputPugFileAccumulatingContentWithJavaScript);
    FileSystem.unlinkSync(PUG_EXTENSIONS_INTERIM_JAVA_SCRIPT_FILE_ABSOLUTE_PATH);
    console.log("✔　'PugExtensions.pug' has been generated");
  });

})();
