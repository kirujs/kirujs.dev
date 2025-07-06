import {
  createContext,
  ElementProps,
  useCallback,
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
  setFileContent: (file: string, content: string) => void
}

const EditorContext = createContext<EditorContextType>(null!)

export function useEditor() {
  return useContext(EditorContext)
}

export function EditorProvider({
  files,
  children,
}: {
  files: Record<string, string>
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
        subscribe: (callback) => {
          contentChangedCallbacks.add(callback)
          return () => contentChangedCallbacks.delete(callback)
        },
        setFileContent: (file, content) => {
          files[file] = content
          contentChangedCallbacks.forEach((callback) => callback(file, content))
        },
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}

export function Editor(props: ElementProps<"div"> & { readonly?: boolean }) {
  const { files, selectedFile, setSelectedFile, setFileContent } = useEditor()
  const extensions = useMemo(
    () => [javascript({ jsx: true, typescript: true })],
    []
  )
  const onContentChanged = useCallback(
    (content: string) => setFileContent(selectedFile, content),
    [selectedFile]
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
        onContentChanged={onContentChanged}
        extensions={extensions}
        className={`flex-grow ${props.className}`}
        readonly={props.readonly}
      />
    </div>
  )
}
