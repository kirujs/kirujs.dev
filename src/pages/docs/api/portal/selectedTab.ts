import { signal } from "kaioken"

export const selectedTab = signal<"App" | "index.html">("App")
