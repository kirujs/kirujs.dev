import { effect, ref, signal } from "kiru"
import { compile } from "./esbuild"

export default function Sandbox() {
  const iframeRef = ref<HTMLIFrameElement>(null)
  const raw = signal(`
import { signal } from "kiru"
const count = signal(0)
const App = () => (
  <div>
    <h1>Hello from Kiru!</h1>
    <button onclick={() => count.value++}>count: {count}</button>
  </div>
)
`)

  effect(() => {
    compile(raw.value).then((code) => {
      iframeRef.current?.contentWindow?.postMessage({ type: "run", code }, "*")
    })
  })
  return () => (
    <>
      <textarea bind:value={raw} className="w-full min-h-80" />
      <iframe ref={iframeRef} srcdoc={sandboxHTML} />
    </>
  )
}

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
        background-color: #111;
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
          "kiru": "https://esm.sh/kiru"
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
