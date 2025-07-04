import { useEffect, useState } from "kaioken"

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)
    const updateMatches = () => {
      setMatches(media.matches)
    }
    media.addEventListener("change", updateMatches)
    return () => media.removeEventListener("change", updateMatches)
  }, [query])

  return matches
}

export const useIsMobile = () => useMediaQuery("(max-width: 768px)")
export const useIsTablet = () => useMediaQuery("(max-width: 1024px)")
export const useIsDesktop = () => useMediaQuery("(min-width: 1025px)")
