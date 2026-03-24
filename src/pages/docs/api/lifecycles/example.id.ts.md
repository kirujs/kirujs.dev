```tsx
const Field: Kiru.FC = () => {
  const { id } = setup()

  return () => (
    <>
      <label htmlFor={id}>Name</label>
      <input id={id} type="text" />
    </>
  )
}
```
