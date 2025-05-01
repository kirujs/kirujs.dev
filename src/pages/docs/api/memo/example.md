```tsx
import { memo } from "kaioken"

const MemoizedUserAvatar = memo(({ name, avatarUrl }) => {
  // Component logic here
  return (
    <div className="user-avatar">
      <img src={avatarUrl} alt={`${name}'s avatar`} />
      <span>{name}</span>
    </div>
  )
})
```

### Specifying a custom `compare` function

```tsx
import { memo } from "kaioken"

const MemoizedUserAvatar = memo(
  ({ user }) => {
    // Component logic here
    return (
      <div className="user-avatar">
        <img src={user.avatarUrl} alt={`${user.name}'s avatar`} />
        <span>{user.name}</span>
      </div>
    )
  },
  (prevProps, nextProps) =>
    prevProps.user.name === nextProps.user.name &&
    prevProps.user.avatarUrl === nextProps.user.avatarUrl
)
```
