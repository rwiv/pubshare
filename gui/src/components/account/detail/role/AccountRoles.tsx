import {useQuery, useQueryClient} from "@tanstack/react-query";
import {AccountRoleResponse} from "@/client/permission/types";
import {AddableHeader} from "@/components/file/detail/common/AddableHeader.tsx";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {useAccountRoleCreateDialog} from "@/components/account/detail/role/useAccountRoleCreateDialog.tsx";
import {AccountResponse} from "@/client/account/types.ts";
import {
  accountRoleQueryKeys,
  deleteAccountRole,
  findAccountRolesByAccountId
} from "@/client/permission/accountRoleClient.ts";

interface RolesProps {
  account: AccountResponse;
  className?: string;
}

export function AccountRoles({ account, className }: RolesProps) {

  const {setOpen, component} = useAccountRoleCreateDialog(account.id);
  const {data: accountRoles} = useQuery<AccountRoleResponse[]>({
    queryKey: [accountRoleQueryKeys.accountId, account.id],
    queryFn: ctx => findAccountRolesByAccountId(parseInt(ctx.queryKey[1] as string)),
    initialData: [],
  });

  return (
    <div className={className}>
      <AddableHeader title="Roles" onAdd={() => setOpen(true)} />
      <div className="flex flex-wrap my-2">
        {accountRoles.map(accountRole => (
          <AccountRole accountRole={accountRole} account={account} />
        ))}
      </div>
      {component}
    </div>
  )
}


interface AccountRoleProps {
  accountRole: AccountRoleResponse;
  account: AccountResponse;
  className?: string;
}

function AccountRole({ accountRole, account }: AccountRoleProps) {

  const queryClient = useQueryClient();

  const onDelete = async () => {
    await deleteAccountRole(accountRole.id);
    await queryClient.invalidateQueries({ queryKey: [accountRoleQueryKeys.accountId, account.id] });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Badge variant="secondary" className="cursor-pointer mx-1" >{accountRole.role.name}</Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
