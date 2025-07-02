import { useCallback, useMemo } from "kaioken"
import "./TabGroup.css"

interface TabGroupProps {
  items: string[]
  value: string
  onSelect: (value: string) => void
  itemSuffix?: string | ((item: string) => string)
}

export function TabGroup(props: TabGroupProps) {
  return (
    <div className="tab-group sticky top-0 z-10">
      <ul>
        {props.items.map((item) => (
          <TabItem
            key={item}
            active={item === props.value}
            item={item}
            onSelect={props.onSelect}
            itemSuffix={props.itemSuffix}
          />
        ))}
      </ul>
    </div>
  )
}
type TabItemProps = {
  active: boolean
  item: string
  onSelect: (item: string) => void
  itemSuffix?: string | ((item: string) => string)
}
function TabItem({ active, itemSuffix, item, onSelect }: TabItemProps) {
  const suffix = useMemo(() => {
    if (typeof itemSuffix === "function") {
      return itemSuffix(item)
    }
    return typeof itemSuffix === "string" ? itemSuffix : ""
  }, [itemSuffix, item])
  const handleClick = useCallback(
    () => !active && onSelect(item),
    [item, active]
  )
  return (
    <li className={active ? "active" : ""}>
      <button ariaLabel={item} onclick={handleClick}>
        {item}
        {suffix || ""}
      </button>
    </li>
  )
}
