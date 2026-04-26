```jsx
function App() {
  const buttonRefCallback = (el) => {
    if (el) console.log("ref attached")
  }

  return () => <button ref={buttonRefCallback}>Click Me</button>
}
```
