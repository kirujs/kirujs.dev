import { useState } from "kaioken"

function TaskItem({ task, onToggle }) {
  console.log("TaskItem rendered:", task.text)

  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onchange={() => onToggle(task.id)}
      />
      {task.text}
    </li>
  )
}

export function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Learn hooks", completed: false },
    { id: 2, text: "Build app", completed: false },
  ])

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={toggleTask} />
        ))}
      </ul>
    </div>
  )
}
