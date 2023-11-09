import {FileResponse} from "@/client/access/types.ts";
import {permissionTypes} from "@/common/permissionTypes.ts";

export const rootFileResponse: FileResponse = {
  id: -1,
  path: "",
  isDirectory: true,
  lastModified: new Date().toISOString(),
  size: 0,
  myPerm: permissionTypes.READ,
  memberDefaultPerm: permissionTypes.READ,
  guestDefaultPerm: permissionTypes.READ,
};
