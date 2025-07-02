import { useAsync } from "kaioken"
import { fetchUser } from "./api"

export function UserProfile({ userId }) {
  const { data: user, error, isLoading, refetch } = useAsync(
    () => fetchUser(userId), 
    [userId]
  )

  if (isLoading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <div>Loading user...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ 
        padding: "20px", 
        backgroundColor: "#f8d7da", 
        borderRadius: "4px",
        border: "1px solid #f5c6cb"
      }}>
        <h3>❌ Error</h3>
        <p>{error.message}</p>
        <button onclick={refetch} style={{ padding: "8px 16px" }}>
          Try Again
        </button>
      </div>
    )
  }

  if (!user) return null

  return (
    <div style={{ 
      padding: "20px", 
      backgroundColor: "#f8f9fa", 
      borderRadius: "8px",
      border: "1px solid #ddd"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
        <h2>👤 User Profile</h2>
        <button onclick={refetch} style={{ padding: "8px 16px" }}>
          🔄 Refresh
        </button>
      </div>
      
      <div>
        <h3>{user.name}</h3>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Company:</strong> {user.company}</p>
      </div>
    </div>
  )
} 