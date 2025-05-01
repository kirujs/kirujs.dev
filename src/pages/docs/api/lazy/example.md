### Example

```jsx
import { lazy } from "kaioken"

const DefaultExportedLazyComponent = lazy(() => import("./MyComponent"))
const NamedExportedLazyComponent = lazy(() =>
  import("./MyComponent").then((module) => module.MyComponent)
)

const App = () => (
  <div>
    <DefaultExportedLazyComponent fallback={<div>Loading...</div>} />
    <LazyNamedComponent fallback={<div>Loading...</div>} />
  </div>
)
```
