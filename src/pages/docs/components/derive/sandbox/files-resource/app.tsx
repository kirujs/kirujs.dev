import { signal, resource, Derive, computed } from "kiru"

interface Product {
  id: number
  title: string
}

export function App() {
  const search = signal("")
  const limit = signal("10")
  const params = computed(() => ({ search: search.value, limit: limit.value }))
  const data = resource(params, async (params, { signal }) => {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${params.search}&limit=${params.limit}`,
      { signal }
    )
    if (!response.ok) throw new Error(response.statusText)
    return response.json() as Promise<{ products: Product[] }>
  })

  return () => (
    <>
      <div style="display: flex; gap: 1rem">
        <input bind:value={search} />
        <select bind:value={limit}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>
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
