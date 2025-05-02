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
  const pref = "[nodebox]: "

  console.log(pref, "importing @codesandbox/nodebox")
  const nBoxModule = await import("@codesandbox/nodebox")
  console.log(pref, "imported @codesandbox/nodebox")

  const nodeBox = new nBoxModule.Nodebox({ iframe })

  console.log(pref, "connecting nodebox")
  await nodeBox.connect()
  console.log(pref, "connected nodebox")

  const shell = nodeBox.shell.create()
  shell.on("progress", (status) => (workerStatus.value = status))
  nodeboxInstance.value = nodeBox
}

const NodeBoxContext = createContext<Nodebox>(null as any)

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
