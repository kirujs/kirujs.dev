import { EditorState, type Extension } from "@codemirror/state"
import { oneDark } from "@codemirror/theme-one-dark"
import { EditorView, basicSetup } from "codemirror"
import { ElementProps, onMount, ref } from "kiru"

interface CodeMirrorProps extends ElementProps<"div"> {
  readonly?: boolean
  initialContent?: string
  onContentChanged?: (content: string) => void
  /** @default true */
  includeBasicExtensions?: boolean
  extensions?: Extension[]
}
export const CodeMirror: Kiru.FC<CodeMirrorProps> = ({
  initialContent,
  onContentChanged,
  includeBasicExtensions = true,
  extensions: userExtensions,
  readonly,
  ...props
}) => {
  const divRef = ref<HTMLDivElement>(null)

  onMount(() => {
    const extensions: readonly Extension[] = [
      oneDark,
      EditorState.readOnly.of(!!readonly),
      ...(includeBasicExtensions ? [basicSetup] : []), // Basic setup for editing
      ...(userExtensions ?? []),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          onContentChanged?.(update.state.doc.toString())
        }
      }),
    ]

    const editor = new EditorView({
      state: EditorState.create({
        doc: initialContent,
        extensions,
      }),
      parent: divRef.current!,
    })

    return () => editor.destroy()
  })

  return () => <div ref={divRef} {...props} />
}

// const omit = <T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
//   const { [keys[0]]: _, ...rest } = obj
//   return rest
// }
