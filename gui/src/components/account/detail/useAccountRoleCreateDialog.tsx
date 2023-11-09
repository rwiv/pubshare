import {SubmitHandler, useForm} from "react-hook-form";
import {Form} from "@/components/ui/form.tsx";
import {useEffect, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {AccountRoleCreation} from "@/client/permission/types";
import {SelectItem} from "@/components/ui/select.tsx";
import {accountRoleQueryKeys, createAccountRole} from "@/client/permission/accountRoleClient.ts";
import {HttpError} from "@/client/common/HttpError.ts";
import {ToastAction} from "@/components/ui/toast.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import {prettifyCode} from "@/client/common/errorUtil.ts";
import {DialogTemplate} from "@/components/common/DialogTemplate.tsx";
import {SelectFormField} from "@/components/common/form/SelectFormField.tsx";
import {useRolesAll} from "@/hooks/query/permissionQueries.tsx";

interface AccountRoleCreationForm {
  accountId: string;
  roleId: string;
}

export function useAccountRoleCreateDialog(accountId: number) {

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const {data: roles} = useRolesAll();
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

  const component = (
    <DialogTemplate
      title="Add Role" description="Please fill out the form"
      open={open} setOpen={setOpen}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Form {...form}>
        <form className="space-y-4">
          <SelectFormField form={form} fieldName="roleId" label="Role" placeholder="Select Role">
            {roles.map(role => (
              <SelectItem key={role.id} value={`${role.id}`}>{role.name}</SelectItem>
            ))}
          </SelectFormField>
        </form>
      </Form>
    </DialogTemplate>
  )

  return { setOpen, component };
}
