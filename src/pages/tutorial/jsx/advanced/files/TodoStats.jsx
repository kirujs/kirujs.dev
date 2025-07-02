export function TodoStats({ todos }) {
  const completedCount = todos.filter(todo => todo.done).length
  
  return (
    <>
      <p>Completed: {completedCount}/{todos.length}</p>
      
      {todos.every(todo => todo.done) && (
        <div style={{ color: 'green', fontWeight: 'bold' }}>
          🎉 All tasks completed!
        </div>
      )}
    </>
  )
} 