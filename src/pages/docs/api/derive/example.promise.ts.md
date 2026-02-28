```tsx
import { signal, statefulPromise, Derive } from "kiru"

type ProductsResponse = {
  products: Array<{
    id: number
    title: string
  }>
}

function Page() {
  const count = signal(0)
  const data = statefulPromise<ProductsResponse>(async (signal) => {
    const response = await fetch("https://dummyjson.com/products", { signal })
    if (!response.ok) throw new Error(response.statusText)
    return await response.json()
  })

  return () => (
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
