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
import {FileRoleCreation, Role} from "@/client/permission/types";
import {findAllRoles, roleQueryKeys} from "@/client/permission/roleClient.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {HttpError} from "@/client/common/HttpError.ts";
import {ToastAction} from "@/components/ui/toast.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import {prettifyCode} from "@/client/common/errorUtil.ts";
import {PermissionType} from "@/client/access/types.ts";
import {createFileRole, fileRoleQueryKeys} from "@/client/permission/fileRoleClient.ts";

interface FileRoleCreationForm {
  fileId: string;
  roleId: string;
  permission: PermissionType;
}

export function useFileRoleCreateDialog(fileId: number) {

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
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

    try {
      await createFileRole(creation);
      await queryClient.invalidateQueries({ queryKey: [fileRoleQueryKeys.fileId, fileId] });
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

  function FileRoleForm() {

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
          )}/>
          <FormField control={form.control} name="permission" render={({ field }) => (
            <FormItem>
              <FormLabel>Permission</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={"Select Permission"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={"FORBIDDEN"}>FORBIDDEN</SelectItem>
                  <SelectItem value={"KNOWN"}>KNOWN</SelectItem>
                  <SelectItem value={"READ"}>READ</SelectItem>
                  <SelectItem value={"WRITE"}>WRITE</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}/>
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
        <FileRoleForm />
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
