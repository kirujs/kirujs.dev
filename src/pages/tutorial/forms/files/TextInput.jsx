import { inputStyle } from "./constants"

export function TextInput({ value, onInput, placeholder, type = "text", error, ...props }) {
  return (
    <input
      type={type}
      value={value}
      oninput={onInput}
      style={{
        ...inputStyle,
        borderColor: error ? "#dc3545" : "#ddd"
      }}
      placeholder={placeholder}
      {...props}
    />
  )
} 