//https://github.com/Sandpack/nodebox-runtime/blob/main/packages/nodebox/api.md
import { Nodebox, WorkerStatusUpdate } from "@codesandbox/nodebox"
import { createContext, signal, useContext, useEffect } from "kaioken"

const nodeboxIframe = signal<HTMLIFrameElement | null>(null)
const nodeboxInstance = signal<Nodebox | null>(null)
const hasInitializedNodebox = signal<boolean>(false)

async function initNodebox() {
  if (nodeboxIframe.value) return
  const iframe = (nodeboxIframe.value = document.createElement("iframe"))
  iframe.style.display = "none"
  document.body.appendChild(iframe)

  const log = (msg: string) => console.log("[nodebox]: " + msg)

  log("importing @codesandbox/nodebox")
  const nBoxModule = await import("@codesandbox/nodebox")
  log("imported @codesandbox/nodebox")

  const nodeBox = new nBoxModule.Nodebox({ iframe })

  log("connecting...")
  await nodeBox.connect()
  log("connected")

  const shell = nodeBox.shell.create()
  shell.on("progress", (status) => (workerStatus.value = status))
  nodeboxInstance.value = nodeBox
}

const NodeBoxContext = createContext<Nodebox>(null!)

export const useNodeBox = () => useContext(NodeBoxContext)

const workerStatus = signal<WorkerStatusUpdate | null>(null)
export const useWorkerStatus = () => workerStatus.value

export const NodeBoxProvider: Kaioken.FC<{ fallback: JSX.Element }> = ({
  children,
  fallback,
}) => {
  useEffect(() => {
    if (!hasInitializedNodebox.value) {
      hasInitializedNodebox.value = true
      initNodebox()
    }
  }, [])

  const nodebox = nodeboxInstance.value
  if (nodebox === null) return fallback

  return (
    <NodeBoxContext.Provider value={nodebox}>
      {children}
    </NodeBoxContext.Provider>
  )
}

export function NodeBoxWorkerStatusDisplay() {
  const status = useWorkerStatus()
  console.log("nodebox worker status", status)
  if (!status) return null
  switch (status.state) {
    case "command_running":
      return null
    case "starting_command":
    case "downloading_manifest":
      return (
        <small className="uppercase absolute bottom-0 left-0 p-2 bg-black bg-opacity-50 text-white">
          {status.state + "..."}
        </small>
      )
    case "downloaded_module":
      return (
        <small className="uppercase absolute bottom-0 left-0 p-2 bg-black bg-opacity-50 text-white">
          {`downloaded module ${status.name}@${status.version}. total pending modules: ${status.totalPending}`}
        </small>
      )
  }
}
