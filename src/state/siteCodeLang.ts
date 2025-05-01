import { signal } from "kaioken"

export const siteCodeLang = signal<"js" | "ts">("js")
if ("window" in globalThis) {
  const storageKey = "kaioken.dev:siteCodeLang"
  window.__kaioken?.on("mount", () => {
    const storageValue = localStorage.getItem(storageKey)
    if (storageValue && ["js", "ts"].includes(storageValue)) {
      siteCodeLang.value = storageValue as "js" | "ts"
    }
    siteCodeLang.subscribe((val) => localStorage.setItem(storageKey, val))
  })
}
