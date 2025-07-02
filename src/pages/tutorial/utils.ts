export function mapFiles(fileMap: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(fileMap).map(([path, file]) => [
      path.replace("./files/", ""),
      (file as { default: string }).default,
    ])
  )
}
