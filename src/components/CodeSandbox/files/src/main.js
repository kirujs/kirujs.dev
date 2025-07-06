import "./styles.css"
import { mount } from "kaioken"
import { App } from "./App"
mount(App, document.getElementById("app"))

const errorDisplay = Object.assign(document.createElement("div"), {
  id: "error-display",
})

window.__kaioken.on("update", () => {
  if (errorDisplay.isConnected) {
    errorDisplay.innerHTML = ""
    errorDisplay.remove()
  }
})

window.addEventListener("error", (err) => {
  errorDisplay.innerHTML += ("message" in err ? err.message : err) + "\\n"
  if (!errorDisplay.isConnected) {
    document.body.appendChild(errorDisplay)
  }
})
