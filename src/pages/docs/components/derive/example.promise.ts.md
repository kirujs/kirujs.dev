```tsx
import { signal, resource, Derive } from "kiru"

type ProductsResponse = {
  products: Array<{
    id: number
    title: string
  }>
}

function Page() {
  const search = signal("")

  // Without a source - relies entirely on auto-tracking
  const data = resource(async ({ signal }) => {
    // search is observed synchronously (before await) and will trigger refetches
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${search}`,
      { signal }
    )
    if (!response.ok) throw new Error(response.statusText)
    return response.json() as Promise<ProductsResponse>
  })

  return () => (
    <>
      <input bind:value={search} />
      <Derive from={data} fallback={<div>Loading...</div>}>
        {(data, isStale) => (
          <div className={isStale ? "opacity-50" : ""}>
            <ul>
              {data.products.map((product) => (
                <li key={product.id}>{product.title}</li>
              ))}
            </ul>
          </div>
        )}
      </Derive>
    </>
  )
}
```
