import { useForm } from "kaioken/form"
import { FormField } from "./FormField"
import { TextInput } from "./TextInput"
import { SelectField } from "./SelectField"
import { countries } from "./constants"

export function App() {
  const { Field, Subscribe, handleSubmit } = useForm({
    initialValues: {
      name: "",
      email: "",
      country: "",
    },
    onSubmit: ({ state }) => {
      console.log("Form submitted successfully!", state)
      // Simulate success
      setTimeout(() => {
        alert("Form submitted successfully!")
      }, 500)
    },
  })

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h1>📝 Registration Form</h1>

      <form
        onsubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <Field
          name="name"
          validators={{
            onChange: ({ value }) => !value.trim() && "Name is required",
          }}
          children={(field) => (
            <FormField label="Name" error={field.state.errors?.[0]} required>
              <TextInput
                value={field.state.value}
                oninput={(e) => field.handleChange(e.target.value)}
                placeholder="Your name"
                error={field.state.errors?.[0]}
                onBlur={field.handleBlur}
              />
            </FormField>
          )}
        />

        <Field
          name="email"
          validators={{
            onChange: ({ value }) => {
              if (!value.trim()) {
                return "Email is required"
              }
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                return "Please enter a valid email"
              }
            },
          }}
          children={(field) => (
            <FormField label="Email" error={field.state.errors?.[0]} required>
              <TextInput
                type="email"
                value={field.state.value}
                oninput={(e) => field.handleChange(e.target.value)}
                placeholder="your@email.com"
                error={field.state.errors?.[0]}
                onblur={field.handleBlur}
              />
            </FormField>
          )}
        />

        <Field
          name="country"
          validators={{
            onChange: ({ value }) => !value.trim() && "Country is required",
          }}
          children={(field) => (
            <FormField label="Country" error={field.state.errors?.[0]} required>
              <SelectField
                value={field.state.value}
                onchange={(e) => field.handleChange(e.target.value)}
                options={countries}
                placeholder="Select country"
                error={field.state.errors?.[0]}
              />
            </FormField>
          )}
        />

        <Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                marginTop: "20px",
                opacity: canSubmit ? 1 : 0.5,
                cursor: canSubmit ? "pointer" : "not-allowed",
              }}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          )}
        />
      </form>
    </div>
  )
}
