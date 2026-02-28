import { Container } from "$/components/atoms/Container"
import { SidebarContent } from "$/components/SidebarContent"

export default function DocsLayout({ children }: { children: JSX.Children }) {
  return (
    <Container className="flex gap-8 pt-(--navbar-height) min-h-screen">
      <aside className="hidden sm:block min-w-[200px] max-h-[calc(100vh-2.5rem-60px)] sticky top-20 p-1 overflow-y-auto">
        <div>
          <SidebarContent />
        </div>
      </aside>
      <article className="prose prose-invert grow py-5 w-full max-w-none sm:max-w-[calc(100%-200px-2rem)]">
        {children}
      </article>
    </Container>
  )
}
