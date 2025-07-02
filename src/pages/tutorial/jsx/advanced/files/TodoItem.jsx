export function TodoItem({ todo }) {
  return (
    <li style={{ 
      textDecoration: todo.done ? 'line-through' : 'none',
      color: todo.done ? '#666' : '#ddd'
    }}>
      {todo.text}
    </li>
  )
} 