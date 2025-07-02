import { PostsList } from "./PostsList"
import { UsersList } from "./UsersList"  
import { CommentsList } from "./CommentsList"
import { CacheInspector } from "./CacheInspector"

export function App() {
  return (
    <div style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh"
    }}>
      <div style={{
        textAlign: "center",
        marginBottom: "40px",
        padding: "30px",
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{
          margin: "0 0 15px 0",
          fontSize: "2.5rem",
          background: "linear-gradient(135deg, #007bff, #17a2b8)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          🌐 useSWR Demo
        </h1>
        <p style={{
          margin: "0",
          fontSize: "1.1rem",
          color: "#666",
          lineHeight: "1.6"
        }}>
          Explore data fetching with caching, revalidation, and real-time updates.
          Watch how SWR automatically manages cache and keeps your data fresh!
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "30px",
        marginBottom: "30px"
      }}>
        <div style={{
          padding: "25px",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}>
          <PostsList />
        </div>
        
        <div style={{
          padding: "25px",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}>
          <UsersList />
        </div>
      </div>

      <div style={{
        padding: "25px",
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        marginBottom: "30px"
      }}>
        <CommentsList />
      </div>

      <CacheInspector />

      <div style={{
        textAlign: "center",
        marginTop: "40px",
        padding: "20px",
        backgroundColor: "#e9ecef",
        borderRadius: "8px"
      }}>
        <p style={{ margin: "0", color: "#6c757d" }}>
          💡 <strong>Try this:</strong> Open your browser's developer tools and watch the console 
          to see when actual network requests are made vs. when data is served from cache!
        </p>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
} 