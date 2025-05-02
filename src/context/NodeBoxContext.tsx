//https://github.com/Sandpack/nodebox-runtime/blob/main/packages/nodebox/api.md
import { Nodebox, WorkerStatusUpdate } from "@codesandbox/nodebox"
import { createContext, signal, useContext, useEffect, useState } from "kaioken"

declare global {
  interface Window {
    __nodeboxIFrame: HTMLIFrameElement
    __nodeboxInstance: Nodebox
    __nodeboxLoadPromise: Promise<void> | null
  }
}

const NodeBoxContext = createContext<Nodebox>(null as any)

export const useNodeBox = () => useContext(NodeBoxContext)

const workerStatus = signal<WorkerStatusUpdate | null>(null)
export const useWorkerStatus = () => workerStatus.value

export const NodeBoxProvider: Kaioken.FC<{ fallback: JSX.Element }> = ({
  children,
  fallback,
}) => {
  const [nodebox, setNodebox] = useState<Nodebox | null>(
    "window" in globalThis && !!window.__nodeboxInstance
      ? (window.__nodeboxInstance ?? null)
      : null
  )
  useEffect(() => {
    if (window.__nodeboxInstance) {
      setNodebox(window.__nodeboxInstance)
      return
    }
    async function init() {
      if (!(("__nodeboxIFrame" in window) as any)) {
        window.__nodeboxIFrame = document.createElement("iframe")
        window.__nodeboxIFrame.style.display = "none"
        document.body.appendChild(window.__nodeboxIFrame)
        const pref = "[nodebox]: "

        console.log(pref, "importing @codesandbox/nodebox")
        const nBoxModule = await import("@codesandbox/nodebox")
        console.log(pref, "imported @codesandbox/nodebox")

        const nodeBox = new nBoxModule.Nodebox({
          iframe: window.__nodeboxIFrame,
        })

        console.log(pref, "connecting nodebox")
        await nodeBox.connect()
        console.log(pref, "connected nodebox")

        const shell = nodeBox.shell.create()
        shell.on("progress", (status) => (workerStatus.value = status))
        window.__nodeboxInstance = nodeBox
        setNodebox(nodeBox)
        return
      }
    }
    if (window.__nodeboxLoadPromise) {
      window.__nodeboxLoadPromise.then(() =>
        setNodebox(window.__nodeboxInstance)
      )
      return
    }
    window.__nodeboxLoadPromise = init()
  }, [])

  if (nodebox === null) return fallback

  return (
    <NodeBoxContext.Provider value={nodebox}>
      {children}
    </NodeBoxContext.Provider>
  )
}
