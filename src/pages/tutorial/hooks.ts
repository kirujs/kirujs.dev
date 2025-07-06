import { usePageContext } from "$/context/pageContext"
import { useMemo } from "kaioken"
import { mapViteFilesGlob } from "$/utils"

export function useTutorialFiles() {
  const exports = usePageContext().exports
  const files = useMemo(
    () => mapViteFilesGlob(exports.files as Record<string, unknown>),
    [exports.files]
  )
  return files
}
