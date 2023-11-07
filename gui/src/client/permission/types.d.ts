import {PermissionType} from "@/client/access/types.ts";

export interface FilePolicyCreation {
  file: PrismaConnect;
  policy: PrismaConnect;
  permission: PermissionType;
}
