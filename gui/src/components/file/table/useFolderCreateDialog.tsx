import {SubmitHandler, useForm} from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {RoleCreation} from "@/client/permission/types";
import {useAccessStore} from "@/stores/accessStore.ts";
import {accessQueryKeys, mkdir} from "@/client/access/accessClient.ts";
import {DialogTemplate} from "@/components/common/DialogTemplate.tsx";

interface FolderCreationForm {
  name: string;
}

export function useFolderCreateDialog() {

  const {curDirectory} = useAccessStore();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const form = useForm<FolderCreationForm>({ defaultValues: { name: "" } });

  const onSubmit: SubmitHandler<RoleCreation> = async creation => {
    const key = `${curDirectory.path}${creation.name}/`;
    await mkdir({ key });
    await queryClient.invalidateQueries({ queryKey: [accessQueryKeys.list] });
    setOpen(false);
  };

  const component = (
    <DialogTemplate
      title="Add Folder" description="Please fill out the form"
      open={open} setOpen={setOpen}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Form {...form}>
        <form className="space-y-4">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Folder Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}/>
        </form>
      </Form>
    </DialogTemplate>
  )

  return { setOpen, component };
}
