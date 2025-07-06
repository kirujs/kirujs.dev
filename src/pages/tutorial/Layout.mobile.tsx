import { signal, useRef, useEffect, useSignal } from "kaioken"
import { className as cls } from "kaioken/utils"
import { CodeSandbox } from "$/components/CodeSandbox/CodeSandbox"
import { EditorProvider, Editor } from "$/components/CodeSandbox/Editor"
import { BookOpenTextIcon } from "$/components/icons/BookOpenTextIcon"
import { EditIcon } from "$/components/icons/EditIcon"
import { EyeIcon } from "$/components/icons/EyeIcon"
import { usePageContext } from "$/context/pageContext"
import { TutorialNav } from "./TutorialNav"
import { useTutorialFiles } from "./hooks"
import { IframeMenu } from "$/components/CodeSandbox/IframeMenu"

enum MobileTab {
  Info,
  Editor,
  Preview,
}

const currentMobileTab = signal<MobileTab>(MobileTab.Info)

export default function MobileLayout({ children }: { children: JSX.Children }) {
  const files = useTutorialFiles()
  const scrollRef = useRef<HTMLDivElement>(null)
  const { urlPathname } = usePageContext()
  const iframePathname = useSignal("/")
  const iframeRef = useRef<HTMLIFrameElement>(null)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
    iframePathname.value = "/"
  }, [urlPathname])

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
              <div
                className="prose prose-invert h-full p-8 max-w-none w-screen overflow-y-auto"
                ref={scrollRef}
              >
                <nav className="not-prose w-full mb-4">
                  <TutorialNav />
                </nav>
                {children}
              </div>
            </MobileTabWrapper>

            {/* Tab 2: Editor */}
            <MobileTabWrapper>
              <Editor
                key={urlPathname}
                className="w-screen max-w-screen h-full max-h-[calc(100vh-37px+var(--navbar-height-negative))]"
              />
            </MobileTabWrapper>

            {/* Tab 3: Preview */}
            <MobileTabWrapper>
              <div className="p-2 h-full bg-neutral-800 flex flex-col gap-2">
                <IframeMenu
                  iframeRef={iframeRef}
                  iframePathname={iframePathname}
                  className="w-full bg-[#222] flex items-center gap-2"
                />
                <div className="h-full rounded-lg overflow-hidden">
                  <CodeSandbox
                    onPathnameChange={(pathname) =>
                      (iframePathname.value = pathname)
                    }
                    iframeRef={iframeRef}
                  />
                </div>
              </div>
            </MobileTabWrapper>
          </EditorProvider>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed top-1/2 -translate-y-1/2 right-8 p-0.5 bg-[#1a1a1a] rounded-full">
        <div className="flex flex-col gap-1 relative">
          <MobileTabButton tab={MobileTab.Info}>
            <BookOpenTextIcon className="w-5 h-5" />
          </MobileTabButton>
          <MobileTabButton tab={MobileTab.Editor}>
            <EditIcon className="w-5 h-5" />
          </MobileTabButton>
          <MobileTabButton tab={MobileTab.Preview}>
            <EyeIcon className="w-5 h-5" />
          </MobileTabButton>
          <div
            className="transition-transform w-8 h-8 duration-300 absolute z-[-1] top-0 left-1/2 -translate-x-1/2 right-0 bg-[#b42641] rounded-full"
            style={{
              transform: `translateY(calc(${currentMobileTab.value * 100}% + ${8 * currentMobileTab.value}px + 2px))`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

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
