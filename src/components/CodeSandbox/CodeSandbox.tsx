import { useRef, useAsync, signal, useLayoutEffect } from "kaioken"
import {
  NodeBoxProvider,
  useNodeBox,
  NodeBoxWorkerStatusDisplay,
} from "./NodeBoxContext"
import { FILES_MAP } from "./filesMap"
import { useDebounceThrottle } from "$/utils"
import { useEditor } from "./Editor"

export function CodeSandbox() {
  return (
    <NodeBoxProvider
      fallback={
        <small className="uppercase">preparing sandbox environment...</small>
      }
    >
      <CodeSandboxImpl />
    </NodeBoxProvider>
  )
}

const nodeboxInitializationState = signal<
  "idle" | "initializing" | "initialized"
>("idle")

const iframeSrc = signal("")
let currentFiles: Record<string, string> = {}

function CodeSandboxImpl() {
  const { configureContentChangedHandler, files, selectedFile } = useEditor()
  const nodeBox = useNodeBox()
  const previewIframeRef = useRef<HTMLIFrameElement>(null)

  const writeFiles = async (files: Record<string, string>) => {
    if (currentFiles === files) return
    currentFiles = files
    await Promise.all(
      Object.keys(files).map(async (file) => {
        nodeBox.fs.writeFile(`/src/${file}`, files[file])
      })
    )
  }

  const debouncedWrite = useDebounceThrottle(() => {
    if (!nodeBox) return
    nodeBox.fs.writeFile(`/src/${selectedFile}`, files[selectedFile])
  }, 50)

  useLayoutEffect(() => {
    async function init() {
      if (nodeboxInitializationState.value !== "idle") return
      nodeboxInitializationState.value = "initializing"
      await nodeBox.fs.init({ ...FILES_MAP })
      await writeFiles(files)
      const shell = nodeBox.shell.create()
      await shell.runCommand("node", ["startVite.js"])
      const previewInfo = await nodeBox.preview.waitForPort(3000, 10_000)
      iframeSrc.value = previewInfo.url
      nodeboxInitializationState.value = "initialized"
    }
    init()
    configureContentChangedHandler(() => debouncedWrite())
  }, [])

  useAsync(async () => {
    if (nodeboxInitializationState.value !== "initialized") return
    await writeFiles(files)
  }, [files, nodeboxInitializationState.value])

  return (
    <div className="flex flex-col h-full relative">
      <iframe
        ref={previewIframeRef}
        src={iframeSrc}
        className="flex-grow h-full w-full"
      />
      <NodeBoxWorkerStatusDisplay />
    </div>
  )
}
