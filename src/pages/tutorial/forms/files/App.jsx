import { useState } from "kaioken"
import { validateForm } from "./validation"
import { FormField } from "./FormField"
import { TextInput } from "./TextInput"
import { SelectField } from "./SelectField"

export function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: ""
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const countries = ["USA", "Canada", "UK", "Germany"]

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = validateForm(formData)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>✅ Success!</h2>
        <p>Form submitted successfully!</p>
        <button onclick={() => setSubmitted(false)}>
          Submit Another
        </button>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h1>📝 Registration Form</h1>

      <form onsubmit={handleSubmit}>
        <FormField label="Name" error={errors.name} required>
          <TextInput
            value={formData.name}
            onInput={(e) => handleChange("name", e.target.value)}
            placeholder="Your name"
            error={errors.name}
          />
        </FormField>
        
        <FormField label="Email" error={errors.email} required>
          <TextInput
            type="email"
            value={formData.email}
            onInput={(e) => handleChange("email", e.target.value)}
            placeholder="your@email.com"
            error={errors.email}
          />
        </FormField>
        
        <FormField label="Country" error={errors.country} required>
          <SelectField
            value={formData.country}
            onChange={(e) => handleChange("country", e.target.value)}
            options={countries}
            placeholder="Select country"
            error={errors.country}
          />
        </FormField>
        
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: isSubmitting ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            marginTop: "20px"
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  )
} 