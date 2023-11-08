import axios from "axios";
import {appConstants} from "@/common/appConstants.ts";
import {AccessFileRequest, FileResponse, FileUploadRequest} from "@/client/access/types.ts";
import {getHeaderConfig, getHeaders} from "@/client/common/clientUtils.ts";
import {getFilenameByKey} from "@/client/access/accessUtils.ts";

const baseUrl = `${appConstants.host}/api/access`;

export const accessQueryKeys = {
  list: "list",
};

export async function list(key: string): Promise<FileResponse[]> {
  console.log(key)
  const url = `${baseUrl}/list?key=${key}`;
  const res = await axios.get<FileResponse[]>(url, getHeaderConfig());
  return res.data;
}

export async function download(key: string) {
  const res = await axios({
    url: `${baseUrl}/download?key=${key}`,
    method: "GET",
    responseType: "blob",
    headers: getHeaders(),
  });
  const href = URL.createObjectURL(res.data);

  const link = document.createElement('a');
  link.href = href;
  link.setAttribute('download', getFilenameByKey(key)); //or any other extension
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(href);
}

export async function upload(req: FileUploadRequest, file: File) {
  const form = {
    ...req,
    file: file,
  }
  const res = await axios.putForm<string>(`${baseUrl}/upload`, form, getHeaderConfig());
  return res.data;
}

export async function mkdir(req: AccessFileRequest) {
  const res = await axios.put<string>(`${baseUrl}/mkdir`, req, getHeaderConfig());
  return res.data;
}

export async function deleteFile(req: AccessFileRequest) {
  const res = await axios({
    url: `${baseUrl}/delete`,
    method: "DELETE",
    data: req,
    headers: getHeaders(),
  });
  return res.data;
}
