import {useQuery, useQueryClient} from "@tanstack/react-query";
import {accountQueryKeys, findAccountById} from "@/client/account/accountClient.ts";
import {AccountResponse} from "@/client/account/types.ts";
import {AccountRoleResponse} from "@/client/permission/types";
import {
  findAccountRolesByAccountId,
  accountRoleQueryKeys,
  deleteAccountRole
} from "@/client/permission/accountRoleClient.ts";
import {Button} from "@/components/ui/button.tsx";
import {HStack, VStack} from "@/util/css/layoutComponents.ts";
import {useAccountRoleCreateDialog} from "@/components/account/detail/useAccountRoleCreateDialog.tsx";
import {Cross1Icon} from "@radix-ui/react-icons";

interface AccountDetailProps {
  accountId: number;
  className?: string;
}

export function AccountDetail({ className, accountId }: AccountDetailProps) {

  const queryClient = useQueryClient();
  const {setOpen, component} = useAccountRoleCreateDialog(accountId);
  const {data: account} = useQuery<AccountResponse>({
    queryKey: [accountQueryKeys.findById, accountId],
    queryFn: ctx => findAccountById(parseInt(ctx.queryKey[1] as string)),
  });
  const {data: accountRoles} = useQuery<AccountRoleResponse[]>({
    queryKey: [accountRoleQueryKeys.accountId, accountId],
    queryFn: ctx => findAccountRolesByAccountId(parseInt(ctx.queryKey[1] as string)),
    initialData: [],
  });

  const onDelete = async (accountRoleId: number) => {
    await deleteAccountRole(accountRoleId);
    await queryClient.invalidateQueries({ queryKey: [accountRoleQueryKeys.accountId, accountId] });
  }

  return (
    <VStack className={className}>
      {account && account.username}
      <h1>Roles</h1>
      {accountRoles.map(accountRole => (
        <HStack key={accountRole.id}>
          <h2 className="m-1">{accountRole.role.name}</h2>
          <Button
            asChild variant="ghost" size="icon"
            className="h-9 w-9 rounded-full cursor-pointer"
            css={{ "&:hover": { backgroundColor: "#dfe0e0" } }}
            onClick={() => onDelete(accountRole.id)}
          >
            <Cross1Icon className="p-2.5" />
          </Button>
        </HStack>
      ))}
      <div>
        <Button onClick={() => setOpen(true)}>Add Role</Button>
      </div>
      {component}
    </VStack>
  )
}
