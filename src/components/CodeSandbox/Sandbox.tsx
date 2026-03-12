import { javascript } from "@codemirror/lang-javascript"
import {
  computed,
  effect,
  flushSync,
  For,
  nextIdle,
  onMount,
  ref,
  Show,
  signal,
  ViewTransitions,
} from "kiru"
import { compile } from "./esbuild"
import { TabGroup } from "../TabGroup"
import { CodeMirror } from "./CodeMirror"
import { notifier } from "../../utils"
import { UndoIcon } from "../icons/UndoIcon"
import { ExpandIcon } from "../icons/ExpandIcon"
import { ShrinkIcon } from "../icons/ShrinkIcon"
import { className as cls } from "kiru/utils"
import { CircleUserIcon } from "../icons/CircleUserIcon"
import { CircleXIcon } from "../icons/CircleXIcon"
import { TriangleAlertIcon } from "../icons/TriangleAlertIcon"
import { InfoIcon } from "../icons/InfoIcon"
import { ChevronDownIcon } from "../icons/ChevronDownIcon"

interface SandboxProps {
  id?: string
  files: Record<string, string>
}

interface Log {
  type: "default" | "error" | "debug" | "warn"
  message: string
  time: number
  location?: string
}

const Sandbox: Kiru.FC<SandboxProps> = ({
  id = "sandbox",
  files: initialFiles,
}) => {
  const compileError = signal<string | null>(null)
  const logs = signal<Log[]>([])
  const showErrorLogs = signal(true)
  const showWarnLogs = signal(true)
  const showDebugLogs = signal(true)
  const showDefaultLogs = signal(true)
  const logStats = computed(() => {
    let error = 0
    let warn = 0
    let debug = 0
    let defaultLog = 0
    logs.value.forEach((log) => {
      if (log.type === "error") error++
      if (log.type === "warn") warn++
      if (log.type === "debug") debug++
      if (log.type === "default") defaultLog++
    })
    return {
      error,
      warn,
      debug,
      defaultLog,
    }
  })
  const filteredLogs = computed(() => {
    return logs.value.filter((log) => {
      if (showErrorLogs.value && log.type === "error") return true
      if (showWarnLogs.value && log.type === "warn") return true
      if (showDebugLogs.value && log.type === "debug") return true
      if (showDefaultLogs.value && log.type === "default") return true
      return false
    })
  })
  const showConsole = signal(false)
  const logsContainerRef = ref<HTMLUListElement>(null)
  const overlayEnabled = signal(false)
  const contentResetNotifier = notifier<string>()
  const files = signal({ ...initialFiles })
  const filePaths = computed<string[]>((prev) => {
    const current = Object.keys(files.value)
    if (
      prev &&
      prev.length === current.length &&
      prev.every((k) => current.includes(k))
    )
      return prev
    return current
  })
  const activeTab = computed(() => filePaths.value[0])
  const iframeRef = ref<HTMLIFrameElement>(null)

  onMount(() => {
    const iframe = iframeRef.current!

    const onMessage = (e: MessageEvent) => {
      if (!e.data || typeof e.data.type !== "string") return
      if (e.data.type.startsWith("log:")) {
        const time = Date.now()
        let { type, message } = e.data
        type = type.substring(4) as "error" | "warn" | "debug" | "default"
        logs.value = [...logs.peek(), { type, message, time }]
        logs.notify()
        new Promise<void>(queueMicrotask).then(() => {
          nextIdle(() => {
            const logsContainer = logsContainerRef.current
            if (!logsContainer) return
            logsContainer.scrollTo(0, logsContainer.scrollHeight - 50)
          })
        })
      }
    }
    window.addEventListener("message", onMessage)

    let hasCompiled = false
    const effectHandle = effect(() => {
      compile(files.value)
        .then((code) => {
          iframe.contentWindow?.postMessage({ type: "run", code }, "*")
          compileError.value = null
          logs.value = [
            ...logs.peek(),
            {
              type: "debug",
              message: hasCompiled ? "[sandbox] updated" : "[sandbox] compiled",
              time: Date.now(),
            },
          ]
          hasCompiled = true
        })
        .catch((err) => (compileError.value = err.message))
    })

    return () => {
      window.removeEventListener("message", onMessage)
      effectHandle.stop()
    }
  })

  const extensions = [javascript({ jsx: true, typescript: true })]

  const resetFiles = () => {
    files.value = { ...initialFiles }
    contentResetNotifier.notify(files.value[activeTab.value])
  }

  const toggleShowConsole = () => {
    const show = (showConsole.value = !showConsole.value)
    if (show) {
      nextIdle(() => {
        logsContainerRef.current?.scrollTo(
          0,
          logsContainerRef.current.scrollHeight
        )
      })
    }
  }

  let changeQueuedTimeout: number | undefined
  const onCodeMirrorContentChanged = (content: string) => {
    files.value[activeTab.value] = content
    window.clearTimeout(changeQueuedTimeout)
    changeQueuedTimeout = window.setTimeout(() => files.notify(), 150)
  }

  return () => (
    <div
      style={`view-transition-name:${id}`}
      className={
        overlayEnabled.value
          ? "fixed inset-4 z-50 bg-neutral-950 flex flex-col"
          : ""
      }
    >
      <TabGroup
        items={filePaths.value}
        itemTransform={(item) => item.substring(2)}
        tab={activeTab}
      >
        <button
          title="Reset"
          onclick={resetFiles}
          className="text-neutral-400 hover:bg-white/10 hover:text-white"
        >
          <UndoIcon className="pointer-none" />
        </button>
        <button
          title="Toggle overlay mode"
          onclick={() => {
            ViewTransitions.run(() => {
              overlayEnabled.value = !overlayEnabled.value
              flushSync()
            })
          }}
          className="text-neutral-400 hover:bg-white/10 hover:text-white"
        >
          {overlayEnabled.value ? (
            <ShrinkIcon className="pointer-none" />
          ) : (
            <ExpandIcon className="pointer-none" />
          )}
        </button>
      </TabGroup>
      <div
        className={cls(
          "grid grid-rows-2 grid-cols-1 lg:grid-cols-2 lg:grid-rows-1 grow",
          overlayEnabled.value ? "max-h-full" : "max-h-[600px] lg:max-h-[300px]"
        )}
      >
        <CodeMirror
          contentUpdatedNotifier={contentResetNotifier}
          extensions={extensions}
          initialContent={files.value[activeTab.value]}
          onContentChanged={onCodeMirrorContentChanged}
          key={activeTab.value}
        />
        <div className="flex grow h-full w-full relative">
          <iframe
            ref={iframeRef}
            srcdoc={sandboxHTML}
            className="grow w-full h-full min-h-[300px]"
          />
          <Show when={compileError}>
            {(err) => {
              console.log("compile error", err)
              return (
                <div className="absolute inset-2 flex items-center justify-center bg-black/50 ">
                  <div className="bg-neutral-700 border border-red-400 text-white text-sm p-2">
                    <span>{err}</span>
                  </div>
                </div>
              )
            }}
          </Show>
          <div className="absolute bottom-0 w-full bg-neutral-900 p-1">
            <div className="flex justify-between">
              <div className="flex gap-1">
                <LogTrayButton
                  active={showDefaultLogs}
                  getCount={() => logStats.value.defaultLog}
                  children={<CircleUserIcon className="w-4 h-4" />}
                />
                <LogTrayButton
                  active={showErrorLogs}
                  getCount={() => logStats.value.error}
                  children={<CircleXIcon className="w-4 h-4 text-red-400" />}
                />
                <LogTrayButton
                  active={showWarnLogs}
                  getCount={() => logStats.value.warn}
                  children={
                    <TriangleAlertIcon className="w-4 h-4 text-orange-400" />
                  }
                />
                <LogTrayButton
                  active={showDebugLogs}
                  getCount={() => logStats.value.debug}
                  children={<InfoIcon className="w-4 h-4 text-blue-400" />}
                />
              </div>
              <button
                onclick={toggleShowConsole}
                className="text-neutral-400 hover:bg-white/10 hover:text-white"
              >
                <ChevronDownIcon
                  className={cls(
                    "pointer-none",
                    showConsole.value ? "" : "rotate-180"
                  )}
                />
              </button>
            </div>
            <Show when={showConsole}>
              <hr className="my-1!" />
              <ul
                ref={logsContainerRef}
                className="p-1 m-0 mb-0! bg-neutral-800 max-h-[100px] overflow-y-scroll flex flex-col gap-0.5"
              >
                <For
                  each={filteredLogs}
                  fallback={
                    <i className="text-xs font-mono text-neutral-400">
                      Nothing to display
                    </i>
                  }
                >
                  {(item) => (
                    <div
                      className={cls(
                        "text-xs font-mono not-first:border-t border-t-neutral-400/20",
                        item.type === "default" && "text-neutral-400",
                        item.type === "error" && "text-red-400",
                        item.type === "debug" && "text-blue-400",
                        item.type === "warn" && "text-yellow-400"
                      )}
                    >
                      {item.message}
                    </div>
                  )}
                </For>
              </ul>
            </Show>
          </div>
        </div>
      </div>
    </div>
  )
}

