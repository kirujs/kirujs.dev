export function CheckboxGroup({ options, selectedValues, onChange, error }) {
  return (
    <div>
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(2, 1fr)", 
        gap: "8px",
        marginTop: "8px"
      }}>
        {options.map(option => (
          <label key={option} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="checkbox"
              checked={selectedValues.includes(option)}
              onchange={() => onChange(option)}
            />
            {option}
          </label>
        ))}
      </div>
      {error && <div style={{ color: "#dc3545", fontSize: "12px", marginTop: "4px" }}>{error}</div>}
    </div>
  )
} 