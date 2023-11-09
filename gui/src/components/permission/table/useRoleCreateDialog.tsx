import {SubmitHandler, useForm} from "react-hook-form";
import {Form} from "@/components/ui/form.tsx";
import {useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {RoleCreation} from "@/client/permission/types";
import {createRole, roleQueryKeys} from "@/client/permission/roleClient.ts";
import {DialogTemplate} from "@/components/common/DialogTemplate.tsx";
import {InputFormField} from "@/components/common/form/InputFormField.tsx";

export function useRoleCreateDialog() {

  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const form = useForm<RoleCreation>({ defaultValues: { name: "" } });

  const onSubmit: SubmitHandler<RoleCreation> = async creation => {
    await createRole(creation);
    await queryClient.invalidateQueries({ queryKey: [roleQueryKeys.findAll] });
    setOpen(false);
  };

  const component = (
    <DialogTemplate
      title="Add Role" description="Please fill out the form"
      open={open} setOpen={setOpen}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Form {...form}>
        <form className="space-y-4">
          <InputFormField form={form} fieldName="name" label="Name" />
        </form>
      </Form>
    </DialogTemplate>
  )

  return { setOpen, component };
}
