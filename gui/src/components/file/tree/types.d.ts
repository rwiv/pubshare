import {FileResponse} from "@/client/access/types.ts";

export interface FileNode extends FileResponse {
  children: FileNode[];
}
