import {AccountResponse} from "@/domain/account/web/types";

export interface FileCommentCreation {
  content: string;
  fileId: number;
  createdById: number;
}

interface FileCommentResponse {
  id: number;
  fileId: number;
  createdBy: AccountResponse;
  content: string;
}
