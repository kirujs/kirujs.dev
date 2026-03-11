import "./TabGroup.css"

interface TabGroupProps<T extends string[]> {
  items: T
  tab: Kiru.Signal<T[number] | undefined>
  itemSuffix?: string | ((item: T[number]) => string)
  children?: JSX.Children
}

export function TabGroup<T extends string[]>(props: TabGroupProps<T>) {
  return (
    <div className="tab-group">
      <ul>
        {props.items.map((item) => (
          <TabItem
            key={item}
            current={props.tab}
            item={item}
            itemSuffix={props.itemSuffix}
          />
        ))}
      </ul>
      {props.children && <div className="flex gap-4 p-4">{props.children}</div>}
    </div>
  )
}
type TabItemProps = {
  current: Kiru.Signal<string | undefined>
  itemSuffix?: string | ((item: string) => string)
  item: string
}
function TabItem({ itemSuffix, current, item }: TabItemProps) {
  const suffix =
    typeof itemSuffix === "function" ? itemSuffix(item) : itemSuffix

  return (
    <li className={current.value === item ? "active" : ""}>
      <button ariaLabel={item} onclick={() => (current.value = item)}>
        {item}
        {suffix || ""}
      </button>
    </li>
  )
}
