```jsx
import { Link, useFileRouter } from "kiru/router"

export default function RootLayout({ children }: { children: JSX.Children }) {
  const { state } = useFileRouter()
  const pathname = state.pathname.value

  return (
    <>
      <nav>
        <Link to="/" className={pathname === "/" ? "active" : ""}>
          Home
        </Link>
        <Link to="/users" className={pathname === "/users" ? "active" : ""}>
          Users
        </Link>
      </nav>
      <main>{children}</main>
    </>
  )
}
```
