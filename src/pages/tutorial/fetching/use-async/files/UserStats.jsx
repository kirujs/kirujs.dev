export function UserStats({ user }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "15px",
      marginBottom: "20px"
    }}>
      <div style={{ textAlign: "center", padding: "15px", backgroundColor: "#e3f2fd", borderRadius: "8px" }}>
        <h3 style={{ margin: "0 0 5px 0", color: "#1976d2" }}>{user.posts}</h3>
        <p style={{ margin: 0, color: "#666" }}>Posts</p>
      </div>
      <div style={{ textAlign: "center", padding: "15px", backgroundColor: "#e8f5e8", borderRadius: "8px" }}>
        <h3 style={{ margin: "0 0 5px 0", color: "#388e3c" }}>{user.followers}</h3>
        <p style={{ margin: 0, color: "#666" }}>Followers</p>
      </div>
      <div style={{ textAlign: "center", padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
        <h3 style={{ margin: "0 0 5px 0", color: "#f57c00" }}>{user.following}</h3>
        <p style={{ margin: 0, color: "#666" }}>Following</p>
      </div>
    </div>
  )
} 