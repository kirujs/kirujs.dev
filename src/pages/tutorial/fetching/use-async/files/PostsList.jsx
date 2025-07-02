import { LoadingSpinner } from "./LoadingSpinner"

export function PostsList({ posts, loading, error, onRefresh }) {
  if (error) {
    return (
      <div style={{ 
        textAlign: "center", 
        padding: "20px",
        color: "#dc3545",
        backgroundColor: "#f8d7da"
      }}>
        <p>Error loading posts: {error.message}</p>
        <button onclick={onRefresh}>Retry</button>
      </div>
    )
  }
  
  return (
    <div style={{
      backgroundColor: "white",
      borderRadius: "12px",
      border: "1px solid #e0e0e0",
      overflow: "hidden"
    }}>
      <div style={{
        padding: "20px",
        borderBottom: "1px solid #e0e0e0",
        backgroundColor: "#fafafa",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h2 style={{ margin: 0 }}>Recent Posts</h2>
        <button 
          onclick={onRefresh}
          disabled={loading}
          style={{
            padding: "8px 16px",
            backgroundColor: loading ? "#ccc" : "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "🔄 Loading..." : "🔄 Refresh Posts"}
        </button>
      </div>
      
      {loading && (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <LoadingSpinner size="30px" color="#28a745" />
          <p style={{ marginTop: "15px" }}>Loading posts...</p>
        </div>
      )}
      
      {posts && posts.map(post => (
        <div key={post.id} style={{
          padding: "20px",
          borderBottom: "1px solid #f0f0f0"
        }}>
          <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>{post.title}</h3>
          <p style={{ margin: "0 0 15px 0", color: "#666", lineHeight: "1.5" }}>{post.content}</p>
          <div style={{ 
            display: "flex", 
            gap: "20px", 
            fontSize: "14px", 
            color: "#888" 
          }}>
            <span>❤️ {post.likes} likes</span>
            <span>💬 {post.comments} comments</span>
            <span>📅 {post.createdAt}</span>
          </div>
        </div>
      ))}
    </div>
  )
} 