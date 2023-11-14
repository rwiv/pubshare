import {TableCell, TableRow} from "@/components/ui/table.tsx";

export function AttrRow({ name, value }: { name: string, value: string }) {
  return (
    <TableRow className="cursor-default">
      <TableCell className="w-16">{name}</TableCell>
      <TableCell>{value}</TableCell>
    </TableRow>
  )
}
