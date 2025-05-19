import { FormLabel, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { CloudUpload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { Key } from "react";

interface ApplicationDocumentFormProps {
  form: any;
  name: string;
  label: string;
}

export function ApplicationDocumentForm({ form, name, label }: ApplicationDocumentFormProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="mb-3">{label}</FormLabel>
          <FormControl>
            <FileUpload
              value={field.value}
              onValueChange={field.onChange}
              accept="application/pdf"
              maxFiles={1}
              maxSize={5 * 1024 * 1024}
              onFileReject={(_, message) => {
                form.setError(name, {
                  message,
                });
              }}
            >
              {!field.value || field.value.length === 0 ? (
                <FileUploadDropzone className="flex-row flex-wrap border-dotted text-center">
                  <CloudUpload className="size-4" />
                  Drag and drop or
                  <FileUploadTrigger asChild>
                    <Button variant="link" size="sm" className="p-0">
                      choose files
                    </Button>
                  </FileUploadTrigger>
                  to upload
                </FileUploadDropzone>
              ) : null}

              <FileUploadList>
                {field.value.map((file: File, index: Key | null | undefined) => (
                  <FileUploadItem key={index} value={file}>
                    <FileUploadItemPreview />
                    <FileUploadItemMetadata />
                    <FileUploadItemDelete asChild>
                      <Button variant="ghost" size="icon" className="size-7">
                        <X />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </FileUploadItemDelete>
                  </FileUploadItem>
                ))}
              </FileUploadList>
            </FileUpload>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
