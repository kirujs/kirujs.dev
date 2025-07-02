export const validateForm = (formData) => {
  const newErrors = {}

  if (!formData.name.trim()) {
    newErrors.name = "Name is required"
  } else if (formData.name.length < 2) {
    newErrors.name = "Name must be at least 2 characters"
  }

  if (!formData.email.trim()) {
    newErrors.email = "Email is required"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = "Please enter a valid email"
  }

  if (!formData.age) {
    newErrors.age = "Age is required"
  } else if (parseInt(formData.age) < 13 || parseInt(formData.age) > 120) {
    newErrors.age = "Age must be between 13 and 120"
  }

  if (!formData.country) {
    newErrors.country = "Please select a country"
  }

  if (formData.interests.length === 0) {
    newErrors.interests = "Please select at least one interest"
  }

  if (!formData.message.trim()) {
    newErrors.message = "Message is required"
  } else if (formData.message.length < 10) {
    newErrors.message = "Message must be at least 10 characters"
  }

  return newErrors
}
