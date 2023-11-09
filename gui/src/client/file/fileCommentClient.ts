import {appConstants} from "@/common/appConstants.ts";
import {AccountRole} from "@/client/permission/types";
import axios from "axios";
import {getHeaderConfig} from "@/client/common/clientUtils.ts";
import {FileComment, FileCommentCreation} from "@/client/file/types";

const baseUrl = `${appConstants.host}/api/file-comments`;

export const fileCommentQueryKeys = {
  fileId: "file-comments/file-id",
};

export async function createFileComment(creation: FileCommentCreation) {
  const res = await axios.post<AccountRole>(`${baseUrl}`, creation, getHeaderConfig());
  return res.data;
}

export async function fileFileCommentsByFileId(fileId: number) {
  const res = await axios.post<FileComment[]>(`${baseUrl}/file-id/${fileId}`, getHeaderConfig());
  return res.data;
}
