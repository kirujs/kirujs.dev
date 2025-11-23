```jsx
import { useSignal, usePromise, Derive } from "kiru"

function Page() {
  const count = useSignal(0)
  const data = usePromise(async (signal) => {
    const response = await fetch("https://dummyjson.com/products", { signal })
    if (!response.ok) throw new Error(response.statusText)
    return await response.json()
  }, [])

  return (
    <Derive from={{ data, count }} fallback={<div>Loading...</div>}>
      {({ data, count }, isStale) => (
        <div className={isStale ? "opacity-50" : ""}>
          <p>Count: {count}</p>
          <ul>
            {data.products.map((product) => (
              <li key={product.id}>{product.title}</li>
            ))}
          </ul>
        </div>
      )}
    </Derive>
  )
}
```
