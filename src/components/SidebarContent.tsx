import { usePageContext } from "$/context/pageContext"
import { DocItem as DocItemMeta, docMeta } from "$/docs-meta"
import { useNavDrawer } from "$/state/navDrawer"
import { isLinkActive } from "$/utils"
import { ElementProps, unwrap } from "kaioken"

export function SidebarContent() {
  const { urlPathname } = usePageContext()
  const { value: open, setOpen } = useNavDrawer((state) => state.open)

  return (
    <>
      {docMeta.map((data) => (
        <div key={data.title} className="px-1 mb-3">
          <Header>
            {data.href ? (
              <a
                href={data.href}
                onclick={() => open && setOpen(false)}
                className="block"
              >
                {data.title}
              </a>
            ) : (
              <span>{data.title}</span>
            )}
          </Header>
          {data.pages && (
            <LinkList>
              {data.pages.map((page) =>
                page.disabled ? (
                  <Link
                    key={page.title}
                    className="flex items-center justify-between"
                  >
                    <span className="opacity-75">{page.title}</span>
                    <span className="badge">Upcoming</span>
                  </Link>
                ) : (
                  <Link
                    key={page.href}
                    href={page.href}
                    onclick={() =>
                      isLinkActive(page.href, urlPathname) &&
                      open &&
                      setOpen(false)
                    }
                    className={[
                      isLinkActive(page.href, urlPathname) && "text-light",
                      "flex items-center justify-between",
                    ]}
                  >
                    {page.title}{" "}
                    {page.isNew && (
                      <span className="badge p-0.5 px-1">New</span>
                    )}
                  </Link>
                )
              )}
            </LinkList>
          )}
          {data.sections && (
            <LinkList>
              {data.sections.map((section) => (
                <Link
                  key={section.id}
                  href={data.href + (section.id ? `#${section.id}` : "")}
                  onclick={() => open && setOpen(false)}
                >
                  {section.title}
                </Link>
              ))}
            </LinkList>
          )}
        </div>
      ))}
    </>
  )
}

function Header({ children }: ElementProps<"div">) {
  return <div className={`font-medium w-full block`}>{children}</div>
}

function LinkList({ children }: ElementProps<"div">) {
  return <div className="flex flex-col w-full gap">{children}</div>
}

function Link({ children, className, ...props }: ElementProps<"a">) {
  return (
    <a className={["text-muted", unwrap(className)].flat()} {...props}>
      {children}
    </a>
  )
}
