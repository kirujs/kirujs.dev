```tsx
import { signal, computed, resource, Derive } from "kiru"

interface User {
  id: number
  firstName: string
  lastName: string
}

const search = signal("")
const limit = signal(10)

// With a single source signal
// Auto-tracking is still active - any other signals observed synchronously
// will also trigger refetches
const users = resource(search, async (search, { signal }) => {
  const res = await fetch(`https://dummyjson.com/users/search?q=${search}`, {
    signal,
  })
  return res.json() as Promise<{ users: User[] }>
})

// With multiple source signals
const usersWithLimit = resource({ search, limit }, async (src, { signal }) => {
  const res = await fetch(
    `https://dummyjson.com/users/search?q=${src.search}&limit=${src.limit}`,
    { signal }
  )
  return res.json() as Promise<{ users: User[] }>
})

// Without a source - relies entirely on auto-tracking
const usersAutoTracked = resource(async ({ signal }) => {
  // Signals observed synchronously (before any await) are automatically tracked
  const res = await fetch(
    `https://dummyjson.com/users/search?q=${search}&limit=${limit}`,
    { signal }
  )
  return res.json() as Promise<{ users: User[] }>
})

function App() {
  return (
    <>
      <input placeholder="search" bind:value={search} />
      <input type="number" bind:value={limit} />
      <button onclick={() => usersWithLimit.refetch()}>Refetch</button>
      <Derive from={usersWithLimit} fallback={<div>Loading...</div>}>
        {(data, isStale) => (
          <div style={{ opacity: isStale ? 0.5 : 1 }}>
            <ul>
              {data.users.map((user) => (
                <li key={user.id}>
                  {user.firstName} {user.lastName}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Derive>
    </>
  )
}
```
