```jsx
import { useRouter } from "kaioken/router"

export function UserPage() {
  const { params } = useRouter()

  /**
   * the ":userId" part of the Route path is parsed from the URL
   * and made accessible via useRouter()
   */
  return <h1>User: {params.userId}</h1>
}
```
