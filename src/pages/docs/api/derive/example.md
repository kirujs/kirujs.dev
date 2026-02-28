```jsx
import { signal, computed, Derive } from "kiru"

function App() {
  const name = signal("bob")
  const age = signal(42)
  const person = computed(() => ({ name: name.value, age: age.value }))

  return () => (
    <div>
      <input bind:value={name} />
      <input type="number" bind:value={age} />
      <Derive from={person}>
        {(person) => (
          <div>
            {person.name} is {person.age} years old
          </div>
        )}
      </Derive>
      {/* You can also use an object as the `from` prop to derive from multiple signals */}
      <Derive from={{ name, age }}>
        {({ name, age }) => (
          <div>
            {name} is {age} years old
          </div>
        )}
      </Derive>
    </div>
  )
}
```
