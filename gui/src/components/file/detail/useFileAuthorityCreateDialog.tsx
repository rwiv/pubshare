import {SubmitHandler, useForm} from "react-hook-form";
import {Form} from "@/components/ui/form.tsx";
import {useEffect, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {FileAuthorityCreation} from "@/client/permission/types";
import {SelectItem} from "@/components/ui/select.tsx";
import {HttpError} from "@/client/common/HttpError.ts";
import {ToastAction} from "@/components/ui/toast.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import {prettifyCode} from "@/client/common/errorUtil.ts";
import {PermissionType} from "@/client/access/types.ts";
import {PermissionTypeSelect} from "@/components/common/form/PermissionTypeForm.tsx";
import {createFileAuthority, fileAuthorityQueryKeys} from "@/client/permission/fileAuthorityClient.ts";
import {SelectFormField} from "@/components/common/form/SelectFormField.tsx";
import {DialogTemplate} from "@/components/common/DialogTemplate.tsx";
import {useAccountsAll} from "@/hooks/query/accountQueries.tsx";

interface FileAuthorityCreationForm {
  fileId: string;
  accountId: string;
  permission: PermissionType;
}

export function useFileAuthorityCreateDialog(fileId: number) {

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const {data: accounts} = useAccountsAll();
  const form = useForm<FileAuthorityCreationForm>({
    defaultValues: {
      fileId: "",
      accountId: "",
    }
  });

  useEffect(() => {
    form.setValue("fileId", `${fileId}`);
  }, [fileId, form]);

  const onSubmit: SubmitHandler<FileAuthorityCreationForm> = async form => {
    if (form.fileId === "" || form.accountId === "") {
      throw Error("form data is empty");
    }
    const creation: FileAuthorityCreation = {
      fileId: parseInt(form.fileId),
      accountId: parseInt(form.accountId),
      permission: form.permission,
    }

    try {
      await createFileAuthority(creation);
      await queryClient.invalidateQueries({ queryKey: [fileAuthorityQueryKeys.fileId, fileId] });
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
      title="Add Role" description=""
      open={open} setOpen={setOpen}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Form {...form}>
        <form className="space-y-4">
          <SelectFormField form={form} fieldName="accountId" label="Account" placeholder="Select Account">
            {accounts.map(account => (
              <SelectItem key={account.id} value={`${account.id}`}>{account.username}</SelectItem>
            ))}
          </SelectFormField>
          <SelectFormField form={form} fieldName="permission" label="Permission" placeholder="Select Permission">
            <PermissionTypeSelect />
          </SelectFormField>
        </form>
      </Form>
    </DialogTemplate>
  )

  return { setOpen, component };
}
