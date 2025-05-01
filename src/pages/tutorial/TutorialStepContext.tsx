import { usePageContext } from "$/context/pageContext"

export type TutorialStep = {
  files: Record<string, string>
  readonly?: boolean
}

export function useTutorialStep() {
  const context = usePageContext()
  return (context.exports.step ?? null) as TutorialStep | null
}
