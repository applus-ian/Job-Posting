import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { nodes } from "../blocks/editor-00/nodes";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { editorTheme } from "../editor/themes/editor-theme";

export function DescriptionRenderer({ description }: { description: string }) {
  return (
    <LexicalComposer
      initialConfig={{
        namespace: "Viewer",
        editable: false,
        theme: editorTheme,
        nodes: nodes,
        onError: (error: Error) => console.error(error),
        editorState: (editor) => {
          const parsedEditorState = editor.parseEditorState(description);
          editor.setEditorState(parsedEditorState);
        },
      }}
    >
      <RichTextPlugin
        contentEditable={<ContentEditable className="prose" />}
        placeholder={null}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <ListPlugin />
      <CheckListPlugin />
    </LexicalComposer>
  );
}
