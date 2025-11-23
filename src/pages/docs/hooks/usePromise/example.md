```jsx
import { usePromise, Derive } from "kiru"

function Page() {
  const products = usePromise(async (signal) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const response = await fetch("https://dummyjson.com/products", { signal })
    if (!response.ok) throw new Error(response.statusText)
    return await response.json()
  }, [])

  return (
    <Derive from={products} fallback={<div>Loading...</div>}>
      {(data, isStale) => (
        <ul className={isStale ? "opacity-50" : ""}>
          {data.products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      )}
    </Derive>
  )
}
```
