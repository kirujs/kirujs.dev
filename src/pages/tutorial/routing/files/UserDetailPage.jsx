import { useRouter, navigate, Link } from "kaioken/router"
import { users } from "./data"

export function UserDetailPage() {
  const router = useRouter()
  const userId = parseInt(router.params.id)
  const user = users.find(u => u.id === userId)
  
  if (!user) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>❌ User Not Found</h1>
        <p>No user found with ID: {userId}</p>
        <Link to="/users" className="nav-button">Back to Users</Link>
      </div>
    )
  }
  
  return (
    <div style={{ padding: "20px" }}>
      <h1>👤 User Profile</h1>
      <div style={{ 
        padding: "20px", 
        border: "2px solid #007bff", 
        borderRadius: "12px",
        marginTop: "20px"
      }}>
        <h2>{user.name}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>User ID:</strong> {user.id}</p>
      </div>
      
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <Link to="/users" className="nav-button">← Back to Users</Link>
        <button 
          onclick={() => navigate(`/users/${userId === 3 ? 1 : userId + 1}`)}
          style={{ padding: "8px 16px" }}
        >
          Next User →
        </button>
      </div>
    </div>
  )
} 