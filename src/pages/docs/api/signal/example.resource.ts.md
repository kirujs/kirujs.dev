```tsx
import { signal, computed, resource, Derive } from "kiru"

interface User {
  id: number
  firstName: string
  lastName: string
}

const search = signal("")

// able to be created globally _or_ within components
const users = resource(search, async (search, { signal }) => {
  const res = await fetch(`https://dummyjson.com/users/search?q=${search}`, {
    signal,
  })
  return res.json() as Promise<{ users: User[] }>
})

export default function HomePage() {
  return (
    <>
      <input placeholder="search" bind:value={search} />
      <button onclick={() => users.refetch()}>Refetch</button>
      <Derive from={users} fallback={<div>Loading...</div>}>
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
