import {useQuery, useQueryClient} from "@tanstack/react-query";
import {ColumnDef, Row} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import {Cross1Icon} from "@radix-ui/react-icons";
import {DataTable} from "@/components/template/DataTable.tsx";
import {Policy} from "@/client/permission/types";
import {deletePolicy, findAllPolicies, policyQueryKeys} from "@/client/permission/policyClient.ts";
import {usePolicyCreateDialog} from "@/components/permission/table/usePolicyCreateDialog.tsx";

function DeleteButton({ row }: { row: Row<Policy> }) {
  const queryClient = useQueryClient();

  const onClick = async () => {
    await deletePolicy(row.original.id);
    await queryClient.invalidateQueries({ queryKey: [policyQueryKeys.findAll] });
  };

  return (
    <div className="flex justify-end">
      <Button variant="ghost" className="h-8 w-8 p-0" onClick={onClick}>
        <Cross1Icon className="h-4 w-4" />
      </Button>
    </div>
  )
}

const columns: ColumnDef<Policy>[] = [
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
    cell: DeleteButton,
  },
];

export function PolicyTable() {
  const { data: authors } = useQuery<Policy[]>({
    queryKey: [policyQueryKeys.findAll],
    queryFn: findAllPolicies,
    initialData: [],
  });

  const { setOpen, component } = usePolicyCreateDialog();

  return (
    <DataTable
      data={authors}
      columns={columns}
      openDialog={setOpen}
      addDialog={component}
    />
  )
}