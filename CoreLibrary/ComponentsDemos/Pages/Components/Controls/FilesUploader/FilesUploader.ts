import { FilesUploader, InputtedValueValidation } from "../../../../../Package/index";
import { isEmptyArray } from "@yamato-daiwa/es-extensions";


FilesUploader.pickOneBySelector({
  selector: "#EXPERIMENTAL_SAMPLE",
  validation: new class extends InputtedValueValidation {
    public constructor() {
      super({
        isInputRequired: true,
        omittedValueChecker: isEmptyArray
      });
    }
  }(),
  mustHighlightInvalidInputIfAnyValidationErrorsMessagesImmediately: false
});
