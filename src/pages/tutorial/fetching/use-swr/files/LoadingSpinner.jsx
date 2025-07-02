export function LoadingSpinner({ size = "40px", color = "#007bff" }) {
  return (
    <div style={{
      width: size,
      height: size,
      border: `4px solid #f3f3f3`,
      borderTop: `4px solid ${color}`,
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      margin: "0 auto"
    }}></div>
  )
} 