import {MainTemplate} from "@/pages/MainTemplate.tsx";
import {AccountDetail} from "@/components/account/detail/AccountDetail.tsx";
import {useParams} from "react-router";

export function AccountDetailPage() {
  const { id } = useParams();

  return (
    <MainTemplate>
      {id && (
        <AccountDetail className="m-3" accountId={parseInt(id)} />
      )}
    </MainTemplate>
  )
}
