export function validateForm(data) {
  const errors = {}

  if (!data.name?.trim()) {
    errors.name = "Name is required"
  }

  if (!data.email?.trim()) {
    errors.email = "Email is required"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email"
  }

  if (!data.country) {
    errors.country = "Please select a country"
  }

  return errors
}
