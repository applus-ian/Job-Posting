import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export function DescriptionSyncPlugin({ onChange }: { onChange: (value: string) => void }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      const jsonString = JSON.stringify(editorState.toJSON());
      onChange(jsonString);
    });
  }, [editor, onChange]);

  return null;
}
