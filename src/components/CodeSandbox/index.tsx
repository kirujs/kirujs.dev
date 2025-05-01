import { JSXEditor } from "$/components/JSXEditor"
import { TabGroup } from "$/components/TabGroup"
import { useRef, useEffect, useState, ElementProps } from "kaioken"
import {
  NodeBoxProvider,
  useNodeBox,
  useWorkerStatus,
} from "$/context/NodeBoxContext"
import { FILES_MAP } from "./filesMap"
import { useDebounceThrottle } from "$/utils"

interface CodeSanboxProps extends ElementProps<"div"> {
  files: Record<string, string>
  readonly?: boolean
}
export default function CodeSandbox(props: CodeSanboxProps) {
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

function CodeSandboxImpl({ files, readonly, ...props }: CodeSanboxProps) {
  const [prevWrittenFiles, setPrevWrittenFiles] = useState<Record<
    string,
    string
  > | null>(null)
  const nodeBox = useNodeBox()
  const previewIframeRef = useRef<HTMLIFrameElement>(null)
  const [selectedFile, setSelectedFile] = useState(Object.keys(files)[0])

  const cleanupRemovedFiles = async (
    oldFiles: Record<string, string>,
    newFiles: Record<string, string>
  ) => {
    return await Promise.all(
      Object.keys(oldFiles).map(async (file) => {
        if (file in newFiles) return
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

  const init = async () => {
    const shell = nodeBox.shell.create()
    if (prevWrittenFiles === null) {
      await nodeBox.fs.init({ ...FILES_MAP })
    }
    await writeFiles(files)
    setPrevWrittenFiles(files)
    if (prevWrittenFiles !== null) return

    await shell.runCommand("node", ["startVite.js"])
    try {
      const previewInfo = await nodeBox.preview.waitForPort(3000, 10_000)
      previewIframeRef.current!.setAttribute("src", previewInfo.url)
    } catch (error) {
      console.error("err", error)
    }
  }

  useEffect(() => {
    init()
    return () => {
      cleanupRemovedFiles(
        prevWrittenFiles ?? {},
        previewIframeRef.current ? files : {}
      )
    }
  }, [files])

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

  const { className, ...rest } = props
  return (
    <div className={`${className || ""}`} {...rest}>
      <div className="flex-grow flex flex-col h-1/2">
        <TabGroup
          items={Object.keys(files)}
          value={selectedFile}
          onSelect={setSelectedFile}
        />
        <JSXEditor
          key={selectedFile}
          content={code}
          onContentChanged={handleChange}
          className="flex-grow w-full h-full"
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
