import { useSWR } from "kaioken/swr"
import { fetcher } from "./api"

export function UsersList() {
  const { data: users, error, isLoading } = useSWR('/users', fetcher)
  
  if (error) return <div>Error loading users: {error.message}</div>
  if (isLoading) return <div>Loading users...</div>
  
  return (
    <div>
      <h2>👥 Users</h2>
      {users?.map(user => (
        <div key={user.id} style={{
          padding: "15px",
          backgroundColor: "#f8f9fa",
          marginBottom: "10px",
          borderRadius: "4px"
        }}>
          <h4>{user.name}</h4>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  )
} 