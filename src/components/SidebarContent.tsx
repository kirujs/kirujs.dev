import { Derive, ElementProps, Fragment, onMount, signal, unwrap } from "kiru"
import { className as cls } from "kiru/utils"
import { docMeta } from "$/docs-meta"
import { isLinkActive } from "$/utils"
import { DocItemStatus } from "./DocItemStatus"
import { Link, LinkProps, useFileRouter } from "kiru/router"
import { navDrawerOpen } from "../state"

export function SidebarContent() {
  const router = useFileRouter()
  const hash = signal(
    "window" in globalThis ? window.location.hash.substring(1) : ""
  )

  onMount(() => {
    const onHashChange = () => {
      hash.value = window.location.hash.substring(1)
    }
    window.addEventListener("hashchange", onHashChange)
    return () => {
      window.removeEventListener("hashchange", onHashChange)
    }
  })

  const closeDrawer = () => {
    navDrawerOpen.value = false
  }

  return () => (
    <>
      {docMeta.map((data) => (
        <div key={data.title} className="px-1 mb-3">
          <Header>
            {data.href ? (
              <Link to={data.href} onclick={closeDrawer} className="block">
                {data.title}
              </Link>
            ) : (
              <span>{data.title}</span>
            )}
          </Header>
          {data.pages && (
            <LinkList>
              {data.pages.map((page) => {
                const isActive = isLinkActive(
                  page.href,
                  router.state.pathname.peek()
                )
                let hasNewSection = false
                if (page.status?.type !== "new") {
                  hasNewSection = !!page.sections?.some((s) => s.isNew)
                }

                const Tag = page.sections ? "div" : Fragment

                return (
                  <Tag key={page.href}>
                    {page.disabled ? (
                      <StyledLink to="/" key={page.title}>
                        <span className="opacity-75">{page.title}</span>
                        <span className="badge">Upcoming</span>
                      </StyledLink>
                    ) : (
                      <StyledLink
                        key={page.href}
                        to={page.href}
                        onclick={() =>
                          isLinkActive(
                            page.href,
                            router.state.pathname.peek()
                          ) && (navDrawerOpen.value = false)
                        }
                        isActive={isActive}
                      >
                        {page.title}
                        <DocItemStatus
                          status={page.status}
                          hasNewSection={hasNewSection}
                        />
                      </StyledLink>
                    )}
                    <Derive from={hash}>
                      {(hash) =>
                        isActive &&
                        page.sections && (
                          <LinkList className="px-2 py-1 my-2 bg-white/5 rounded border border-white/5 gap-2 text-xs">
                            {page.sections.map((section) => (
                              <StyledLink
                                className="leading-4"
                                isActive={section.id === hash}
                                key={section.id}
                                to={
                                  page.href +
                                  (section.id ? `#${section.id}` : "")
                                }
                                onclick={closeDrawer}
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
                              </StyledLink>
                            ))}
                          </LinkList>
                        )
                      }
                    </Derive>
                  </Tag>
                )
              })}
            </LinkList>
          )}
          {data.sections && (
            <LinkList>
              {data.sections.map((section) => (
                <StyledLink
                  key={section.id}
                  to={data.href + (section.id ? `#${section.id}` : "")}
                  onclick={closeDrawer}
                >
                  {section.title}
                </StyledLink>
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
      className={cls("flex flex-col w-full", unwrap(className))}
      {...props}
    />
  )
}

function StyledLink({
  isActive,
  children,
  className,
  ...props
}: LinkProps & { isActive?: boolean }) {
  return (
    <Link
      className={cls(
        `flex items-center justify-between ${isActive ? "text-light" : "text-muted"}`,
        unwrap(className)
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
