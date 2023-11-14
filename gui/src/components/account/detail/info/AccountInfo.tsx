import {Table, TableBody} from "@/components/ui/table.tsx";
import {AttrRow} from "@/components/common/AttrRow.tsx";
import {AccountResponse} from "@/client/account/types.ts";
import {useQueryClient} from "@tanstack/react-query";
import {accountQueryKeys, certificate} from "@/client/account/accountClient.ts";
import {Button} from "@/components/ui/button.tsx";

interface AccountInfoProps {
  account: AccountResponse;
  className?: string;
}

export function AccountInfo({ account, className }: AccountInfoProps) {
  return (
    <div className={className}>
      <h4 className="text-lg font-normal">Info</h4>
      <Table className="my-1.5">
        <TableBody>
          <AttrRow name="id">{account.id}</AttrRow>
          <AttrRow name="email">{account.username}</AttrRow>
          <AttrRow name="nickname">{account.nickname}</AttrRow>
          <AttrRow name="type">{account.type}</AttrRow>
          <AttrRow name="certified">
            <Certified account={account} />
          </AttrRow>
        </TableBody>
      </Table>
    </div>
  )
}

function Certified({ account }: { account: AccountResponse }) {
  const queryClient = useQueryClient();

  const onClick = async () => {
    await certificate(account.id);
    await queryClient.invalidateQueries({ queryKey: [accountQueryKeys.findById, account.id] });
  }

  return (
    <>
      {account.certified ? (
        <div>certified</div>
      ) : (
        <Button variant="secondary" onClick={onClick}>certify</Button>
      )}
    </>
  )
}
