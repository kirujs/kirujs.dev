```tsx
import { signal } from "kiru"

function App() {
  const buttonSignal = signal<HTMLButtonElement | null>(null)

  buttonSignal.subscribe((elementOrNull) => {
    if (elementOrNull) console.log("ref attached")
  })

  return () => <button ref={buttonSignal}>Click Me</button>
}
```
