import "./TabGroup.css"

interface TabGroupProps<T extends string[]> {
  items: T
  tab: Kiru.Signal<T[number] | undefined>
  itemTransform?: (item: T[number]) => string
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
            itemTransform={props.itemTransform}
          />
        ))}
      </ul>
      {props.children && (
        <div className="flex gap-4 py-2 px-4">{props.children}</div>
      )}
    </div>
  )
}
type TabItemProps = {
  current: Kiru.Signal<string | undefined>
  itemTransform?: (item: string) => string
  item: string
}
function TabItem({ itemTransform, current, item }: TabItemProps) {
  return (
    <li className={current.value === item ? "active" : ""}>
      <button ariaLabel={item} onclick={() => (current.value = item)}>
        {itemTransform?.(item) || item}
      </button>
    </li>
  )
}
