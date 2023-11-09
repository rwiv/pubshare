import {appConstants} from "@/common/appConstants.ts";
import {AccountRole, AccountRoleCreation, AccountRoleResponse} from "@/client/permission/types";
import axios from "axios";
import {getHeaderConfig, runCatching} from "@/client/common/clientUtils.ts";

const baseUrl = `${appConstants.host}/api/account-roles`;

export const accountRoleQueryKeys = {
  accountId: "account-roles/account-id"
};

export const createAccountRole = (creation: AccountRoleCreation) => runCatching(async () => {
  const res = await axios.post<AccountRole>(`${baseUrl}`, creation, getHeaderConfig());
  return res.data;
});

export async function findAccountRolesByAccountId(accountId: number) {
  const res = await axios.get<AccountRoleResponse[]>(`${baseUrl}/account-id/${accountId}`, getHeaderConfig());
  return res.data;
}

export async function deleteAccountRole(id: number) {
  const res = await axios.delete<AccountRoleResponse>(`${baseUrl}/${id}`, getHeaderConfig());
  return res.data;
}
