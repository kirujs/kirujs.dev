import { useAsync } from "kaioken"
import { fetchUser, fetchPosts } from "./api"
import { LoadingSpinner } from "./LoadingSpinner"
import { UserStats } from "./UserStats"
import { PostsList } from "./PostsList"

export function UserProfile({ userId }) {
  const { 
    data: user, 
    loading: userLoading, 
    error: userError, 
    invalidate: invalidateUser 
  } = useAsync(() => fetchUser(userId), [userId])
  
  const { 
    data: posts, 
    loading: postsLoading, 
    error: postsError,
    invalidate: invalidatePosts 
  } = useAsync(() => fetchPosts(userId), [userId])
  
  if (userLoading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <LoadingSpinner />
        <p style={{ marginTop: "20px" }}>Loading user profile...</p>
      </div>
    )
  }
  
  if (userError) {
    return (
      <div style={{ 
        textAlign: "center", 
        padding: "40px",
        color: "#dc3545",
        backgroundColor: "#f8d7da",
        border: "1px solid #f5c6cb",
        borderRadius: "8px",
        margin: "20px"
      }}>
        <h2>❌ Error Loading Profile</h2>
        <p>{userError.message}</p>
        <button 
          onclick={invalidateUser}
          style={{
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Retry
        </button>
      </div>
    )
  }
  
  if (!user) return null
  
  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      {/* User Header */}
      <div style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        backgroundColor: "#f8f9fa",
        borderRadius: "12px",
        marginBottom: "20px",
        alignItems: "center"
      }}>
        <img 
          src={user.avatar} 
          alt={user.name}
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            border: "3px solid #007bff"
          }}
        />
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: "0 0 10px 0", color: "#333" }}>{user.name}</h1>
          <p style={{ margin: "0 0 10px 0", color: "#666" }}>{user.email}</p>
          <p style={{ margin: "0", color: "#888", fontStyle: "italic" }}>{user.bio}</p>
        </div>
        <button 
          onclick={invalidateUser}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          🔄 Refresh Profile
        </button>
      </div>
      
      <UserStats user={user} />
      <PostsList 
        posts={posts} 
        loading={postsLoading} 
        error={postsError} 
        onRefresh={invalidatePosts} 
      />
    </div>
  )
} 