import {useQuery, useQueryClient} from "@tanstack/react-query";
import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import {Cross1Icon} from "@radix-ui/react-icons";
import {DataTable} from "@/components/table/DataTable.tsx";
import {AccountResponse} from "@/client/account/types.ts";
import {accountQueryKeys, findAll, remove} from "@/client/account/accountClient.ts";

const columns: ColumnDef<AccountResponse>[] = [
  {
    accessorKey: "id",
    header: () => (<div className="text-center">Id</div>),
    cell: ({ row }) => (<div className="text-center">{row.getValue("id")}</div>)
  },
  {
    accessorKey: "name",
    header: () => (<div className="text-center">Header</div>),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("name")}</div>
    )
  },
  {
    id: "delete",
    cell: ({ row }) => {
      const queryClient = useQueryClient();

      const onClick = async () => {
        await remove(row.getValue("id"));
        await queryClient.invalidateQueries({ queryKey: [accountQueryKeys.findAll] });
      };

      return (
        <div className="flex justify-end">
          <Button variant="ghost" className="h-8 w-8 p-0" onClick={onClick}>
            <Cross1Icon className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  },
];

export function AccountTable() {
  const { data: authors } = useQuery({
    queryKey: [accountQueryKeys.findAll],
    queryFn: findAll,
    initialData: [],
  });

  return (
    <DataTable
      data={authors} columns={columns}
    />
  )
}