import { ResizablePane } from "$/components/atoms/ResizablePane"
import { CodeSandbox } from "$/components/CodeSandbox/CodeSandbox"
import { EditorProvider, Editor } from "$/components/CodeSandbox/Editor"
import { usePageContext } from "$/context/pageContext"
import { useRef, useEffect } from "kaioken"
import { TutorialNav } from "./TutorialNav"
import { useTutorialFiles } from "./hooks"

export default function DesktopLayout({
  children,
}: {
  children: JSX.Children
}) {
  const files = useTutorialFiles()
  const scrollRef = useRef<HTMLDivElement>(null)
  const { urlPathname } = usePageContext()
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0 })
    }
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
                secondPane={<CodeSandbox />}
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
