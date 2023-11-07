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
import {signup} from "@/client/user/userClient.ts";
import {useNavigate} from "react-router";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

export function SignupForm() {

  const form = useForm<AccountCreation>({
    defaultValues: {
      username: "",
      password: "",
      nickname: "",
      role: "MEMBER",
      recommenderNickname: undefined,
    }
  });

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<AccountCreation> = async creation => {
    await signup(creation)
    navigate("/")
  }

  return (
    <VStack className="space-y-7 p-8">
      <Header />
      <Form {...form}>
        <Center>
          {/*<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">*/}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4 border rounded-lg">
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
            <FormField control={form.control} name="nickname" render={({ field }) => (
              <FormItem className="w-96">
                <FormLabel>Nickname</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            <FormField control={form.control} name="role" render={({ field }) => (
              <FormItem className="w-96">
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="MEMBER">Member</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}/>
            <FormField control={form.control} name="recommenderNickname" render={({ field }) => (
              <FormItem className="w-96">
                <FormLabel>Recommender</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            <Center>
              <Button type="submit" className="w-60 mt-4">Signup</Button>
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
        Create an account
      </h1>
      <p className="text-sm text-muted-foreground">
        Enter your email below to create your account
      </p>
    </div>
  )
}
