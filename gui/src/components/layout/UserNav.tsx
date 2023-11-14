import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useQueryClient} from "@tanstack/react-query";
import {AccountResponse} from "@/client/account/types.ts";
import {accountQueryKeys} from "@/client/account/accountClient.ts";
import {useTokenStore} from "@/stores/loginStore.ts";
import {accessQueryKeys} from "@/client/access/accessClient.ts";
import {useAccessStore} from "@/stores/accessStore.ts";
import {rootFileResponse} from "@/client/access/rootFileResponse.ts";

interface UserNavProps {
  me: AccountResponse;
}

export function UserNav({ me }: UserNavProps) {

  const queryClient = useQueryClient();
  const {setToken} = useTokenStore();
  const { curDirectory, setCurFile, setCurDirectory} = useAccessStore();

  const onLogout = async () => {
    setToken(null);
    setCurFile(null);
    setCurDirectory(rootFileResponse);
    await queryClient.setQueryData([accountQueryKeys.me], null);
    await queryClient.invalidateQueries({ queryKey: [accessQueryKeys.list, curDirectory.path] });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-11 w-11">
            {/*<AvatarImage src="/avatars/01.png" alt="@shadcn" />*/}
            <AvatarFallback>{me.nickname}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{me.nickname}</p>
            <p className="text-xs leading-none text-muted-foreground">{me.username}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Favorites</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}