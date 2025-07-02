import { useState } from "kaioken"
import { TodoList } from "./TodoList"

export function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn Kaioken", completed: false },
    { id: 2, text: "Build something cool", completed: true }
  ])
  const [inputValue, setInputValue] = useState("")

  const addTodo = () => {
    const text = inputValue.trim()
    if (!text.length) return

    setTodos([...todos, {
      id: Date.now(),
      text,
      completed: false
    }])
    setInputValue("")    
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const completedCount = todos.filter(todo => todo.completed).length

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h1>📝 Todo App</h1>
      
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={inputValue}
          oninput={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo..."
          style={{ padding: "8px", marginRight: "10px", width: "300px" }}
          onkeydown={(e) => e.key === "Enter" && addTodo()}
        />
        <button onclick={addTodo} style={{ padding: "8px 16px" }}>
          Add
        </button>
      </div>

      <p>
        {completedCount} of {todos.length} completed
        {todos.length > 0 && (
          <span style={{ color: completedCount === todos.length ? "green" : "orange" }}>
            {completedCount === todos.length ? " 🎉" : " 📋"}
          </span>
        )}
      </p>

      <TodoList 
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  )
} 