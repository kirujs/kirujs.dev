export function mapFiles(fileMap: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(fileMap).map(([path, file]) => [
      path.replace("./files/", ""),
      file,
    ])
  )
}
