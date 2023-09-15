import { Checkbox } from "@/components/ui/checkbox.tsx";
import { SubProps } from './types';
import {TableBody, TableCell, TableRow} from "@/components/ui/table.tsx";

export function FileTableBody({ files, selection, setSelection }: SubProps) {
  const toggleRow = (id: string) => {
    console.log("hello")
    console.log(selection)
    return setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  return files.map((item) => {
    return (
      <TableBody>
        <TableRow key={item.name}>
          <TableCell>
            <Checkbox
              onClick={() => toggleRow(item.name)}
              checked={selection.includes(item.name)}
            />
          </TableCell>
          <TableCell>{item.type}</TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.modified}</TableCell>
          <TableCell>{item.size}</TableCell>
        </TableRow>
      </TableBody>
    );
  });
}
