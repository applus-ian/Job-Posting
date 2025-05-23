"use client";
import { SidebarLayout } from "@/components/sidebar-layout";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { InitialConfigType, LexicalComposer } from "@lexical/react/LexicalComposer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { editorTheme } from "@/components/editor/themes/editor-theme";
import { Plugins } from "@/components/blocks/editor-00/plugins";
import { FloatingLinkContext } from "@/components/editor/context/floating-link-context";
import { nodes } from "@/components/blocks/editor-00/nodes";
import { Loader2, PlusIcon, Save } from "lucide-react";
import { EditorRefPlugin } from "@lexical/react/LexicalEditorRefPlugin";
import { useRef } from "react";
import { Separator } from "@/components/ui/separator";
import type { LexicalEditor } from "lexical";
import { TagInput } from "@/components/jobpostings/TagInput";
import { Form } from "@/components/ui/form";
import { useJobPostingForm } from "@/forms/jobposting/useJobPostingForm";
import { CustomFormInput } from "@/components/form/CustomFormInput";
import { DescriptionSyncPlugin } from "@/components/editor/plugins/toolbar/descriptionsyncplugin";
import { Controller } from "react-hook-form";

const editorConfig: InitialConfigType = {
  namespace: "Editor",
  theme: editorTheme,
  nodes: nodes,
  onError: (error: Error) => {
    console.error(error);
  },
};

export default function CreateJobPostingPage() {
  const { form, onSubmit, error } = useJobPostingForm(null);
  const editor = useRef<LexicalEditor | null>(null);

  return (
    <SidebarLayout breadcrumbs={[{ label: "Create JobPosting", isCurrentPage: true }]}>
      <div className="mb-2">
        <p className="text-2xl font-medium">Create Job Posting</p>
        <p className="text-sm text-muted-foreground">
          Enter key details about the role to help attract qualified candidates.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-medium">Job Posting Details</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <CustomFormInput
                    control={form.control}
                    name="title"
                    label="Job Title"
                    placeholder="Enter Job Title"
                    isEditing={true}
                  />
                </div>
                <div className="space-y-2">
                  <CustomFormInput
                    control={form.control}
                    name="category"
                    label="Category"
                    placeholder="Enter Category"
                    isEditing={true}
                  />
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
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <CustomFormInput
                    control={form.control}
                    name="salary_type"
                    label="Salary Type"
                    placeholder="Salary Type"
                    isEditing={true}
                    variant="select"
                    options={[
                      { value: "monthly", label: "Monthly" },
                      { value: "hourly", label: "Hourly" },
                      { value: "weekly", label: "Weekly" },
                      { value: "annually", label: "Annually" },
                    ]}
                  />
                </div>
                <div className="space-y-2">
                  <CustomFormInput
                    control={form.control}
                    name="salary_min"
                    label="Salary Min"
                    placeholder="Enter Minimum Salary"
                    isEditing={true}
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <CustomFormInput
                    control={form.control}
                    name="salary_max"
                    label="Salary Max"
                    placeholder="Enter Maximum Salary"
                    isEditing={true}
                    type="number"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <CustomFormInput
                    control={form.control}
                    name="employment_level"
                    label="Employment Level"
                    placeholder="Enter Employment Level"
                    isEditing={true}
                  />
                </div>
                <div className="space-y-2">
                  <CustomFormInput
                    control={form.control}
                    name="employment_type"
                    label="Employment Type"
                    placeholder="Enter Employment Type"
                    isEditing={true}
                    variant="select"
                    options={[
                      { value: "full-time", label: "Full-time" },
                      { value: "part-time", label: "Part-time" },
                      { value: "contract", label: "Contract" },
                      { value: "temporary", label: "Temporary" },
                    ]}
                  />
                </div>
                <div className="space-y-2">
                  <CustomFormInput
                    control={form.control}
                    name="work_setup"
                    label="Work Setup"
                    placeholder="Enter Work Setup"
                    isEditing={true}
                  />
                </div>
                <div className="space-y-2">
                  <CustomFormInput
                    control={form.control}
                    name="vacancies"
                    label="Number of Vacancies"
                    placeholder="Enter Number of Vacancies"
                    isEditing={true}
                    type="number"
                  />
                </div>
              </div>
              <Separator />
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  <Input id="address" name="address" placeholder="e.g. 123 Main St, Springfield" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" placeholder="Enter Country" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="province">Province</Label>
                  <Input id="province" name="province" placeholder="Enter Province" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" placeholder="Enter City" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="street">Street</Label>
                  <Input id="street" name="street" placeholder="Enter Street" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipcode">Zip Code</Label>
                  <Input id="zipcode" name="zipcode" placeholder="Enter Zip Code" />
                </div>
              </div> */}
              <Separator />
              <Label htmlFor="description">Job Description</Label>
              <div className="w-full overflow-hidden rounded-lg border bg-background shadow mt-0">
                <LexicalComposer
                  initialConfig={{
                    ...editorConfig,
                  }}
                >
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

              <CustomFormInput
                control={form.control}
                name="status"
                label="Status"
                placeholder="Select Status"
                isEditing={true}
                variant="select"
                options={[
                  { value: "open", label: "Open" },
                  { value: "closed", label: "Closed" },
                  { value: "draft", label: "Draft" },
                ]}
              />
              {error && <div className="text-sm text-red-500">{error}</div>}
            </CardContent>
            <CardFooter className="flex justify-end mt-4">
              <div className="flex gap-4">
                <Button variant={"secondary"}>
                  <Save />
                  Save as Draft
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin w-4 h-4" />
                      Posting...
                    </>
                  ) : (
                    <>
                      <PlusIcon />
                      Post Job
                    </>
                  )}
                </Button>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </SidebarLayout>
  );
}