interface LogTrayButtonProps {
  active: Kiru.Signal<boolean>
  getCount: () => number
  children: JSX.Children
}
const LogTrayButton = ({ active, getCount, children }: LogTrayButtonProps) => (
  <button
    className={cls(
      "rounded px-1 flex items-center gap-1",
      active.value
        ? "bg-neutral-300/15"
        : "opacity-75 hover:opacity-100 hover:bg-neutral-300/10",
      active.value ? "text-neutral-300" : "text-neutral-400"
    )}
    onclick={() => (active.value = !active.value)}
  >
    {children}
    <sup className="text-xs font-mono pt-1">{getCount()}</sup>
  </button>
)

export default Sandbox

const sandboxHTML = `<!DOCTYPE html>
<html>
  <head>
    <style>
      * {
        scrollbar-width: thin;
        -ms-overflow-style: none;
        scrollbar-color: rgba(255, 255, 255, 0.35) transparent;
      }
      *::-webkit-scrollbar, *::-moz-scrollbar, *::-ms-scrollbar, *::-o-scrollbar {
        width: 8px;
        height: 8px;
      }
      *, *::before, *::after { box-sizing: border-box; }
      * { margin: 0; }
      body {
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: #080508;
        color: #fff;
        padding: 1rem;
      }
      img, picture, video, canvas, svg { display: block; max-width: 100%; }
      input, button, textarea, select { font: inherit; }
      p, h1, h2, h3, h4, h5, h6 { overflow-wrap: break-word; }
    </style>
  </head>
  <body>
    <script type="importmap">
      {
        "imports": {
          "kiru": "https://esm.sh/kiru?bundle"
        }
      }
    </script>
    <script type="module">
      window.addEventListener("message", async (e) => {
        if (e.data?.type !== "run") return

        const blob = new Blob([e.data.code], { type: "text/javascript" })
        const url = URL.createObjectURL(blob)
        try {
          await import(url)
        } catch (err) {
          e.source.postMessage({ type: "error", message: err.message }, "*")
        } finally {
          URL.revokeObjectURL(url)
        }
      })

      const getErrorLocation = (err) => {
        return err.stack.split("\\n")[2].replace("at ", "").replace(")", "")
      }

      const getCallLocation = () =>{
        try {
          throw new Error()
        } catch (err) {
          return getErrorLocation(err)
        }
      }

      const { log, error, warn, debug } = console
      console.log = (...args) => {
        log(...args)
        const location = getCallLocation()
        window.parent.postMessage({ type: "log:default", message: args.join(" "), location }, "*")
      }
      console.error = (...args) => {
        error(...args)
        const location = getCallLocation()
        window.parent.postMessage({ type: "log:error", message: args.join(" "), location }, "*")
      }
      console.warn = (...args) => {
        warn(...args)
        const location = getCallLocation()
        window.parent.postMessage({ type: "log:warn", message: args.join(" "), location }, "*")
      }
      console.debug = (...args) => {
        debug(...args)
        const location = getCallLocation()
        window.parent.postMessage({ type: "log:debug", message: args.join(" "), location }, "*")
      }
      window.addEventListener("error", (e) => {
        window.parent.postMessage({ type: "log:error", message: e.message }, "*")
      })
      window.addEventListener("unhandledrejection", (e) => {
        window.parent.postMessage({ type: "log:error", message: e.reason?.message ?? String(e.reason) }, "*")
      })
    </script>
  </body>
</html>`
