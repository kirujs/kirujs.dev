import { inputStyle } from "./constants"

export function SelectField({ value, onChange, options, placeholder, error }) {
  return (
    <select
      value={value}
      onchange={onChange}
      style={{
        ...inputStyle,
        borderColor: error ? "#dc3545" : "#ddd",
      }}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}
