export type DocsVersion = "v1" | "v2"

const V1_DOCS_PREFIX = "/docs"
const V2_DOCS_PREFIX = "/v2/docs"

const EXACT_V2_MAP: Record<string, string> = {
  "/docs/api/file-router": "/v2/docs/migration",
}

const EXACT_V1_MAP: Record<string, string> = {
  "/v2/docs/migration": "/docs/api/file-router",
  "/v2/docs/router/overview": "/docs/api/file-router",
}

export function getDocsVersion(pathname: string): DocsVersion {
  return pathname.startsWith("/v2") ? "v2" : "v1"
}

export function toV2Path(pathname: string, hash = ""): string {
  if (pathname.startsWith(V2_DOCS_PREFIX)) {
    return pathname + hash
  }
  const mapped = EXACT_V2_MAP[pathname]
  if (mapped) return mapped + hash
  if (pathname.startsWith(V1_DOCS_PREFIX)) {
    return V2_DOCS_PREFIX + pathname.slice(V1_DOCS_PREFIX.length) + hash
  }
  if (pathname === "/") return "/v2/docs/introduction" + hash
  return "/v2/docs/introduction" + hash
}

export function toV1Path(pathname: string, hash = ""): string {
  if (!pathname.startsWith(V2_DOCS_PREFIX)) {
    return pathname + hash
  }
  const mapped = EXACT_V1_MAP[pathname]
  if (mapped) return mapped + hash
  const suffix = pathname.slice(V2_DOCS_PREFIX.length)
  if (suffix.startsWith("/router/")) {
    return "/docs/api/file-router" + hash
  }
  return V1_DOCS_PREFIX + suffix + hash
}

export function navigateDocsVersion(
  target: DocsVersion,
  pathname: string,
  hash: string
): string {
  return target === "v2" ? toV2Path(pathname, hash) : toV1Path(pathname, hash)
}
