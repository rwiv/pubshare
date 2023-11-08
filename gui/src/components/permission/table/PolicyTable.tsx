import {useQuery, useQueryClient} from "@tanstack/react-query";
import {ColumnDef, Row} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import {Cross1Icon, PlusIcon} from "@radix-ui/react-icons";
import {DataTable} from "@/components/template/DataTable.tsx";
import {Policy} from "@/client/permission/types";
import {deletePolicy, findAllPolicies, policyQueryKeys} from "@/client/permission/policyClient.ts";
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

function DeleteButton({ row }: { row: Row<Policy> }) {
  const queryClient = useQueryClient();

  const onClick = async () => {
    await deletePolicy(row.original.id);
    await queryClient.invalidateQueries({ queryKey: [policyQueryKeys.findAll] });
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
    header: AddPolicyButton,
    cell: DeleteButton,
  },
];

interface PolicyTableProps {
  className?: string;
}

export function PolicyTable({ className }: PolicyTableProps) {
  const { data: authors } = useQuery<Policy[]>({
    queryKey: [policyQueryKeys.findAll],
    queryFn: findAllPolicies,
    initialData: [],
  });

  return (
    <DataTable data={authors} columns={columns} className={className} />
  )
}