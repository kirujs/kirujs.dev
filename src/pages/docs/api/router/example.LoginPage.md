```jsx
import { navigate } from "kaioken/router"

export function LoginPage() {
  const user = useUser() // some custom hook that gets auth state
  if (user) {
    return navigate("/")
  }

  return <LoginForm />
}
```
