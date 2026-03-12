import { loadFileMap } from "$/utils"
import { RawViteImportMap } from "../../../../../types"

const files_basic_map = import.meta.glob("./*.{tsx,ts}", {
  base: "./files-basic",
  query: "?raw",
}) as any as RawViteImportMap
const files_resource_map = import.meta.glob("./*.{tsx,ts}", {
  base: "./files-resource",
  query: "?raw",
}) as any as RawViteImportMap

export const files_basic = await loadFileMap(files_basic_map)
export const files_resource = await loadFileMap(files_resource_map)
