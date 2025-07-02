import { JSXEditor } from "$/components/JSXEditor"
import { TabGroup } from "$/components/TabGroup"
import { useRef, useEffect, useState, ElementProps, useAsync } from "kaioken"
import {
  NodeBoxProvider,
  useNodeBox,
  useWorkerStatus,
} from "$/context/NodeBoxContext"
import { FILES_MAP } from "./filesMap"
import { useDebounceThrottle } from "$/utils"
import { useTaskRunner } from "$/hooks/useTaskRunner"
import { PreviewInfo } from "@codesandbox/nodebox"

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

function CodeSandboxImpl({ files, readonly, ...props }: CodeSandboxProps) {
  const prevWrittenFiles = useRef<Record<string, string> | null>(null)
  const nodeBox = useNodeBox()
  const previewIframeRef = useRef<HTMLIFrameElement>(null)
  const fileNames = Object.keys(files)
  const [selectedFile, setSelectedFile] = useState(fileNames[0])
  if (!files[selectedFile] && fileNames.length > 0) {
    setSelectedFile(fileNames[0])
  }

  console.log("CodeSandboxImpl")

  const cleanupRemovedFiles = async (oldFiles: Record<string, string>) => {
    return await Promise.all(
      Object.keys(oldFiles).map(async (file) => {
        nodeBox.fs.rm(`/src/${file}`)
      })
    )
  }

  const writeFiles = async (files: Record<string, string>) => {
    return await Promise.all(
      Object.keys(files).map(async (file) => {
        nodeBox.fs.writeFile(`/src/${file}`, files[file])
      })
    )
  }

  useTaskRunner(
    (abortSignal) => {
      const prevFiles = prevWrittenFiles.current
      abortSignal.addEventListener("abort", () => {
        console.log("[taskrunner]: cleaning up...")
        cleanupRemovedFiles(prevFiles ?? {})
      })

      const pref = "[taskrunner]: "
      console.log(pref, "start")

      const tasks: (() => Promise<any>)[] = []

      if (prevFiles === null) {
        tasks.push(async () => {
          console.log(pref, "initialiing nodebox fs...")
          await nodeBox.fs.init({ ...FILES_MAP })
          console.log(pref, "nodebox fs initialized.")
        })
      }
      tasks.push(async () => {
        console.log(pref, "writing files...")
        await writeFiles(files)
        prevWrittenFiles.current = { ...files }
        console.log(pref, "files written.")
      })

      if (prevFiles === null) {
        let previewInfo: PreviewInfo | null = null
        tasks.push(
          async () => {
            console.log(pref, "running startVite.js...")
            const shell = nodeBox.shell.create()
            await shell.runCommand("node", ["startVite.js"])
            console.log(pref, "startVite.js run.")
          },
          async () => {
            console.log(pref, "waiting for vite server...")
            previewInfo = await nodeBox.preview.waitForPort(3000, 10_000)
            console.log(pref, "vite server started.")
          },
          async () =>
            previewInfo &&
            (previewIframeRef.current!.setAttribute("src", previewInfo.url),
            console.log(pref, "iframe src set."))
        )
      }

      return tasks
    },
    [files]
  )

  const debouncedWrite = useDebounceThrottle(() => {
    if (!nodeBox) return
    nodeBox.fs.writeFile(`/src/${selectedFile}`, files[selectedFile])
  }, 0)

  const handleChange = (newCode: string) => {
    if (!nodeBox) return
    files[selectedFile] = newCode
    debouncedWrite()
  }

  const code = files[selectedFile]

  return (
    <div {...props}>
      <div className="flex-grow flex flex-col h-1/2 overflow-y-auto">
        <TabGroup
          items={Object.keys(files)}
          value={selectedFile}
          onSelect={setSelectedFile}
        />
        <JSXEditor
          key={selectedFile}
          content={code}
          onContentChanged={handleChange}
          className="flex-grow w-full"
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
