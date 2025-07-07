import { useState } from "kaioken"

export function App() {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5])
  const [filter, setFilter] = useState("")

  return (
    <div>
      <h1>Number Filter</h1>
      <input
        type="text"
        placeholder="Filter numbers"
        value={filter}
        oninput={(e) => setFilter(e.target.value)}
      />
      <ul>
        {numbers.map((num) => (
          <li key={num}>{num}</li>
        ))}
      </ul>
    </div>
  )
}
