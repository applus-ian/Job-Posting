"use client";
import { SidebarLayout } from "@/components/sidebar-layout";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
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
import { InitialConfigType, LexicalComposer } from "@lexical/react/LexicalComposer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { editorTheme } from "@/components/editor/themes/editor-theme";
import { Plugins } from "@/components/blocks/editor-00/plugins";
import { FloatingLinkContext } from "@/components/editor/context/floating-link-context";
import { nodes } from "@/components/blocks/editor-00/nodes";
import { PlusIcon, Save } from "lucide-react";
import { EditorRefPlugin } from "@lexical/react/LexicalEditorRefPlugin";
import { useRef } from "react";
import type { LexicalEditor } from "lexical";
import { $generateHtmlFromNodes } from "@lexical/html";

const editorConfig: InitialConfigType = {
  namespace: "Editor",
  theme: editorTheme,
  nodes: nodes,
  onError: (error: Error) => {
    console.error(error);
  },
};

export default function CreateJobPostingPage() {
  const editor = useRef<LexicalEditor | null>(null);
  const saveContent = () => {
    const currentEditor = editor.current;
    if (currentEditor) {
      // conver to html
      currentEditor.update(() => {
        const html = $generateHtmlFromNodes(currentEditor, null);
        alert(`HTML: ${html}`);
      });
      // convert to json
      const data = currentEditor.getEditorState().toJSON();
      const stringData = JSON.stringify(data);
      alert(`JSON ${stringData}`);
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

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-medium">Job Posting Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input id="jobTitle" placeholder="Enter Job Title" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobRole">Job Role</Label>
              <Input id="jobRole" placeholder="Enter Job Role" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tag">Tags</Label>
              <Input id="tag" placeholder="Enter Tags" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" placeholder="Enter Category" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobRole">Salary Type</Label>
              <Select>
                <SelectTrigger id="salary_type" className="w-full">
                  <SelectValue placeholder="Select Salary Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary_min">Salary Min</Label>
              <Input id="salary_min" placeholder="Enter Salary Minimum" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary_max">Salary Max</Label>
              <Input id="salary_max" placeholder="Enter Salary Maximum" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="employment_level">Employment Level</Label>
              <Input id="employment_level" placeholder="Enter Employment Level" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employment_type">Employment Type</Label>
              <Input id="employment_type" placeholder="Enter Employment Type" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="work_setup">Work Setup</Label>
              <Input id="work_setup" placeholder="Enter Work Setup" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vacancies">Number of Vacancies </Label>
              <Input id="vacancies" placeholder="Enter Number of Vacancies" />
            </div>
          </div>

          <Label htmlFor="description">Description</Label>
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
                </FloatingLinkContext>
              </TooltipProvider>
            </LexicalComposer>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <div className="flex gap-4">
            <Button variant={"secondary"}>
              <Save />
              Save as Draft
            </Button>
            <Button onClick={() => saveContent()}>
              <PlusIcon />
              Post Job
            </Button>
          </div>
        </CardFooter>
      </Card>
    </SidebarLayout>
  );
}
