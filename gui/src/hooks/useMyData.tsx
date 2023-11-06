import {useQuery} from "@tanstack/react-query";
import {HttpError} from "@/client/common/HttpError.ts";
import {AccountResponse} from "@/client/account/types.ts";
import {accountQueryKeys, getMyData} from "@/client/account/accountClient.ts";

export function useMyData() {
  return useQuery<unknown, HttpError, AccountResponse>({
    queryKey: [accountQueryKeys.me],
    queryFn: getMyData,
    retry: 0,
  });
}
