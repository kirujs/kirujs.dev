import { className as cls } from "kaioken/utils"
import { TutorialNav } from "./TutorialNav"
import { ResizablePane } from "$/components/atoms/ResizablePane"
import { useIsMobile } from "$/hooks/useMediaQuery"
import { Editor, EditorProvider } from "$/components/CodeSandbox/Editor"
import { useTutorialFiles } from "./hooks"
import { signal, useMemo, useRef } from "kaioken"
import { CodeSandbox } from "$/components/CodeSandbox/CodeSandbox"
import { BookOpenTextIcon } from "$/components/icons/BookOpenTextIcon"
import { EditIcon } from "$/components/icons/EditIcon"
import { EyeIcon } from "$/components/icons/EyeIcon"

enum MobileTab {
  Info,
  Editor,
  Preview,
}

const currentMobileTab = signal<MobileTab>(MobileTab.Info)

function MobileTabButton({
  children,
  tab,
}: {
  children: JSX.Children
  tab: MobileTab
}) {
  return (
    <button
      className={cls(
        "flex items-center justify-center p-2",
        "rounded-md text-sm font-medium transition-colors text-gray-400",
        currentMobileTab.value === tab && "text-white"
      )}
      onclick={() => (currentMobileTab.value = tab)}
    >
      {children}
    </button>
  )
}

function MobileTabWrapper({ children }: { children: JSX.Children }) {
  return <div className="flex flex-col h-full w-screen">{children}</div>
}

function MobileLayout({
  children,
  files,
}: {
  children: JSX.Children
  files: Record<string, string>
}) {
  return (
    <div className="flex flex-col h-[calc(100dvh+var(--navbar-height-negative))] mt-[var(--navbar-height)]">
      {/* Carousel Container */}
      <div className="flex-1 overflow-hidden relative">
        <div
          className="flex h-full transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentMobileTab.value * 100}vw)`,
            width: "300%", // 3 tabs = 300% width
          }}
        >
          <EditorProvider files={files}>
            {/* Tab 1: Info */}
            <MobileTabWrapper>
              <div className="prose prose-invert h-full p-8 max-w-none w-screen overflow-y-auto">
                <nav className="not-prose w-full mb-4">
                  <TutorialNav />
                </nav>
                {children}
              </div>
            </MobileTabWrapper>

            {/* Tab 2: Editor */}
            <MobileTabWrapper>
              <Editor className="w-screen max-w-screen h-full max-h-[calc(100vh-37px+var(--navbar-height-negative))]" />
            </MobileTabWrapper>

            {/* Tab 3: Preview */}
            <MobileTabWrapper>
              <CodeSandbox />
            </MobileTabWrapper>
          </EditorProvider>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-1/3 right-8 p-0.5 bg-[#1a1a1a] rounded-full">
        <div className="flex flex-col gap-1 relative">
          <MobileTabButton tab={MobileTab.Info}>
            <BookOpenTextIcon className="w-6 h-6" />
          </MobileTabButton>
          <MobileTabButton tab={MobileTab.Editor}>
            <EditIcon className="w-6 h-6" />
          </MobileTabButton>
          <MobileTabButton tab={MobileTab.Preview}>
            <EyeIcon className="w-6 h-6" />
          </MobileTabButton>
          <div
            className="transition-transform w-8 h-8 duration-300 absolute z-[-1] top-0 left-1/2 -translate-x-1/2 right-0 bg-[#b42641] rounded-full"
            style={{
              transform: `translateY(calc(${currentMobileTab.value * 100}% + ${12 * currentMobileTab.value}px + 4px))`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export function Layout({ children }: { children: JSX.Children }) {
  const files = useTutorialFiles()
  const isMobile = useIsMobile()

  if (isMobile) {
    return <MobileLayout files={files}>{children}</MobileLayout>
  }
  const leftPane = (
    <div className="bg-[#111] prose prose-invert h-full p-8 max-w-none w-full overflow-y-auto">
      <nav className="not-prose w-full">
        <TutorialNav />
      </nav>
      {children}
    </div>
  )

  const editorPane = (
    <Editor className="w-screen max-w-screen h-full max-h-[calc(100vh-37px+var(--navbar-height-negative))]" />
  )
  const previewPane = <CodeSandbox />

  const rightPane = (
    <div className="h-full">
      <ResizablePane
        firstPane={editorPane}
        secondPane={previewPane}
        direction="vertical"
        initialFirstSize={50}
        minFirstSize={20}
        maxFirstSize={80}
        className="h-full"
      />
    </div>
  )

  return (
    <div className="flex flex-col h-full mt-[var(--navbar-height)]">
      <EditorProvider files={files}>
        <ResizablePane
          firstPane={leftPane}
          secondPane={rightPane}
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
