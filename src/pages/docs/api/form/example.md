### Example

```jsx
import { useForm } from "kaioken/form"

const App = () => {
  const form = useForm({
    initialValues: {
      username: "",
    },
    onSubmit: ({ state }) => {
      console.log("form submitted", state)
    },
  })

  const handleSubmit = useCallback((e: Event) => {
    e.preventDefault()
    form.handleSubmit()
  }, [])

  return (
    <form onsubmit={handleSubmit}>
      <div>
        <form.Field
          name="username"
          validators={{
            onChange: (value) => !value && "Username is required",
          }}
          children={(field) => (
            <div>
              <label htmlFor={field.name}>Username</label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onblur={field.handleBlur}
                onchange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.errors.length && <span>{field.state.errors.join(", ")}</span>}
            </div>
          )}
        />
      </div>
    </form>
  )
}
```
