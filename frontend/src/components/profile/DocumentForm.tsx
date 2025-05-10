import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { CloudUpload, Loader2, X } from "lucide-react";
import { useApplicantDocumentForm } from "@/forms/profile/useApplicantDocumentForm";
import { DocumentFormProps } from "@/types/profile";

export function DocumentForm({ type = "resume", label }: DocumentFormProps) {
  const { form, onSubmit, error } = useApplicantDocumentForm({ type });

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload pdf file for your {label}</FormLabel>
              <FormControl>
                <FileUpload
                  value={field.value}
                  onValueChange={field.onChange}
                  accept="application/pdf"
                  maxFiles={1}
                  maxSize={5 * 1024 * 1024}
                  onFileReject={(_, message) => {
                    form.setError("file", {
                      message,
                    });
                  }}
                >
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
                  <FileUploadList>
                    {field.value.map((file, index) => (
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
        {error && <div className="text-sm text-red-500">{error}</div>}
        <div className="flex justify-end w-full">
          <Button disabled={form.formState.isSubmitting} type="submit" className="mt-4">
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" />
                Uploading...
              </>
            ) : (
              <>Upload {label}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
