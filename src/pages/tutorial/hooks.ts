import { usePageContext } from "$/context/pageContext"
import { useMemo } from "kaioken"
import { mapFiles } from "./utils"

export function useTutorialFiles() {
  const exports = usePageContext().exports
  const files = useMemo(
    () => mapFiles(exports.files as Record<string, unknown>),
    [exports.files]
  )
  return files
}
