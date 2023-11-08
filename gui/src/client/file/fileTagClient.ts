import {appConstants} from "@/common/appConstants.ts";
import {Role, RoleCreation} from "@/client/permission/types";
import axios from "axios";
import {getHeaderConfig} from "@/client/common/clientUtils.ts";

const baseUrl = `${appConstants.host}/api/file-tags`;

export const fileTagQueryKeys = {
};

export async function createRole(creation: RoleCreation) {
  const res = await axios.post<Role>(`${baseUrl}`, creation, getHeaderConfig());
  return res.data;
}

