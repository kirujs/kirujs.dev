```jsx
const Field = () => {
  const { id } = setup()

  return () => (
    <>
      <label htmlFor={id}>Name</label>
      <input id={id} type="text" />
    </>
  )
}
```
