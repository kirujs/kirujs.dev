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
  configureContentChangedHandler: (callback: ContentChangedCallback) => void
  onContentChanged: Kaioken.MutableRefObject<ContentChangedCallback | null>
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
  const onContentChanged = useRef<ContentChangedCallback | null>(null)
  const configureContentChangedHandler = (callback: ContentChangedCallback) => {
    onContentChanged.current = callback
  }
  return (
    <EditorContext.Provider
      value={{
        selectedFile,
        setSelectedFile,
        files,
        readonly: !!readonly,
        configureContentChangedHandler,
        onContentChanged,
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
          if (!onContentChanged.current) return
          onContentChanged.current(selectedFile, content)
        }}
        extensions={extensions}
        className={`flex-grow ${props.className}`}
        readonly={readonly}
      />
    </div>
  )
}
