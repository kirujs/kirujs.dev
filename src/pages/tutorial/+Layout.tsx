import { TutorialNav } from "./TutorialNav"
import { TutorialSandbox } from "./TutorialSandbox"

export function Layout({ children }: { children: JSX.Children }) {
  return (
    <div className="flex flex-col h-full mt-[var(--navbar-height)]">
      <div className="flex flex-grow h-[calc(100dvh+var(--navbar-height-negative))]">
        <div className="bg-[#111] prose prose-invert w-full p-8 overflow-y-auto max-h-[calc(100dvh+var(--navbar-height-negative))]">
          <nav className="not-prose w-full">
            <TutorialNav />
          </nav>
          {children}
        </div>
        <div className="flex-grow w-full">
          <TutorialSandbox />
        </div>
      </div>
    </div>
  )
}
