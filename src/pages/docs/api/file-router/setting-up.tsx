import { TabGroup } from "$/components/TabGroup"
import { Derive, signal } from "kiru"
import { match } from "lit-match"
import { SettingUpSSG } from "./setting-up.ssg"
import { SettingUpCSR } from "./setting-up.csr"

const selectedTab = signal<"SSG" | "CSR">("CSR")

export function SettingUp() {
  return (
    <>
      <TabGroup items={["CSR", "SSG"] as const} tab={selectedTab} />
      <Derive from={selectedTab}>
        {(tab) =>
          match(tab)
            .with("CSR", () => <SettingUpCSR />)
            .with("SSG", () => <SettingUpSSG />)
            .exhaustive()
        }
      </Derive>
    </>
  )
}
