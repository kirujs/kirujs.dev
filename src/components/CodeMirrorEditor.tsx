import { useRef, useEffect, type ElementProps } from "kaioken"
import { EditorState, type Extension } from "@codemirror/state"
import { EditorView } from "codemirror"
import { kaiokenTheme } from "$/codeMirrorTheme"
import { kaiokenSetup } from "$/codeMirrorExtensions"
import { indentWithTab } from "@codemirror/commands"

import { keymap } from "@codemirror/view"

export interface CodeMirrorComponentProps extends ElementProps<"div"> {
  readonly?: boolean
  initialContent?: string
  onContentChanged?: (content: string) => void
  /** @default true */
  includeBasicExtensions?: boolean
  extensions?: Extension[]
}

export function CodeMirrorComponent({
  initialContent,
  onContentChanged,
  includeBasicExtensions = true,
  extensions: userExtensions,
  readonly,
  ...props
}: CodeMirrorComponentProps) {
  const { className, ...rest } = props
  const elementRef = useRef<HTMLDivElement>(null)
  const cmInstance = useRef<EditorView | null>(null)
  useEffect(() => {
    if (!elementRef.current) return
    const extensions: readonly Extension[] = [
      //oneDark,
      kaiokenTheme,
      //myTheme,
      EditorState.readOnly.of(!!readonly),
      keymap.of([indentWithTab]),
      ...(includeBasicExtensions ? [kaiokenSetup] : []), // Basic setup for editing
      ...(userExtensions ?? []),
      ...(onContentChanged
        ? [
            EditorView.updateListener.of((update) => {
              if (update.docChanged) {
                onContentChanged(update.state.doc.toString())
              }
            }),
          ]
        : []),
    ]

    cmInstance.current = new EditorView({
      state: EditorState.create({
        doc: initialContent,
        extensions,
      }),
      parent: elementRef.current,
    })

    cmInstance.current.setTabFocusMode(false)

    return () => cmInstance.current?.destroy()
  }, [userExtensions, includeBasicExtensions, onContentChanged])

  return (
    <div
      className={"CodeMirror prose max-w-full flex w-full " + className}
      ref={elementRef}
      {...rest}
    />
  )
}
