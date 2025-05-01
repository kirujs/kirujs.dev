import { redirect } from "vike/abort"
import CodeSandbox from "$/components/CodeSandbox"
import { usePageContext } from "$/context/pageContext"
import { useTutorialStep } from "./TutorialStepContext"
import { useEffect } from "kaioken"

export function TutorialSandbox() {
  const step = useTutorialStep()

  return (
    <CodeSandbox
      key={usePageContext().urlPathname}
      files={step?.files ?? {}}
      className="h-full flex flex-col"
    />
  )
}
