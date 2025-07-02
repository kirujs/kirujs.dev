import { TodoItem } from "./TodoItem"

export function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return (
      <p style={{ color: "#666", fontStyle: "italic" }}>
        No todos yet. Add one above!
      </p>
    )
  }

  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
} 