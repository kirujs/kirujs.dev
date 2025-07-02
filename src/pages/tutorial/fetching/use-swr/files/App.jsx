import { PostsList } from "./PostsList"
import { UsersList } from "./UsersList"

export function App() {
  return (
    <div style={{
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1>🌐 useSWR Demo</h1>
      <p>Data fetching with caching and automatic revalidation</p>
      
      <PostsList />
      <UsersList />
    </div>
  )
} 