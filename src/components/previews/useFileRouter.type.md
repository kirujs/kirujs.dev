```ts
() => {
  state: {
    path: string
    params: Record<string, string>
    query: Record<string, string>
    signal: AbortSignal
  }
  navigate: (path: string, options?: { replace?: boolean; transition?: boolean }) => void
  reload: (options?: { transition?: boolean }) => void
}
```
