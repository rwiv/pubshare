import {appConstants} from "@/common/appConstants.ts";
import axios from "axios";
import {FileRole, FileRoleCreation, FileRoleResponse} from "@/client/permission/types";
import {getHeaderConfig} from "@/client/common/clientUtils.ts";

const baseUrl = `${appConstants.host}/api/file-roles`;

export const fpQueryKeys = {
  fileId: "file-roles/file-id",
};

export async function createFileRole(creation: FileRoleCreation) {
  const res = await axios.post<FileRole>(`${baseUrl}`, creation, getHeaderConfig());
  return res.data;
}

export async function findFileRolesByFileId(fileId: number) {
  const res = await axios.get<FileRoleResponse[]>(`${baseUrl}/file-id/${fileId}`, getHeaderConfig());
  return res.data;
}
