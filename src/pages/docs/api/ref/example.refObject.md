```jsx
import { onMount, ref } from "kiru"

function App() {
  const buttonRefObject = ref(null)

  onMount(() => {
    if (buttonRefObject.current) console.log("ref attached")
  })

  return () => <button ref={buttonRefObject}>Click Me</button>
}
```
