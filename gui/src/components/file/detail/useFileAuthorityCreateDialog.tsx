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
import {FileAuthorityCreation} from "@/client/permission/types";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {HttpError} from "@/client/common/HttpError.ts";
import {ToastAction} from "@/components/ui/toast.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import {prettifyCode} from "@/client/common/errorUtil.ts";
import {PermissionType} from "@/client/access/types.ts";
import {PermissionTypeSelect} from "@/components/common/PermissionTypeForm.tsx";
import {createFileAuthority, fileAuthorityQueryKeys} from "@/client/permission/fileAuthorityClient.ts";
import {accountQueryKeys, findAllAccounts} from "@/client/account/accountClient.ts";
import {AccountResponse} from "@/client/account/types.ts";

interface FileAuthorityCreationForm {
  fileId: string;
  accountId: string;
  permission: PermissionType;
}

export function useFileAuthorityCreateDialog(fileId: number) {

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
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

  function FileAuthorityForm() {

    const {data: accounts} = useQuery<AccountResponse[]>({
      queryKey: [accountQueryKeys.findAll],
      queryFn: findAllAccounts,
      initialData: [],
    });

    return (
      <Form {...form}>
        <form className="space-y-4">
          <FormField control={form.control} name="accountId" render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={"Select Role"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {accounts.map(account => (
                    <SelectItem key={account.id} value={`${account.id}`}>{account.username}</SelectItem>
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
                <PermissionTypeSelect />
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
        <FileAuthorityForm />
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
