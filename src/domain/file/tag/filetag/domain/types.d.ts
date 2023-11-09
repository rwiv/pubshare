import {Tag} from "@/domain/file/tag/tag/domain/types";

export interface FileTag {
  id: number;
  fileId: number;
  tagId: number;
}

export interface FileTagResponse {
  id: number;
  fileId: number;
  tag: Tag;
}

export interface FileTagCreationByTagName {
  fileId: number;
  tagName: string;
}
