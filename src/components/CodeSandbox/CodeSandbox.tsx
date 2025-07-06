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
  const { subscribe, files } = useEditor()
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

  const debouncedWrite = useDebounceThrottle((file: string, code: string) => {
    if (!nodeBox) return
    nodeBox.fs.writeFile(`/src/${file}`, code)
  }, 50)

  useLayoutEffect(() => {
    async function init() {
      if (nodeboxInitializationState.value !== "idle") return
      nodeboxInitializationState.value = "initializing"
      console.log("writing file map", FILES_MAP)
      await nodeBox.fs.init({ ...FILES_MAP })
      console.log("wrote file map")
      console.log("writing files", files)
      await writeFiles(files)
      console.log("wrote files")
      const shell = nodeBox.shell.create()
      await shell.runCommand("node", ["./startVite.js"])
      console.log("started vite")
      shell.on("exit", (code, error) => {
        console.log("vite exited", code, error)
      })
      shell.on("progress", (status) => {
        console.log("vite progress", status)
      })
      const previewInfo = await nodeBox.preview.waitForPort(8080, 10_000)
      iframeSrc.value = previewInfo.url
      nodeboxInitializationState.value = "initialized"
    }
    init()
    return subscribe(debouncedWrite)
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
