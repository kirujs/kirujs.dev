import { useState, useEffect, useRef, useMemo } from "kaioken"
import { useTutorialSteps } from "./TutorialStepsContext"
import { useEditor } from "$/components/CodeSandbox/Editor"
import { className as cls } from "kaioken/utils"

type StepProps = {
  validator: (code: string) => boolean
  watchFile?: string
  stepId: string
  children: JSX.Children
}

export function TutorialStep({
  validator,
  watchFile = "App.jsx",
  stepId,
  children,
}: StepProps) {
  const {
    registerStep,
    validateStep,
    markStepCompleted,
    markStepFailed,
    isStepCompleted,
  } = useTutorialSteps()
  const { subscribe } = useEditor()
  const [isValidating, setIsValidating] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)
  const validationTimeoutRef = useRef<number>(-1)

  // Check completion state and cache it
  const completed = isStepCompleted(stepId)

  // Subscribe to file changes with more careful handling
  useEffect(() => {
    registerStep(stepId, validator)
    const unsubscribe = subscribe((fileName: string, code: string) => {
      // Check completion state fresh each time instead of using stale closure
      if (fileName === watchFile && !completed) {
        // Clear any existing validation timeout
        window.clearTimeout(validationTimeoutRef.current)

        // Set validating state immediately for UI feedback
        setIsValidating(true)
        setValidationError(null)

        // Validate after a delay to avoid excessive calls
        validationTimeoutRef.current = window.setTimeout(() => {
          try {
            const isValid = validateStep(stepId, code)
            if (isValid) {
              // Use requestAnimationFrame to defer the state update
              // This ensures the editor has finished processing the current input
              requestAnimationFrame(() => {
                markStepCompleted(stepId)
              })
            }
          } catch (error) {
            setValidationError(
              error instanceof Error ? error.message : "Something went wrong"
            )
          } finally {
            setIsValidating(false)
          }
        }, 1000)
      }
    })

    return () => {
      unsubscribe()
      window.clearTimeout(validationTimeoutRef.current)
    }
  }, [])

  return (
    <div
      className={cls(
        "relative border-l-4 px-4 py-3 mb-6 transition-all duration-300",
        completed
          ? "border-green-500 bg-green-50/5"
          : "border-blue-500 bg-blue-50/5",
        isValidating && "animate-pulse"
      )}
    >
      {/* Step Status Badge */}
      <div className="absolute -left-3 top-4 w-6 h-6 rounded-full border-2 border-current bg-[#111] flex items-center justify-center">
        {completed ? (
          <svg
            className="w-4 h-4 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        ) : isValidating ? (
          <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        ) : (
          <div className="w-3 h-3 rounded-full bg-blue-500" />
        )}
      </div>

      {/* Content */}
      <div
        className={cls(
          "transition-opacity duration-300",
          completed && "opacity-75"
        )}
      >
        {children}
      </div>

      {/* Validation Error */}
      {validationError && (
        <div className="mt-2 p-2 bg-red-900/20 border border-red-500/30 rounded text-red-300 text-sm">
          <strong>Validation Error:</strong> {validationError}
        </div>
      )}
    </div>
  )
}
