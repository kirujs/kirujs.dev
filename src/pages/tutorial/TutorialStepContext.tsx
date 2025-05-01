import { usePageContext } from "$/context/pageContext"

export type TutorialStep = {
  files: Record<string, string>
  readonly?: boolean
}

export function useTutorialStep() {
  return usePageContext().exports.step as TutorialStep
}
