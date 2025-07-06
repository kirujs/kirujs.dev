import { useTutorialSteps } from "./TutorialStepsContext"
import { tutorials } from "$/pages/tutorial/meta"

export function TutorialOverview() {
  const { completedTutorials, getStepProgress } = useTutorialSteps()

  // Calculate total tutorials available
  const totalTutorials = tutorials.reduce((acc, tutorial) => {
    return acc + (tutorial.children ? tutorial.children.length : 1)
  }, 0)

  const completedTutorialsCount = completedTutorials.size
  const currentStepProgress = getStepProgress()

  return (
    <div className="bg-white/2.5 border border-white/5 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-white">Tutorial Progress</h3>
        {completedTutorialsCount > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
              {completedTutorialsCount} tutorial
              {completedTutorialsCount !== 1 ? "s" : ""} completed
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">
            {currentStepProgress.completed}
          </div>
          <div className="text-gray-400">Current Steps</div>
          <div className="text-xs text-gray-500">
            {currentStepProgress.total > 0
              ? `${currentStepProgress.completed}/${currentStepProgress.total}`
              : "No steps"}
          </div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">
            {completedTutorialsCount}
          </div>
          <div className="text-gray-400">Tutorials Completed</div>
          <div className="text-xs text-gray-500">
            {completedTutorialsCount}/{totalTutorials} tutorials
          </div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">
            {totalTutorials > 0
              ? Math.round((completedTutorialsCount / totalTutorials) * 100)
              : 0}
            %
          </div>
          <div className="text-gray-400">Overall Progress</div>
          <div className="text-xs text-gray-500">
            {totalTutorials - completedTutorialsCount} remaining
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>Tutorial Completion</span>
          <span>
            {completedTutorialsCount}/{totalTutorials}
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${totalTutorials > 0 ? (completedTutorialsCount / totalTutorials) * 100 : 0}%`,
            }}
          />
        </div>
      </div>

      {completedTutorialsCount === totalTutorials && totalTutorials > 0 && (
        <div className="mt-4 p-3 bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/30 rounded-lg">
          <div className="flex items-center gap-2 text-green-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            <span className="font-semibold">🎉 All Tutorials Complete!</span>
          </div>
          <p className="text-sm text-gray-300 mt-1">
            Outstanding work! You've mastered all Kaioken tutorials and are
            ready to build amazing applications.
          </p>
        </div>
      )}
    </div>
  )
}
