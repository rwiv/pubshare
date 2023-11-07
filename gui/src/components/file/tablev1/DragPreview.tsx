import {useDebounce} from "react-use";
import {useEffect, useState} from "react";
import {FileResponse} from "@/components/file/tablev1/types";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import { PlusIcon } from "@radix-ui/react-icons";

interface DragPreviewProps {
  offset: { x: number, y: number };
  paddingX: number;
  paddingY: number;
  dFiles: FileResponse[],
}

export function DragPreview({ offset, paddingX, paddingY, dFiles }: DragPreviewProps) {

  const [myOffset, setMyOffset] = useState({ x: 0, y: 0 });
  const [display, setDisplay] = useState("none");

  const [,] = useDebounce(
    () => {
      setMyOffset(offset);
    },
    3,
    [offset.x, offset.y]
  );

  useEffect(() => {
    if (dFiles.length !== 0) {
      setDisplay("block");
    } else {
      setDisplay("none");
    }
  }, [dFiles.length]);

  return (
    <div
      style={{
        display,
        position: "absolute",
        left: myOffset.x + paddingY + "px",
        top: myOffset.y + paddingX + "px",
        zIndex: 100000,
      }}
    >
      <Alert>
        <PlusIcon className="h-4 w-4" />
        <AlertTitle>Move</AlertTitle>
        <AlertDescription>
          {dFiles
            ? `${dFiles.length} files will be moved`
            : "no file" }
        </AlertDescription>
      </Alert>
    </div>
  )
}