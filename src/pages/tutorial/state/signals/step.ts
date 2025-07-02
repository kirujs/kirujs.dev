import { TutorialStep } from "../../TutorialStepContext"
import { mapFiles } from "../../utils"

const files = import.meta.glob("./files/*", {
  eager: true,
  as: "raw",
})

export const step: TutorialStep = {
  files: mapFiles(files),
}
