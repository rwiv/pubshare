import {UserNav} from "@/components/layout/UserNav.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.tsx";
import {NavBar} from "@/components/layout/NavBar.tsx";
import {useMyData} from "@/hooks/useMyData.tsx";

export function AppHeader() {
  const {data: me, isLoading} = useMyData();

  const render = () => {
    if (me !== null && me !== undefined && me.type !== "GUEST") {
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