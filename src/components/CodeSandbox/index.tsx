import { ErrorBoundary, lazy } from "kiru"
import type { SandboxProps } from "./Sandbox"
import { loadESBuild, loadingProgress } from "./esbuild"

const LazyCodeSandbox = lazy(async () => {
  await loadESBuild()
  await new Promise((r) => setTimeout(r, 150)) // artificial delay to make sure we actually render '100%'
  return import("./Sandbox")
})

const LoadingFallback = () => {
  return (
    <div className="min-h-[300px] flex flex-col items-center justify-center gap-3 bg-black/30 text-neutral-300 backdrop-blur-md">
      <small className="font-mono">Loading sandbox...</small>
      <div className="w-48 h-1.5 bg-neutral-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary/75 transition-all duration-300 ease-out"
          style={{ width: `${loadingProgress}%` }}
        />
      </div>
      <small className="font-mono text-xs text-neutral-400">
        {loadingProgress}%
      </small>
    </div>
  )
}

export const CodeSandbox: Kiru.FC<SandboxProps> = (props) => {
  return (
    <ErrorBoundary
      fallback={(e) => <span className="text-red-500">{e.message}</span>}
    >
      <LazyCodeSandbox fallback={<LoadingFallback />} {...props} />
    </ErrorBoundary>
  )
}
