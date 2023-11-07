import {useQuery, useQueryClient} from "@tanstack/react-query";
import {ColumnDef, Row} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import {Cross1Icon} from "@radix-ui/react-icons";
import {DataTable} from "@/components/template/DataTable.tsx";
import {AccountResponse} from "@/client/account/types.ts";
import {accountQueryKeys, findAllAccounts, deleteAccount} from "@/client/account/accountClient.ts";

function DeleteButton({ row }: { row: Row<AccountResponse> }) {
      const queryClient = useQueryClient();

      const onClick = async () => {
        await deleteAccount(row.original.id);
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

const columns: ColumnDef<AccountResponse>[] = [
  {
    accessorKey: "id",
    header: () => (<div className="text-center">Id</div>),
    cell: ({ row }) => (
      <div className="text-center">{row.original.id}</div>
    )
  },
  {
    accessorKey: "email",
    header: () => (<div className="text-center">Email</div>),
    cell: ({ row }) => (
      <div className="text-center">{row.original.email}</div>
    )
  },
  {
    accessorKey: "nickname",
    header: () => (<div className="text-center">Nickname</div>),
    cell: ({ row }) => (
      <div className="text-center">{row.original.nickname}</div>
    )
  },
  {
    accessorKey: "certified",
    header: () => (<div className="text-center">certified</div>),
    cell: ({ row }) => {
      const certified = row.original.certified;
      return <div className="text-center">{certified ? "o" : "x"}</div>
    }
  },
  {
    accessorKey: "type",
    header: () => (<div className="text-center">Type</div>),
    cell: ({ row }) => (
      <div className="text-center">{row.original.type}</div>
    )
  },
  {
    id: "delete",
    cell: DeleteButton,
  },
];

export function AccountTable() {
  const { data: authors } = useQuery({
    queryKey: [accountQueryKeys.findAll],
    queryFn: findAllAccounts,
    initialData: [],
  });

  return (
    <DataTable
      data={authors} columns={columns}
    />
  )
}