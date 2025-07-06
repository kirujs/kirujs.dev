import { ResizablePane } from "$/components/atoms/ResizablePane"
import { CodeSandbox } from "$/components/CodeSandbox/CodeSandbox"
import { EditorProvider, Editor } from "$/components/CodeSandbox/Editor"
import { usePageContext } from "$/context/pageContext"
import { useRef, useEffect, useSignal } from "kaioken"
import { TutorialNav } from "./TutorialNav"
import { IframeMenu } from "$/components/CodeSandbox/IframeMenu"

export default function DesktopLayout({
  children,
  files,
}: {
  children: JSX.Children
  files: Record<string, string>
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { urlPathname } = usePageContext()
  const iframePathname = useSignal("/")
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0 })
    }
    iframePathname.value = "/"
  }, [urlPathname])

  return (
    <div className="flex flex-col h-full mt-[var(--navbar-height)]">
      <EditorProvider files={files}>
        <ResizablePane
          firstPane={
            <div
              className="bg-[#111] prose prose-invert h-full p-8 max-w-none w-full overflow-y-auto"
              ref={scrollRef}
            >
              <nav className="not-prose w-full">
                <TutorialNav />
              </nav>
              {children}
            </div>
          }
          secondPane={
            <div className="h-full">
              <ResizablePane
                firstPane={
                  <Editor
                    key={urlPathname}
                    className="w-full max-w-full h-full max-h-[calc(100%-37px)]"
                  />
                }
                secondPane={
                  <div className="h-full relative flex flex-col">
                    <IframeMenu
                      iframeRef={iframeRef}
                      iframePathname={iframePathname}
                      className="w-full bg-[#222] px-2 py-1 flex items-center gap-2"
                    />
                    <CodeSandbox
                      onPathnameChange={(pathname) =>
                        (iframePathname.value = pathname)
                      }
                      iframeRef={iframeRef}
                    />
                  </div>
                }
                direction="vertical"
                initialFirstSize={50}
                minFirstSize={20}
                maxFirstSize={80}
                className="h-full"
              />
            </div>
          }
          direction="horizontal"
          initialFirstSize={50}
          minFirstSize={20}
          maxFirstSize={80}
          className="flex-grow h-[calc(100dvh+var(--navbar-height-negative))]"
        />
      </EditorProvider>
    </div>
  )
}
