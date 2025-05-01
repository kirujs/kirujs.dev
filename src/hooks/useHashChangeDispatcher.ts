import { usePageContext } from "$/context/pageContext"
import { customEvents } from "$/custom-events"
import { useEffect, useRef, useState } from "kaioken"

// export const useSectionObserver = (sections: string[]) => {
//   const [currentSection, setCurrentSection] = useState<string>(sections[0])

//   useEffect(() => {
//     const sectionElements = sections.map((id) => document.getElementById(id))

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const hash = `#${entry.target.id}`
//             setCurrentSection(hash)
//             window.history.pushState(null, "", hash)

//             // Dispatch a hashchange event
//             window.dispatchEvent(new HashChangeEvent("hashchange"))
//           }
//         })
//       },
//       { threshold: 0.6 } // Adjust threshold to change visibility sensitivity
//     )

//     sectionElements.forEach((section) => {
//       if (section) {
//         observer.observe(section)
//       }
//     })

//     return () => {
//       observer.disconnect()
//     }
//   }, [sections])

//   return currentSection
// }

// export const useHashChangeDispatcher = (sections: string[]) => {
//   const currentSection = useRef<string>("")
//   const hasScrolled = useRef(false)

//   useEffect(() => {
//     const handleScroll = () => {
//       hasScrolled.current = true
//       if (globalThis.window.scrollY < 50) {
//         dispatchHashChange("", currentSection.current)
//         currentSection.current = ""
//       } else if (currentSection.current === "" && window.location.hash === "") {
//         currentSection.current = sections[0]
//         dispatchHashChange(currentSection.current, "")
//       }
//     }
//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [sections])

//   useEffect(() => {
//     const sectionElements = sections.map((id) => document.getElementById(id))

//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (!hasScrolled.current) {
//           const section = document.getElementById(
//             window.location.hash.split("#")[1]
//           )
//           section?.scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           })
//           return
//         }
//         if (globalThis.window.scrollY < 50) {
//           if (document.body.clientHeight > window.innerHeight) {
//             dispatchHashChange("", currentSection.current)
//           }
//           return
//         }

//         const maxVisible = entries.reduce<IntersectionObserverEntry | null>(
//           (max, entry) =>
//             entry.intersectionRatio > (max?.intersectionRatio || 0)
//               ? entry
//               : max,
//           null
//         )
//         if (!maxVisible) return
//         console.log("maxVisible", maxVisible)

//         for (let i = 0; i < entries.length; i++) {
//           const entry = entries[i]
//           if (!entry.isIntersecting && entries.length === 1) {
//             // left a short section?
//             const prev = currentSection.current
//             const sectionIdx = sections.indexOf(entry.target.id)
//             if (sectionIdx === 0) {
//               currentSection.current = sections[1]
//             } else if (sectionIdx === sections.length - 1) {
//               currentSection.current = sections[sectionIdx - 1]
//             }

//             if (prev !== currentSection.current) {
//               dispatchHashChange(currentSection.current, prev)
//             }
//             break
//           }
//           if (entry.isIntersecting && entry.intersectionRatio > 0) {
//             dispatchHashChange(entry.target.id, currentSection.current)
//             currentSection.current = entry.target.id
//             break
//           }
//         }
//       },
//       {
//         threshold: 0,
//         rootMargin: "-100px",
//       }
//     )

//     sectionElements.forEach((section) => {
//       if (section) {
//         observer.observe(section)
//       }
//     })

//     return () => {
//       observer.disconnect()
//     }
//   }, [sections, currentSection])
// }

export const useHashChangeDispatcher = (sections: string[]) => {
  const [currentSection, setCurrentSection] = useState<string>("")
  const { urlPathname } = usePageContext()
  const hasScrolled = useRef(false)
  useEffect(() => {
    hasScrolled.current = false
  }, [urlPathname])

  const handleScroll = () => {
    if (!hasScrolled.current) {
      hasScrolled.current = true
      return
    }
    if (globalThis.window.scrollY < 50) {
      setCurrentSection("")
      return dispatchHashChange("")
    }
    let closestSection = ""
    let closestDistance = Infinity

    sections.forEach((id) => {
      const section = document.getElementById(id)
      if (section) {
        // Get the distance from the top of the viewport
        const rect = section.getBoundingClientRect()
        const rectTop = rect.top
        const rectBottom = rect.bottom
        if (rectBottom + 60 <= window.scrollY) {
          return
        }

        // If the section is close to or above the top (but not too far below)
        if (rectTop >= -150 && rectTop < closestDistance) {
          closestSection = id
          closestDistance = rectTop
        }
      }
    })

    const newHash = `${closestSection}`
    if (closestSection && currentSection !== newHash) {
      setCurrentSection(newHash)
      dispatchHashChange(newHash)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    // Run on initial mount to handle the case when the page is loaded scrolled partway down
    if (!!window.location.hash) {
      handleScroll()
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [sections, currentSection])

  return currentSection
}

function dispatchHashChange(newHash: string) {
  const hash = newHash ? `#${newHash}` : ""
  if (hash !== "") {
    window.history.replaceState(null, "", hash)
  } else {
    window.history.replaceState(null, "", window.location.href.split("#")[0])
  }

  // Dispatch a hashchange event
  window.dispatchEvent(new customEvents.scrollHashChangeEvent())
}
