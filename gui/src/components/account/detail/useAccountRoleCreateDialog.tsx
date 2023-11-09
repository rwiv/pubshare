import {SubmitHandler, useForm} from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import {useEffect, useState} from "react";
import {HStack} from "@/util/css/layoutComponents.ts";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {AccountRoleCreation, Role} from "@/client/permission/types";
import {findAllRoles, roleQueryKeys} from "@/client/permission/roleClient.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {accountRoleQueryKeys, createAccountRole} from "@/client/permission/accountRoleClient.ts";
import {HttpError} from "@/client/common/HttpError.ts";
import {ToastAction} from "@/components/ui/toast.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import {prettifyCode} from "@/client/common/errorUtil.ts";

interface AccountRoleCreationForm {
  accountId: string;
  roleId: string;
}

export function useAccountRoleCreateDialog(accountId: number) {

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const form = useForm<AccountRoleCreationForm>({
    defaultValues: {
      accountId: "",
      roleId: "",
    }
  });

  useEffect(() => {
    form.setValue("accountId", `${accountId}`);
  }, [accountId, form]);

  const onSubmit: SubmitHandler<AccountRoleCreationForm> = async form => {
    if (form.accountId === "" || form.roleId === "") {
      throw Error("form data is empty");
    }
    const creation: AccountRoleCreation = {
      accountId: parseInt(form.accountId),
      roleId: parseInt(form.roleId),
    }

    try {
      await createAccountRole(creation);
      await queryClient.invalidateQueries({ queryKey: [accountRoleQueryKeys.accountId, accountId] });
      setOpen(false);
    } catch (e) {
      if (e instanceof HttpError) {
        toast({
          title: prettifyCode(e.code),
          description: e.message,
          action: (<ToastAction altText="Close">Close</ToastAction>),
        });
      }
    }
  };

  function AccountRoleForm() {

    const {data: roles} = useQuery<Role[]>({
      queryKey: [roleQueryKeys.findAll],
      queryFn: findAllRoles,
      initialData: [],
    });

    return (
      <Form {...form}>
        <form className="space-y-4">
          <FormField control={form.control} name="roleId" render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={"Select Role"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem key={role.id} value={`${role.id}`}>{role.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )} />
        </form>
      </Form>
    )
  }

  const component = (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Role</DialogTitle>
          <DialogDescription>
            Please fill out the form
          </DialogDescription>
        </DialogHeader>
        <AccountRoleForm />
        <DialogFooter>
          <HStack className="justify-end gap-3 mx-3 my-1">
            <DialogClose asChild>
              <Button type="button" variant="secondary">Close</Button>
            </DialogClose>
            <Button type="submit" onClick={form.handleSubmit(onSubmit)}>Submit</Button>
          </HStack>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return { setOpen, component };
}
