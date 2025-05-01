import { useTutorialStep } from "./TutorialStepContext"
import { TutorialSandbox } from "./TutorialSandbox"

export function Layout({ children }: { children: JSX.Children }) {
  return (
    <div className="flex flex-col h-full mt-[var(--navbar-height)]">
      <div className="flex flex-grow h-[calc(100dvh+var(--navbar-height-negative))]">
        <div className="bg-[#111] prose prose-invert w-full p-8 overflow-y-auto max-h-[calc(100dvh+var(--navbar-height-negative))]">
          <TutorialNav />
          {children}
        </div>
        <div className="flex-grow w-full">
          <TutorialSandbox />
        </div>
      </div>
    </div>
  )
}

function TutorialNav() {
  const step = useTutorialStep()

  if (!step) return null

  return (
    <nav className="not-prose sticky w-full top-0">
      <ul className="flex gap-2">
        <li>
          <a href="#step-1">Step 1</a>
        </li>
        <li>
          <a href="#step-2">Step 2</a>
        </li>
        <li>
          <a href="#step-3">Step 3</a>
        </li>
      </ul>
    </nav>
  )
}
