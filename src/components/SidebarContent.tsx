import { usePageContext } from "$/context/pageContext"
import { docMeta } from "$/docs-meta"
import { useNavDrawer } from "$/state/navDrawer"
import { isLinkActive } from "$/utils"
import { ElementProps, Fragment, unwrap } from "kaioken"
import { DocItemStatus } from "./DocItemStatus"

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
              {data.pages.map((page) => {
                const isActive = isLinkActive(page.href, urlPathname)
                let hasNewSection = false
                if (page.status?.type !== "new") {
                  hasNewSection = !!page.sections?.some((s) => s.isNew)
                }

                const Tag = page.sections ? "div" : Fragment

                return (
                  <Tag key={page.href}>
                    {page.disabled ? (
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
                          isActive && "text-light",
                          "flex items-center justify-between",
                        ]}
                      >
                        {page.title}
                        <DocItemStatus
                          status={page.status}
                          hasNewSection={hasNewSection}
                        />
                      </Link>
                    )}
                    {isActive && page.sections && (
                      <LinkList className="px-2 py-1 my-2 bg-white/5 text-sm rounded border border-white/5">
                        {page.sections.map((section) => (
                          <Link
                            className="flex items-center justify-between"
                            key={section.id}
                            href={
                              page.href + (section.id ? `#${section.id}` : "")
                            }
                            onclick={() => open && setOpen(false)}
                          >
                            {section.title}
                            {section.isNew && (
                              <span
                                className="badge p-0.5 px-1"
                                title={`Since ${section.isNew.since}`}
                              >
                                New
                              </span>
                            )}
                          </Link>
                        ))}
                      </LinkList>
                    )}
                  </Tag>
                )
              })}
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

function LinkList({ className, ...props }: ElementProps<"div">) {
  return (
    <div
      className={["flex flex-col w-full gap", unwrap(className)]}
      {...props}
    />
  )
}

function Link({ children, className, ...props }: ElementProps<"a">) {
  return (
    <a className={["text-muted", unwrap(className)].flat()} {...props}>
      {children}
    </a>
  )
}
