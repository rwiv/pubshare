import {UserNav} from "@/components/header/UserNav.tsx";
import {HttpError} from "@/client/common/HttpError.ts";
import {useQuery} from "@tanstack/react-query";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.tsx";
import {NavBar} from "@/components/header/NavBar.tsx";
import {AccountResponse} from "@/client/account/types.ts";
import {accountQueryKeys, getMyData} from "@/client/account/accountClient.ts";

export function AppHeader() {
  const {data: me, isLoading} = useQuery<unknown, HttpError, AccountResponse>({
    queryKey: [accountQueryKeys.me], queryFn: getMyData, retry: 0,
  });

  const render = () => {
    if (me !== null && me !== undefined) {
      return (
        <div className="ml-auto mr-4 flex items-center space-x-4">
          <UserNav me={me} />
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

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <NavBar className="mx-6" />
        {render()}
      </div>
    </div>
  );
}