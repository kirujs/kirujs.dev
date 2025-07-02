import { useSWR } from "kaioken/swr"
import { fetcher, cache } from "./api"
import { LoadingSpinner } from "./LoadingSpinner"

export function UsersList() {
  const { data: users, error, isLoading, mutate } = useSWR('/users', fetcher)
  
  const refreshUsers = () => {
    cache.delete('/users')
    mutate()
  }
  
  if (error) {
    return (
      <div style={{ 
        padding: "20px", 
        backgroundColor: "#f8d7da", 
        borderRadius: "8px" 
      }}>
        <p>Error loading users: {error.message}</p>
      </div>
    )
  }
  
  return (
    <div style={{ marginBottom: "30px" }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "20px"
      }}>
        <h2 style={{ margin: 0 }}>👥 Users {isLoading && "(Loading...)"}</h2>
        <button 
          onclick={refreshUsers}
          disabled={isLoading}
          style={{
            padding: "8px 16px",
            backgroundColor: isLoading ? "#ccc" : "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isLoading ? "not-allowed" : "pointer"
          }}
        >
          🔄 Refresh
        </button>
      </div>
      
      {!users && isLoading ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <LoadingSpinner color="#28a745" />
          <p>Loading users...</p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "15px" }}>
          {users?.map(user => (
            <div key={user.id} style={{
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #e0e0e0",
              opacity: isLoading ? 0.7 : 1,
              transition: "opacity 0.3s"
            }}>
              <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>{user.name}</h3>
              <div style={{ color: "#666" }}>
                <p style={{ margin: "5px 0" }}>@{user.username}</p>
                <p style={{ margin: "5px 0" }}>📧 {user.email}</p>
                <p style={{ margin: "5px 0" }}>🌐 {user.website}</p>
                <p style={{ margin: "5px 0" }}>🏢 {user.company.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 