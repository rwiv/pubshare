import {SubmitHandler, useForm} from "react-hook-form";
import {Form} from "@/components/ui/form.tsx";
import {useEffect, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {FileRoleCreation} from "@/client/permission/types";
import {SelectItem} from "@/components/ui/select.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import {PermissionType} from "@/client/access/types.ts";
import {createFileRole, fileRoleQueryKeys} from "@/client/permission/fileRoleClient.ts";
import {PermissionTypeSelect} from "@/components/common/form/PermissionTypeForm.tsx";
import {SelectFormField} from "@/components/common/form/SelectFormField.tsx";
import {DialogTemplate} from "@/components/common/DialogTemplate.tsx";
import {useRolesAll} from "@/hooks/query/permissionQueries.tsx";
import {renderToastIfError} from "@/hooks/renderToastIfError.tsx";

interface FileRoleCreationForm {
  fileId: string;
  roleId: string;
  permission: PermissionType;
}

export function useFileRoleCreateDialog(fileId: number) {

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const {data: roles} = useRolesAll();
  const form = useForm<FileRoleCreationForm>({
    defaultValues: {
      fileId: "",
      roleId: "",
    }
  });

  useEffect(() => {
    form.setValue("fileId", `${fileId}`);
  }, [fileId, form]);

  const onSubmit: SubmitHandler<FileRoleCreationForm> = async form => {
    if (form.fileId === "" || form.roleId === "") {
      throw Error("form data is empty");
    }
    const creation: FileRoleCreation = {
      fileId: parseInt(form.fileId),
      roleId: parseInt(form.roleId),
      permission: form.permission,
    }

    await renderToastIfError(toast, async () => {
      await createFileRole(creation);
      await queryClient.invalidateQueries({ queryKey: [fileRoleQueryKeys.fileId, fileId] });
      setOpen(false);
    });
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
          <SelectFormField form={form} fieldName="permission" label="Permission" placeholder="Select permission">
            <PermissionTypeSelect />
          </SelectFormField>
        </form>
      </Form>
    </DialogTemplate>
  )

  return { setOpen, component };
}
