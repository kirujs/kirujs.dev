```jsx
import { signal, resource, Derive } from "kiru"

function Page() {
  const search = signal("")
  const data = resource(search, async (search, { signal }) => {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${search}`,
      { signal }
    )
    if (!response.ok) throw new Error(response.statusText)
    return await response.json()
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
