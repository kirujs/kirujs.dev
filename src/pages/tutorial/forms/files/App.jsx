import { useState } from "kaioken"
import { validateForm } from "./validation"
import { countries, interestOptions, inputStyle } from "./constants"
import { FormField } from "./FormField"
import { TextInput } from "./TextInput"
import { SelectField } from "./SelectField"
import { CheckboxGroup } from "./CheckboxGroup"

export function App() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    country: "",
    interests: [],
    newsletter: false,
    message: ""
  })
  
  // Validation errors
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  
  // Handle input changes
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }
  
  // Handle checkbox changes for interests
  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = validateForm(formData)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setIsSubmitting(true)
    setErrors({})
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitMessage("✅ Form submitted successfully!")
      setFormData({
        name: "",
        email: "",
        age: "",
        country: "",
        interests: [],
        newsletter: false,
        message: ""
      })
    } catch (error) {
      setSubmitMessage("❌ Submission failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div style={{ 
      fontFamily: "sans-serif", 
      maxWidth: "600px", 
      margin: "0 auto", 
      padding: "20px" 
    }}>
      <h1>📝 User Registration Form</h1>
      
      <form onsubmit={handleSubmit} style={{ display: "grid", gap: "20px" }}>
        <FormField label="Full Name" error={errors.name} required>
          <TextInput
            value={formData.name}
            onInput={(e) => handleChange("name", e.target.value)}
            placeholder="Enter your full name"
            error={errors.name}
          />
        </FormField>
        
        <FormField label="Email Address" error={errors.email} required>
          <TextInput
            type="email"
            value={formData.email}
            onInput={(e) => handleChange("email", e.target.value)}
            placeholder="your.email@example.com"
            error={errors.email}
          />
        </FormField>
        
        <FormField label="Age" error={errors.age} required>
          <TextInput
            type="number"
            value={formData.age}
            onInput={(e) => handleChange("age", e.target.value)}
            placeholder="25"
            min="13"
            max="120"
            error={errors.age}
          />
        </FormField>
        
        <FormField label="Country" error={errors.country} required>
          <SelectField
            value={formData.country}
            onChange={(e) => handleChange("country", e.target.value)}
            options={countries}
            placeholder="Select your country"
            error={errors.country}
          />
        </FormField>
        
        <FormField label="Interests (Select at least one)" error={errors.interests} required>
          <CheckboxGroup
            options={interestOptions}
            selectedValues={formData.interests}
            onChange={handleInterestChange}
            error={errors.interests}
          />
        </FormField>
        
        <div>
          <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="checkbox"
              checked={formData.newsletter}
              onchange={(e) => handleChange("newsletter", e.target.checked)}
            />
            Subscribe to our newsletter
          </label>
        </div>
        
        <FormField label="Message" error={errors.message} required>
          <textarea
            value={formData.message}
            oninput={(e) => handleChange("message", e.target.value)}
            style={{
              ...inputStyle,
              borderColor: errors.message ? "#dc3545" : "#ddd",
              minHeight: "100px",
              resize: "vertical"
            }}
            placeholder="Tell us a bit about yourself..."
          />
        </FormField>
        
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "12px 24px",
            backgroundColor: isSubmitting ? "#6c757d" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            marginTop: "10px"
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit Registration"}
        </button>
        
        {submitMessage && (
          <div style={{ 
            padding: "10px", 
            borderRadius: "4px",
            backgroundColor: submitMessage.includes("✅") ? "#d4edda" : "#f8d7da",
            color: submitMessage.includes("✅") ? "#155724" : "#721c24",
            textAlign: "center"
          }}>
            {submitMessage}
          </div>
        )}
      </form>
      
      <div style={{ 
        marginTop: "30px", 
        padding: "20px", 
        backgroundColor: "#f8f9fa", 
        borderRadius: "8px" 
      }}>
        <h3>Form Data Preview:</h3>
        <pre style={{ fontSize: "12px", overflow: "auto" }}>
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </div>
  )
} 