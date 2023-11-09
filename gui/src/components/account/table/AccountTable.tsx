import {useQueryClient} from "@tanstack/react-query";
import {ColumnDef, Row} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import {Cross1Icon, FileTextIcon} from "@radix-ui/react-icons";
import {DataTable} from "@/components/common/DataTable.tsx";
import {AccountResponse} from "@/client/account/types.ts";
import {accountQueryKeys, deleteAccount, certificate} from "@/client/account/accountClient.ts";
import {Badge} from "@/components/ui/badge.tsx";
import {HStack} from "@/util/css/layoutComponents.ts";
import {useNavigate} from "react-router";
import {SmallIconButton} from "@/components/common/SmallIconButton.tsx";
import {useAccountsAll} from "@/hooks/query/accountQueries.tsx";

function ButtonSet({ row }: { row: Row<AccountResponse> }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onClickDetailBtn = () => {
    navigate(`/accounts/${row.original.id}`);
  }

  const onClickDeleteBtn = async () => {
    await deleteAccount(row.original.id);
    await queryClient.invalidateQueries({ queryKey: [accountQueryKeys.findAll] });
  };

  return (
    <HStack className="justify-end mr-2">
      <SmallIconButton>
        <FileTextIcon className="p-2.5" onClick={onClickDetailBtn} />
      </SmallIconButton>
      <SmallIconButton>
        <Cross1Icon className="p-2.5" onClick={onClickDeleteBtn} />
      </SmallIconButton>
    </HStack>
  )
}

function CertifiedCell({ row }: { row: Row<AccountResponse> }) {
  const queryClient = useQueryClient();
  const file = row.original;

  const onClick = async () => {
    await certificate(file.id);
    await queryClient.invalidateQueries({ queryKey: [accountQueryKeys.findAll] });
  }

  if (file.certified) {
    return (
      <div className="text-center">certified</div>
    )
  } else {
    return (
      <div className="flex justify-center">
        <Button variant="secondary" onClick={onClick}>certify</Button>
      </div>
    )
  }
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
    accessorKey: "certified",
    header: () => (<div className="text-center">certified</div>),
    cell: CertifiedCell,
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
}

export function AccountTable({ className }: AccountTableProps) {
  const { data: authors } = useAccountsAll();

  return (
    <DataTable data={authors} columns={columns} className={className} />
  )
}