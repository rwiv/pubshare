import {accessQueryKeys, list} from "@/client/access/accessClient.ts";
import {useQuery} from "@tanstack/react-query";

export function useFileList(path: string) {
  return useQuery({
    queryKey: [accessQueryKeys.list, path],
    queryFn: ctx => list(ctx.queryKey[1]),
    initialData: [],
  });
}
