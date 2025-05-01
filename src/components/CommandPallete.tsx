import { useCommandPallete } from "$/state/commandPallete"
import {
  Transition,
  useCallback,
  useEffect,
  useMemo,
  useModel,
  useRef,
} from "kaioken"
import { Modal } from "./dialog/Modal"
import { DialogHeader } from "./dialog/DialogHeader"
import { Input } from "./atoms/Input"
import { DocPageLink, docMeta } from "$/docs-meta"
import { DialogBody } from "./dialog/DialogBody"
import { OS, SITE_LINKS } from "$/constants"
import { SearchIcon } from "./icons/SearchIcon"
import { CloseIcon } from "./icons/CloseIcon"
import { usePageContext } from "$/context/pageContext"
import { isLinkActive } from "$/utils"
import { ExternalLinkIcon } from "./icons/ExternalLinkIcon"

export function CommandPallete() {
  const {
    value: { open, event },
    setOpen,
  } = useCommandPallete()
  const { urlPathname } = usePageContext()

  const prevActiveElement = useRef<Element | null>(null)

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboardEvent)
    return () => {
      document.removeEventListener("keydown", handleKeyboardEvent)
    }
  }, [])

  useEffect(() => (open && setOpen(false), void 0), [urlPathname])

  function focusSender() {
    const el = prevActiveElement.current
    if (el && el instanceof HTMLElement) el.focus()
  }

  function handleKeyboardEvent(e: KeyboardEvent) {
    const isHandled =
      e.key.toLowerCase() === "k" && (OS === "mac" ? e.metaKey : e.ctrlKey)
    if (!isHandled) return

    e.preventDefault()
    const { open } = useCommandPallete.getState()

    if (!open) {
      prevActiveElement.current = document.activeElement
    } else {
      focusSender()
    }

    setOpen(!open)
  }

  return (
    <Transition
      in={open}
      duration={{
        in: 50,
        out: 250,
      }}
      element={(state) =>
        state === "exited" ? null : (
          <Modal
            state={state}
            close={() => {
              if (!event) focusSender()
              setOpen(false)
            }}
            sender={event}
            className="max-w-[min(400px,100vw)]"
          >
            <CommandPalleteDisplay />
          </Modal>
        )
      }
    />
  )
}

function CommandPalleteDisplay() {
  const [searchInputRef, searchInputValue] = useModel<HTMLInputElement>("")
  const { setOpen } = useCommandPallete()

  useEffect(() => {
    searchInputRef.current?.focus()
  }, [searchInputRef.current])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboardEvent)
    return () => document.removeEventListener("keydown", handleKeyboardEvent)
  }, [])

  function handleKeyboardEvent(e: KeyboardEvent) {
    const isHandled = e.key.toLowerCase() === "l" && e.ctrlKey
    if (!isHandled) return
    e.preventDefault()
    searchInputRef.current?.focus()
  }

  const searchTerms = searchInputValue.toLowerCase().split(" ")

  return (
    <>
      <DialogHeader className="border-b-0 relative">
        <SearchIcon className="absolute top-[calc(50%-.75rem)] left-2 opacity-35" />
        <Input
          type="text"
          placeholder="Search..."
          className="w-full pl-8 bg-black/20 font-normal text-base"
          ref={searchInputRef}
        />
        <button
          ariaLabel="Close"
          onclick={() => setOpen(false)}
          className="flex px-2 items-center opacity-35 hover:opacity-100 focus:opacity-100"
        >
          <CloseIcon width="1em" height="1em" />
        </button>
      </DialogHeader>
      <DialogBody className="bg-black/10 border border-white/5 rounded-sm max-h-[400px] overflow-y-auto scroll-py-20">
        <div className="flex flex-col gap-2">
          <CommandPalleteGroup
            title="Links"
            items={SITE_LINKS}
            searchTerms={searchTerms}
          />
          <CommandPalleteGroup
            title="API"
            items={docMeta.find((d) => d.title === "API")!.pages!}
            searchTerms={searchTerms}
          />
          <CommandPalleteGroup
            title="Hooks"
            items={docMeta.find((d) => d.title === "Hooks")!.pages!}
            searchTerms={searchTerms}
          />
        </div>
      </DialogBody>
    </>
  )
}

function matchItem(terms: string[], keywords: string[]) {
  let matched = 0
  for (let i = 0; i < terms.length; i++) {
    if (keywords.some((k) => k.indexOf(terms[i]) > -1)) matched++
  }
  return matched === terms.length
}

function CommandPalleteGroup({
  title,
  items,
  searchTerms,
}: {
  title: string
  items: DocPageLink[]
  searchTerms: string[]
}) {
  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        matchItem(searchTerms, [
          title.toLowerCase(),
          ...item.title.toLowerCase().split(" "),
          ...(item.keywords?.map((item) => item.toLowerCase()) ?? []),
        ])
      ),
    [searchTerms]
  )
  if (!filteredItems.length) return null

  return (
    <div>
      <h4 className="mx-1 font-bold text-sm text-muted">{title}</h4>
      <div className="flex gap-1 flex-col py-2 px-1">
        {filteredItems.map((item) => (
          <CommandPalleteItem
            key={item.href}
            item={item}
            external={"external" in item && Boolean(item.external)}
          />
        ))}
      </div>
    </div>
  )
}

function CommandPalleteItem({
  item,
  external,
}: {
  item: DocPageLink
  external?: boolean
}) {
  const { setOpen } = useCommandPallete()
  const { urlPathname } = usePageContext()
  const onLinkClick = useCallback(() => {
    if (isLinkActive(item.href, urlPathname)) setOpen(false)
  }, [item.href, urlPathname, setOpen])
  if (item.disabled) {
    return (
      <a className="w-full text-muted bg-white/[1%] border border-white/5 p-2 rounded-sm focus:bg-white/5 hover:bg-white/5">
        <span className="w-full flex justify-between items-center text-xs">
          {item.title}
          <span className="badge">Upcoming</span>
        </span>

        <CommandPalleteBadges item={item} />
      </a>
    )
  }
  return (
    <a
      className="w-full text-muted bg-white/[1%] border border-white/5 p-2 rounded-sm focus:bg-white/5 hover:bg-white/5"
      href={item.href}
      onclick={onLinkClick}
      target={external ? "_blank" : "_self"}
    >
      <div className="flex items-start justify-between">
        <span className="flex gap-1 items-center text-sm font-light">
          {item.title}{" "}
          {external ? <ExternalLinkIcon width=".85rem" height=".85rem" /> : ""}
        </span>
        {item.isNew && (
          <span className="badge px-1 py-0.5 rounded-sm">New</span>
        )}
      </div>
      <CommandPalleteBadges item={item} />
    </a>
  )
}

function CommandPalleteBadges({ item }: { item: DocPageLink }) {
  if (!item.keywords) return null
  return (
    <div className="flex gap-1 mt-1">
      {item.keywords.map((keyword) => (
        <span key={keyword} className="badge badge-muted">
          {keyword}
        </span>
      ))}
    </div>
  )
}
