import { Container } from "$/components/atoms/Container"
import { CommandPallete } from "$/components/CommandPallete"
import { Navbar } from "$/components/Navbar"
import { NavDrawer } from "$/components/NavDrawer"
import { Portal } from "kaioken"

export function LayoutDefault({ children }: { children: JSX.Children }) {
  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-neutral-950/40 backdrop-blur-md border-b border-b-white/10">
        <Container>
          <Navbar />
        </Container>
      </header>
      <main>{children}</main>
      <Portal container={() => document.getElementById("portal-root")!}>
        <NavDrawer />
        <CommandPallete />
      </Portal>
    </>
  )
}
