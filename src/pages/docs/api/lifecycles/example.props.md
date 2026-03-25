```jsx
const MyButton = () => {
  const $ = setup()

  const handleClick = (e) => {
    // $.props always provides the latest prop values via a Proxy
    $.props.onclick?.(e)
  }

  return () => <button onclick={handleClick}>Toggle</button>
}
```
