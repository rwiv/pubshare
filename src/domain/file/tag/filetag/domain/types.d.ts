export interface FileTag {
  id: number;
  fileId: number;
  tagName: string;
}

export interface FileTagCreationByTagName {
  fileId: number;
  tagName: string;
}
