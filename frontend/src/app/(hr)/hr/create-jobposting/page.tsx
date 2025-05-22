"use client";

import { SidebarLayout } from "@/components/sidebar-layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { editorTheme } from "@/components/editor/themes/editor-theme";
import { Plugins } from "@/components/blocks/editor-00/plugins";
import { FloatingLinkContext } from "@/components/editor/context/floating-link-context";
import { nodes } from "@/components/blocks/editor-00/nodes";
import { PlusIcon, Save } from "lucide-react";
import { EditorRefPlugin } from "@lexical/react/LexicalEditorRefPlugin";
import { useRef } from "react";
import { Separator } from "@/components/ui/separator";
import type { LexicalEditor } from "lexical";
import { $generateHtmlFromNodes } from "@lexical/html";
import { TagInput } from "@/components/jobpostings/TagInput";
import { Controller } from "react-hook-form";
import { useJobPostingForm } from "@/forms/jobposting/useJobPostingsForm";
import { DescriptionSyncPlugin } from "@/components/editor/DescriptionSyncPlugin";
import { useRouter } from "next/navigation";

const editorConfig: InitialConfigType = {
  namespace: "Editor",
  theme: editorTheme,
  nodes: nodes,
  onError: (error: Error) => {
    console.error(error);
  },
};

function ErrorMessage({ error }: { error?: { message?: string } }) {
  return error ? (
    <p className="text-sm text-red-500">{error.message}</p>
  ) : null;
}

export default function CreateJobPostingPage() {
  const editor = useRef<LexicalEditor | null>(null);
  const router = useRouter();
  const { form, onSubmit } = useJobPostingForm(null);

  const handleSubmitWithStatus = async (
    data: any,
    status: "open" | "draft"
  ) => {
    const finalData = {
      ...data,
      status,
    };
    await onSubmit(finalData);
    router.push("/hr/job-postings");
  };


  const handlePostJob = async () => {
    const currentEditor = editor.current;
    if (currentEditor) {
      currentEditor.update(() => {
        const html = $generateHtmlFromNodes(currentEditor, null);
        console.log(`HTML: ${html}`);
      });

      const data = currentEditor.getEditorState().toJSON();
      const stringData = JSON.stringify(data);
      console.log(`JSON ${stringData}`);
    }
  };

  return (
    <SidebarLayout>
      <div className="mb-2">
        <p className="text-2xl font-medium">Create Job Posting</p>
        <p className="text-sm text-muted-foreground">
          Enter key details about the role to help attract qualified candidates.
        </p>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-medium">
              Job Posting Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="title"
                {...form.register("title")}
                placeholder="Enter Job Title"
              />
              <ErrorMessage error={form.formState.errors.title} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  {...form.register("category")}
                  placeholder="Enter Category"
                />
                <ErrorMessage error={form.formState.errors.category} />
              </div>

              <div className="space-y-2">
                <Controller
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <TagInput
                      items={field.value}
                      setItems={field.onChange}
                      label="Tags"
                      placeholder="Enter Tags"
                    />
                  )}
                />
                <ErrorMessage error={form.formState.errors.tags} />
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Salary Type</Label>
                <Controller
                  control={form.control}
                  name="salary_type"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value ?? ""}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Salary Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="annually">Annually</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <ErrorMessage error={form.formState.errors.salary_type} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salaryMin">Salary Min</Label>
                <Input
                  id="salaryMin"
                  type="number"
                  {...form.register("salary_min", { valueAsNumber: true })}
                  placeholder="Enter Salary Minimum"
                />
                <ErrorMessage error={form.formState.errors.salary_min} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salaryMax">Salary Max</Label>
                <Input
                  id="salaryMax"
                  type="number"
                  {...form.register("salary_max", { valueAsNumber: true })}
                  placeholder="Enter Salary Maximum"
                />
                <ErrorMessage error={form.formState.errors.salary_max} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employmentLevel">Employment Level</Label>
                <Input
                  id="employmentLevel"
                  {...form.register("employment_level")}
                  placeholder="Enter Employment Level"
                />
                <ErrorMessage error={form.formState.errors.employment_level} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employmentType">Employment Type</Label>
                <Controller
                  control={form.control}
                  name="employment_type"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value ?? ""}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Employment Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Temporary">Temporary</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <ErrorMessage error={form.formState.errors.employment_type} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="workSetup">Work Setup</Label>
                <Input
                  id="workSetup"
                  {...form.register("work_setup")}
                  placeholder="Enter Work Setup"
                />
                <ErrorMessage error={form.formState.errors.work_setup} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vacancies">Number of Vacancies</Label>
                <Input
                  id="vacancies"
                  type="number"
                  {...form.register("vacancies", { valueAsNumber: true })}
                  placeholder="Enter Number of Vacancies"
                />
                <ErrorMessage error={form.formState.errors.vacancies} />
              </div>
            </div>

            <Separator />

            <Label htmlFor="description">Job Description</Label>
            <div className="w-full overflow-hidden rounded-lg border bg-background shadow mt-0">
              <LexicalComposer initialConfig={editorConfig}>
                <EditorRefPlugin editorRef={editor} />
                <TooltipProvider>
                  <FloatingLinkContext>
                    <Plugins />
                    <DescriptionSyncPlugin
                      onChange={(html) => {
                        form.setValue("description", html);
                        form.clearErrors("description");
                      }}
                    />
                  </FloatingLinkContext>
                </TooltipProvider>
              </LexicalComposer>
            </div>
            <ErrorMessage error={form.formState.errors.description} />
          </CardContent>

          <CardFooter className="flex justify-end">
            <div className="flex gap-4">
              <Button
                variant="secondary"
                type="button"
                onClick={() =>
                  form.handleSubmit((data) => handleSubmitWithStatus(data, "draft"))()
                }
              >
                <Save className="mr-2 h-4 w-4" />
                Save as Draft
              </Button>

              <Button
                type="button"
                onClick={() =>
                  form.handleSubmit((data) => handleSubmitWithStatus(data, "open"))()
                }
              >
                <PlusIcon className="mr-2 h-4 w-4" />
                Post Job
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </SidebarLayout>
  );
}
