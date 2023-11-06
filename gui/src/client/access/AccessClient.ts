import axios from "axios";
import {appConstants} from "@/common/appConstants.ts";
import {FileResponse} from "@/client/access/types.ts";
import {getHeaderConfig} from "@/client/common/clientUtils.ts";

export interface FileInfo {
  key: string,
  isDirectory: boolean,
  lastModified: string,
  size: number,
}

export class AccessClient {
  async list(): Promise<FileInfo[]> {
    const url = `${appConstants.host}/api/access/list`;
    const res = await axios.get<FileInfo[]>(url, getHeaderConfig());
    return res.data;
  }
}

export async function list(key: string): Promise<FileResponse[]> {
  const url = `${appConstants.host}/api/access/list?key=${key}`;
  const res = await axios.get<FileResponse[]>(url, getHeaderConfig());
  return res.data;
}
