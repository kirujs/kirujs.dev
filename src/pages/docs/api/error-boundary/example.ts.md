```tsx
import { ErrorBoundary } from "kiru"

function ComponentThatThrows() {
  throw new Error("ComponentThatThrows")
  return null
}

function App() {
  return (
    <div>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <ComponentThatThrows />
      </ErrorBoundary>
      <ErrorBoundary
        onError={(e) => console.error(e)}
        fallback={(error) => <div>Something went wrong: {error.message}</div>}
      >
        <ComponentThatThrows />
      </ErrorBoundary>
    </div>
  )
}
```

