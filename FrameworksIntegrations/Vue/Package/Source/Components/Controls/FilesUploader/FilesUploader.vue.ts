/* --- Related components ------------------------------------------------------------------------------------------- */
import InputtableControl from "../Controls/InputtableControl";

/* --- Framework ---------------------------------------------------------------------------------------------------- */
import { ComponentBase as VueComponentConfiguration, Prop as VueProperty } from "vue-facing-decorator";

/* --- Utils -------------------------------------------------------------------------------------------------------- */
import YDF_ComponentsCoordinator from "../../YDF_ComponentsCoordinator";
import {
  isArrayOfCertainTypeElements,
  isBoolean,
  isNonEmptyString,
  isNull,
  removeSpecificCharacterFromCertainPosition
} from "@yamato-daiwa/es-extensions";


namespace FilesUploader {

  export type Themes = {
    readonly regular: "REGULAR";
    [themeName: string]: string;
  };

  export const Themes: Themes = { regular: "REGULAR" };

  export let areThemesExternal: boolean = YDF_ComponentsCoordinator.areThemesExternalByDefault;

  export function considerThemesAsExternal(): void {
    areThemesExternal = true;
  }


  export type GeometricVariations = {
    readonly regular: "REGULAR";
    [variationName: string]: string;
  };

  export const GeometricVariations: GeometricVariations = {
    regular: "REGULAR"
  };


  export type DecorativeVariations = {
    readonly regular: "REGULAR";
    [variationName: string]: string;
  };

  export const DecorativeVariations: DecorativeVariations = {
    regular: "REGULAR"
  };


  @VueComponentConfiguration({})
  export class BasicLogic extends InputtableControl {

    /* === Properties =============================================================================================== */
    /* --- Preventing of inputting of invalid value ----------------------------------------------------------------- */
    @VueProperty({
      type: Array,
      default: (): Array<string> => []
    })
    protected readonly supportedFilesNamesExtensions!: ReadonlyArray<string>;

    @VueProperty({ default: 0, type: Number })
    private readonly minimalFilesCount!: number;

    @VueProperty({ type: Number })
    private readonly maximalFilesCount?: number;


    /* --- HTML IDs ------------------------------------------------------------------------------------------------- */
    /* [ Theory ]
     *`@VueProperty{ default: BasicLogic.generateInputElementHTML_ID() })` will be called only one time;
     * it is required to substitute the default value. */
    @VueProperty({ type: String })
    protected readonly inputElementHTML_ID?: string;

    @VueProperty({ type: String, required: false })
    protected readonly labelElementHTML_ID?: string | null;


    /* === User's actions handling ================================================================================== */
    /* --- Two possible methods of files selecting ------------------------------------------------------------------ */
    protected async onSelectNewFilesByNativeExplorerSession(fileSelectedEvent: Event): Promise<void> {

      if (!(fileSelectedEvent.target instanceof HTMLInputElement)) {
        return;
      }

      const touchedInputElement: HTMLInputElement = fileSelectedEvent.target;

      if (isNull(touchedInputElement.files)) {
        return;
      }


      /* [ Theory ] It will be the new "touchedInputElement.files" on each selecting of files session. */
      return this.uploadFilesAndGetURLs(Array.from(touchedInputElement.files));

    }


    private async uploadFilesAndGetURLs(newFilesSet: ReadonlyArray<File>): Promise<void> {

    }


    /* === Auxiliaries ============================================================================================== */
    protected get supportedFilesNamesExtensionsWihtoutLeadingDots(): Array<ReadonlyArray> {
      return this.supportedFilesNamesExtensions.map(
        (fileNameExtension: string): string => removeSpecificCharacterFromCertainPosition({
          targetString: fileNameExtension,
          targetCharacter: ".",
          fromFirstPosition: true
        })
      );
    }

    protected acceptAttributeValueForInputTag(): string {
      return this.supportedFilesNamesExtensionsWihtoutLeadingDots.length > 0 ?
           `.${ this.supportedFilesNamesExtensionsWihtoutLeadingDots.join(", .") }` :
            "*/*";
    }

    /* --- Generating of IDs ---------------------------------------------------------------------------------------- */
    protected static counterForInputElementHTML_ID_Generating: number = 0;

    protected static generateInputElementHTML_ID(): string {
      BasicLogic.counterForInputElementHTML_ID_Generating++;
      return `FILES_UPLOADER-INPUT_ELEMENT-${ BasicLogic.counterForInputElementHTML_ID_Generating }`;
    }

    protected readonly INPUT_ELEMENT_HTML_ID: string =
        this.inputElementHTML_ID ?? BasicLogic.generateInputElementHTML_ID();


  }

}


export default FilesUploader;
