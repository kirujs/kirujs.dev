```jsx
const AccordionTrigger = () => {
  const $ = setup()

  const handleClick = (e) => {
    // $.props always provides the latest prop values via a 'getter'
    $.props.onclick?.(e)
  }

  return () => <button onclick={handleClick}>Toggle</button>
}
```
