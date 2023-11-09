import {HttpError} from "@/client/common/HttpError.ts";
import {AccountResponse} from "@/client/account/types.ts";
import {accountQueryKeys, findAccountById, findAllAccounts, getMyData} from "@/client/account/accountClient.ts";
import {useQuery} from "@tanstack/react-query";

export function useMyData() {
  return useQuery<unknown, HttpError, AccountResponse>({
    queryKey: [accountQueryKeys.me],
    queryFn: getMyData,
    retry: 0,
  });
}

export function useAccountById(accountId: number) {
  return useQuery<AccountResponse>({
    queryKey: [accountQueryKeys.findById, accountId],
    queryFn: ctx => findAccountById(parseInt(ctx.queryKey[1] as string)),
  });
}

export function useAccountsAll() {
  return useQuery({
    queryKey: [accountQueryKeys.findAll],
    queryFn: findAllAccounts,
    initialData: [],
  });
}