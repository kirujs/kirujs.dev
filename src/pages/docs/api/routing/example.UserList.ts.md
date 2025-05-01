```jsx
import { Link, useRouter } from "kaioken/router"
import { useAsync } from "kaioken"

type UsersResponse = {
  users: User[]
}

export function UserList() {
  const { query, setQuery } = useRouter()
  const { data, loading, error } = useAsync<UsersResponse>(async () => {
    return await fetch(
      `https://dummyjson.com/users/search?select=image&q=${query.q || ""}`
    ).then((res) => res.json())
  }, [query.q])

  return (
    <div>
      <input
        type="text"
        value={query.q || ""}
        onchange={(e) => setQuery({ q: e.target.value })}
      />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        <ul>
          {data.users.map((user) => (
            <li key={user.id}>
              <Link to={`/users/${user.id}`}>
                <img src={user.image} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
```
