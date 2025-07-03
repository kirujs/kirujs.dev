import { inputStyle } from "./constants"

export function TextInput({ error, ...props }) {
  return (
    <input
      style={{
        ...inputStyle,
        borderColor: error ? "#dc3545" : "#ddd",
      }}
      {...props}
    />
  )
}
