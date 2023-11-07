import {appConstants} from "@/common/appConstants.ts";
import {PolicyCreation} from "@/client/permission/types";
import axios from "axios";
import {AccountResponse} from "@/client/account/types.ts";
import {getHeaderConfig, getHeaders} from "@/client/common/clientUtils.ts";

const baseUrl = `${appConstants.host}/api/policies`;

export const policyQueryKeys = {
  findAll: "policies",
};

export async function createPolicy(creation: PolicyCreation) {
  const res = await axios.post<AccountResponse>(`${baseUrl}`, creation, getHeaderConfig());
  return res.data;
}

export async function findAllPolicies() {
  const res = await axios.get<AccountResponse>(`${baseUrl}`, getHeaderConfig());
  return res.data;
}

export async function deletePolicy(id: number) {
  const res = await axios({
    url: `${baseUrl}/${id}`,
    method: "DELETE",
    headers: getHeaders(),
  });
  return res.data;
}
