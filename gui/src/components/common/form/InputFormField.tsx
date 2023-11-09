import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {FieldValues, Path, UseFormReturn} from "react-hook-form";
import {Input} from "@/components/ui/input.tsx";

interface InputFormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  fieldName: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  className?: string;
}

export function InputFormField<T extends FieldValues>({ form, fieldName, label, placeholder, type, className }: InputFormFieldProps<T>) {
  return (
    <FormField control={form.control} name={fieldName} render={({ field }) => (
      <FormItem className={className}>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input type={type} placeholder={placeholder} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}/>
  )
}
