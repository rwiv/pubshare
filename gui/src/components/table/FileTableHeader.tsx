import { SubProps } from './types';
import { Checkbox } from "@/components/ui/checkbox.tsx";
import {TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";

export function FileTableHeader({ files, selection, setSelection }: SubProps) {
  const toggleAll = () => {
    return setSelection((current) => {
      return current.length === files.length
        ? []
        : files.map((item) => item.name);
    });
  };

  return (
    <TableHeader>
      <TableRow>
        <TableHead>
          <Checkbox
            onClick={toggleAll}
            checked={selection.length === files.length}
          />
        </TableHead>
        <TableHead>Type</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Modified</TableHead>
        <TableHead>Size</TableHead>
      </TableRow>
    </TableHeader>
  );
}
