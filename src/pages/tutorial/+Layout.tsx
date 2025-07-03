import { TutorialNav } from "./TutorialNav"
import { TutorialSandbox } from "./TutorialSandbox"
import { ResizablePane } from "$/components/atoms/ResizablePane"

export function Layout({ children }: { children: JSX.Children }) {
  const leftPane = (
    <div className="bg-[#111] prose prose-invert h-full p-8 max-w-none w-full overflow-y-auto">
      <nav className="not-prose w-full">
        <TutorialNav />
      </nav>
      {children}
    </div>
  )

  const rightPane = (
    <div className="h-full">
      <TutorialSandbox />
    </div>
  )

  return (
    <div className="flex flex-col h-full mt-[var(--navbar-height)]">
      <ResizablePane
        leftPane={leftPane}
        rightPane={rightPane}
        initialLeftWidth={50}
        minLeftWidth={25}
        maxLeftWidth={75}
        className="flex-grow h-[calc(100dvh+var(--navbar-height-negative))]"
      />
    </div>
  )
}
