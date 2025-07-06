import "./styles.css"
import { mount } from "kaioken"
import { App } from "./App"
mount(App, document.getElementById("app"))

window.addEventListener("popstate", () => {
  window.parent.postMessage(
    { type: "code-sandbox:pathname", pathname: window.location.pathname },
    "*"
  )
})

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
