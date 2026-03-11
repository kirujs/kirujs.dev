import { computed, For, signal, Transition, effect, ref, onMount } from "kiru"
import { Modal } from "./dialog/Modal"
import { DialogHeader } from "./dialog/DialogHeader"
import { Input } from "./atoms/Input"
import { DocPageLink, docMeta } from "$/docs-meta"
import { DialogBody } from "./dialog/DialogBody"
import { OS, SITE_LINKS } from "$/constants"
import { SearchIcon } from "./icons/SearchIcon"
import { CloseIcon } from "./icons/CloseIcon"
import { isLinkActive } from "$/utils"
import { ExternalLinkIcon } from "./icons/ExternalLinkIcon"
import { DocItemStatus } from "./DocItemStatus"
import { Link, useFileRouter } from "kiru/router"
import { commandPaletteOpen } from "../state"

const groupData: Record<string, DocPageLink[]> = {
  Links: SITE_LINKS,
  API: docMeta.find((d) => d.title === "API")!.pages!,
  Components: docMeta.find((d) => d.title === "Components")!.pages!,
}

export function CommandPalette() {
  const router = useFileRouter()

  onMount(() => {
    function handleKeyboardEvent(e: KeyboardEvent) {
      if (
        e.key.toLowerCase() === "k" &&
        (OS === "mac" ? e.metaKey : e.ctrlKey)
      ) {
        e.preventDefault()
        commandPaletteOpen.value = !commandPaletteOpen.value
      }
    }

    document.addEventListener("keydown", handleKeyboardEvent)
    return () => {
      document.removeEventListener("keydown", handleKeyboardEvent)
    }
  })

  effect([router.state.pathname], () => {
    if (commandPaletteOpen.peek()) {
      commandPaletteOpen.value = false
    }
  })

  return () => (
    <Transition
      in={commandPaletteOpen}
      duration={{
        in: 50,
        out: 250,
      }}
      element={(state) =>
        state === "exited" ? null : (
          <Modal
            state={state}
            close={() => {
              commandPaletteOpen.value = false
            }}
            className="max-w-[min(400px,100vw)]"
          >
            <CommandPaletteDisplay />
          </Modal>
        )
      }
    />
  )
}
const searchInputValue = signal("")
const filteredGroups = computed(() => {
  const terms = searchInputValue.value.toLowerCase().split(" ")
  return Object.entries(groupData).reduce<CommandPalleteGroupProps[]>(
    (acc, [title, items]) => {
      const sectionTitleLower = title.toLowerCase()

      const filtered = items.filter((item) => {
        const defs = [
          sectionTitleLower,
          ...item.title.toLowerCase().split(" "),
          ...(item.tags ?? []).map((word) => word.toLowerCase()),
        ]
        let matched = 0
        for (let i = 0; i < terms.length; i++) {
          if (defs.some((k) => k.indexOf(terms[i]) > -1)) matched++
        }
        return matched === terms.length
      })

      if (filtered.length) return [...acc, { title, items: filtered }]
      return acc
    },
    []
  )
})

function CommandPaletteDisplay() {
  const searchInputRef = ref<HTMLInputElement>(null)

  onMount(() => {
    searchInputRef.current?.focus()
    searchInputRef.current?.select()

    const handleKeyboardEvent = (e: KeyboardEvent) => {
      const isHandled = e.key.toLowerCase() === "l" && e.ctrlKey
      if (!isHandled) return
      e.preventDefault()
      searchInputRef.current?.focus()
    }

    document.addEventListener("keydown", handleKeyboardEvent)
    return () => document.removeEventListener("keydown", handleKeyboardEvent)
  })

  return () => (
    <>
      <DialogHeader className="border-b-0 relative">
        <SearchIcon className="absolute top-[calc(50%-.75rem)] left-2 opacity-35" />
        <Input
          type="text"
          placeholder="Search..."
          className="w-full pl-8 bg-black/20 font-normal text-base"
          ref={searchInputRef}
          bind:value={searchInputValue}
        />
        <button
          ariaLabel="Close"
          onclick={() => (commandPaletteOpen.value = false)}
          className="flex px-2 items-center opacity-35 hover:opacity-100 focus:opacity-100"
        >
          <CloseIcon width="1em" height="1em" />
        </button>
      </DialogHeader>
      <DialogBody className="bg-black/10 border border-white/5 rounded-sm max-h-100 overflow-y-auto scroll-py-20">
        <div className="flex flex-col gap-2">
          <For each={filteredGroups}>
            {(group) => <CommandPaletteGroup key={group.title} {...group} />}
          </For>
        </div>
      </DialogBody>
    </>
  )
}

type CommandPalleteGroupProps = {
  title: string
  items: DocPageLink[]
}
function CommandPaletteGroup({ title, items }: CommandPalleteGroupProps) {
  return (
    <div>
      <h4 className="mx-1 font-bold text-sm text-muted">{title}</h4>
      <div className="flex gap-1 flex-col py-2 px-1">
        {items.map((item) => (
          <CommandPaletteItem
            key={item.href}
            item={item}
            external={"external" in item && Boolean(item.external)}
          />
        ))}
      </div>
    </div>
  )
}

function CommandPaletteItem({
  item,
  external,
}: {
  item: DocPageLink
  external?: boolean
}) {
  const router = useFileRouter()

  if (item.disabled) {
    return (
      <a className="w-full text-muted bg-white/1 border border-white/5 p-2 rounded-sm focus:bg-white/5 hover:bg-white/5">
        <span className="w-full flex justify-between items-center text-xs">
          {item.title}
          <span className="badge">Upcoming</span>
        </span>

        {item.tags && <CommandPalleteItemTags tags={item.tags} />}
      </a>
    )
  }
  if (external) {
    return (
      <a
        className="w-full text-muted bg-white/1 border border-white/5 p-2 rounded-sm focus:bg-white/5 hover:bg-white/5"
        href={item.href}
        target="_blank"
      >
        <div className="flex items-start justify-between">
          <span className="flex gap-1 items-center text-sm font-light">
            {item.title} <ExternalLinkIcon width=".85rem" height=".85rem" />
          </span>
        </div>
      </a>
    )
  }

  let hasNewSection = false
  if (item.status?.type !== "new") {
    hasNewSection = !!item.sections?.some((s) => s.isNew)
  }

  return (
    <Link
      className="w-full text-muted bg-white/1 border border-white/5 p-2 rounded-sm focus:bg-white/5 hover:bg-white/5"
      to={item.href}
      onclick={() =>
        isLinkActive(item.href, router.state.pathname.peek()) &&
        (commandPaletteOpen.value = false)
      }
    >
      <div className="flex items-start justify-between">
        <span className="flex gap-1 items-center text-sm font-light">
          {item.title}{" "}
        </span>
        <DocItemStatus status={item.status} hasNewSection={hasNewSection} />
      </div>
      {item.tags && <CommandPalleteItemTags tags={item.tags} />}
    </Link>
  )
}

function CommandPalleteItemTags({ tags }: { tags: string[] }) {
  if (!tags) return null
  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {tags.map((keyword) => (
        <span key={keyword} className="badge badge-muted">
          {keyword}
        </span>
      ))}
    </div>
  )
}
