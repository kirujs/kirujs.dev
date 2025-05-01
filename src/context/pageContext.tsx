import { createContext, useContext } from "kaioken"
import type { PageContext } from "vike/types"

export { PageContextProvider, usePageContext }

const Context = createContext<PageContext & { isClient: boolean }>(null as any)

function PageContextProvider({
  pageContext,
  children,
}: {
  pageContext: PageContext
  children: JSX.Children
}) {
  return (
    <Context.Provider
      value={{ ...pageContext, isClient: !!globalThis.window?.location }}
    >
      {children}
    </Context.Provider>
  )
}

function usePageContext() {
  return useContext(Context)
}
