import { Head, Link } from "kiru/router"
import { Container } from "$/components/atoms/Container"

export default function NotFound() {
  return (
    <>
      <Head.Content>
        <title>Kiru - Page not found</title>
      </Head.Content>
      <div className="w-full min-h-screen flex items-center justify-center">
        <section>
          <Container className="pb-6 flex flex-col items-center">
            <h2 className="text-6xl font-medium leading-snug">404</h2>
            <p className="text-lg xs:text-xl sm:text-2xl font-light text-center text-shadow text-light mb-6">
              Page not found
            </p>
            <Link to="/" className="link-button">
              Go Home
            </Link>
          </Container>
        </section>
      </div>
    </>
  )
}
