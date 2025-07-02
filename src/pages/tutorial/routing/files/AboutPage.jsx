import { useRouter, navigate } from "kaioken/router"

export function AboutPage() {
  const router = useRouter()
  
  return (
    <div style={{ padding: "20px" }}>
      <h1>📋 About Us</h1>
      <p>Learn more about our amazing application!</p>
      <p>Current route: <code>{router.pathname}</code></p>
      <button 
        onclick={() => navigate("/")}
        style={{ marginTop: "10px", padding: "8px 16px" }}
      >
        Go Home
      </button>
    </div>
  )
} 