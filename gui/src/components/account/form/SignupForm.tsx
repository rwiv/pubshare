import {SubmitHandler, useForm} from "react-hook-form";
import {Form} from "@/components/ui/form.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Center, VStack} from "@/util/css/layoutComponents.ts";
import {useNavigate} from "react-router";
import {AccountCreation} from "@/client/account/types.ts";
import {signup} from "@/client/account/accountClient.ts";
import {InputFormField} from "@/components/common/form/InputFormField.tsx";

export function SignupForm() {

  const form = useForm<AccountCreation>({
    defaultValues: {
      username: "",
      password: "",
      nickname: "",
      certified: false,
      type: "MEMBER",
    }
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<AccountCreation> = async creation => {
    await signup(creation);
    navigate("/");
  }

  return (
    <VStack className="space-y-7 p-8">
      <Header />
      <Form {...form}>
        <Center>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
            <InputFormField className="w-96" form={form} fieldName="username" label="Email" placeholder="name@example.com" />
            <InputFormField className="w-96" form={form} fieldName="password" label="Password" type="password" />
            <InputFormField className="w-96" form={form} fieldName="nickname" label="Nickname" />
            <Center>
              <VStack>
                <Button type="submit" className="w-60 mt-4">Sign Up</Button>
                <Button variant="outline" className="w-60 mt-4" onClick={() => navigate("/")}>Cancel</Button>
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
        Sign Up
      </h1>
      <p className="text-sm text-muted-foreground">
        Enter your account info
      </p>
    </div>
  )
}
