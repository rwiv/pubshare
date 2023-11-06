import {useEffect, useRef, useState} from 'react';
import { FileResponse } from './types';
import { FileTableHeader } from './FileTableHeader.tsx';
import {Table, TableBody} from "@/components/ui/table.tsx";
import {FileRow} from "@/components/table/filev1/FileRow.tsx";
import {DragPreview} from "@/components/table/filev1/DragPreview.tsx";

interface FileTableProps {
  files: FileResponse[];
}

export function FileTable({ files }: FileTableProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [selection, setSelection] = useState<FileResponse[]>([]);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dFiles, setDFiles] = useState<FileResponse[]>([]);

  useEffect(() => {
    ref.current?.addEventListener("drag", e => {
      setOffset({ x: e.x, y: e.y });
    })
  }, []);

  return (
    <div className="rounded-md border" ref={ref}>
      <DragPreview offset={offset} paddingX={20} paddingY={20} dFiles={dFiles} />
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
              setDFiles={setDFiles}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
