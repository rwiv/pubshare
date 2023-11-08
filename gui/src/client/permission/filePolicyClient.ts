import {appConstants} from "@/common/appConstants.ts";
import axios from "axios";
import {FilePolicy, FilePolicyCreation} from "@/client/permission/types";
import {getHeaderConfig} from "@/client/common/clientUtils.ts";

const baseUrl = `${appConstants.host}/api/file-policies`;

export const fpQueryKeys = {
  fileId: "file-policies/fileId",
};

export async function createFilePolicy(creation: FilePolicyCreation) {
  const res = await axios.post<FilePolicy>(`${baseUrl}`, creation, getHeaderConfig());
  return res.data;
}

export async function findFilePoliciesByFileId(fileId: number) {
  const res = await axios.get<FilePolicy[]>(`${baseUrl}/file-id/${fileId}`, getHeaderConfig());
  return res.data;
}
