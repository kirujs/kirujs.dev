import { TodoStats } from "./TodoStats"
import { TodoList } from "./TodoList"

export function App() {
  const todos = [
    { id: 1, text: "Learn Kaioken", done: false },
    { id: 2, text: "Build an app", done: true },
    { id: 3, text: "Share with friends", done: false }
  ]
  
  return (
    <div>
      <h1>My Todo List</h1>
      <TodoStats todos={todos} />
      <TodoList todos={todos} />
    </div>
  )
} 