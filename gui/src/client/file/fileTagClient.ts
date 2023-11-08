import {appConstants} from "@/common/appConstants.ts";
import axios from "axios";
import {getHeaderConfig} from "@/client/common/clientUtils.ts";
import {FileTag, FileTagCreationByTagName} from "@/client/file/types";

const baseUrl = `${appConstants.host}/api/file-tags`;

export const fileTagQueryKeys = {
  fileId: "file-tags/file-id",
  tagId: "file-tags/tag-id",
};

export async function createFileTag(creation: FileTagCreationByTagName) {
  const res = await axios.post<FileTag>(`${baseUrl}`, creation, getHeaderConfig());
  return res.data;
}

export async function findFileTagsByFileId(fileId: number) {
  const res = await axios.get<FileTag[]>(`${baseUrl}/file-id/${fileId}`, getHeaderConfig());
  return res.data;
}

export async function findFileTagsByTagId(tagId: number) {
  const res = await axios.get<FileTag[]>(`${baseUrl}/tag-id/${tagId}`, getHeaderConfig());
  return res.data;
}
