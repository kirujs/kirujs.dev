```jsx
import { signal, onMount } from "kiru"

function Timer() {
  const seconds = signal(0)

  onMount(() => {
    const interval = setInterval(() => {
      seconds.value++
    }, 1000)

    return () => clearInterval(interval)
  })

  return () => <div>Elapsed: {seconds}s</div>
}
```
