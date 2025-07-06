import { PostsList } from "./PostsList"
import { UsersList } from "./UsersList"

export function App() {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>🌐 Blog App</h1>
      <p>A simple blog app with posts and users</p>

      <div style={{ marginBottom: "30px" }}>
        <h2>📝 Recent Posts</h2>
        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <p>Posts will be loaded here...</p>
        </div>
      </div>

      <div>
        <h2>👥 Users</h2>
        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <p>Users will be loaded here...</p>
        </div>
      </div>
    </div>
  )
}
