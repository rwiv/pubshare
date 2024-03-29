import {appConstants} from "@/common/appConstants.ts";
import {
  FileAuthority,
  FileAuthorityCreation,
  FileAuthorityResponse
} from "@/client/permission/types";
import axios from "axios";
import {getHeaderConfig} from "@/client/common/clientUtils.ts";

const baseUrl = `${appConstants.host}/api/file-authorities`;

export const fileAuthorityQueryKeys = {
  fileId: "file-authorities/file-id",
};

export async function createFileAuthority(creation: FileAuthorityCreation) {
  const res = await axios.post<FileAuthority>(`${baseUrl}`, creation, getHeaderConfig());
  return res.data;
}

export async function findFileAuthoritiesByFileId(fileId: number) {
  const res = await axios.get<FileAuthorityResponse[]>(`${baseUrl}/file-id/${fileId}`, getHeaderConfig());
  return res.data;
}

export async function deleteFileAuthority(id: number) {
  const res = await axios.delete<FileAuthorityResponse>(`${baseUrl}/${id}`, getHeaderConfig());
  return res.data;
}
