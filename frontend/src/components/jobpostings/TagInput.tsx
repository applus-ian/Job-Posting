import * as TagsInput from "@diceui/tags-input";
import { TagInputProps } from "@/types/job";
import { X } from "lucide-react";

export function TagInput({ items, setItems, label, placeholder }: TagInputProps) {
  return (
    <TagsInput.Root value={items} onValueChange={setItems} className="flex flex-col gap-2" editable>
      <TagsInput.Label className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </TagsInput.Label>
      <div className="flex min-h-6 w-full flex-wrap items-center gap-1.5 rounded-md border border-input bg-background px-3 py-2 text-sm  disabled:cursor-not-allowed">
        {items.map((item) => (
          <TagsInput.Item
            key={item}
            value={item}
            className="inline-flex max-w-[calc(100%-8px)] items-center gap-1.5 rounded-md bg-primary text-primary-foreground px-3 py-1 text-sm focus:outline-none transition-colors duration-200 data-disabled:cursor-not-allowed data-disabled:opacity-50 hover:bg-primary/90 [&:not([data-editing])]:pr-2"
          >
            <TagsInput.ItemText className="truncate" />
            <TagsInput.ItemDelete className="ml-1 h-3 w-3 shrink-0 rounded-sm opacity-70 transition-opacity hover:opacity-100">
              <X className="h-3.5 w-3.5" />
            </TagsInput.ItemDelete>
          </TagsInput.Item>
        ))}
        <TagsInput.Input
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-hidden disabled:cursor-not-allowed "
        />
      </div>
    </TagsInput.Root>
  );
}
