import axios from "axios";
import {appConstants} from "@/common/appConstants.ts";
import {getHeaderConfig, runCatching} from "@/client/common/clientUtils.ts";
import {AccountCreation, AccountResponse, LoginRequest, LoginResponse} from "@/client/account/types.ts";

const baseUrl = `${appConstants.host}/api/accounts`;

export const accountQueryKeys = {
  me: "me",
  findAll: "accounts/findAll",
  findById: "accounts/findById"
};

export async function getMyData() {
  return runCatching(async () => {
    const res = await axios.get<AccountResponse>(
      `${baseUrl}/me`, getHeaderConfig(),
    );
    return res.data;
  });
}

export async function getMyDataByToken(token: string) {
  return runCatching(async () => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get<AccountResponse>(
      `${baseUrl}/me`, headers,
    );
    return res.data;
  });
}

export async function signup(creation: AccountCreation) {
  const res = await axios.post<AccountResponse>(`${baseUrl}/signup`, creation);
  return res.data;
}

export async function login(req: LoginRequest) {
  const res = await axios.post<LoginResponse>(`${baseUrl}/login`, req);
  return res.data;
}

export async function findAllAccounts() {
  const res = await axios.get<AccountResponse[]>(`${baseUrl}`, getHeaderConfig());
  return res.data;
}

export async function findAccountById(id: number) {
  const res = await axios.get(`${baseUrl}/${id}`, getHeaderConfig());
  return res.data;
}

export async function deleteAccount(id: number) {
  const res = await axios.delete<LoginResponse>(`${baseUrl}/${id}`, getHeaderConfig());
  return res.data;
}

export async function certificate(id: number) {
  const url = `${baseUrl}/certificate/${id}`;
  const res = await axios.patch<AccountResponse>(url, getHeaderConfig());
  return res.data;
}
