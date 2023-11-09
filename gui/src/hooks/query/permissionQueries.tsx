import {Role} from "@/client/permission/types";
import {findAllRoles, roleQueryKeys} from "@/client/permission/roleClient.ts";
import {useQuery} from "@tanstack/react-query";

export function useRolesAll() {
  return useQuery<Role[]>({
    queryKey: [roleQueryKeys.findAll],
    queryFn: findAllRoles,
    initialData: [],
  });
}
