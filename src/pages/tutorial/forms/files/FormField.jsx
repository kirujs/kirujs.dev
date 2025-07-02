import { errorStyle } from "./constants"

export function FormField({ label, error, required, children }) {
  return (
    <div>
      <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
        {label} {required && "*"}
      </label>
      {children}
      {error && <div style={errorStyle}>{error}</div>}
    </div>
  )
} 