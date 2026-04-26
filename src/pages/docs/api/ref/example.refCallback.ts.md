```tsx
function App() {
  const buttonRefCallback: Kiru.RefCallback<HTMLButtonElement | null> = (el) => {
    if (el) console.log("ref attached")
  }

  return () => <button ref={buttonRefCallback}>Click Me</button>
}
```
