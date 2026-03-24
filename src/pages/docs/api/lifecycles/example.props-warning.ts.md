```tsx
// ❌ Wrong - props will be stale
const { props } = setup<AccordionTriggerProps>()

const handleClick = (e: Kiru.MouseEvent<HTMLButtonElement>) => {
  // props.onclick was captured during setup and will never update
  props.onclick?.(e)
}

// ✅ Correct - always access via $.props
const $ = setup<AccordionTriggerProps>()

const handleClick = (e: Kiru.MouseEvent<HTMLButtonElement>) => {
  // $.props.onclick is always the latest value
  $.props.onclick?.(e)
}
```
