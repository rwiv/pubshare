import {appConstants} from "@/common/appConstants.ts";
import {Role, RoleCreation} from "@/client/permission/types";
import axios from "axios";
import {getHeaderConfig, getHeaders} from "@/client/common/clientUtils.ts";

const baseUrl = `${appConstants.host}/api/roles`;

export const roleQueryKeys = {
  findAll: "roles",
};

export async function createRole(creation: RoleCreation) {
  const res = await axios.post<Role>(`${baseUrl}`, creation, getHeaderConfig());
  return res.data;
}

export async function findAllRoles() {
  const res = await axios.get<Role[]>(`${baseUrl}`, getHeaderConfig());
  return res.data;
}

export async function deleteRole(id: number) {
  const res = await axios({
    url: `${baseUrl}/${id}`,
    method: "DELETE",
    headers: getHeaders(),
  });
  return res.data;
}
