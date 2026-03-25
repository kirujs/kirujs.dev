```tsx
interface MyButtonProps {
  onclick?: (e: Kiru.MouseEvent<HTMLButtonElement>) => void
}

const MyButton: Kiru.FC<MyButtonProps> = () => {
  const $ = setup<MyButtonProps>()

  const handleClick = (e: Kiru.MouseEvent<HTMLButtonElement>) => {
    // $.props always provides the latest prop values via a Proxy
    $.props.onclick?.(e)
  }

  return () => <button onclick={handleClick}>Toggle</button>
}
```
