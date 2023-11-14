import {AccountTable} from "@/components/account/table/AccountTable.tsx";
import {useState} from "react";
import {AccountResponse} from "@/client/account/types.ts";
import {AccountDetail} from "@/components/account/detail/AccountDetail.tsx";
import {AdminSideBar} from "@/components/layout/admin/AdminSideBar.tsx";
import {getMediaQuery} from "@/util/getMediaQuery.ts";
import {MainTemplate} from "@/pages/MainTemplate.tsx";
import {FixedScrollArea} from "@/components/common/FixedScrollArea.tsx";

const {left, center, right} = getMediaQuery();

export function AccountListPage() {

  const [height, setHeight] = useState(0);
  const [curAccount, setCurAccount] = useState<AccountResponse>();

  return (
    <MainTemplate height={height} setHeight={setHeight}>
      <div css={left} className="min-h-screen bg-muted/60">
        <AdminSideBar className="m-3" />
      </div>
      <div css={center} className="min-h-screen">
        <AccountTable className="m-3" setCurAccount={setCurAccount} />
      </div>
      <div css={right} className="min-h-screen">
        <FixedScrollArea maxHeight={height}>
          {curAccount && <AccountDetail accountId={curAccount.id} className="m-3"  />}
        </FixedScrollArea>
      </div>
    </MainTemplate>
  )
}