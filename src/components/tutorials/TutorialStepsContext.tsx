import {
  createContext,
  useContext,
  useState,
  useEffect,
  signal,
  useCallback,
  useMemo,
  useRef,
} from "kaioken"
import { usePageContext } from "$/context/pageContext"

export type TutorialStepStatus = "pending" | "completed" | "current"

// Only store tutorial completion, not individual steps
export type TutorialCompletionData = {
  tutorialPath: string
  completed: boolean
  completedAt: Date
}

// Individual step data for current session only
export type StepData = {
  id: string
  completed: boolean
  validator: (code: string) => boolean
}

type TutorialStepsContextType = {
  // Session-only step tracking for visual feedback
  stepStates: Map<string, boolean>
  currentStep: string | null
  setCurrentStep: (stepId: string) => void
  markStepCompleted: (stepId: string) => void
  markStepFailed: (stepId: string) => void
  isStepCompleted: (stepId: string) => boolean
  getStepStatus: (stepId: string) => TutorialStepStatus

  // Persistent tutorial completion tracking
  completedTutorials: Set<string>
  isTutorialCompleted: (tutorialPath: string) => boolean
  markTutorialCompleted: (tutorialPath: string) => void

  // Step management
  registerStep: (stepId: string, validator: (code: string) => boolean) => void
  validateStep: (stepId: string, code: string) => boolean
  getStepProgress: () => { completed: number; total: number }
}

const TutorialStepsContext = createContext<TutorialStepsContextType>(null!)

// Global signal for tutorial completion notifications
export const tutorialFeedback = signal<{
  message: string
  type: "success" | "info" | "warning"
  show: boolean
}>({
  message: "",
  type: "success",
  show: false,
})

export function useTutorialSteps() {
  return useContext(TutorialStepsContext)
}

function saveCompletedTutorials(completedTutorials: Set<string>) {
  const tutorialsArray = Array.from(completedTutorials)
  localStorage.setItem("completed-tutorials", JSON.stringify(tutorialsArray))
}

function loadCompletedTutorials(): Set<string> {
  if (typeof window === "undefined") return new Set()

  const saved = localStorage.getItem("completed-tutorials")
  if (!saved) return new Set()

  try {
    const tutorialsArray = JSON.parse(saved)
    return new Set(tutorialsArray)
  } catch {
    return new Set()
  }
}

export function TutorialStepsProvider({
  children,
}: {
  children: JSX.Children
}) {
  const { urlPathname } = usePageContext()

  // Session-only step tracking for visual feedback
  const [stepStates, setStepStates] = useState<Map<string, boolean>>(new Map())
  const [currentStep, setCurrentStep] = useState<string | null>(null)
  const stepValidators = useRef<Map<string, (code: string) => boolean>>(
    new Map()
  )

  // Persistent tutorial completion tracking
  const [completedTutorials, setCompletedTutorials] = useState<Set<string>>(
    () => loadCompletedTutorials()
  )

  // Save completed tutorials to localStorage
  useEffect(() => {
    saveCompletedTutorials(completedTutorials)
  }, [completedTutorials])

  const markStepCompleted = (stepId: string) => {
    setStepStates((prev) => {
      const newStates = new Map(prev)
      if (!newStates.get(stepId)) {
        newStates.set(stepId, true)

        // Show step completion feedback
        tutorialFeedback.value = {
          message: "Great job! Step completed! 🎉",
          type: "success",
          show: true,
        }

        setTimeout(() => {
          tutorialFeedback.value = { ...tutorialFeedback.value, show: false }
        }, 2000)

        return newStates
      }
      return prev
    })
  }

  const markStepFailed = (stepId: string) => {
    setStepStates((prev) => {
      const newStates = new Map(prev)
      newStates.set(stepId, false)
      return newStates
    })
  }

  const isStepCompleted = (stepId: string): boolean => {
    return stepStates.get(stepId) ?? false
  }

  const getStepStatus = (stepId: string): TutorialStepStatus => {
    if (currentStep === stepId) return "current"
    if (isStepCompleted(stepId)) return "completed"
    return "pending"
  }

  const getStepProgress = () => {
    const completed = Array.from(stepStates.values()).filter(Boolean).length
    const total = stepStates.size
    return { completed, total }
  }

  const registerStep = (
    stepId: string,
    validator: (code: string) => boolean
  ) => {
    stepValidators.current.set(stepId, validator)

    // Initialize step state if it doesn't exist
    setStepStates((prev) => {
      if (!prev.has(stepId)) {
        const newStates = new Map(prev)
        newStates.set(stepId, false)
        return newStates
      }
      return prev
    })
  }

  const validateStep = (stepId: string, code: string): boolean => {
    const validator = stepValidators.current.get(stepId)
    if (!validator) return false

    try {
      return validator(code)
    } catch (error) {
      console.error("Step validation error:", error)
      return false
    }
  }

  const isTutorialCompleted = (tutorialPath: string): boolean => {
    return completedTutorials.has(tutorialPath)
  }

  const markTutorialCompleted = (tutorialPath: string) => {
    setCompletedTutorials((prev) => {
      if (!prev.has(tutorialPath)) {
        const newSet = new Set(prev)
        newSet.add(tutorialPath)

        // Show tutorial completion feedback
        tutorialFeedback.value = {
          message: "🎉 Tutorial completed! Well done! 🎉",
          type: "success",
          show: true,
        }

        setTimeout(() => {
          tutorialFeedback.value = { ...tutorialFeedback.value, show: false }
        }, 4000)

        return newSet
      }
      return prev
    })
  }

  // Check if all steps are completed and mark tutorial as complete
  useEffect(() => {
    const progress = getStepProgress()
    if (progress.total > 0 && progress.completed === progress.total) {
      // All steps completed, mark tutorial as complete
      markTutorialCompleted(urlPathname)
    }
  }, [stepStates, urlPathname])

  return (
    <TutorialStepsContext.Provider
      value={{
        stepStates,
        currentStep,
        setCurrentStep,
        markStepCompleted,
        markStepFailed,
        isStepCompleted,
        getStepStatus,
        getStepProgress,
        completedTutorials,
        isTutorialCompleted,
        markTutorialCompleted,
        registerStep,
        validateStep,
      }}
    >
      {children}
    </TutorialStepsContext.Provider>
  )
}
