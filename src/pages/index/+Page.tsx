import { Container } from "$/components/atoms/Container"
import { AlbumItemDemo } from "$/components/demos/albums/AlbumItemDemo"
import { AlbumListDemo } from "$/components/demos/albums/AlbumListDemo"
import { AlbumSearchDemo } from "$/components/demos/albums/AlbumSearchDemo"
import { LandingSection } from "./LandingSection"

export function Page() {
  return (
    <div className="w-full h-full overflow-x-hidden">
      <section>
        <Container className="min-h-[100vh] flex flex-col items-center justify-center h-full pt-60">
          <h1 className="text-6xl xs:text-8xl sm:text-9xl font-bold leading-snug! text-shadow text-light">
            Kaioken
          </h1>
          <p className="text-lg mb-6 xs:text-xl sm:text-2xl font-light text-center text-shadow text-light">
            A powerful, easy-to-use rendering library with a tiny footprint
          </p>
          <a href="/docs/getting-started" className="link-button mb-40">
            Get Started
          </a>
          <LandingSection />
        </Container>
      </section>
      <div className="flex flex-col">
        <section className="py-20">
          <Container className="pb-6">
            <h2 className="text-3xl font-medium leading-snug mb-4">
              Build modular user interfaces with reusable components
            </h2>
            <p className="text-lg font-light">
              Kaioken uses unflavoured JSX syntax, making it familiar and
              approachable to anyone with knowledge of HTML and Javascript.
            </p>
          </Container>
          <Container breakpoint="md" mobilePadding={false}>
            <AlbumItemDemo />
          </Container>
        </section>
        <section className="py-20">
          <Container className="pb-6">
            <h2 className="text-3xl font-medium leading-snug mb-4">
              Create dynamic experiences with simple control flow
            </h2>
            <p className="text-lg font-light">
              Kaioken components are Javascript functions, so control flow and
              dynamic rendering requires no additional knowledge.
            </p>
          </Container>
          <Container breakpoint="md" mobilePadding={false}>
            <AlbumListDemo />
          </Container>
        </section>
        <section className="py-20">
          <Container className="pb-6">
            <h2 className="text-3xl font-medium leading-snug mb-4">
              Make interactivity easy
            </h2>
            <p className="text-lg font-light">
              Kaioken components use simple, declarative syntax to make
              interactivity easy. Changing the state of a component
              automatically updates the UI.
            </p>
          </Container>
          <Container breakpoint="md" mobilePadding={false}>
            <AlbumSearchDemo />
          </Container>
        </section>
      </div>
    </div>
  )
}
