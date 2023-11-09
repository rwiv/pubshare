import {RoleTable} from "@/components/permission/table/RoleTable.tsx";
import {MainTemplate} from "@/pages/MainTemplate.tsx";

export function RoleListPage() {
  return (
    <MainTemplate>
      <RoleTable className="m-3" />
    </MainTemplate>
  )
}
