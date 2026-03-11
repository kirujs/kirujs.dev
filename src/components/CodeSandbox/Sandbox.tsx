import { javascript } from "@codemirror/lang-javascript"
import { computed, effect, flushSync, ref, signal, ViewTransitions } from "kiru"
import { compile } from "./esbuild"
import { TabGroup } from "../TabGroup"
import { CodeMirror } from "./CodeMirror"
import { notifier } from "../../utils"
import { UndoIcon } from "../icons/UndoIcon"
import { ExpandIcon } from "../icons/ExpandIcon"
import { ShrinkIcon } from "../icons/ShrinkIcon"

interface SandboxProps {
  id?: string
  files: Record<string, string>
}

const Sandbox: Kiru.FC<SandboxProps> = ({
  id = "sandbox",
  files: initialFiles,
}) => {
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

  effect(() => {
    compile(files.value).then((code) => {
      iframeRef.current?.contentWindow?.postMessage({ type: "run", code }, "*")
    })
  })
  const extensions = [javascript({ jsx: true, typescript: true })]

  const reset = () => {
    files.value = { ...initialFiles }
    contentResetNotifier.notify(files.value[activeTab.value])
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
          onclick={reset}
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
      <div className="grid grid-cols-2 grow">
        <CodeMirror
          contentUpdatedNotifier={contentResetNotifier}
          extensions={extensions}
          initialContent={files.value[activeTab.value]}
          onContentChanged={(content) => {
            files.value[activeTab.value] = content
            files.notify()
          }}
          key={activeTab.value}
          className="grow h-full"
        />
        <iframe
          ref={iframeRef}
          srcdoc={sandboxHTML}
          className="grow h-full w-full"
        />
      </div>
    </div>
  )
}

export default Sandbox

const sandboxHTML = `<!DOCTYPE html>
<html>
  <head>
    <style>
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

      window.addEventListener("error", (e) => {
        window.parent.postMessage({ type: "error", message: e.message }, "*")
      })
      window.addEventListener("unhandledrejection", (e) => {
        window.parent.postMessage({ type: "error", message: e.reason?.message ?? String(e.reason) }, "*")
      })
    </script>
  </body>
</html>`
