```tsx
// ❌ Wrong - props will be stale
const { props } = setup()

const handleClick = (e) => {
  // props.onclick was captured during setup and will never update
  props.onclick?.(e)
}

// ✅ Correct - always access via $.props
const $ = setup()

const handleClick = (e) => {
  // $.props.onclick is always the latest value
  $.props.onclick?.(e)
}
```
