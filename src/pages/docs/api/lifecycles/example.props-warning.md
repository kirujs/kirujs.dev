```jsx
// ❌ Wrong - 'onclick' will be stale
const { props } = setup()
const { onclick } = props

const handleClick = (e) => {
  // onclick was captured during setup and will never update
  onclick?.(e)
}

// ✅ Correct - always access via 'props'
const { props } = setup()

const handleClick = (e) => {
  // props.onclick is always the latest value
  props.onclick?.(e)
}
```
