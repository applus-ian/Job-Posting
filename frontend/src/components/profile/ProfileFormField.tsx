import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ProfileInputFieldProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  isEditing?: boolean;
  type?: string;
  className?: string;
}

export const ProfileFormField = ({
  control,
  name,
  label,
  placeholder = "",
  isEditing = false,
  type = "text",
  className = "text-xs lg:text-sm",
}: ProfileInputFieldProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-[rgba(0,0,0,0.7)] text-xs ms-1">{label}</FormLabel>
        <FormControl>
          <Input
            {...field}
            disabled={!isEditing}
            placeholder={placeholder}
            type={type}
            className={className}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
