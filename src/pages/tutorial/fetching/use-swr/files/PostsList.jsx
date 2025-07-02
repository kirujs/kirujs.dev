import { useSWR } from "kaioken/swr"
import { fetcher } from "./api"

export function PostsList() {
  const { data: posts, error, isLoading } = useSWR('/posts', fetcher)
  
  if (error) return <div>Error loading posts: {error.message}</div>
  if (isLoading) return <div>Loading posts...</div>
  
  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>📝 Posts</h2>
      {posts?.slice(0, 3).map(post => (
        <div key={post.id} style={{
          padding: "15px",
          backgroundColor: "#f8f9fa",
          marginBottom: "10px",
          borderRadius: "4px"
        }}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
} 