import { useSWR } from "kaioken/swr"
import { fetcher, cache } from "./api"
import { LoadingSpinner } from "./LoadingSpinner"

export function PostsList() {
  const { data: posts, error, isLoading, mutate } = useSWR('/posts', fetcher)
  
  const refreshPosts = () => {
    cache.delete('/posts')
    mutate()
  }
  
  if (error) {
    return (
      <div style={{ 
        padding: "20px", 
        backgroundColor: "#f8d7da", 
        border: "1px solid #f5c6cb",
        borderRadius: "8px",
        color: "#721c24"
      }}>
        <h3>❌ Error Loading Posts</h3>
        <p>{error.message}</p>
        <button onclick={refreshPosts} style={{ padding: "8px 16px" }}>
          Retry
        </button>
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
        <h2 style={{ margin: 0 }}>📝 Posts {isLoading && "(Loading...)"}</h2>
        <button 
          onclick={refreshPosts}
          disabled={isLoading}
          style={{
            padding: "8px 16px",
            backgroundColor: isLoading ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isLoading ? "not-allowed" : "pointer"
          }}
        >
          🔄 Refresh
        </button>
      </div>
      
      {!posts && isLoading ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <LoadingSpinner />
          <p>Loading posts...</p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "15px" }}>
          {posts?.slice(0, 5).map(post => (
            <div key={post.id} style={{
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #e0e0e0",
              opacity: isLoading ? 0.7 : 1,
              transition: "opacity 0.3s"
            }}>
              <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>{post.title}</h3>
              <p style={{ margin: "0", color: "#666", lineHeight: "1.5" }}>{post.body}</p>
              <div style={{ marginTop: "10px", fontSize: "12px", color: "#888" }}>
                Post #{post.id} • User #{post.userId}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 