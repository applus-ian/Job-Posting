import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export function DescriptionSyncPlugin({
  onChange,
  initialDescription,
}: {
  onChange: (value: string) => void;
  initialDescription?: string;
}) {
  const [editor] = useLexicalComposerContext();

  // description default values
  useEffect(() => {
    if (initialDescription) {
      editor.update(() => {
        const parsed = editor.parseEditorState(initialDescription);
        editor.setEditorState(parsed);
      });
    }
  }, [editor, initialDescription]);

  // update description value
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      const jsonString = JSON.stringify(editorState.toJSON());
      onChange(jsonString);
    });
  }, [editor, onChange]);

  return null;
}
