import { signal } from "kaioken"

export const selectedTab = signal<
  "App" | "LoginPage" | "UserList" | "UserPage"
>("App")
