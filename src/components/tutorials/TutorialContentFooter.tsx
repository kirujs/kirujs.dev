export function TutorialContentFooter({
  previous,
  next,
}: {
  previous: {
    label: string
    href: string
  }
  next: {
    label: string
    href: string
  }
}) {
  return (
    <div className="flex justify-between gap-4">
      <a href={previous.href} className="link-button">
        Previous: {previous.label}
      </a>
      <a href={next.href} className="link-button">
        Next: {next.label}
      </a>
    </div>
  )
}
