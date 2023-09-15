import { useState } from 'react';
import { FileResponse } from './types';
import { FileTableHeader } from './FileTableHeader.tsx';
import { FileTableBody } from './FileTableBody.tsx';
import {Table} from "@/components/ui/table.tsx";

interface FileTableProps {
  files: FileResponse[];
}

export function FileTable({ files }: FileTableProps) {
  const [selection, setSelection] = useState(['1']);

  return (
    <div className="rounded-md border">
      <Table>
        <FileTableHeader
          files={files}
          selection={selection}
          setSelection={setSelection}
        />
        <FileTableBody
          files={files}
          selection={selection}
          setSelection={setSelection}
        />
      </Table>
    </div>
  );
}
