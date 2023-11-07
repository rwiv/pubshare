import {FileResponse} from './types';
import { Checkbox } from "@/components/ui/checkbox.tsx";
import {TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Dispatch, SetStateAction} from "react";

interface FileTableHeaderProps {
  files: FileResponse[];
  selection: FileResponse[];
  setSelection: Dispatch<SetStateAction<FileResponse[]>>;
}

export function FileTableHeader({ files, selection, setSelection }: FileTableHeaderProps) {
  const toggleAll = () => {
    return setSelection((current) => {
      return current.length === files.length
        ? []
        : files.map((item) => item);
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
