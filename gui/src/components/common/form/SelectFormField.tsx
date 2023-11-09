import {FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form.tsx";
import {Select, SelectContent, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {ReactNode} from "react";
import {FieldValues, Path, UseFormReturn} from "react-hook-form";

interface SelectFormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  fieldName: Path<T>;
  label: string;
  placeholder?: string;
  children: ReactNode;
}

export function SelectFormField<T extends FieldValues>({ form, fieldName, label, placeholder, children }: SelectFormFieldProps<T>) {
  return (
    <FormField control={form.control} name={fieldName} render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {children}
          </SelectContent>
        </Select>
      </FormItem>
    )}/>
  )
}