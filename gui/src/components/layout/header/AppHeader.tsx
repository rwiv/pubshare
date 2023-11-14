import {UserDropdown} from "@/components/layout/header/UserDropdown.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.tsx";
import {NavBar} from "@/components/layout/header/NavBar.tsx";
import {useMyData} from "@/hooks/query/accountQueries.tsx";
import {AccountResponse} from "@/client/account/types.ts";
import {accountTypes} from "@/common/accountTypes.ts";

export function AppHeader() {

  const {data: me, isLoading} = useMyData();

  return (
    <div className="border-b shadow-sm">
      <div className="flex h-16 items-center px-4">
        {me && (
          <>
            <NavBar me={me} className="mx-6" />
            <UserNav me={me} isLoading={isLoading} />
          </>
        )}
      </div>
    </div>
  );
}

interface UserNavProps {
  me: AccountResponse;
  isLoading: boolean;
}

function UserNav({ me, isLoading }: UserNavProps) {

  if (me.type !== accountTypes.GUEST) {
    return (
      <div className="ml-auto mr-4 flex items-center space-x-4">
        <UserDropdown me={me} />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="ml-auto mr-4 flex items-center space-x-4">
        <Avatar className="h-11 w-11">
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </div>
    )
  } else {
    return (
      <div className="ml-auto mr-4 flex items-center space-x-2">
        <Button>
          <Link to="/signup">Signup</Link>
        </Button>
        <Button>
          <Link to="/login">Login</Link>
        </Button>
      </div>
    )
  }
}
