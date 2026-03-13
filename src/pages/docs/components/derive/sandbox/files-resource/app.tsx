import { signal, resource, Derive } from "kiru"

interface Product {
  id: number
  title: string
}

export function App() {
  const search = signal("")
  const data = resource(search, async (search, { signal }) => {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${search}`,
      { signal }
    )
    if (!response.ok) throw new Error(response.statusText)
    return response.json() as Promise<{ products: Product[] }>
  })

  return () => (
    <>
      <input bind:value={search} />
      <Derive from={data} fallback={<div>Loading...</div>}>
        {(data, isStale) => (
          <div style={{ opacity: isStale ? 0.5 : 1 }}>
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
