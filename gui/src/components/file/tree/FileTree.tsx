import {TreeNode} from "@/components/file/tree/TreeNode.tsx";
import {FileNode} from "@/components/file/tree/types";
import {useEffect, useState} from "react";
import {list} from "@/client/access/accessClient.ts";
import {FileResponse} from "@/client/access/types.ts";
import {getParentKey} from "@/client/access/accessUtils.ts";
import {rootFileResponse} from "@/client/access/rootFileResponse.ts";

function nest(files: FileResponse[]) {
  const root = rootFile();
  root.children = nestRecur(files);
  return [ root ];
}

function nestRecur(files: FileResponse[], parentPath = ""): FileNode[] {
  return files
    .filter(file => file.isDirectory)
    .filter(file => getParentKey(file.path) === parentPath)
    .map(file => ({ ...file, children: nestRecur(files, file.path) }));
}

function rootFile(): FileNode {
  return {
    ...rootFileResponse,
    children: [],
  }
}

interface FileTreeProps {
  className?: string;
}

export function FileTree({ className }: FileTreeProps) {
  const [rawData, setRawData] = useState<FileResponse[]>([]);
  const root = nest(rawData);

  useEffect(() => {
    list("").then(files => {
      setRawData(files);
    })
  }, []);

  return (
    <div className={className} css={{
      minWidth: "16rem",
      width: "auto",
      height: "auth",
      minHeight: "70vh",
      fontSize: "14px",
      userSelect: "none",
    }}>
      {root.map((subItem, index) =>
        <TreeNode file={subItem} key={index} setRawData={setRawData} />
      )}
    </div>
  )
}
