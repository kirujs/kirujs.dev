import { lazy } from "kaioken"
import { useIsMobile } from "$/hooks/useMediaQuery"
import { TutorialStepsProvider } from "$/components/tutorials/TutorialStepsContext"
import { TutorialFeedback } from "$/components/tutorials/TutorialFeedback"

const MobileLayout = lazy(() => import("./Layout.mobile"))
const DesktopLayout = lazy(() => import("./Layout.desktop"))

export function Layout({ children }: { children: JSX.Children }) {
  const isMobile = useIsMobile()

  const Layout = isMobile ? MobileLayout : DesktopLayout
  return (
    <TutorialStepsProvider>
      <Layout>{children}</Layout>
      <TutorialFeedback />
    </TutorialStepsProvider>
  )
}
