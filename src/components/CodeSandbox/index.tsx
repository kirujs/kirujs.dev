import { JSXEditor } from "$/components/JSXEditor"
import { TabGroup } from "$/components/TabGroup"
import {
  useRef,
  useState,
  ElementProps,
  useAsync,
  useMemo,
  signal,
  useLayoutEffect,
} from "kaioken"
import {
  NodeBoxProvider,
  useNodeBox,
  useWorkerStatus,
} from "$/context/NodeBoxContext"
import { FILES_MAP } from "./filesMap"
import { useDebounceThrottle } from "$/utils"

interface CodeSandboxProps extends ElementProps<"div"> {
  files: Record<string, string>
  readonly?: boolean
}
export default function CodeSandbox(props: CodeSandboxProps) {
  return (
    <NodeBoxProvider
      fallback={
        <small className="uppercase">preparing sandbox environment...</small>
      }
    >
      <CodeSandboxImpl {...props} />
    </NodeBoxProvider>
  )
}

function WorkerStatusDisplayText() {
  const status = useWorkerStatus()
  if (!status) return null
  switch (status.state) {
    case "command_running":
      return null
    case "starting_command":
    case "downloading_manifest":
      return status.state + "..."
    case "downloaded_module":
      return `downloaded module ${status.name}@${status.version}. total pending modules: ${status.totalPending}`
  }
}

const nodeboxInitializationState = signal<
  "idle" | "initializing" | "initialized"
>("idle")

function CodeSandboxImpl({ files, readonly, ...props }: CodeSandboxProps) {
  const prevWrittenFiles = useRef<Record<string, string> | null>(null)
  const nodeBox = useNodeBox()
  const previewIframeRef = useRef<HTMLIFrameElement>(null)
  const fileNames = Object.keys(files)
  const [selectedFile, setSelectedFile] = useState(fileNames[0])
  if (!files[selectedFile] && fileNames.length > 0) {
    setSelectedFile(fileNames[0])
  }

  const writeFiles = async (files: Record<string, string>) => {
    prevWrittenFiles.current = files
    await Promise.all(
      Object.keys(files).map(async (file) => {
        nodeBox.fs.writeFile(`/src/${file}`, files[file])
      })
    )
  }

  useLayoutEffect(() => {
    async function init() {
      if (nodeboxInitializationState.value !== "idle") return
      nodeboxInitializationState.value = "initializing"
      await nodeBox.fs.init({ ...FILES_MAP })
      await writeFiles(files)
      const shell = nodeBox.shell.create()
      await shell.runCommand("node", ["startVite.js"])
      const previewInfo = await nodeBox.preview.waitForPort(3000, 10_000)
      previewIframeRef.current!.setAttribute("src", previewInfo.url)
      nodeboxInitializationState.value = "initialized"
    }

    init()
  }, [])

  useAsync(async () => {
    if (nodeboxInitializationState.value !== "initialized") return
    if (prevWrittenFiles.current === files) return
    await writeFiles(files)
  }, [files, nodeboxInitializationState.value])

  const debouncedWrite = useDebounceThrottle(() => {
    if (!nodeBox) return
    nodeBox.fs.writeFile(`/src/${selectedFile}`, files[selectedFile])
  }, 50)

  const handleChange = (newCode: string) => {
    if (!nodeBox) return
    files[selectedFile] = newCode
    debouncedWrite()
  }

  const code = files[selectedFile]

  return (
    <div {...props}>
      <div className="flex-grow flex flex-col h-1/2">
        <TabGroup
          items={Object.keys(files)}
          value={selectedFile}
          onSelect={setSelectedFile}
        />
        <JSXEditor
          key={selectedFile}
          content={code}
          onContentChanged={handleChange}
          className="flex-grow w-full max-h-[calc(100%-40px)]"
          readonly={readonly}
        />
      </div>
      <div className="flex-grow h-1/2">
        <iframe ref={previewIframeRef} className="flex-grow h-full w-full" />
        <small className="uppercase fixed bottom-0">
          <WorkerStatusDisplayText />
        </small>
      </div>
    </div>
  )
}
