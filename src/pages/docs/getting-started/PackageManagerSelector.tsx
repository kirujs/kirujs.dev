import { TabGroup } from "$/components/TabGroup"
import { packageManager, packageManagers } from "./packageManagerStore"

export function PackageManagerSelector() {
  return <TabGroup items={[...packageManagers]} tab={packageManager} />
}
