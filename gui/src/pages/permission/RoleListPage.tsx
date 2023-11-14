import {RoleTable} from "@/components/permission/table/RoleTable.tsx";
import {getMediaQuery} from "@/util/getMediaQuery.ts";
import {AdminSideBar} from "@/components/layout/admin/AdminSideBar.tsx";
import {useState} from "react";
import {MainTemplate} from "@/pages/MainTemplate.tsx";
import {FixedScrollArea} from "@/components/common/FixedScrollArea.tsx";

const {left, center, right} = getMediaQuery();

export function RoleListPage() {

  const [height, setHeight] = useState(0);

  return (
    <MainTemplate height={height} setHeight={setHeight}>
      <div css={left} className="bg-muted/60">
        <AdminSideBar className="p-3" />
      </div>
      <div css={center}>
        <FixedScrollArea maxHeight={height}>
          <RoleTable className="p-3" />
        </FixedScrollArea>
      </div>
      <div css={right} />
    </MainTemplate>
  )
}
