import {useQuery, useQueryClient} from "@tanstack/react-query";
import {accountQueryKeys, findAccountById} from "@/client/account/accountClient.ts";
import {AccountResponse} from "@/client/account/types.ts";
import {AccountRoleResponse} from "@/client/permission/types";
import {findAccountRolesByAccountId, accountRoleQueryKeys} from "@/client/permission/accountRoleClient.ts";
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

  const {data: accountRoles} = useQuery<AccountRoleResponse[]>({
    queryKey: [accountRoleQueryKeys.accountId, accountId],
    queryFn: ctx => findAccountRolesByAccountId(parseInt(ctx.queryKey[1] as string)),
    initialData: [],
  });

  const onClick = async () => {
    // await createRole({ accountId, policyId });
    // await queryClient.invalidateQueries({ queryKey: [roleQueryKeys.accountId, accountId] });
  }

  return (
    <VStack className={className}>
      {account && account.email}
      {accountRoles.map(accountRole => (
        <div key={accountRole.id}>
          <div>{accountRole.policy.id}</div>
        </div>
      ))}
      <div>
        <Button onClick={onClick}>Add Role</Button>
      </div>
    </VStack>
  )
}
