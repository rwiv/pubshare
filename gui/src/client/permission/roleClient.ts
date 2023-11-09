import {appConstants} from "@/common/appConstants.ts";
import {Role, RoleCreation, RoleResponse} from "@/client/permission/types";
import axios from "axios";
import {getHeaderConfig} from "@/client/common/clientUtils.ts";

const baseUrl = `${appConstants.host}/api/roles`;

export const roleQueryKeys = {
  accountId: "roles/account-id"
};

export async function createRole(creation: RoleCreation) {
  const res = await axios.post<Role>(`${baseUrl}`, creation, getHeaderConfig());
  return res.data;
}

export async function findRolesByAccountId(accountId: number) {
  const res = await axios.get<RoleResponse[]>(`${baseUrl}/account-id/${accountId}`, getHeaderConfig());
  return res.data;
}
