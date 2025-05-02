import { useAsync } from "kaioken"

async function* runTasks(
  getIsCancelled: () => boolean,
  ...steps: Array<() => void | Promise<void>>
) {
  for (const step of steps) {
    if (getIsCancelled()) return
    yield await step()
  }
}

async function createTaskRunner(
  getIsCancelled: () => boolean,
  ...steps: Array<() => void | Promise<void>>
) {
  for await (const _ of runTasks(getIsCancelled, ...steps)) {
  }
}

export function useTaskRunner(
  tasksFactory: (
    abortSignal: AbortController["signal"]
  ) => Array<() => void | Promise<void>>,
  deps: unknown[]
) {
  return useAsync(async ({ abortSignal }) => {
    let aborted = false
    abortSignal.addEventListener("abort", () => (aborted = true))
    return createTaskRunner(() => aborted, ...tasksFactory(abortSignal))
  }, deps)
}
