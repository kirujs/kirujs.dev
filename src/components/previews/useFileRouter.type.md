```ts
() => {
  state: {
    pathname: Kiru.Signal<string>
    hash: Kiru.Signal<string>
    params: Kiru.Signal<Record<string, string>>
    query: Kiru.Signal<Record<string, string>>
    signal: AbortSignal
  }
  navigate: (path: string, options?: { replace?: boolean; transition?: boolean }) => void
  prefetchRouteModules: (path: string) => void
  reload: (options?: { transition?: boolean }) => void
  invalidate: (...paths: string[]) => void
}
```
