import {TreeNode} from "@/components/tree/TreeNode.tsx";
import {FileNode} from "@/components/tree/types";
import {useEffect, useState} from "react";
import {list} from "@/client/access/accessClient.ts";
import {FileResponse} from "@/client/access/types.ts";
import {getParentKey} from "@/client/access/accessUtils.ts";

function nest(files: FileResponse[], parentPath = ""): FileNode[] {
  return files
    .filter(file => file.isDirectory)
    .filter(file => getParentKey(file.path) === parentPath)
    .map(file => ({ ...file, children: nest(files, file.path) }));
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
    }}>
      {root.map((subItem, index) =>
        <TreeNode file={subItem} key={index} setRawData={setRawData} />
      )}
    </div>
  )
}
