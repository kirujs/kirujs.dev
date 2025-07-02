```jsx
import { Router, Route, Link } from "kaioken/router"
import { LoginPage } from "./LoginPage"
import { UserList } from "./UserList"
import { UserPage } from "./UserPage"

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/users">Users</Link>
      </nav>
      <Router>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:userId" element={<UserPage />} />
      </Router>
    </>
  )
}
```
