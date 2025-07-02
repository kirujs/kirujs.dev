import { useState, useEffect } from "kaioken"
import { cache } from "./api"

export function CacheInspector() {
  const [cacheEntries, setCacheEntries] = useState([])
  const [showInspector, setShowInspector] = useState(false)
  
  const updateCacheEntries = () => {
    const entries = Array.from(cache.entries()).map(([key, value]) => ({
      key,
      count: Array.isArray(value) ? value.length : 1,
      type: Array.isArray(value) ? 'array' : typeof value,
      preview: Array.isArray(value) 
        ? `[${value.length} items]` 
        : String(value).substring(0, 50) + '...'
    }))
    setCacheEntries(entries)
  }
  
  useEffect(() => {
    if (showInspector) {
      updateCacheEntries()
      const interval = setInterval(updateCacheEntries, 1000)
      return () => clearInterval(interval)
    }
  }, [showInspector])
  
  const clearCache = () => {
    cache.clear()
    updateCacheEntries()
  }
  
  const removeFromCache = (key) => {
    cache.delete(key)
    updateCacheEntries()
  }
  
  return (
    <div style={{ 
      marginTop: "30px", 
      padding: "20px", 
      backgroundColor: "#f8f9fa", 
      borderRadius: "8px",
      border: "1px solid #dee2e6"
    }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "15px"
      }}>
        <h3 style={{ margin: 0 }}>🔍 Cache Inspector</h3>
        <div>
          <button 
            onclick={() => setShowInspector(!showInspector)}
            style={{
              padding: "8px 16px",
              backgroundColor: showInspector ? "#dc3545" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              marginRight: "10px"
            }}
          >
            {showInspector ? "Hide" : "Show"} Cache
          </button>
          {showInspector && cacheEntries.length > 0 && (
            <button 
              onclick={clearCache}
              style={{
                padding: "8px 16px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "4px"
              }}
            >
              Clear All
            </button>
          )}
        </div>
      </div>
      
      {showInspector && (
        <div>
          {cacheEntries.length === 0 ? (
            <p style={{ color: "#6c757d", fontStyle: "italic" }}>
              Cache is empty. Fetch some data to see cache entries appear here.
            </p>
          ) : (
            <div style={{ display: "grid", gap: "10px" }}>
              {cacheEntries.map(entry => (
                <div key={entry.key} style={{
                  padding: "15px",
                  backgroundColor: "white",
                  borderRadius: "6px",
                  border: "1px solid #e0e0e0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "bold", color: "#333" }}>
                      {entry.key}
                    </div>
                    <div style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
                      {entry.type} • {entry.count} items • {entry.preview}
                    </div>
                  </div>
                  <button 
                    onclick={() => removeFromCache(entry.key)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#ffc107",
                      color: "#212529",
                      border: "none",
                      borderRadius: "4px",
                      fontSize: "12px"
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
} 