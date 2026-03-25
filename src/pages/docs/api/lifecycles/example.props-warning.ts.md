```tsx
// ❌ Wrong - 'onclick' will be stale
const { props } = setup<MyButtonProps>()
const { onclick } = props

const handleClick = (e: Kiru.MouseEvent<HTMLButtonElement>) => {
  // onclick was captured during setup and will never update
  onclick?.(e)
}

// ✅ Correct - always access via 'props'
const { props } = setup<MyButtonProps>()

const handleClick = (e: Kiru.MouseEvent<HTMLButtonElement>) => {
  // props.onclick is always the latest value
  props.onclick?.(e)
}
```
