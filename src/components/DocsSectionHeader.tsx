export function DocsSectionHeader({
  children,
  href,
}: {
  children: string
  href: string
}) {
  return (
    <div className="docs-section-header mb-5">
      <a href={href} className="text-light">
        {children}
      </a>
    </div>
  )
}
