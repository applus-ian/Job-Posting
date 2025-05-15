import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
 
interface ProfileInputFieldProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  isEditing?: boolean;
  type?: string;
  className?: string;
  variant?: "input" | "textarea" | "select";
  options?: { value: string; label: string }[];
  years?: number[];
}
 
export const ProfileFormField = ({
  control,
  name,
  label,
  placeholder = "",
  isEditing = false,
  type = "text",
  className = "text-xs lg:text-sm",
  variant = "input",
  options = [],
  years = [],
}: ProfileInputFieldProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="w-full flex-1">
        <FormLabel className="text-[rgba(0,0,0,0.7)] text-xs ms-1">{label}</FormLabel>
        <FormControl>
          {variant === "textarea" ? (
            <Textarea
              {...field}
              disabled={!isEditing}
              placeholder={placeholder}
              className={className}
            />
          ) : variant === "select" ? (
            <Select onValueChange={field.onChange} value={field.value} disabled={!isEditing}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options?.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
                {years?.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              {...field}
              disabled={!isEditing}
              placeholder={placeholder}
              type={type}
              className={className}
            />
          )}
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
 