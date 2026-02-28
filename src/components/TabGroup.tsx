import "./TabGroup.css"

interface TabGroupProps<T extends string[]> {
  items: T
  value: T[number]
  onSelect: (value: T[number]) => void
  itemSuffix?: string | ((item: T[number]) => string)
}

export function TabGroup<T extends string[]>(props: TabGroupProps<T>) {
  return (
    <div className="tab-group">
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
  const suffix =
    typeof itemSuffix === "function" ? itemSuffix(item) : itemSuffix

  const handleClick = () => !active && onSelect(item)

  return (
    <li className={active ? "active" : ""}>
      <button ariaLabel={item} onclick={handleClick}>
        {item}
        {suffix || ""}
      </button>
    </li>
  )
}
