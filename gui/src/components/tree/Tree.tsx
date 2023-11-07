import {TreeNode} from "@/components/tree/TreeNode.tsx";
import {NodeItem, RawItem} from "@/components/tree/types";
import {useState} from "react";

const menuData: RawItem[] = [
  { pmenuId: "ROOT", menuId: "root" },
];

function nest(menuData: RawItem[], menuId = "ROOT"): NodeItem[] {
  return menuData
    .filter(item => item.pmenuId === menuId)
    .map(item => ({ ...item, children: nest(menuData, item.menuId) }));
}

export function Tree() {
  const [rawData, setRawData] = useState(menuData);
  const data = nest(rawData);

  return (
    <div css={{
      minWidth: "16rem",
      width: "auto",
      height: "auth",
      minHeight: "70vh",
      fontSize: "14px",
    }}>
      {data.map((subItem, index) =>
        <TreeNode item={subItem} key={index} setRawData={setRawData} />
      )}
    </div>
  )
}
