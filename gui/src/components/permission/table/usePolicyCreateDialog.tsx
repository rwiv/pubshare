import {SubmitHandler, useForm} from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import {useState} from "react";
import {HStack} from "@/util/css/layoutComponents.ts";
import {useQueryClient} from "@tanstack/react-query";
import {RoleCreation} from "@/client/permission/types";
import {createRole, roleQueryKeys} from "@/client/permission/roleClient.ts";

export function usePolicyCreateDialog() {

  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const form = useForm<RoleCreation>({ defaultValues: { name: "" } });

  const onSubmit: SubmitHandler<RoleCreation> = async creation => {
    await createRole(creation);
    await queryClient.invalidateQueries({ queryKey: [roleQueryKeys.findAll] });
    setOpen(false);
  };

  const component = (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Policy</DialogTitle>
          <DialogDescription>
            Please fill out the form
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}/>
          </form>
        </Form>
        <DialogFooter>
          <HStack className="justify-end gap-3 mx-3 my-1">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button type="submit" onClick={form.handleSubmit(onSubmit)}>Submit</Button>
          </HStack>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return { setOpen, component };
}
