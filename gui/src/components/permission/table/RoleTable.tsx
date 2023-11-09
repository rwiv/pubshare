import {useQueryClient} from "@tanstack/react-query";
import {ColumnDef, Row} from "@tanstack/react-table";
import {Cross1Icon, PlusIcon} from "@radix-ui/react-icons";
import {DataTable} from "@/components/common/DataTable.tsx";
import {Role} from "@/client/permission/types";
import {deleteRole, roleQueryKeys} from "@/client/permission/roleClient.ts";
import {useRoleCreateDialog} from "@/components/permission/table/useRoleCreateDialog.tsx";
import {SmallIconButton} from "@/components/common/SmallIconButton.tsx";
import {useRolesAll} from "@/hooks/query/permissionQueries.tsx";

function AddRoleButton() {

  const { setOpen, component } = useRoleCreateDialog();

  const onClick = () => {
    setOpen(true);
  }

  return (
    <div className="flex justify-end m-2">
      <SmallIconButton onClick={onClick} >
        <PlusIcon className="p-2" />
      </SmallIconButton>
      {component}
    </div>
  )
}

function DeleteButton({ row }: { row: Row<Role> }) {
  const queryClient = useQueryClient();

  const onClick = async () => {
    await deleteRole(row.original.id);
    await queryClient.invalidateQueries({ queryKey: [roleQueryKeys.findAll] });
  };

  return (
    <div className="flex justify-end mr-2">
      <SmallIconButton onClick={onClick}>
        <Cross1Icon className="p-2.5" />
      </SmallIconButton>
    </div>
  )
}

const columns: ColumnDef<Role>[] = [
  {
    accessorKey: "id",
    header: () => (<div className="text-center">Id</div>),
    cell: ({ row }) => (
      <div className="text-center">{row.original.id}</div>
    )
  },
  {
    accessorKey: "name",
    header: () => (<div className="text-center">Name</div>),
    cell: ({ row }) => (
      <div className="text-center">{row.original.name}</div>
    )
  },
  {
    id: "delete",
    header: AddRoleButton,
    cell: DeleteButton,
  },
];

interface RoleTableProps {
  className?: string;
}

export function RoleTable({ className }: RoleTableProps) {
  const { data: authors } = useRolesAll();

  return (
    <DataTable data={authors} columns={columns} className={className} />
  )
}