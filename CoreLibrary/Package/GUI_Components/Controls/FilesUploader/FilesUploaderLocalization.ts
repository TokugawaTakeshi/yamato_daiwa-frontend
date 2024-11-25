export type FilesUploaderLocalization = Readonly<{

  processingsStatusesTable: Readonly<{
    headers: Readonly<{
      fileName: string;
      status: string;
    }>;
  }>;

  uploadSingleFileByDragAndDropGuidance: string;

  buttons: Readonly<{
    filePicking: Readonly<{
      buildLabel: (templateVariables: Readonly<{ areMultipleFileAllowed: boolean; }>) => string;
    }>;
  }>;

  singleImagePreviewer: Readonly<{
    image: Readonly<{ alternatingText: string; }>;
    deletingButton: Readonly<{
      label: string;
      accessibilityGuidance: string;
    }>;
  }>;

}>;
