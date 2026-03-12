export type CodePreviewData = {
  element: () => JSX.Element
  link: {
    href: string
    text: string
  }
}

export type RawViteImportMap = Record<
  string,
  () => Promise<{ default: string }>
>
