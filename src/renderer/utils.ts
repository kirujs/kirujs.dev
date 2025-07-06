// /pages/utils.js
// Environment: server & client

import type { PageContext } from "vike/types"

export { getTitle, getDescription, getKeywords }

function getTitle(pageContext: PageContext) {
  const val = pageContext.config.title
  if (typeof val === "function") {
    return val(pageContext)
  }
  if (pageContext.urlPathname.startsWith("/tutorial")) {
    return "Tutorial: " + val
  }
  return val || "Kaioken"
}

function getDescription(pageContext: PageContext) {
  const val = pageContext.config.description
  if (typeof val === "function") {
    return val(pageContext)
  }
  return (
    val || "A powerful, easy-to-use rendering library with a tiny footprint"
  )
}

function getKeywords(pageContext: PageContext) {
  const val = pageContext.config.keywords
  if (typeof val === "function") {
    return val(pageContext)
  }
  return val || []
}
