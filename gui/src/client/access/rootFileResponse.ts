import {FileResponse} from "@/client/access/types.ts";

export const rootFileResponse: FileResponse = {
  id: -1,
  path: "",
  isDirectory: true,
  lastModified: new Date().toISOString(),
  size: 0,
  myPerm: "READ",
};
