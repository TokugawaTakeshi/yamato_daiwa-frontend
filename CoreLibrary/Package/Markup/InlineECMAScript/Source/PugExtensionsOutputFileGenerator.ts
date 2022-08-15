import LineWiseReader from "readline";
import Path from "path";
import FileSystem from "fs";
import { Logger } from "@yamato-daiwa/es-extensions";


(function executeApplication(): void {

  const CURRENT_FILE_DIRECTORY: string = __dirname;

  const PUG_EXTENSIONS_INTERIM_JAVA_SCRIPT_FILE_ABSOLUTE_PATH: string = Path.resolve(
    CURRENT_FILE_DIRECTORY, "..", "Temporary", "PugExtensions.js"
  );

  const OUTPUT_PUG_FILE_ABSOLUTE_PATH: string = Path.resolve(CURRENT_FILE_DIRECTORY, "../", "PugExtensions.generated.pug");

  let outputPugFileAccumulatingContentWithJavaScript: string = "-\n";


  LineWiseReader.createInterface({
    input: FileSystem.createReadStream(PUG_EXTENSIONS_INTERIM_JAVA_SCRIPT_FILE_ABSOLUTE_PATH)
  }).

      on("line", (line: string): void => {
        outputPugFileAccumulatingContentWithJavaScript = `${ outputPugFileAccumulatingContentWithJavaScript }  ${line}\n`;
      }).

      on("close", (): void => {

        FileSystem.writeFileSync(OUTPUT_PUG_FILE_ABSOLUTE_PATH, outputPugFileAccumulatingContentWithJavaScript);
        FileSystem.unlinkSync(PUG_EXTENSIONS_INTERIM_JAVA_SCRIPT_FILE_ABSOLUTE_PATH);

        Logger.logSuccess({
          title: "Pug extensions file generated",
          description: `'${ PUG_EXTENSIONS_INTERIM_JAVA_SCRIPT_FILE_ABSOLUTE_PATH }' has been successfully generated.`
        });
      });

})();
