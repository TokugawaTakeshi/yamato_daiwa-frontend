export type FilesUploaderLocalization = Readonly<{

  processingsStatusesTable: Readonly<{
    headers: Readonly<{
      fileName: string;
      status: string;
    }>;
  }>;

  uploadSingleFileByDragAndDropGuidance: string;
  buttons: Readonly<{
    filePicking: Readonly<{ label: string; }>;
    fileDeleting: Readonly<{ label: string; }>;
  }>;

}>;
