export function LandingSection() {
  return (
    <div className="flex flex-wrap gap-8 justify-center">
      <LandingSectionCard
        iconSrc="/signal.svg"
        text="Signal-based state management with zero overhead"
      />
      <LandingSectionCard
        iconSrc="/route.svg"
        text="Comprehensive routing & CSR utilities by default"
      />
      <LandingSectionCard
        iconSrc="/hook.svg"
        text="Granular control of reactivity & state"
      />
    </div>
  )
}

type LandingSectionCardProps = {
  iconSrc: string
  text: string
}
function LandingSectionCard({ iconSrc, text }: LandingSectionCardProps) {
  return (
    <div className="flex flex-col md:basis-1/4 grow items-center text-center gap-4 rounded-xl glass-container p-6">
      <img src={iconSrc} className="w-12 h-12 opacity-60" alt={text} />
      <p className="text-lg font-thin">{text}</p>
    </div>
  )
}
