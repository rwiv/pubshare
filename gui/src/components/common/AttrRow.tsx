import {TableCell, TableRow} from "@/components/ui/table.tsx";
import {ReactNode} from "react";

interface AttrRowProps {
  name: string,
  children: ReactNode;
}

export function AttrRow({ name, children }: AttrRowProps) {
  return (
    <TableRow className="cursor-default">
      <TableCell className="w-16">{name}</TableCell>
      <TableCell>{children}</TableCell>
    </TableRow>
  )
}
