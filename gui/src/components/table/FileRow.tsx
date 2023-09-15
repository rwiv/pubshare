import {TableCell, TableRow} from "@/components/ui/table.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {useDrag, useDrop} from "react-dnd";
import {FileResponse} from "@/components/table/types";
import {Dispatch, SetStateAction, useEffect, useRef} from "react";
import {css} from "@emotion/react";

interface FileRowProps {
  item: FileResponse;
  files: FileResponse[];
  selection: string[];
  setSelection: Dispatch<SetStateAction<string[]>>;
}

export function FileRow({ item, selection, setSelection }: FileRowProps) {

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

  const toggleRow = (id: string) => {
    return setSelection((selection) =>
      selection.includes(id)
        ? selection.filter((item) => item !== id)
        : [...selection, id],
    );
  };

  const style = css`
    opacity: ${isDragging ? 0.5 : 1};
    background: ${isOver ? "gray" : "white"};
  `

  const noneRef = useRef(null);

  useEffect(() => {
    dragPreview(noneRef);
  });

  return (
    <>
      {/*<div*/}
      {/*  style={{*/}
      {/*    position: "relative",*/}
      {/*    top: isDragging ? x + "px" : "0px",*/}
      {/*    left: isDragging ? y + "px" : "0px",*/}
      {/*    zIndex: isDragging ? 100000 : 0,*/}
      {/*  }}*/}
      {/*>*/}
      {/*  hello*/}
      {/*</div>*/}
      <div style={{display: "none"}} ref={noneRef} />
      <TableRow ref={node => drag(drop(node))} css={style}>
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
    </>
  );
}