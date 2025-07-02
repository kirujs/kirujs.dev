export function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "#333",
        marginBottom: "8px",
        borderRadius: "4px",
        opacity: todo.completed ? 0.7 : 1
      }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onchange={() => onToggle(todo.id)}
        style={{ marginRight: "10px" }}
      />
      <span
        style={{
          flex: 1,
          textDecoration: todo.completed ? "line-through" : "none",
        }}
      >
        {todo.text}
      </span>
      <button
        onclick={() => onDelete(todo.id)}
        style={{
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          padding: "4px 8px",
          borderRadius: "4px"
        }}
      >
        Delete
      </button>
    </div>
  )
} 