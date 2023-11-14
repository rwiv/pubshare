import {useQueryClient} from "@tanstack/react-query";
import {ColumnDef, Row} from "@tanstack/react-table";
import {Cross1Icon} from "@radix-ui/react-icons";
import {DataTable} from "@/components/common/DataTable.tsx";
import {AccountResponse} from "@/client/account/types.ts";
import {accountQueryKeys, deleteAccount} from "@/client/account/accountClient.ts";
import {Badge} from "@/components/ui/badge.tsx";
import {HStack} from "@/util/css/layoutComponents.ts";
import {SmallIconButton} from "@/components/common/SmallIconButton.tsx";
import {useAccountsAll} from "@/hooks/query/accountQueries.tsx";
import React from "react";

function ButtonSet({ row }: { row: Row<AccountResponse> }) {
  const queryClient = useQueryClient();

  const onDelete = async () => {
    await deleteAccount(row.original.id);
    await queryClient.invalidateQueries({ queryKey: [accountQueryKeys.findAll] });
  };

  return (
    <HStack className="justify-end mr-2">
      <SmallIconButton>
        <Cross1Icon className="p-2.5" onClick={onDelete} />
      </SmallIconButton>
    </HStack>
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
    accessorKey: "username",
    header: () => (<div className="text-center">Email</div>),
    cell: ({ row }) => (
      <div className="text-center">{row.original.username}</div>
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
    accessorKey: "type",
    header: () => (<div className="text-center">Type</div>),
    cell: ({ row }) => {
      const type = row.original.type.toLowerCase();
      return (
        <div className="flex justify-center">
          {/*<Badge variant={type === "admin" ? "default" : "secondary"}>{type}</Badge>*/}
          <Badge variant="default">{type}</Badge>
        </div>
      )
    }
  },
  {
    id: "delete",
    cell: ButtonSet,
  },
];

interface AccountTableProps {
  className?: string;
  setCurAccount: React.Dispatch<React.SetStateAction<AccountResponse | undefined>>
}

export function AccountTable({ className, setCurAccount }: AccountTableProps) {
  const { data: authors } = useAccountsAll();

  return (
    <DataTable
      className={className}
      data={authors} columns={columns}
      onClickRow={account => setCurAccount(account)}
    />
  )
}