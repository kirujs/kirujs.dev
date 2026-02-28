```jsx
import { signal, onBeforeMount } from "kiru"

function Modal() {
  onBeforeMount(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = prev
    }
  })

  return () => <div className="modal">...</div>
}
```
