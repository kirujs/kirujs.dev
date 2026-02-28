import { signal } from "kiru"

export const navDrawerOpen = signal(false)
export const commandPalleteOpen = signal(false)

export const navEvent = signal(false)
if ("window" in globalThis) {
  window.addEventListener("popstate", () => {
    navEvent.value = true
    requestAnimationFrame(() => (navEvent.value = false))
  })
}

export const siteCodeLang = signal<"js" | "ts">("ts")
if ("window" in globalThis) {
  const storageKey = "kirujs.dev:siteCodeLang"
  window.__kiru.on("mount", () => {
    const storageValue = localStorage.getItem(storageKey)
    if (storageValue && ["js", "ts"].includes(storageValue)) {
      siteCodeLang.value = storageValue as "js" | "ts"
    }
    siteCodeLang.subscribe((val) => localStorage.setItem(storageKey, val))
  })
}
