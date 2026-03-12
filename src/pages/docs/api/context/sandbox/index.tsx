import { loadFileMap } from "$/utils"
import { RawViteImportMap } from "../../../../../types"

const fileMap = import.meta.glob("./*.{tsx,ts}", {
  base: "./files",
  query: "?raw",
}) as any as RawViteImportMap

export const files = await loadFileMap(fileMap)
