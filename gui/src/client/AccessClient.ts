import axios from "axios";
import {appConstants} from "@/config/appConstants.ts";

export interface FileInfo {
  key: string,
  isDirectory: boolean,
  lastModified: string,
  size: number,
}

export class AccessClient {
  async list(): Promise<FileInfo[]> {
    const res = await axios.get<FileInfo[]>(`${appConstants.host}/api/access/list`);
    return res.data;
  }
}