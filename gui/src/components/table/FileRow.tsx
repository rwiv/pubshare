import {TableCell, TableRow} from "@/components/ui/table.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {useDrag, useDrop} from "react-dnd";
import {FileResponse} from "@/components/table/types";
import {Dispatch, SetStateAction, useEffect, useRef} from "react";
import {css} from "@emotion/react";

interface FileRowProps {
  item: FileResponse;
  files: FileResponse[];
  selection: FileResponse[];
  setSelection: Dispatch<SetStateAction<FileResponse[]>>;
  setDFiles: Dispatch<SetStateAction<FileResponse[]>>;
}

export function FileRow({ item, selection, setSelection, setDFiles }: FileRowProps) {

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: 'FILE',
    item: { name: item.name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: () => {
      console.log("end");
    }
  }));

  const [{ isOver }, drop] = useDrop<{ name:string }, undefined, {isOver: boolean, canDrop:boolean }>(() => ({
    accept: 'FILE',
    hover: ({ name }) => {
      console.log(name);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const include = () => {
    return selection.map(file => file.name).includes(item.name);
  }

  const toggleRow = (file: FileResponse) => {
    return setSelection((selection) =>
      selection.includes(file)
        ? selection.filter((item) => item.name !== file.name)
        : [...selection, file],
    );
  };

  const style = css`
    opacity: ${isDragging ? 0.5 : 1};
    background: ${isOver && !include() ? "gray" : "white"};
  `

  const noneRef = useRef(null);

  useEffect(() => {
    dragPreview(noneRef);
  });

  useEffect(() => {
    if (isDragging) {
      if (selection.length > 0) {
        setDFiles(selection);
      } else {
        setDFiles([item]);
      }
    } else {
      setDFiles([]);
    }
  }, [isDragging, item, selection, setDFiles]);

  return (
    <>
      <tr style={{display: "none"}} ref={noneRef} />
      <TableRow ref={node => drag(drop(node))} css={style}>
        <TableCell>
          <Checkbox
            onClick={() => toggleRow(item)}
            checked={selection.includes(item)}
          />
        </TableCell>
        <TableCell>{item.type}</TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.modified}</TableCell>
        <TableCell>{item.size}</TableCell>
      </TableRow>
    </>
  );
}