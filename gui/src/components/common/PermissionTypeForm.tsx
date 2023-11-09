import {SelectContent, SelectItem} from "@/components/ui/select.tsx";
import {permissionTypes} from "@/common/permissionTypes.ts";

export function PermissionTypeSelect() {
  return (
    <SelectContent>
      <SelectItem value={permissionTypes.FORBIDDEN}>{permissionTypes.FORBIDDEN}</SelectItem>
      <SelectItem value={permissionTypes.KNOWN}>{permissionTypes.KNOWN}</SelectItem>
      <SelectItem value={permissionTypes.READ}>{permissionTypes.READ}</SelectItem>
      <SelectItem value={permissionTypes.WRITE}>{permissionTypes.WRITE}</SelectItem>
    </SelectContent>
  )
}