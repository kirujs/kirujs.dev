import { useMemo } from "kaioken"
import {
  CodeMirrorComponent,
  CodeMirrorComponentProps,
} from "$/components/CodeMirrorEditor"
import { javascript } from "@codemirror/lang-javascript"

type JSXEditorProps = Omit<
  CodeMirrorComponentProps,
  "extensions" | "initialContent"
> & {
  content: string
}

export function JSXEditor({
  content,
  onContentChanged,
  ...props
}: JSXEditorProps) {
  const extensions = useMemo(
    () => [javascript({ jsx: true, typescript: true })],
    []
  )
  return (
    <CodeMirrorComponent
      initialContent={content}
      onContentChanged={onContentChanged}
      extensions={extensions}
      {...props}
    />
  )
}
