import CodeSandbox from "$/components/CodeSandbox"
import { usePageContext } from "$/context/pageContext"
import { useMemo } from "kaioken"
import { mapFiles } from "./utils"

export function TutorialSandbox() {
  const exports = usePageContext().exports
  const files = useMemo(
    () => mapFiles(exports.files as Record<string, unknown>),
    [exports.files]
  )

  return (
    <CodeSandbox
      //key={usePageContext().urlPathname}
      files={files ?? {}}
      className="h-full flex flex-col"
    />
  )
}
