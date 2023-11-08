import {MainTemplate} from "@/pages/MainTemplate.tsx";
import {AccountTable} from "@/components/account/table/AccountTable.tsx";

export function AccountListPage() {
  return (
    <MainTemplate>
      <AccountTable className="m-3" />
    </MainTemplate>
  )
}