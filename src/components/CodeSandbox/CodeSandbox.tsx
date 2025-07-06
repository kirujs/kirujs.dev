import { useAsync, signal, useLayoutEffect } from "kaioken"
import {
  NodeBoxProvider,
  useNodeBox,
  NodeBoxWorkerStatusDisplay,
} from "./NodeBoxContext"
import { FILES_MAP } from "./filesMap"
import { useDebounceThrottle } from "$/utils"
import { useEditor } from "./Editor"
import { CustomMessage } from "./types"

type CodeSandboxProps = {
  onPathnameChange?: (pathname: string) => void
  iframeRef?: Kaioken.Ref<HTMLIFrameElement>
}

export function CodeSandbox(props: CodeSandboxProps) {
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

const nodeboxInitializationState = signal<
  "idle" | "initializing" | "initialized"
>("idle")

const iframeSrc = signal("")
let currentFiles: Record<string, string> = {}

function CodeSandboxImpl({ onPathnameChange, iframeRef }: CodeSandboxProps) {
  const { subscribe, files } = useEditor()
  const nodeBox = useNodeBox()

  const writeFiles = async (files: Record<string, string>) => {
    if (currentFiles === files) return
    currentFiles = files
    await Promise.all(
      Object.keys(files).map(async (file) => {
        nodeBox.fs.writeFile(`/src/${file}`, files[file])
      })
    )
    console.log("wrote files", files)
  }

  const debouncedWrite = useDebounceThrottle((file: string, code: string) => {
    if (!nodeBox) return
    nodeBox.fs.writeFile(`/src/${file}`, code)
  }, 50)

  useLayoutEffect(() => {
    async function init() {
      if (nodeboxInitializationState.value !== "idle") return
      nodeboxInitializationState.value = "initializing"
      await nodeBox.fs.init({ ...FILES_MAP })
      await writeFiles(files)
      const shell = nodeBox.shell.create()
      const shellInfo = await shell.runCommand("node", ["./startVite.js"])
      console.log("started vite", shellInfo)
      shell.on("exit", (code, error) => {
        console.log("shell exited", code, error)
      })
      shell.on("progress", (status) => {
        console.log("shell progress", status)
      })
      const previewInfo = await nodeBox.preview.waitForPort(8080, 10_000)
      iframeSrc.value = previewInfo.url
      nodeboxInitializationState.value = "initialized"
    }
    const onMessage = (e: MessageEvent<CustomMessage>) => {
      switch (e.data.type) {
        case "code-sandbox:pathname":
          onPathnameChange?.(e.data.pathname)
          break
      }
    }
    init()

    window.addEventListener("message", onMessage)
    const unsubscribe = subscribe(debouncedWrite)
    return () => {
      window.removeEventListener("message", onMessage)
      unsubscribe()
    }
  }, [])

  useAsync(async () => {
    if (nodeboxInitializationState.value !== "initialized") return
    await writeFiles(files)
  }, [files, nodeboxInitializationState.value])

  return (
    <div className="flex flex-col h-full relative">
      <iframe
        ref={iframeRef}
        src={iframeSrc}
        className="flex-grow h-full w-full"
      />
      <NodeBoxWorkerStatusDisplay />
    </div>
  )
}
