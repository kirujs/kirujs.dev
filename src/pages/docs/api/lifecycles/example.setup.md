```tsx
const Counter = () => {
  const { derive } = setup()

  const count = derive((props) => props.initialCount ?? 0)
  // When the "initialCount" prop changes, count is updated.

  return () => (
    <>
      <p>Count: {count}</p>
      <button onclick={() => count.value++}>Increment</button>
      <button onclick={() => count.value--}>Decrement</button>
    </>
  )
}
```
