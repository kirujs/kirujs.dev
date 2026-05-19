import "$/styles/global.css"
import { createRouterApp } from "kiru/router/ssg"
import { routes } from "./routes"

createRouterApp({
  routes,
  container: document.getElementById("app")!,
})
