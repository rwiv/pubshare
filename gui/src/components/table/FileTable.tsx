import { useState } from 'react';
import { FileResponse } from './types';
import { FileTableHeader } from './FileTableHeader.tsx';
import {Table, TableBody} from "@/components/ui/table.tsx";
import {FileRow} from "@/components/table/FileRow.tsx";

interface FileTableProps {
  files: FileResponse[];
}

export function FileTable({ files }: FileTableProps) {
  const [selection, setSelection] = useState<string[]>([]);

  return (
    <div className="rounded-md border">
      <Table>
        <FileTableHeader
          files={files}
          selection={selection}
          setSelection={setSelection}
        />
        <TableBody>
          {files.map((item) => (
            <FileRow
              key={item.name}
              item={item}
              files={files}
              selection={selection}
              setSelection={setSelection}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
