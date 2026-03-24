```tsx
interface AccordionTriggerProps {
  onclick?: (e: Kiru.MouseEvent<HTMLButtonElement>) => void
}

const AccordionTrigger: Kiru.FC<AccordionTriggerProps> = () => {
  const $ = setup<AccordionTriggerProps>()

  const handleClick = (e: Kiru.MouseEvent<HTMLButtonElement>) => {
    // $.props always provides the latest prop values via a 'getter'
    $.props.onclick?.(e)
  }

  return () => <button onclick={handleClick}>Toggle</button>
}
```
