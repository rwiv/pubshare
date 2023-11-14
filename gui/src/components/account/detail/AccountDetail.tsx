import {VStack} from "@/util/css/layoutComponents.ts";
import {AccountRoles} from "@/components/account/detail/role/AccountRoles.tsx";
import {AccountInfo} from "@/components/account/detail/info/AccountInfo.tsx";
import {useAccountById} from "@/hooks/query/accountQueries.tsx";

interface AccountDetailProps {
  accountId: number;
  className?: string;
}

const layout = "border rounded-lg p-4";

export function AccountDetail({ accountId, className }: AccountDetailProps) {

  const {data: account} = useAccountById(accountId);

  if (account === undefined || accountId === null) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <VStack className={className}>
      <AccountInfo account={account} className={layout} />
      <AccountRoles account={account} className={layout} />
    </VStack>
  )
}
