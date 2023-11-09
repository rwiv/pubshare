import {SubmitHandler, useForm} from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Center, VStack} from "@/util/css/layoutComponents.ts";
import {useNavigate} from "react-router";
import {LoginRequest} from "@/client/account/types.ts";
import {accountQueryKeys, login} from "@/client/account/accountClient.ts";
import {useQueryClient} from "@tanstack/react-query";
import {useTokenStore} from "@/stores/loginStore.ts";

export function LoginForm() {

  const form = useForm<LoginRequest>({
    defaultValues: {
      username: "",
      password: "",
    }
  });
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const {setToken} = useTokenStore();

  const onSubmit: SubmitHandler<LoginRequest> = async creation => {
    const res = await login(creation);
    setToken(res.accessToken);
    await queryClient.invalidateQueries({
      queryKey: [accountQueryKeys.me]
    });

    navigate("/");
  }

  return (
    <VStack className="space-y-7 p-8">
      <Header />
      <Form {...form}>
        <Center>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
            <FormField control={form.control} name="username" render={({ field }) => (
              <FormItem className="w-96">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem className="w-96">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            <Center>
              <VStack>
                <Button type="submit" className="w-60 mt-4">Login</Button>
                <Button variant="outline" className="w-60 mt-4" onClick={() => navigate("/signup")}>Signup</Button>
              </VStack>
            </Center>
          </form>
        </Center>
      </Form>
    </VStack>
  )
}

function Header() {
  return (
    <div className="flex flex-col space-y-2 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">
        Login
      </h1>
      <p className="text-sm text-muted-foreground">
        Enter your account info
      </p>
    </div>
  )
}
