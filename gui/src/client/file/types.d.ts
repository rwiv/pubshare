import {AccountResponse} from "../../../../src/domain/account/web/types";

export interface FileComment {
  id: number;
  fileId: number;
  createdById: number;
  content: string;
}

interface FileCommentResponse {
  id: number;
  fileId: number;
  createdBy: AccountResponse;
  content: string;
}

export interface FileCommentCreation {
  content: string;
  fileId: number;
  createdById: number;
}

export interface Tag {
  id: number;
  name: string;
}

export interface TagCreation {
  name: string;
}

export interface FileTag {
  id: number;
  fileId: number;
  tagId: string;
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
