import { useRouter } from "kiru/router"
import {
  getDocsVersion,
  navigateDocsVersion,
  type DocsVersion,
} from "$/docs-version"
const OPTIONS: { value: DocsVersion; label: string }[] = [
  { value: "v2", label: "2.x" },
  { value: "v1", label: "1.x" },
]

export function DocsVersionSwitcher() {
  const router = useRouter()

  return () => {
    const pathname = router.pathname.value
    const hash = router.hash.value
    const current = getDocsVersion(pathname)
    const onDocs =
      pathname.startsWith("/docs") || pathname.startsWith("/v2/docs")

    if (!onDocs) return null

    return (
      <label className="flex items-center gap-1.5 text-sm text-muted">
        <span className="sr-only">Docs version</span>
        <select
          className="bg-neutral-900 border border-white/10 rounded px-2 py-1 text-light text-sm cursor-pointer"
          value={current}
          onchange={(e) => {
            const next = e.target.value as DocsVersion
            const target = navigateDocsVersion(next, pathname, hash)
            router.navigate(target)
          }}
        >
          {OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
    )
  }
}
