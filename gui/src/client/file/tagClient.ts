import {appConstants} from "@/common/appConstants.ts";
import {FileCommentCreation} from "@/client/file/types";
import axios from "axios";
import {Role} from "@/client/permission/types";
import {getHeaderConfig} from "@/client/common/clientUtils.ts";

const baseUrl = `${appConstants.host}/api/tags`;

export const tagQueryKeys = {
};

export async function createRole(creation: FileCommentCreation) {
  const res = await axios.post<Role>(`${baseUrl}`, creation, getHeaderConfig());
  return res.data;
}
