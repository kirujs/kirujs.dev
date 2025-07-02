import { navigate } from "kaioken/router"

export function HomePage() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>🏠 Home</h2>
      <p>Welcome to the routing demo!</p>
      <button onclick={() => navigate('/about')}>
        Go to About (programmatic navigation)
      </button>
    </div>
  )
} 