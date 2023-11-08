export interface FileComment {
  id: number;
  fileId: number;
  createdById: number;
  parentId?: number;
  content: string;
}

export interface FileCommentCreation {
  content: string;
  fileId: number;
  createdById: number;
  parentId?: number;
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
  tagName: string;
}

export interface FileTagCreationByTagName {
  fileId: number;
  tagName: string;
}
