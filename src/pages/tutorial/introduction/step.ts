import { TutorialStep } from "../TutorialStepContext"
import { mapFiles } from "../utils"

const files = import.meta.glob("./files/*", {
  eager: true,
  query: "?raw",
})

console.log({ files })

export const step: TutorialStep = {
  files: mapFiles(files),
}
