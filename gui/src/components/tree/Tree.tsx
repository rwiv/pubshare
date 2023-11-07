import {TreeNode} from "@/components/tree/TreeNode.tsx";
import {FileNode} from "@/components/tree/types";
import {useEffect, useState} from "react";
import {list} from "@/client/access/accessClient.ts";
import {FileResponse} from "@/client/access/types.ts";
import {getParentKey} from "@/client/access/accessUtils.ts";

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
  return { id: -1, path: "", isDirectory: true, lastModified: new Date(), size: 0, myPerm: "READ", children: [] };
}

export function Tree() {
  const [rawData, setRawData] = useState<FileResponse[]>([]);
  const root = nest(rawData);

  useEffect(() => {
    list("").then(files => {
      setRawData(files);
    })
  }, []);

  return (
    <div css={{
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
