import {useQuery, useQueryClient} from "@tanstack/react-query";
import {accountQueryKeys, findAccountById} from "@/client/account/accountClient.ts";
import {AccountResponse} from "@/client/account/types.ts";
import {Role} from "@/client/permission/types";
import {createRole, findRolesByAccountId, roleQueryKeys} from "@/client/permission/roleClient.ts";
import {Button} from "@/components/ui/button.tsx";
import {VStack} from "@/util/css/layoutComponents.ts";

interface AccountDetailProps {
  accountId: number;
  className?: string;
}

export function AccountDetail({ className, accountId }: AccountDetailProps) {

  const queryClient = useQueryClient();

  const {data: account} = useQuery<AccountResponse>({
    queryKey: [accountQueryKeys.findById, accountId],
    queryFn: ctx => findAccountById(parseInt(ctx.queryKey[1] as string)),
  });

  const {data: roles} = useQuery<Role[]>({
    queryKey: [roleQueryKeys.accountId, accountId],
    queryFn: ctx => findRolesByAccountId(parseInt(ctx.queryKey[1] as string)),
    initialData: [],
  });

  const onClick = async () => {
    // await createRole({ accountId, policyId });
    // await queryClient.invalidateQueries({ queryKey: [roleQueryKeys.accountId, accountId] });
  }

  return (
    <VStack className={className}>
      {account && account.email}
      {roles.map(role => (
        <div key={role.id}>
          <div>{role.policyId}</div>
          <div>{role.policyId}</div>
        </div>
      ))}
      <div>
        <Button onClick={onClick}>Add Role</Button>
      </div>
    </VStack>
  )
}
