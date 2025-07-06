import type { FilesMap } from "@codesandbox/nodebox"

const files = import.meta.glob("./files/**/*", { eager: true, query: "?raw" })

export const FILES_MAP: FilesMap = Object.fromEntries(
  Object.entries(files).map(([key, value]) => [
    key.replace("./files/", ""),
    (value as { default: string }).default,
  ])
)
console.log({ FILES_MAP })
