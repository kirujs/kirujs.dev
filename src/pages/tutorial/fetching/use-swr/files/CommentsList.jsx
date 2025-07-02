import { useState } from "kaioken"
import { useSWR } from "kaioken/swr"
import { fetcher, cache } from "./api"
import { LoadingSpinner } from "./LoadingSpinner"

export function CommentsList() {
  const [showComments, setShowComments] = useState(false)
  
  // Conditional fetching - only fetch when showComments is true
  const { data: comments, error, isLoading, mutate } = useSWR(
    showComments ? '/comments' : null, 
    fetcher
  )
  
  const refreshComments = () => {
    cache.delete('/comments')
    mutate()
  }
  
  const toggleComments = () => {
    setShowComments(!showComments)
  }
  
  return (
    <div style={{ marginBottom: "30px" }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "20px"
      }}>
        <h2 style={{ margin: 0 }}>💬 Comments {isLoading && "(Loading...)"}</h2>
        <div>
          <button 
            onclick={toggleComments}
            style={{
              padding: "8px 16px",
              backgroundColor: showComments ? "#dc3545" : "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              marginRight: "10px"
            }}
          >
            {showComments ? "Hide" : "Show"} Comments
          </button>
          {showComments && (
            <button 
              onclick={refreshComments}
              disabled={isLoading}
              style={{
                padding: "8px 16px",
                backgroundColor: isLoading ? "#ccc" : "#17a2b8",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: isLoading ? "not-allowed" : "pointer"
              }}
            >
              🔄 Refresh
            </button>
          )}
        </div>
      </div>
      
      {showComments && (
        <div>
          {error ? (
            <div style={{ 
              padding: "20px", 
              backgroundColor: "#f8d7da", 
              borderRadius: "8px" 
            }}>
              <p>Error loading comments: {error.message}</p>
            </div>
          ) : !comments && isLoading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <LoadingSpinner color="#17a2b8" />
              <p>Loading comments...</p>
            </div>
          ) : (
            <div style={{ display: "grid", gap: "10px" }}>
              {comments?.slice(0, 10).map(comment => (
                <div key={comment.id} style={{
                  padding: "15px",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                  borderLeft: "4px solid #17a2b8",
                  opacity: isLoading ? 0.7 : 1,
                  transition: "opacity 0.3s"
                }}>
                  <div style={{ fontWeight: "bold", marginBottom: "5px", color: "#333" }}>
                    {comment.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>
                    {comment.email} • Post #{comment.postId}
                  </div>
                  <p style={{ margin: "0", color: "#666", lineHeight: "1.4" }}>
                    {comment.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
} 