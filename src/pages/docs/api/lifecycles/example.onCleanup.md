```jsx
import { signal, onCleanup } from "kiru"

function MouseTracker() {
  const x = signal(0),
    y = signal(0)

  const handler = (e) => {
    x.value = e.clientX
    y.value = e.clientY
  }

  window.addEventListener("mousemove", handler)
  onCleanup(() => window.removeEventListener("mousemove", handler))

  return () => (
    <div>
      x: {x}, y: {y}
    </div>
  )
}
```
