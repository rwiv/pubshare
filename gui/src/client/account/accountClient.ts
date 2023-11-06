import axios from "axios";
import {appConstants} from "@/common/appConstants.ts";
import {getHeaderConfig, runCatching} from "@/client/common/clientUtils.ts";
import {AccountCreation, AccountResponse, LoginRequest, LoginResponse} from "@/client/account/types.ts";

const baseUrl = `${appConstants.host}/api/accounts`;

export const accountQueryKeys = {
  me: "me",
  findAll: "findAll",
};

export async function getMyData() {
  return runCatching(async () => {
    const res = await axios.get<AccountResponse>(
      `${baseUrl}/me`, getHeaderConfig(),
    );
    return res.data;
  });
}

export async function signup(creation: AccountCreation) {
  const res = await axios.post<AccountResponse>(
      `${baseUrl}/signup`, creation,
  );
  return res.data;
}

export async function login(req: LoginRequest) {
  const res = await axios.post<LoginResponse>(`${baseUrl}/login`, req);
  return res.data;
}

export async function findAll() {
  const res = await axios.get(`${baseUrl}`, getHeaderConfig());
  return res.data;
}

export async function findById(id: number) {
  const res = await axios.get(`${baseUrl}/${id}`, getHeaderConfig());
  return res.data;
}

export async function remove(id: number) {
  const res = await axios.delete<LoginResponse>(`${baseUrl}/${id}`, getHeaderConfig());
  return res.data;
}
