```jsx
import { signal, ViewTransitions } from "kiru"

const Counter = () => {
  const count = signal(0)

  const increment = () => {
    ViewTransitions.run(() => {
      count.value++
    })
  }

  return () => (
    <div>
      <button onclick={increment}>Increment</button>
      <p style={{ viewTransitionName: "count" }}>Count: {count}</p>
    </div>
  )
}
```
