import {useQuery, useQueryClient} from "@tanstack/react-query";
import {ColumnDef, Row} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import {Cross1Icon, PlusIcon} from "@radix-ui/react-icons";
import {DataTable} from "@/components/template/DataTable.tsx";
import {Role} from "@/client/permission/types";
import {deleteRole, findAllRoles, roleQueryKeys} from "@/client/permission/roleClient.ts";
import {usePolicyCreateDialog} from "@/components/permission/table/usePolicyCreateDialog.tsx";

function AddPolicyButton() {

  const { setOpen, component } = usePolicyCreateDialog();

  const onClick = () => {
    setOpen(true);
  }

  return (
    <div className="flex justify-end m-2">
      <Button
        asChild variant="ghost" size="icon"
        className="w-9 h-9 rounded-full cursor-pointer"
        css={{ "&:hover": { backgroundColor: "#dfe0e0" } }}
        onClick={onClick}
      >
        <PlusIcon className="p-2" />
      </Button>
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
      <Button
        asChild variant="ghost" size="icon"
        className="h-9 w-9 rounded-full cursor-pointer"
        css={{ "&:hover": { backgroundColor: "#dfe0e0" } }}
        onClick={onClick}
      >
        <Cross1Icon className="p-2.5" />
      </Button>
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
    header: AddPolicyButton,
    cell: DeleteButton,
  },
];

interface RoleTableProps {
  className?: string;
}

export function RoleTable({ className }: RoleTableProps) {
  const { data: authors } = useQuery<Role[]>({
    queryKey: [roleQueryKeys.findAll],
    queryFn: findAllRoles,
    initialData: [],
  });

  return (
    <DataTable data={authors} columns={columns} className={className} />
  )
}