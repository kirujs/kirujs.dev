import {
  createContext,
  ElementProps,
  useContext,
  useRef,
  useState,
} from "kaioken"
import { TabGroup } from "../TabGroup"

import { useMemo } from "kaioken"
import { CodeMirrorComponent } from "$/components/CodeMirrorEditor"
import { javascript } from "@codemirror/lang-javascript"

type ContentChangedCallback = (file: string, code: string) => void

type EditorContextType = {
  files: Record<string, string>
  selectedFile: string
  setSelectedFile: (file: string) => void
  subscribe: (callback: ContentChangedCallback) => () => void
  onContentChanged: () => void
  readonly: boolean
}

const EditorContext = createContext<EditorContextType>(null!)

export function useEditor() {
  return useContext(EditorContext)
}

export function EditorProvider({
  files,
  readonly,
  children,
}: {
  files: Record<string, string>
  readonly?: boolean
  children: JSX.Children
}) {
  const fileNames = Object.keys(files)
  const [selectedFile, setSelectedFile] = useState(fileNames[0])
  if (!files[selectedFile] && fileNames.length > 0) {
    setSelectedFile(fileNames[0])
  }

  const [contentChangedCallbacks] = useState<Set<ContentChangedCallback>>(
    () => new Set()
  )

  return (
    <EditorContext.Provider
      value={{
        selectedFile,
        setSelectedFile,
        files,
        readonly: !!readonly,
        subscribe: (callback) => {
          contentChangedCallbacks.add(callback)
          return () => contentChangedCallbacks.delete(callback)
        },
        onContentChanged: () => {
          contentChangedCallbacks.forEach((callback) =>
            callback(selectedFile, files[selectedFile])
          )
        },
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}

export function Editor(props: ElementProps<"div">) {
  const { files, selectedFile, setSelectedFile, readonly, onContentChanged } =
    useEditor()
  const extensions = useMemo(
    () => [javascript({ jsx: true, typescript: true })],
    []
  )
  return (
    <div className="flex flex-col h-full">
      <TabGroup
        items={Object.keys(files)}
        value={selectedFile}
        onSelect={setSelectedFile}
      />
      <CodeMirrorComponent
        initialContent={files[selectedFile]}
        onContentChanged={(content) => {
          files[selectedFile] = content
          onContentChanged()
        }}
        extensions={extensions}
        className={`flex-grow ${props.className}`}
        readonly={readonly}
      />
    </div>
  )
}
