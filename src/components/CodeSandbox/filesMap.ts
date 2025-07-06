import { mapViteFilesGlob } from "$/utils"
import type { FilesMap } from "@codesandbox/nodebox"

const files = import.meta.glob("./files/**/*", { eager: true, query: "?raw" })
export const FILES_MAP: FilesMap = mapViteFilesGlob(files)
console.log({ FILES_MAP })
