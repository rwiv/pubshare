import {useQuery, useQueryClient} from "@tanstack/react-query";
import {ColumnDef, Row} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import {Cross1Icon, FileTextIcon} from "@radix-ui/react-icons";
import {DataTable} from "@/components/template/DataTable.tsx";
import {AccountResponse} from "@/client/account/types.ts";
import {accountQueryKeys, findAllAccounts, deleteAccount, certificate} from "@/client/account/accountClient.ts";
import {Badge} from "@/components/ui/badge.tsx";
import {ReactNode} from "react";
import {HStack} from "@/util/css/layoutComponents.ts";
import {useNavigate} from "react-router";

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

  function Icon({ children }: {children: ReactNode}) {
    return (
      <Button
        asChild variant="ghost" size="icon"
        className="h-9 w-9 rounded-full cursor-pointer"
        css={{ "&:hover": { backgroundColor: "#dfe0e0" } }}
      >
        {children}
      </Button>
    )
  }

  return (
    <HStack className="justify-end mr-2">
      <Icon>
        <FileTextIcon className="p-2.5" onClick={onClickDetailBtn} />
      </Icon>
      <Icon>
        <Cross1Icon className="p-2.5" onClick={onClickDeleteBtn} />
      </Icon>
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
      <div className="text-center">o</div>
    )
  } else {
    return (
      <div className="flex justify-center">
        <Button onClick={onClick}>certify</Button>
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
    cell: CertifiedCell,
  },
  {
    accessorKey: "type",
    header: () => (<div className="text-center">Type</div>),
    cell: ({ row }) => {
      const type = row.original.type.toLowerCase();
      return (
        <div className="flex justify-center">
          <Badge variant={type === "admin" ? "default" : "secondary"}>{type}</Badge>
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
  const { data: authors } = useQuery({
    queryKey: [accountQueryKeys.findAll],
    queryFn: findAllAccounts,
    initialData: [],
  });

  return (
    <DataTable data={authors} columns={columns} className={className} />
  )
}