import {MainTemplate} from "@/pages/MainTemplate.tsx";
import {AccountTable} from "@/components/account/table/AccountTable.tsx";

export function AccountListPage() {
  return (
    <MainTemplate>
      <div className="m-4">
        <AccountTable />
      </div>
    </MainTemplate>
  )
}