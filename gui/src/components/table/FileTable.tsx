import { Table } from '@mantine/core';
import { useState } from 'react';
import { FileResponse } from './types';
import { TableHeader } from './TableHeader.tsx';
import { TableRows } from './TableRows.tsx';

interface FileTableProps {
  files: FileResponse[];
}

export function FileTable({ files }: FileTableProps) {
  const [selection, setSelection] = useState(['1']);

  return (
    <Table highlightOnHover withBorder miw={800} verticalSpacing="sm">
      <TableHeader
        files={files}
        selection={selection}
        setSelection={setSelection}
      />
      <TableRows
        files={files}
        selection={selection}
        setSelection={setSelection}
      />
    </Table>
  );
}